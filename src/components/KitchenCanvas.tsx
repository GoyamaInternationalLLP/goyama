import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import CanvasLoader from "./Loader";

const Kitchen = ({ isMobile }: { isMobile: boolean }) => {
  const kitchen = useGLTF("/kitchen/kitchen_countertop.gltf");

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
        object={kitchen.scene}
        // scale={isMobile ? 0.4 : 0.6} // Adjust scale as needed
        // position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const KitchenCanvas = () => {
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
        position: [15, 10, 10],
        fov: 11,
        near: 0.1,
        far: 10000,
        zoom: 1.6,
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
        <Kitchen isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default KitchenCanvas;
