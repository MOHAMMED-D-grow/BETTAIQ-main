import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Flame, RotateCcw } from 'lucide-react';

// ============================================================================
// PROPS & TYPES
// ============================================================================
export interface BettaFish3DProps {
  flaring?: boolean;
  isFlaring?: boolean;
  lightingMode?: 'sunlight' | 'midnight';
}

type CameraPreset = 'mirror' | 'lateral' | 'front' | 'top';

// Pre-allocated math helpers outside render loop (Zero GC)
const _camTargetPos = new THREE.Vector3();
const _camLookAt = new THREE.Vector3(0.15, 0, 0);

// ============================================================================
// 1. STUDIO UNDERWATER ENVIRONMENT MAP (RoomEnvironment via PMREM)
// ============================================================================
function UnderwaterEnvironment({ lightingMode }: { lightingMode: 'sunlight' | 'midnight' }) {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const roomEnv = new RoomEnvironment();
    const envRT = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envRT.texture;
    scene.environmentIntensity = lightingMode === 'sunlight' ? 1.15 : 0.9;

    return () => {
      scene.environment = null;
      envRT.dispose();
      roomEnv.dispose();
      pmremGenerator.dispose();
    };
  }, [gl, scene, lightingMode]);

  return null;
}

// ============================================================================
// 2. PROCEDURAL SCALE TEXTURES MATCHING UPLOADED RED & BLACK CROWNTAIL SPECIMEN
// ============================================================================
function createRedBlackBettaTextures(): {
  colorMap: THREE.CanvasTexture;
  normalMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
} {
  const width = 1024;
  const height = 512;

  // 1) Color Albedo Map: Obsidian charcoal body + metallic silver-cyan dorsal shimmer
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const cCtx = colorCanvas.getContext('2d')!;

  // Base deep obsidian black
  cCtx.fillStyle = '#04060b';
  cCtx.fillRect(0, 0, width, height);

  // Dark black + royal blue metallic dorsal gradient
  const dorsalGrad = cCtx.createLinearGradient(0, 0, 0, height);
  dorsalGrad.addColorStop(0, '#0a1f3d');
  dorsalGrad.addColorStop(0.24, '#071426');
  dorsalGrad.addColorStop(0.55, '#04070d');
  dorsalGrad.addColorStop(1, '#030408');
  cCtx.fillStyle = dorsalGrad;
  cCtx.fillRect(0, 0, width, height);

  // 2) Normal Map
  const normCanvas = document.createElement('canvas');
  normCanvas.width = width;
  normCanvas.height = height;
  const nCtx = normCanvas.getContext('2d')!;
  nCtx.fillStyle = '#8080ff';
  nCtx.fillRect(0, 0, width, height);

  // 3) Roughness Map
  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = 512;
  roughCanvas.height = 256;
  const rCtx = roughCanvas.getContext('2d')!;
  rCtx.fillStyle = '#555555'; // Smooth wet skin baseline
  rCtx.fillRect(0, 0, 512, 256);

  // Draw overlapping ctenoid scales
  // UV v runs radially around cross-section: top dorsal = ~0.25 and ~0.75 depending on angle.
  // We map v so angle=0 is right flank, angle=PI/2 is top dorsal, angle=3PI/2 is ventral belly.
  const rows = 44;
  const cols = 78;
  const dw = width / cols;
  const dh = height / rows;

  // Deterministic pseudo-random helper so texture is crisp & repeatable
  const hash = (a: number, b: number) => {
    const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453123;
    return s - Math.floor(s);
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const u = c / cols; // 0 (snout) -> 1 (tail peduncle)
      const v = r / rows; // radial coordinate: 0.25 = dorsal top, 0.75 = belly bottom
      const x = c * dw + (r % 2 === 1 ? dw * 0.5 : 0);
      const y = r * dh;

      // Angular distance from dorsal ridge (v = 0.25)
      const distFromDorsal = Math.min(Math.abs(v - 0.25), 1 - Math.abs(v - 0.25));
      const isDorsalZone = distFromDorsal < 0.2;
      const isPeduncleBase = u > 0.78 && distFromDorsal < 0.34;
      const isHeadSnout = u < 0.22;

      const rnd = hash(r, c);

      // Ctenoid scale shape
      cCtx.beginPath();
      cCtx.ellipse(x, y, dw * 0.62, dh * 0.58, 0, 0, Math.PI * 2);

      if (!isHeadSnout && (isDorsalZone || isPeduncleBase)) {
        // Metallic royal-cobalt blue over deep black along dorsal back & peduncle
        const dorsalFactor = Math.max(0, 1 - distFromDorsal / 0.24);
        const shimmer = (0.35 + 0.65 * dorsalFactor) * (0.65 + 0.35 * rnd);
        const rCol = Math.round(10 + shimmer * 32);
        const gCol = Math.round(28 + shimmer * 98);
        const bCol = Math.round(78 + shimmer * 165);
        cCtx.fillStyle = `rgb(${rCol}, ${gCol}, ${bCol})`;
        cCtx.strokeStyle = `rgba(96, 175, 255, ${0.55 * shimmer})`;
        cCtx.lineWidth = 1.15;
      } else if (isHeadSnout) {
        // Deep jet black face with subtle cobalt micro-pore tone
        const shade = Math.round(5 + rnd * 8);
        cCtx.fillStyle = `rgb(${shade}, ${shade + 3}, ${shade + 9})`;
        cCtx.strokeStyle = `rgba(37, 99, 235, 0.28)`;
        cCtx.lineWidth = 0.7;
      } else {
        // Deep dark black flank with electric blue scale rim highlights
        const flankTone = Math.round(6 + rnd * 9);
        cCtx.fillStyle = `rgb(${flankTone}, ${flankTone + 3}, ${flankTone + 10})`;
        cCtx.strokeStyle = `rgba(59, 130, 246, ${0.26 + rnd * 0.24})`;
        cCtx.lineWidth = 0.9;
      }

      cCtx.fill();
      cCtx.stroke();

      // Normal map dome for each scale
      if (!isHeadSnout) {
        const grad = nCtx.createRadialGradient(x - dw * 0.1, y, 0.5, x, y, dw * 0.6);
        grad.addColorStop(0, '#9e9eff');
        grad.addColorStop(0.65, '#8080ff');
        grad.addColorStop(1, '#5858cc');
        nCtx.fillStyle = grad;
        nCtx.beginPath();
        nCtx.ellipse(x, y, dw * 0.55, dh * 0.52, 0, 0, Math.PI * 2);
        nCtx.fill();
      }

      // Roughness map variation (metallic dorsal scales shinier, obsidian face slightly satin)
      const rx = (x / width) * 512;
      const ry = (y / height) * 256;
      rCtx.fillStyle = isDorsalZone ? '#262626' : isHeadSnout ? '#686868' : '#383838';
      rCtx.beginPath();
      rCtx.ellipse(rx, ry, (dw * 0.55) / 2, (dh * 0.52) / 2, 0, 0, Math.PI * 2);
      rCtx.fill();
    }
  }

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.wrapS = THREE.ClampToEdgeWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;

  const normalMap = new THREE.CanvasTexture(normCanvas);
  normalMap.wrapS = THREE.ClampToEdgeWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.wrapS = THREE.ClampToEdgeWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;

  return { colorMap, normalMap, roughnessMap };
}

