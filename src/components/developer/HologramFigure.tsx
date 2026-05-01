"use client";
import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ─────────── Hologram shader ─────────── */
const hologramVertexShader = /* glsl */ `
  varying vec3 vPosition;
  varying vec3 vNormal;
  void main() {
    vPosition   = position;
    vNormal     = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const hologramFragmentShader = /* glsl */ `
  uniform float time;
  uniform vec3  color;
  varying vec3  vPosition;
  varying vec3  vNormal;

  void main() {
    /* Fresnel rim */
    float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    rim = pow(rim, 2.2);

    /* Scan line sweeping up — very slow and cinematic */
    float yNorm = mod(vPosition.y * 0.28 + time * 0.30, 1.0);
    float scan  = smoothstep(0.0, 0.06, yNorm) * smoothstep(0.12, 0.06, yNorm);

    /* Horizontal grid */
    float grid = step(0.94, mod(vPosition.y * 18.0, 1.0)) * 0.15;

    /* Flicker */
    float flicker = 0.93 + 0.07 * sin(time * 19.0);

    float alpha = clamp((rim * 0.65 + scan * 0.9 + grid) * flicker, 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
  }
`;

/* ─────────── Glow shader ─────────── */
const glowVertexShader = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal     = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const glowFragmentShader = /* glsl */ `
  uniform vec3  color;
  uniform float time;
  varying vec3  vNormal;
  void main() {
    float rim   = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    float pulse = 0.65 + 0.35 * sin(time * 2.2);
    float alpha = pow(rim, 2.0) * 0.45 * pulse;
    gl_FragColor = vec4(color, alpha);
  }
`;

/* ScanRing removed */

/* ─────────── Auto-fit camera to bounding box ─────────── */
function CameraFit({ target }: { target: THREE.Object3D | null }) {
  const { camera } = useThree();
  useEffect(() => {
    if (!target) return;
    const box = new THREE.Box3().setFromObject(target);
    const center = box.getCenter(new THREE.Vector3());
    const size   = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov    = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    const dist   = (maxDim / 2) / Math.tan(fov / 2) * 1.4;
    camera.position.set(center.x, center.y + size.y * 0.1, center.z + dist);
    camera.lookAt(center.x, center.y, center.z);
    camera.updateProjectionMatrix();
  }, [target, camera]);
  return null;
}

/* ─────────── Avatar model ─────────── */
function AvatarModel() {
  const group  = useRef<THREE.Group>(null);
  const loaded = useRef<THREE.Group | null>(null);

  const { scene, animations } = useGLTF("/avatar.glb");
  const { actions, names }    = useAnimations(animations, group);

  /* Play first clip */
  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]]!.reset().fadeIn(0.4).play();
    }
  }, [actions, names]);

  /* Build hologram material */
  const holoMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          time:  { value: 0 },
          color: { value: new THREE.Color(0x4ade80) },
        },
        vertexShader:   hologramVertexShader,
        fragmentShader: hologramFragmentShader,
        transparent:    true,
        side:           THREE.DoubleSide,
        depthWrite:     false,
        blending:       THREE.AdditiveBlending,
      }),
    []
  );

  const glowMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          time:  { value: 0 },
          color: { value: new THREE.Color(0x4ade80) },
        },
        vertexShader:   glowVertexShader,
        fragmentShader: glowFragmentShader,
        transparent:    true,
        side:           THREE.FrontSide,
        depthWrite:     false,
        blending:       THREE.AdditiveBlending,
      }),
    []
  );

  /* Apply to all meshes */
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = holoMat;
        (child as THREE.Mesh).castShadow = false;
      }
    });
    loaded.current = group.current;
  }, [scene, holoMat]);

  /* Tick uniforms */
  useFrame(({ clock }) => {
    holoMat.uniforms.time.value = clock.getElapsedTime();
    glowMat.uniforms.time.value = clock.getElapsedTime();
  });

  /* Measure bounding box to place rings at the right heights */
  const box = useMemo(() => new THREE.Box3().setFromObject(scene), [scene]);
  const center  = box.getCenter(new THREE.Vector3());
  const size    = box.getSize(new THREE.Vector3());
  const bottom  = center.y - size.y / 2;
  const top     = center.y + size.y / 2;
  const mid     = center.y;

  return (
    <>
      <CameraFit target={scene} />
      <group ref={group}>
        <primitive object={scene} />

      </group>
    </>
  );
}

/* ─────────── Exported wrapper ─────────── */
export function HologramFigure() {
  return (
    <div className="relative w-[260px] h-[340px] md:w-[320px] md:h-[420px] flex-shrink-0">
      {/* Background ambient glow */}
      <div className="absolute inset-0 rounded-full bg-green-400/5 blur-3xl pointer-events-none" />

      <Canvas
        camera={{ fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.05} />
        <pointLight position={[2, 4, 2]}   intensity={1.0} color={0x4ade80} />
        <pointLight position={[-2, 1, -2]} intensity={0.5} color={0x4ade80} />

        <React.Suspense fallback={null}>
          <AvatarModel />
        </React.Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2.5}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>

    </div>
  );
}

useGLTF.preload("/avatar.glb");
