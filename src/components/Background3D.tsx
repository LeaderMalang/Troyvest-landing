import { Canvas } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { useRef } from "react";
import { Mesh, Points } from "three";
import { useFrame } from "@react-three/fiber";

const AnimatedSphere = ({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.15}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const count = 100;
  const meshRef = useRef<Points>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0003;
    }
  });

  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#f59e0b" />
        
        {/* Animated geometric shapes */}
        <AnimatedSphere position={[-8, 2, -5]} color="#8b5cf6" scale={1.5} />
        <AnimatedSphere position={[8, -3, -8]} color="#f59e0b" scale={1.2} />
        <AnimatedSphere position={[0, 5, -10]} color="#06b6d4" scale={1} />
        <AnimatedSphere position={[-5, -4, -7]} color="#8b5cf6" scale={0.8} />
        <AnimatedSphere position={[6, 3, -6]} color="#f59e0b" scale={1.3} />
        
        {/* Particle field */}
        <ParticleField />
        
        {/* Stars background */}
        <Stars
          radius={100}
          depth={50}
          count={3000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Background3D;