// ============================================================================
// 3. ANATOMICAL LOFTED BETTA TORSO MESH (Laterally Compressed Profile)
// ============================================================================
function createAnatomicalBettaBody(): {
  geometry: THREE.BufferGeometry;
  restPositions: Float32Array;
} {
  const slices = 46;
  const segments = 32;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= slices; i++) {
    const u = i / slices;
    // x runs from -2.15 (snout tip) to +1.35 (caudal peduncle)
    const x = -2.15 + u * 3.5;

    // Dorsal/ventral spine centerline
    let centerY = 0;
    if (x < -1.2) {
      const f = (x + 2.15) / 0.95;
      centerY = 0.03 - 0.06 * Math.cos(f * Math.PI * 0.5);
    } else if (x < 0.25) {
      centerY = 0.05 * Math.cos(((x + 0.5) / 0.85) * 1.2);
    } else {
      const f = (x - 0.25) / 1.1;
      centerY = 0.02 * (1 - f);
    }

    // Vertical radius (ry)
    let ry = 0.04;
    if (x < -1.95) {
      // Snout & lips
      const f = (x + 2.15) / 0.2;
      ry = 0.08 + 0.14 * Math.sqrt(Math.max(0.001, f));
    } else if (x < -1.05) {
      // Head & cranial slope
      const f = (x + 1.95) / 0.9;
      ry = 0.22 + 0.34 * Math.sin(f * Math.PI * 0.5);
    } else if (x < 0.2) {
      // Deep thoracic body
      const f = (x + 1.05) / 1.25;
      ry = 0.56 + 0.06 * Math.sin(f * Math.PI);
    } else {
      // Smooth peduncle taper
      const f = (x - 0.2) / 1.15;
      ry = 0.56 - 0.31 * Math.pow(f, 0.85);
    }

    // Lateral width radius (rz) — Bettas are distinctly laterally compressed
    let rz = 0.03;
    if (x < -1.95) {
      const f = (x + 2.15) / 0.2;
      rz = 0.1 + 0.1 * Math.sqrt(Math.max(0.001, f));
    } else if (x < -1.05) {
      // Cheek / Operculum fullness
      const f = (x + 1.95) / 0.9;
      rz = 0.2 + 0.16 * Math.sin(f * Math.PI * 0.5);
    } else if (x < 0.2) {
      const f = (x + 1.05) / 1.25;
      rz = 0.36 - 0.1 * f;
    } else {
      const f = (x - 0.2) / 1.15;
      rz = 0.26 - 0.18 * f;
    }

    for (let j = 0; j <= segments; j++) {
      const v = j / segments;
      const angle = v * Math.PI * 2;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Sharper dorsal ridge, fuller belly keel
      const keelMod = sinA < 0 ? 1.08 : 0.94;
      const lateralFlatten = Math.sign(cosA) * Math.pow(Math.abs(cosA), 0.9);

      const vx = x;
      const vy = centerY + sinA * ry * keelMod;
      const vz = lateralFlatten * rz;

      positions.push(vx, vy, vz);
      uvs.push(u, v);
    }
  }

  for (let i = 0; i < slices; i++) {
    for (let j = 0; j < segments; j++) {
      const a = i * (segments + 1) + j;
      const b = (i + 1) * (segments + 1) + j;
      const c = (i + 1) * (segments + 1) + (j + 1);
      const d = i * (segments + 1) + (j + 1);
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  const posArray = new Float32Array(positions);
  geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return {
    geometry,
    restPositions: new Float32Array(posArray),
  };
}

// ============================================================================
// 4. HYPER-DETAILED CROWNTAIL FIN BUILDERS (Paired Crimson Rays + Dark Webbing)
// ============================================================================
interface FinGeometryData {
  raysGeom: THREE.BufferGeometry;
  raysRest: Float32Array;
  webGeom: THREE.BufferGeometry;
  webRest: Float32Array;
}

// Helper: Adds a tapered, segmented, gracefully curved 3D ray ribbon with vertex colors
function appendCurvedCrowntailRay(
  positions: number[],
  colors: number[],
  indices: number[],
  vertOffsetRef: { current: number },
  points: THREE.Vector3[],
  baseThickness: number,
  silverBasePortion = 0.16,
  crimsonIntensity = 1.0
) {
  const segs = points.length - 1;
  const startVert = vertOffsetRef.current;

  for (let s = 0; s <= segs; s++) {
    const t = s / segs;
    const pt = points[s];
    // Taper to fine needle tip
    const thickness = baseThickness * Math.pow(1 - t, 0.72) + 0.003;

    // Color progression: brief blue-silver root -> vivid luminous bright scarlet red rays
    let r = 0, g = 0, b = 0;
    const rootPortion = Math.min(silverBasePortion, 0.11);
    if (t < rootPortion) {
      const k = t / rootPortion;
      r = THREE.MathUtils.lerp(0.35, 0.65, k);
      g = THREE.MathUtils.lerp(0.65, 0.12, k);
      b = THREE.MathUtils.lerp(0.95, 0.12, k);
    } else if (t < 0.26) {
      const k = (t - rootPortion) / (0.26 - rootPortion);
      r = THREE.MathUtils.lerp(0.65, 1.0 * crimsonIntensity, k);
      g = THREE.MathUtils.lerp(0.12, 0.08, k);
      b = THREE.MathUtils.lerp(0.12, 0.06, k);
    } else {
      const k = (t - 0.26) / 0.74;
      r = 1.0 * crimsonIntensity;
      g = THREE.MathUtils.lerp(0.08, 0.15, Math.sin(k * Math.PI * 0.6));
      b = THREE.MathUtils.lerp(0.05, 0.09, k);
    }

    // Two vertices per ring (thin 3D ribbon along Z)
    positions.push(pt.x, pt.y, pt.z - thickness);
    positions.push(pt.x, pt.y, pt.z + thickness);
    colors.push(r, g, b, r, g, b);
  }

  for (let s = 0; s < segs; s++) {
    const a = startVert + s * 2;
    const b = a + 1;
    const c = a + 2;
    const d = a + 3;
    indices.push(a, b, c, b, d, c);
  }

  vertOffsetRef.current += (segs + 1) * 2;
}

// Build Caudal Tail (Double-ray Crowntail Halo with deep scalloped black-crimson webbing)
function createRedCrowntailCaudal(): FinGeometryData {
  const rayPairs = 14; // 14 primary forks -> 28 individual needle spikes
  const stepsPerRay = 12;
  const spreadAngle = Math.PI * 1.12; // Dramatic ~200° halo like the photo
  const startAngle = -spreadAngle * 0.5;

  const rayPos: number[] = [];
  const rayCol: number[] = [];
  const rayIdx: number[] = [];
  const rayOffset = { current: 0 };

  const webPos: number[] = [];
  const webCol: number[] = [];
  const webIdx: number[] = [];
  let webOffset = 0;

  const prevRayPaths: THREE.Vector3[][] = [];

  for (let p = 0; p < rayPairs; p++) {
    const pairT = p / (rayPairs - 1);
    const centerAngle = startAngle + pairT * spreadAngle;

    // Pair split (characteristic Crowntail double-ray fork!)
    for (let fork = 0; fork < 2; fork++) {
      const subOffset = (fork === 0 ? -0.028 : 0.028);
      const angle = centerAngle + subOffset;
      const baseSpreadY = (pairT - 0.5) * 0.42;

      // Length variation: longer radial crown rays in middle/upper-middle
      const lenProfile = 1.85 + Math.sin(pairT * Math.PI) * 0.65 + (fork === 0 ? 0.06 : -0.04);

      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= stepsPerRay; s++) {
        const st = s / stepsPerRay;
        // Organic tip curl upward/backward like natural Crowntail spines
        const curlAngle = angle + Math.sin(st * Math.PI * 0.9) * (pairT - 0.5) * 0.24;
        const dist = st * lenProfile;
        const px = Math.cos(curlAngle) * dist;
        const py = baseSpreadY + Math.sin(curlAngle) * dist;
        // Subtle 3D ripple fold
        const pz = Math.sin(pairT * Math.PI * 8 + st * 2.5) * 0.045 * st;
        pts.push(new THREE.Vector3(px, py, pz));
      }

      appendCurvedCrowntailRay(
        rayPos,
        rayCol,
        rayIdx,
        rayOffset,
        pts,
        0.022,
        0.18,
        1.0
      );

      prevRayPaths.push(pts);
    }
  }

  // Build scalloped translucent black-crimson webbing between consecutive rays
  // Web stops at ~48% of ray length with concave scallop dips between spikes!
  const webSteps = 5;
  for (let r = 1; r < prevRayPaths.length; r++) {
    const pathA = prevRayPaths[r - 1];
    const pathB = prevRayPaths[r];
    const isInterPairGap = r % 2 === 0; // Deeper scallop between pairs, shallower within a fork
    const maxWebFraction = isInterPairGap ? 0.42 : 0.56;

    for (let ws = 0; ws < webSteps; ws++) {
      const t0 = (ws / webSteps) * maxWebFraction;
      const t1 = ((ws + 1) / webSteps) * maxWebFraction;
      const idx0 = Math.min(stepsPerRay, Math.round(t0 * stepsPerRay));
      const idx1 = Math.min(stepsPerRay, Math.round(t1 * stepsPerRay));

      const a0 = pathA[idx0];
      const b0 = pathB[idx0];
      const a1 = pathA[idx1];
      const b1 = pathB[idx1];

      // Midpoint dips inward for authentic U-shaped Crowntail scallop on outer edge
      const dipFactor = ws === webSteps - 1 ? (isInterPairGap ? 0.78 : 0.88) : 0.96;
      const mid1 = new THREE.Vector3().addVectors(a1, b1).multiplyScalar(0.5 * dipFactor);

      webPos.push(
        a0.x, a0.y, a0.z,
        b0.x, b0.y, b0.z,
        a1.x, a1.y, a1.z,
        mid1.x, mid1.y, mid1.z,
        b1.x, b1.y, b1.z
      );

      // Web colors: subtle dark base -> brighter translucent ruby red edge
      const rootCol = t0 < 0.12 ? [0.12, 0.22, 0.34] : [0.22, 0.02, 0.02];
      const edgeCol = ws === webSteps - 1 ? [0.68, 0.04, 0.04] : [0.34, 0.03, 0.03];

      webCol.push(
        ...rootCol,
        ...rootCol,
        ...edgeCol,
        ...edgeCol,
        ...edgeCol
      );

      webIdx.push(
        webOffset, webOffset + 1, webOffset + 3,
        webOffset, webOffset + 3, webOffset + 2,
        webOffset + 1, webOffset + 4, webOffset + 3
      );
      webOffset += 5;
    }
  }

  const raysGeom = new THREE.BufferGeometry();
  const rPosArr = new Float32Array(rayPos);
  raysGeom.setAttribute('position', new THREE.BufferAttribute(rPosArr, 3));
  raysGeom.setAttribute('color', new THREE.Float32BufferAttribute(rayCol, 3));
  raysGeom.setIndex(rayIdx);
  raysGeom.computeVertexNormals();

  const webGeom = new THREE.BufferGeometry();
  const wPosArr = new Float32Array(webPos);
  webGeom.setAttribute('position', new THREE.BufferAttribute(wPosArr, 3));
  webGeom.setAttribute('color', new THREE.Float32BufferAttribute(webCol, 3));
  webGeom.setIndex(webIdx);
  webGeom.computeVertexNormals();

  return {
    raysGeom,
    raysRest: new Float32Array(rPosArr),
    webGeom,
    webRest: new Float32Array(wPosArr),
  };
}

