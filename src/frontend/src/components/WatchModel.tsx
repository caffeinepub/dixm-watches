import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface WatchModelProps {
  scale?: number;
  autoRotate?: boolean;
  showTime?: boolean;
}

export function WatchModel({
  scale = 1,
  autoRotate = false,
  showTime = true,
}: WatchModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const hourHandRef = useRef<THREE.Mesh>(null);
  const minuteHandRef = useRef<THREE.Mesh>(null);
  const secondHandRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xc9a84c),
        metalness: 0.9,
        roughness: 0.15,
        envMapIntensity: 1.2,
      }),
    [],
  );

  const darkGoldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x3a2a0a),
        metalness: 0.8,
        roughness: 0.3,
      }),
    [],
  );

  const faceMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x050508),
        metalness: 0.2,
        roughness: 0.8,
      }),
    [],
  );

  const crystalMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xffffff),
        metalness: 0,
        roughness: 0,
        transmission: 0.9,
        transparent: true,
        opacity: 0.15,
        ior: 1.5,
      }),
    [],
  );

  const handMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xf0d060),
        metalness: 0.95,
        roughness: 0.05,
      }),
    [],
  );

  const secondHandMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xff4444),
        metalness: 0.8,
        roughness: 0.2,
      }),
    [],
  );

  // Hour markers positions
  const hourMarkers = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = (i * Math.PI * 2) / 12 - Math.PI / 2;
      const r = 0.78;
      return {
        id: `hm-${i}`,
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        isMain: i % 3 === 0,
      };
    });
  }, []);

  useFrame(() => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }

    if (showTime) {
      const now = new Date();
      const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
      const minutes = now.getMinutes() + seconds / 60;
      const hours = (now.getHours() % 12) + minutes / 60;

      if (secondHandRef.current) {
        secondHandRef.current.rotation.z = -(seconds / 60) * Math.PI * 2;
      }
      if (minuteHandRef.current) {
        minuteHandRef.current.rotation.z = -(minutes / 60) * Math.PI * 2;
      }
      if (hourHandRef.current) {
        hourHandRef.current.rotation.z = -(hours / 12) * Math.PI * 2;
      }
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* Outer bezel ring */}
      <mesh ref={outerRingRef} material={goldMaterial}>
        <torusGeometry args={[1.08, 0.06, 16, 64]} />
      </mesh>

      {/* Inner bezel */}
      <mesh material={goldMaterial}>
        <torusGeometry args={[1.0, 0.04, 16, 64]} />
      </mesh>

      {/* Watch case body */}
      <mesh material={goldMaterial} position={[0, 0, -0.05]}>
        <cylinderGeometry args={[1.02, 1.02, 0.12, 64]} />
      </mesh>

      {/* Watch face background */}
      <mesh material={faceMaterial} position={[0, 0, 0.02]}>
        <cylinderGeometry args={[0.96, 0.96, 0.04, 64]} />
      </mesh>

      {/* Crystal glass overlay */}
      <mesh material={crystalMaterial} position={[0, 0, 0.06]}>
        <cylinderGeometry args={[0.96, 0.96, 0.015, 64]} />
      </mesh>

      {/* Hour markers */}
      {hourMarkers.map((marker) => (
        <mesh
          key={marker.id}
          position={[marker.x, marker.y, 0.05]}
          material={goldMaterial}
        >
          <boxGeometry
            args={marker.isMain ? [0.06, 0.14, 0.02] : [0.04, 0.09, 0.02]}
          />
        </mesh>
      ))}

      {/* Hour hand */}
      <group ref={hourHandRef} position={[0, 0, 0.07]}>
        <mesh position={[0, 0.22, 0]} material={handMaterial}>
          <boxGeometry args={[0.06, 0.44, 0.025]} />
        </mesh>
        <mesh position={[0, -0.08, 0]} material={darkGoldMaterial}>
          <boxGeometry args={[0.06, 0.16, 0.025]} />
        </mesh>
      </group>

      {/* Minute hand */}
      <group ref={minuteHandRef} position={[0, 0, 0.085]}>
        <mesh position={[0, 0.32, 0]} material={handMaterial}>
          <boxGeometry args={[0.04, 0.64, 0.02]} />
        </mesh>
        <mesh position={[0, -0.08, 0]} material={darkGoldMaterial}>
          <boxGeometry args={[0.04, 0.16, 0.02]} />
        </mesh>
      </group>

      {/* Second hand */}
      <group ref={secondHandRef} position={[0, 0, 0.1]}>
        <mesh position={[0, 0.35, 0]} material={secondHandMaterial}>
          <boxGeometry args={[0.018, 0.7, 0.015]} />
        </mesh>
        <mesh position={[0, -0.12, 0]} material={secondHandMaterial}>
          <boxGeometry args={[0.018, 0.24, 0.015]} />
        </mesh>
      </group>

      {/* Center cap */}
      <mesh position={[0, 0, 0.11]} material={goldMaterial}>
        <cylinderGeometry args={[0.07, 0.07, 0.04, 32]} />
      </mesh>

      {/* Crown (winding stem) */}
      <mesh
        position={[1.1, 0.15, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={goldMaterial}
      >
        <cylinderGeometry args={[0.06, 0.05, 0.22, 16]} />
      </mesh>

      {/* Crown cap */}
      <mesh
        position={[1.22, 0.15, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={goldMaterial}
      >
        <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
      </mesh>

      {/* Lugs - top */}
      <mesh position={[0.35, 1.05, -0.04]} material={goldMaterial}>
        <boxGeometry args={[0.2, 0.15, 0.08]} />
      </mesh>
      <mesh position={[-0.35, 1.05, -0.04]} material={goldMaterial}>
        <boxGeometry args={[0.2, 0.15, 0.08]} />
      </mesh>
      {/* Lugs - bottom */}
      <mesh position={[0.35, -1.05, -0.04]} material={goldMaterial}>
        <boxGeometry args={[0.2, 0.15, 0.08]} />
      </mesh>
      <mesh position={[-0.35, -1.05, -0.04]} material={goldMaterial}>
        <boxGeometry args={[0.2, 0.15, 0.08]} />
      </mesh>

      {/* Subdial circle */}
      <mesh position={[0, -0.42, 0.04]} material={goldMaterial}>
        <torusGeometry args={[0.16, 0.015, 8, 32]} />
      </mesh>
    </group>
  );
}
