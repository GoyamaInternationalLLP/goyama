import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./Loader";

const Marble = ({ isMobile }: { isMobile: boolean }) => {
  const marble = useGLTF("/marble/marble_slab.gltf");

  return (
    <mesh>
      <hemisphereLight
        intensity={2}
        groundColor="#ffffff"
      />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={100}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={10} />
      <primitive
        object={marble.scene}
        // scale={isMobile ? 0.4 : 0.6} // Adjust scale as needed
        // position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const MarbleCanvas = () => {
  const [isMobile, setisMobile] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setisMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: any) => {
      setisMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{
        position: [5, 14, 5],
        fov: 20,
        near: 0.1,
        far: 10000,
      }}
      gl={{ preserveDrawingBuffer: true }}
      className={isGrabbing ? "cursor-grabbing" : "cursor-grab"}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={true} // ✅ Enable zoom
          enablePan={true} // ✅ Optional: enable panning
          maxPolarAngle={Math.PI} // ✅ Allow full up/down rotation
          minPolarAngle={0}
          rotateSpeed={1} // ✅ Adjust rotation speed
          zoomSpeed={0.8} // ✅ Adjust zoom speed
          enableDamping={true} // ✅ Smooth movement
          dampingFactor={0.05}
          onStart={() => setIsGrabbing(true)}
          onEnd={() => setIsGrabbing(false)}
        />
        <Marble isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default MarbleCanvas;