// Build Dorsal Fin (Sweeping crimson crest rays rising from back)
function createRedCrowntailDorsal(): FinGeometryData {
  const rayCount = 15;
  const stepsPerRay = 10;

  const rayPos: number[] = [];
  const rayCol: number[] = [];
  const rayIdx: number[] = [];
  const rayOffset = { current: 0 };

  const webPos: number[] = [];
  const webCol: number[] = [];
  const webIdx: number[] = [];
  let webOffset = 0;

  const paths: THREE.Vector3[][] = [];

  for (let r = 0; r < rayCount; r++) {
    const t = r / (rayCount - 1);
    const baseX = -0.35 + t * 1.55;
    const baseY = 0.5 + Math.sin(t * Math.PI) * 0.08 - t * 0.14;

    const rayHeight = 1.05 + Math.sin(t * Math.PI) * 0.65;
    const sweepBack = 0.55 + t * 0.45;

    const pts: THREE.Vector3[] = [];
    for (let s = 0; s <= stepsPerRay; s++) {
      const st = s / stepsPerRay;
      const px = baseX + Math.pow(st, 1.3) * sweepBack;
      const py = baseY + Math.sin(st * Math.PI * 0.52) * rayHeight;
      const pz = Math.sin(t * 10 + st * 2) * 0.03 * st;
      pts.push(new THREE.Vector3(px, py, pz));
    }

    appendCurvedCrowntailRay(rayPos, rayCol, rayIdx, rayOffset, pts, 0.018, 0.16, 0.98);
    paths.push(pts);
  }

  for (let r = 1; r < paths.length; r++) {
    const pA = paths[r - 1];
    const pB = paths[r];
    const webSteps = 4;
    const maxFrac = 0.5;
    for (let ws = 0; ws < webSteps; ws++) {
      const i0 = Math.round((ws / webSteps) * maxFrac * stepsPerRay);
      const i1 = Math.round(((ws + 1) / webSteps) * maxFrac * stepsPerRay);
      const a0 = pA[i0], b0 = pB[i0], a1 = pA[i1], b1 = pB[i1];
      const dip = ws === webSteps - 1 ? 0.82 : 0.96;
      const mid = new THREE.Vector3().addVectors(a1, b1).multiplyScalar(0.5);
      // Dip slightly toward base
      mid.y = THREE.MathUtils.lerp(a0.y, mid.y, dip);

      webPos.push(a0.x, a0.y, a0.z, b0.x, b0.y, b0.z, a1.x, a1.y, a1.z, mid.x, mid.y, mid.z, b1.x, b1.y, b1.z);
      const c0 = [0.22, 0.03, 0.04], c1 = [0.64, 0.04, 0.04];
      webCol.push(...c0, ...c0, ...c1, ...c1, ...c1);
      webIdx.push(webOffset, webOffset + 1, webOffset + 3, webOffset, webOffset + 3, webOffset + 2, webOffset + 1, webOffset + 4, webOffset + 3);
      webOffset += 5;
    }
  }

  const raysGeom = new THREE.BufferGeometry();
  const rPosArr = new Float32Array(rayPos);
  raysGeom.setAttribute('position', new THREE.BufferAttribute(rPosArr, 3));
  raysGeom.setAttribute('color', new THREE.Float32BufferAttribute(rayCol, 3));
  raysGeom.setIndex(rayIdx);
  raysGeom.computeVertexNormals();

  const webGeom = new THREE.BufferGeometry();
  const wPosArr = new Float32Array(webPos);
  webGeom.setAttribute('position', new THREE.BufferAttribute(wPosArr, 3));
  webGeom.setAttribute('color', new THREE.Float32BufferAttribute(webCol, 3));
  webGeom.setIndex(webIdx);
  webGeom.computeVertexNormals();

  return { raysGeom, raysRest: new Float32Array(rPosArr), webGeom, webRest: new Float32Array(wPosArr) };
}

