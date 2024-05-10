import {
  ContactShadows,
  Float,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";

function CameraController() {
  const { camera, size } = useThree();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 950) {
        // Si la largeur de la fenêtre est inférieure à 950px (typiquement un appareil mobile)
        camera.position.set(0.2, 0.2, size.width / size.height);
      } else {
        // Si la largeur de la fenêtre est supérieure  (typiquement un appareil de bureau)
        camera.position.set(0, 0, size.width / (4 * size.height));
      }
      camera.updateProjectionMatrix();
    };

    handleResize(); // Appeler la fonction une fois pour définir la position initiale

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [camera, size]);

  return null;
}

function App() {
  const Mac = useGLTF("/MacBook.glb");

  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [0, 0, 0.4],
      }}>
      <CameraController />
      <OrbitControls />

      <directionalLight position={[2, 2, 2]} intensity={0.5} color={"blue"} />
      <directionalLight position={[2.2, 2, 3]} intensity={0.5} color={"blue"} />

      <directionalLight
        position={[3, -1.5, 1]}
        intensity={0.2}
        color={"blue"}
      />

      <directionalLight
        position={[0, 2, 2]}
        intensity={1.5}
        color={"#f9fafb"}
      />
      <ambientLight intensity={0.5} />

      <Float rotationIntensity={0.4} floatIntensity={0.2}>
        <primitive
          object={Mac.scene}
          rotation={[0.1, 0.5, 0]}
          position={[0.03, -0.065, 0]}>
          <Html
            transform
            wrapperClass="htmlScreen"
            distanceFactor={0.118}
            position={[0, 0.101, -0.147]}
            rotation-x={-0.35}>
            <iframe src="https://cv-gabs.vercel.app/" />
          </Html>
        </primitive>
      </Float>
      <ContactShadows
        position-y={-0.17}
        blur={5}
        far={20}
        color={"blue"}
        opacity={0.7}
        scale={2}
      />
    </Canvas>
  );
}

export default App;