// Build Anal Fin (Broad ventral crimson curtain with needle spikes)
function createRedCrowntailAnal(): FinGeometryData {
  const rayCount = 20;
  const stepsPerRay = 10;

  const rayPos: number[] = [];
  const rayCol: number[] = [];
  const rayIdx: number[] = [];
  const rayOffset = { current: 0 };

  const webPos: number[] = [];
  const webCol: number[] = [];
  const webIdx: number[] = [];
  let webOffset = 0;

  const paths: THREE.Vector3[][] = [];

  for (let r = 0; r < rayCount; r++) {
    const t = r / (rayCount - 1);
    const baseX = -0.45 + t * 1.75;
    const baseY = -0.5 + Math.sin(t * Math.PI) * 0.04 + t * 0.14;

    const drop = 1.2 + Math.sin(t * Math.PI * 0.8) * 0.45;
    const sweepBack = 0.3 + t * 0.55;

    const pts: THREE.Vector3[] = [];
    for (let s = 0; s <= stepsPerRay; s++) {
      const st = s / stepsPerRay;
      const px = baseX + Math.pow(st, 1.25) * sweepBack;
      const py = baseY - Math.sin(st * Math.PI * 0.52) * drop;
      const pz = Math.sin(t * 12 + st * 2) * 0.03 * st;
      pts.push(new THREE.Vector3(px, py, pz));
    }

    appendCurvedCrowntailRay(rayPos, rayCol, rayIdx, rayOffset, pts, 0.017, 0.12, 0.96);
    paths.push(pts);
  }

  for (let r = 1; r < paths.length; r++) {
    const pA = paths[r - 1];
    const pB = paths[r];
    const webSteps = 4;
    const maxFrac = 0.56;
    for (let ws = 0; ws < webSteps; ws++) {
      const i0 = Math.round((ws / webSteps) * maxFrac * stepsPerRay);
      const i1 = Math.round(((ws + 1) / webSteps) * maxFrac * stepsPerRay);
      const a0 = pA[i0], b0 = pB[i0], a1 = pA[i1], b1 = pB[i1];
      const dip = ws === webSteps - 1 ? 0.84 : 0.96;
      const mid = new THREE.Vector3().addVectors(a1, b1).multiplyScalar(0.5);
      mid.y = THREE.MathUtils.lerp(a0.y, mid.y, dip);

      webPos.push(a0.x, a0.y, a0.z, b0.x, b0.y, b0.z, a1.x, a1.y, a1.z, mid.x, mid.y, mid.z, b1.x, b1.y, b1.z);
      const c0 = [0.22, 0.03, 0.04], c1 = [0.62, 0.04, 0.04];
      webCol.push(...c0, ...c0, ...c1, ...c1, ...c1);
      webIdx.push(webOffset, webOffset + 1, webOffset + 3, webOffset, webOffset + 3, webOffset + 2, webOffset + 1, webOffset + 4, webOffset + 3);
      webOffset += 5;
    }
  }

  const raysGeom = new THREE.BufferGeometry();
  const rPosArr = new Float32Array(rayPos);
  raysGeom.setAttribute('position', new THREE.BufferAttribute(rPosArr, 3));
  raysGeom.setAttribute('color', new THREE.Float32BufferAttribute(rayCol, 3));
  raysGeom.setIndex(rayIdx);
  raysGeom.computeVertexNormals();

  const webGeom = new THREE.BufferGeometry();
  const wPosArr = new Float32Array(webPos);
  webGeom.setAttribute('position', new THREE.BufferAttribute(wPosArr, 3));
  webGeom.setAttribute('color', new THREE.Float32BufferAttribute(webCol, 3));
  webGeom.setIndex(webIdx);
  webGeom.computeVertexNormals();

  return { raysGeom, raysRest: new Float32Array(rPosArr), webGeom, webRest: new Float32Array(wPosArr) };
}

// ============================================================================
// 5. CUSTOM SHAPED OPERCULAR GILL SHELLS & PLEATED BEARD
// ============================================================================
function createOperculumGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.34);
  shape.bezierCurveTo(0.32, 0.3, 0.48, 0.06, 0.44, -0.22);
  shape.bezierCurveTo(0.35, -0.44, 0.08, -0.46, -0.05, -0.3);
  shape.bezierCurveTo(-0.08, -0.05, -0.06, 0.22, 0, 0.34);

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: 0.035,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 4,
    curveSegments: 16,
  });
  geom.computeVertexNormals();
  return geom;
}

function createPleatedBeardGeometry(): THREE.BufferGeometry {
  // Semi-circular radial pleated collar beneath jaw/operculum
  const rays = 24;
  const segs = 6;
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= rays; i++) {
    const u = i / rays;
    // Fan from left cheek around throat to right cheek
    const theta = (u - 0.5) * Math.PI * 1.15;
    const pleat = Math.sin(u * Math.PI * 14) * 0.028;

    for (let j = 0; j <= segs; j++) {
      const v = j / segs;
      const radius = 0.14 + v * 0.34;
      const vx = -Math.cos(theta) * radius * 0.55;
      const vy = -v * 0.42 - Math.abs(Math.cos(theta)) * 0.08;
      const vz = Math.sin(theta) * (radius + pleat * v);

      positions.push(vx, vy, vz);
      // Obsidian black pleated membrane with subtle silvery outer rim
      const edgeRim = v > 0.85 ? 0.14 : 0.04;
      colors.push(edgeRim, edgeRim * 1.05, edgeRim * 1.15);
    }
  }

  for (let i = 0; i < rays; i++) {
    for (let j = 0; j < segs; j++) {
      const a = i * (segs + 1) + j;
      const b = (i + 1) * (segs + 1) + j;
      const c = (i + 1) * (segs + 1) + (j + 1);
      const d = i * (segs + 1) + (j + 1);
      indices.push(a, b, d, b, c, d);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

// ============================================================================
// 6. FLUID WAVE DEFORMATION KERNEL (Zero GC)
// ============================================================================
function deformSwimmingMesh(
  geom: THREE.BufferGeometry,
  rest: Float32Array,
  time: number,
  freq: number,
  ampScale: number,
  anchorX: number
) {
  const posAttr = geom.attributes.position as THREE.BufferAttribute;
  const arr = posAttr.array as Float32Array;
  const count = posAttr.count;

  for (let i = 0; i < count; i++) {
    const idx = i * 3;
    const rx = rest[idx];
    const ry = rest[idx + 1];
    const rz = rest[idx + 2];

    const dist = Math.max(0, rx - anchorX);
    // Progressive S-wave amplitude: stiff near snout, fluid whip at Crowntail tips
    const env = Math.pow(dist / 3.5, 1.35) * ampScale;
    const phase = dist * 2.1 - time * freq + Math.abs(ry) * 0.45;
    const waveZ = Math.sin(phase) * 0.34 * env;

    arr[idx] = rx;
    arr[idx + 1] = ry;
    arr[idx + 2] = rz + waveZ;
  }
  posAttr.needsUpdate = true;
}

// ============================================================================
// 7. ANIMATED HYPER-REALISTIC RED & BLACK CROWNTAIL BETTA SCENE OBJECT
// ============================================================================
function RedBlackCrowntailBetta({ flaring }: { flaring: boolean }) {
  const rootRef = useRef<THREE.Group>(null);
  const headOffsetRef = useRef<THREE.Group>(null);
  const leftOperculumRef = useRef<THREE.Group>(null);
  const rightOperculumRef = useRef<THREE.Group>(null);
  const beardGroupRef = useRef<THREE.Group>(null);
  const leftPecRef = useRef<THREE.Group>(null);
  const rightPecRef = useRef<THREE.Group>(null);
  const leftPelvicRef = useRef<THREE.Group>(null);
  const rightPelvicRef = useRef<THREE.Group>(null);
  const caudalGroupRef = useRef<THREE.Group>(null);

  const flareAmtRef = useRef(flaring ? 1 : 0);

  // Build textures & geometries once and dispose on unmount
  const textures = useMemo(() => createRedBlackBettaTextures(), []);
  const body = useMemo(() => createAnatomicalBettaBody(), []);
  const caudal = useMemo(() => createRedCrowntailCaudal(), []);
  const dorsal = useMemo(() => createRedCrowntailDorsal(), []);
  const anal = useMemo(() => createRedCrowntailAnal(), []);
  const operculumGeom = useMemo(() => createOperculumGeometry(), []);
  const beardGeom = useMemo(() => createPleatedBeardGeometry(), []);

  useEffect(() => {
    return () => {
      textures.colorMap.dispose();
      textures.normalMap.dispose();
      textures.roughnessMap.dispose();
      body.geometry.dispose();
      caudal.raysGeom.dispose();
      caudal.webGeom.dispose();
      dorsal.raysGeom.dispose();
      dorsal.webGeom.dispose();
      anal.raysGeom.dispose();
      anal.webGeom.dispose();
      operculumGeom.dispose();
      beardGeom.dispose();
    };
  }, [textures, body, caudal, dorsal, anal, operculumGeom, beardGeom]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const targetFlare = flaring ? 1.0 : 0.0;
    flareAmtRef.current = THREE.MathUtils.damp(flareAmtRef.current, targetFlare, 4.5, delta);
    const f = flareAmtRef.current;

    const swimFreq = THREE.MathUtils.lerp(2.8, 4.4, f);
    const bodyAmp = THREE.MathUtils.lerp(0.75, 1.15, f);

    // 1. Root hovering & aggressive territorial mirror display sway
    if (rootRef.current) {
      rootRef.current.position.y = Math.sin(t * 1.45) * 0.065;
      rootRef.current.position.x = Math.cos(t * 0.9) * 0.04;
      // Subtle proud pitch upward when flaring
      rootRef.current.rotation.z = THREE.MathUtils.lerp(
        Math.sin(t * 1.1) * 0.025,
        0.05 + Math.sin(t * 1.8) * 0.03,
        f
      );
      rootRef.current.rotation.y = Math.sin(t * swimFreq * 0.35) * (0.08 + f * 0.09);
    }

    // 2. Traveling S-wave spine deformation across body + fins
    deformSwimmingMesh(body.geometry, body.restPositions, t, swimFreq, 0.35 * bodyAmp, -2.05);
    deformSwimmingMesh(dorsal.raysGeom, dorsal.raysRest, t, swimFreq, 0.72 * bodyAmp, -1.3);
    deformSwimmingMesh(dorsal.webGeom, dorsal.webRest, t, swimFreq, 0.65 * bodyAmp, -1.3);
    deformSwimmingMesh(anal.raysGeom, anal.raysRest, t, swimFreq, 0.78 * bodyAmp, -1.3);
    deformSwimmingMesh(anal.webGeom, anal.webRest, t, swimFreq, 0.7 * bodyAmp, -1.3);
    deformSwimmingMesh(caudal.raysGeom, caudal.raysRest, t, swimFreq, 0.85 * bodyAmp, -0.2);
    deformSwimmingMesh(caudal.webGeom, caudal.webRest, t, swimFreq, 0.72 * bodyAmp, -0.2);

    // 3. Caudal fan wide expansion during flaring (+18% spread)
    if (caudalGroupRef.current) {
      const fanSpread = THREE.MathUtils.lerp(0.92, 1.14, f);
      caudalGroupRef.current.scale.set(1.0 + f * 0.06, fanSpread, 1.0);
    }

    // 4. Opercular Gill Plates Flare (~38 deg outward with rhythmic gill breathing)
    const gillBreath = Math.sin(t * (3.2 + f * 2.0)) * 0.045;
    const gillAngle = THREE.MathUtils.lerp(0.08, 0.68, f) + gillBreath;
    if (leftOperculumRef.current) {
      leftOperculumRef.current.rotation.y = -gillAngle;
      leftOperculumRef.current.position.z = 0.25 + f * 0.06;
    }
    if (rightOperculumRef.current) {
      rightOperculumRef.current.rotation.y = gillAngle;
      rightOperculumRef.current.position.z = -0.25 - f * 0.06;
    }

    // 5. Pleated Black Branchiostegal Beard Expansion
    if (beardGroupRef.current) {
      const beardScale = THREE.MathUtils.lerp(0.22, 1.12, f) + Math.sin(t * 4.5) * 0.03 * f;
      beardGroupRef.current.scale.set(beardScale, beardScale, beardScale * 1.15);
      beardGroupRef.current.rotation.z = THREE.MathUtils.lerp(-0.55, 0.08, f);
    }

    // 6. Pectoral Fins Rowing Stroke (stabilization)
    if (leftPecRef.current) {
      leftPecRef.current.rotation.y = 0.35 + Math.sin(t * 5.8) * 0.42;
      leftPecRef.current.rotation.z = Math.cos(t * 5.8) * 0.14;
    }
    if (rightPecRef.current) {
      rightPecRef.current.rotation.y = -0.35 - Math.sin(t * 5.8) * 0.42;
      rightPecRef.current.rotation.z = -Math.cos(t * 5.8) * 0.14;
    }

    // 7. Pelvic Saber Fins Sway
    if (leftPelvicRef.current && rightPelvicRef.current) {
      const sway = Math.sin(t * 2.4) * 0.12;
      leftPelvicRef.current.rotation.z = -0.18 + sway - f * 0.12;
      rightPelvicRef.current.rotation.z = -0.18 - sway - f * 0.12;
    }
  });

  return (
    <group ref={rootRef} position={[-0.25, 0, 0]}>
      {/* =====================================================================
          1. SCULPTED BLACK BODY WITH SILVER-CYAN DORSAL SCALES
         ===================================================================== */}
      <mesh geometry={body.geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          map={textures.colorMap}
          normalMap={textures.normalMap}
          normalScale={new THREE.Vector2(1.1, 1.1)}
          roughnessMap={textures.roughnessMap}
          roughness={0.32}
          metalness={0.44}
          clearcoat={0.96}
          clearcoatRoughness={0.07}
          iridescence={0.82}
          iridescenceIOR={1.42}
          sheen={0.75}
          sheenColor={new THREE.Color('#3b82f6')}
        />
      </mesh>

      {/* =====================================================================
          2. EXPRESSIVE SCULPTED HEAD, LIPS, NOSTRILS & REALISTIC EYES
         ===================================================================== */}
      <group ref={headOffsetRef}>
        {/* Upper Lip / Premaxilla */}
        <mesh position={[-2.132, 0.004, 0]} rotation={[0, 0, 0.36]} scale={[0.084, 0.048, 0.132]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshPhysicalMaterial color="#0b0f14" roughness={0.25} clearcoat={0.9} />
        </mesh>

        {/* Upturned Lower Lip / Mandible */}
        <mesh position={[-2.15, -0.05, 0]} rotation={[0, 0, -0.27]} scale={[0.096, 0.054, 0.142]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshPhysicalMaterial color="#0d1218" roughness={0.25} clearcoat={0.9} />
        </mesh>

        {/* Oral Mouth Cleft */}
        <mesh position={[-2.192, -0.022, 0]} rotation={[0, 0, 0.12]} scale={[0.034, 0.015, 0.112]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#010203" />
        </mesh>

        {/* Olfactory Nostrils */}
        <mesh position={[-1.92, 0.14, 0.13]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#020305" />
        </mesh>
        <mesh position={[-1.92, 0.14, -0.13]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#020305" />
        </mesh>

        {/* Deep-Set Glossy Eyes (Left & Right) */}
        {[1, -1].map((side) => (
          <group key={`eye-${side}`} position={[-1.68, 0.13, side * 0.24]}>
            {/* Sculpted dark orbital brow ring */}
            <mesh position={[0, 0, -side * 0.01]} rotation={[0, side > 0 ? 0.2 : -0.2, 0]}>
              <torusGeometry args={[0.135, 0.032, 12, 24]} />
              <meshPhysicalMaterial color="#0a0e13" roughness={0.35} clearcoat={0.8} />
            </mesh>
            {/* Dark metallic iris disc */}
            <mesh position={[0, 0, side * 0.015]} rotation={[0, side > 0 ? 0.2 : -0.2, 0]}>
              <circleGeometry args={[0.12, 24]} />
              <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.2} side={THREE.DoubleSide} />
            </mesh>
            {/* Jet-black deep pupil */}
            <mesh position={[0, 0, side * 0.022]} scale={[0.075, 0.075, 0.03]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial color="#000000" />
            </mesh>
            {/* Refractive crystal corneal dome */}
            <mesh position={[0, 0, side * 0.02]} scale={[0.13, 0.13, 0.08]}>
              <sphereGeometry args={[1, 20, 20]} />
              <meshPhysicalMaterial
                color="#ffffff"
                transmission={0.94}
                transparent
                opacity={1}
                roughness={0.03}
                clearcoat={1.0}
                ior={1.45}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* =====================================================================
          3. ARTICULATED OPERCULAR GILLS & PLEATED BLACK BEARD
         ===================================================================== */}
      {/* Left Opercular Gill Cover */}
      <group ref={leftOperculumRef} position={[-1.42, -0.02, 0.25]}>
        <mesh geometry={operculumGeom} rotation={[0, -0.2, 0]} castShadow>
          <meshPhysicalMaterial
            color="#050811"
            roughness={0.22}
            metalness={0.52}
            clearcoat={0.95}
            iridescence={0.6}
            sheen={0.55}
            sheenColor={new THREE.Color('#2563eb')}
          />
        </mesh>
        {/* Subtle inner crimson gill glow revealed during flare */}
        <mesh position={[0.18, -0.08, -0.02]} scale={[0.18, 0.28, 0.04]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#6b0a14" emissive="#45050a" roughness={0.4} />
        </mesh>
      </group>

      {/* Right Opercular Gill Cover */}
      <group ref={rightOperculumRef} position={[-1.42, -0.02, -0.25]}>
        <mesh geometry={operculumGeom} rotation={[0, 0.2, 0]} scale={[1, 1, -1]} castShadow>
          <meshPhysicalMaterial
            color="#050811"
            roughness={0.22}
            metalness={0.52}
            clearcoat={0.95}
            iridescence={0.6}
            sheen={0.55}
            sheenColor={new THREE.Color('#2563eb')}
          />
        </mesh>
        <mesh position={[0.18, -0.08, 0.02]} scale={[0.18, 0.28, 0.04]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#6b0a14" emissive="#45050a" roughness={0.4} />
        </mesh>
      </group>

      {/* Expanding Pleated Black Branchiostegal Beard Membrane */}
      <group ref={beardGroupRef} position={[-1.46, -0.25, 0]}>
        <mesh geometry={beardGeom} castShadow>
          <meshPhysicalMaterial
            vertexColors
            roughness={0.35}
            metalness={0.2}
            clearcoat={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* =====================================================================
          4. BRIGHT CRIMSON RED CROWNTAIL FINS
         ===================================================================== */}
      {/* Dorsal Fin */}
      <group>
        <mesh geometry={dorsal.raysGeom} castShadow>
          <meshPhysicalMaterial
            vertexColors
            emissive="#b91c1c"
            emissiveIntensity={0.45}
            roughness={0.24}
            metalness={0.14}
            clearcoat={0.9}
            sheen={0.85}
            sheenColor={new THREE.Color('#ff4d4d')}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh geometry={dorsal.webGeom}>
          <meshPhysicalMaterial
            vertexColors
            emissive="#7f1d1d"
            emissiveIntensity={0.25}
            roughness={0.18}
            transparent
            opacity={0.78}
            transmission={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Anal Fin */}
      <group>
        <mesh geometry={anal.raysGeom} castShadow>
          <meshPhysicalMaterial
            vertexColors
            emissive="#b91c1c"
            emissiveIntensity={0.45}
            roughness={0.24}
            metalness={0.14}
            clearcoat={0.9}
            sheen={0.85}
            sheenColor={new THREE.Color('#ff4d4d')}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh geometry={anal.webGeom}>
          <meshPhysicalMaterial
            vertexColors
            emissive="#7f1d1d"
            emissiveIntensity={0.25}
            roughness={0.18}
            transparent
            opacity={0.78}
            transmission={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Caudal Crowntail 200° Ray Halo */}
      <group ref={caudalGroupRef} position={[1.28, 0, 0]}>
        <mesh geometry={caudal.raysGeom} castShadow>
          <meshPhysicalMaterial
            vertexColors
            emissive="#dc2626"
            emissiveIntensity={0.48}
            roughness={0.22}
            metalness={0.14}
            clearcoat={0.9}
            sheen={0.9}
            sheenColor={new THREE.Color('#ff4444')}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh geometry={caudal.webGeom}>
          <meshPhysicalMaterial
            vertexColors
            emissive="#7f1d1d"
            emissiveIntensity={0.28}
            roughness={0.18}
            transparent
            opacity={0.76}
            transmission={0.28}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Paired Pelvic Saber Fins (Bright Crimson Red) */}
      <group ref={leftPelvicRef} position={[-1.08, -0.48, 0.1]} rotation={[0.14, 0, -0.18]}>
        <mesh position={[0.12, -0.52, 0]} rotation={[0, 0, 0.22]}>
          <coneGeometry args={[0.065, 1.1, 8]} />
          <meshPhysicalMaterial color="#ef4444" emissive="#991b1b" emissiveIntensity={0.4} roughness={0.25} clearcoat={0.8} />
        </mesh>
        <mesh position={[0.24, -1.04, 0]} rotation={[0, 0, 0.28]}>
          <coneGeometry args={[0.022, 0.25, 6]} />
          <meshStandardMaterial color="#ff3b3b" emissive="#dc2626" emissiveIntensity={0.45} roughness={0.2} />
        </mesh>
      </group>

      <group ref={rightPelvicRef} position={[-1.08, -0.48, -0.1]} rotation={[-0.14, 0, -0.18]}>
        <mesh position={[0.12, -0.52, 0]} rotation={[0, 0, 0.22]}>
          <coneGeometry args={[0.065, 1.1, 8]} />
          <meshPhysicalMaterial color="#ef4444" emissive="#991b1b" emissiveIntensity={0.4} roughness={0.25} clearcoat={0.8} />
        </mesh>
        <mesh position={[0.24, -1.04, 0]} rotation={[0, 0, 0.28]}>
          <coneGeometry args={[0.022, 0.25, 6]} />
          <meshStandardMaterial color="#ff3b3b" emissive="#dc2626" emissiveIntensity={0.45} roughness={0.2} />
        </mesh>
      </group>

      {/* Paired Semi-Translucent Smoky Pectoral Fins */}
      <group ref={leftPecRef} position={[-1.12, -0.16, 0.34]}>
        <mesh rotation={[0.1, 0.55, 0.15]} position={[0.28, -0.02, 0]}>
          <circleGeometry args={[0.34, 16, -0.65, 1.3]} />
          <meshPhysicalMaterial
            color="#334155"
            transparent
            opacity={0.45}
            roughness={0.12}
            transmission={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      <group ref={rightPecRef} position={[-1.12, -0.16, -0.34]}>
        <mesh rotation={[-0.1, -0.55, 0.15]} position={[0.28, -0.02, 0]}>
          <circleGeometry args={[0.34, 16, -0.65, 1.3]} />
          <meshPhysicalMaterial
            color="#334155"
            transparent
            opacity={0.45}
            roughness={0.12}
            transmission={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 8. SMOOTH DAMPED CAMERA CONTROLLER (Stops fighting OrbitControls on arrival)
// ============================================================================
function SmoothCameraRig({
  preset,
  controlsRef,
}: {
  preset: CameraPreset;
  controlsRef: React.RefObject<any>;
}) {
  const { camera } = useThree();
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    isTransitioningRef.current = true;
    if (preset === 'mirror') _camTargetPos.set(-3.1, 0.32, 2.95);
    else if (preset === 'lateral') _camTargetPos.set(0.15, 0.1, 4.9);
    else if (preset === 'front') _camTargetPos.set(-4.3, 0.25, 0.45);
    else if (preset === 'top') _camTargetPos.set(-0.2, 4.7, 0.5);
  }, [preset]);

  useEffect(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;
    const onStart = () => {
      isTransitioningRef.current = false;
    };
    ctrl.addEventListener('start', onStart);
    return () => ctrl.removeEventListener('start', onStart);
  }, [controlsRef]);

  useFrame((_, delta) => {
    if (!isTransitioningRef.current) return;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, _camTargetPos.x, 5.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, _camTargetPos.y, 5.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, _camTargetPos.z, 5.5, delta);
    camera.lookAt(_camLookAt);
    if (controlsRef.current) {
      controlsRef.current.target.copy(_camLookAt);
      controlsRef.current.update();
    }
    if (camera.position.distanceTo(_camTargetPos) < 0.02) {
      isTransitioningRef.current = false;
    }
  });

  return null;
}

// ============================================================================
// 9. SUBTLE FLOATING UNDERWATER PARTICULATES
// ============================================================================
function UnderwaterParticulates() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = 28;

  const seeds = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: Math.sin(i * 4.3) * 4.2,
      y: Math.cos(i * 2.9) * 2.4,
      z: Math.sin(i * 1.7) * 3.0,
      speed: 0.12 + (i % 5) * 0.04,
      scale: 0.01 + (i % 4) * 0.004,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      const y = ((s.y + t * s.speed + 2.5) % 5.0) - 2.5;
      const x = s.x + Math.sin(t * 0.5 + i) * 0.12;
      dummy.position.set(x, y, s.z);
      dummy.scale.setScalar(s.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#7dd3fc" transparent opacity={0.28} />
    </instancedMesh>
  );
}

// ============================================================================
// 10. MAIN EXPORTED BettaFish3D COMPONENT (Hyper-Realistic Mirror Specimen)
// ============================================================================
export function BettaFish3D({
  flaring = false,
  isFlaring = false,
  lightingMode = 'midnight',
}: BettaFish3DProps) {
  const activeFlaring = flaring || isFlaring;
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('mirror');
  const controlsRef = useRef<any>(null);

  return (
    <div className="relative w-full h-full min-h-[440px] select-none bg-[#030508] rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [-3.1, 0.32, 2.95], fov: 36 }}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <color attach="background" args={[lightingMode === 'sunlight' ? '#040a12' : '#020407']} />
        <fog attach="fog" args={[lightingMode === 'sunlight' ? '#040a12' : '#020407', 6, 14]} />

        <UnderwaterEnvironment lightingMode={lightingMode} />

        {/* 3-Point Studio Rim & Key Lighting Rig */}
        <hemisphereLight
          args={[lightingMode === 'sunlight' ? '#bae6fd' : '#38bdf8', '#020408', 0.55]}
        />
        <directionalLight
          position={[-3.5, 4.5, 3.8]}
          intensity={lightingMode === 'sunlight' ? 2.6 : 2.1}
          color={lightingMode === 'sunlight' ? '#fff7ed' : '#e0f2fe'}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0005}
        />
        {/* Crisp top-back rim light to ignite the silver-cyan dorsal scales & crimson rays */}
        <spotLight
          position={[2.2, 3.2, -3.4]}
          intensity={3.4}
          angle={0.7}
          penumbra={0.6}
          color="#3b82f6"
        />
        <pointLight position={[2.4, -0.4, 2.4]} intensity={2.4} color="#ff2e2e" />

        <Suspense fallback={null}>
          <RedBlackCrowntailBetta flaring={activeFlaring} />
          <UnderwaterParticulates />
          <ContactShadows
            position={[0, -1.75, 0]}
            opacity={0.4}
            scale={6.5}
            blur={2.0}
            far={3.5}
            color="#000000"
          />
        </Suspense>

        <SmoothCameraRig preset={cameraPreset} controlsRef={controlsRef} />

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom
          enableRotate
          enableDamping
          dampingFactor={0.06}
          minDistance={2.2}
          maxDistance={7.8}
          rotateSpeed={0.85}
        />
      </Canvas>

      {/* Clean Compact Camera Angle Dock (Non-blocking, no backdrop-filter over WebGL) */}
      <div className="absolute top-14 left-4 z-10 flex flex-wrap items-center gap-1.5 bg-[#060a10]/90 px-2.5 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono text-[#a09a8f]">
        <button
          onClick={() => setCameraPreset('mirror')}
          className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
            cameraPreset === 'mirror'
              ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40'
              : 'hover:text-white'
          }`}
        >
          Mirror 3/4
        </button>
        <button
          onClick={() => setCameraPreset('lateral')}
          className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
            cameraPreset === 'lateral'
              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
              : 'hover:text-white'
          }`}
        >
          Lateral
        </button>
        <button
          onClick={() => setCameraPreset('front')}
          className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
            cameraPreset === 'front'
              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
              : 'hover:text-white'
          }`}
        >
          Gill Flare
        </button>
        <button
          onClick={() => setCameraPreset('top')}
          className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
            cameraPreset === 'top'
              ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
              : 'hover:text-white'
          }`}
        >
          Dorsal
        </button>
        <button
          onClick={() => setCameraPreset('mirror')}
          title="Reset camera"
          className="p-1 rounded hover:text-white cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Static Status Pill */}
      {activeFlaring && (
        <div className="absolute bottom-14 right-4 z-10 bg-[#2a070c]/90 text-rose-200 px-3 py-1 rounded-lg border border-rose-500/40 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 pointer-events-none">
          <Flame className="w-3.5 h-3.5 text-rose-400" />
          <span>Full Crowntail Mirror Flare</span>
        </div>
      )}
    </div>
  );
}

export default BettaFish3D;
