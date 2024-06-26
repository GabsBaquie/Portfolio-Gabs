import {
  ContactShadows,
  Float,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { isIPhone13, isMobile } from "react-device-detect";

function CameraController() {
  const { camera, size } = useThree();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        // Si la largeur de la fenêtre est inférieure à 950px (typiquement un appareil mobile)
        camera.position.set(-0.05, -0.03, size.width / (1.02 * size.height));
      } else if (window.innerWidth < 850) {
        // Si la largeur de la fenêtre est inférieure à 950px (typiquement un appareil mobile)
        camera.position.set(0, -0.03, size.width / (1.2 * size.height));
      } else {
        // Si la largeur de la fenêtre est supérieure  (typiquement un appareil de bureau)
        camera.position.set(0, 0, size.width / (4 * size.height));
      }
      camera.updateProjectionMatrix();
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [camera, size]);

  return null;
}

function App() {
  const Mac = useGLTF("/MacBook.glb");

  // Mobile responsive

  useEffect(() => {
    if (isMobile) {
      window.location.href = "https://cv-gabs.vercel.app/";
    }
  }, []);

  return (
    <Canvas
      camera={{
        fov: 38,
        near: 0.1,
        far: 2500,
        position: [0, 0, 0],
      }}>
      <CameraController />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
      <directionalLight position={[2, 2, 2]} intensity={0.5} color={"blue"} />
      <directionalLight position={[2.2, 2, 3]} intensity={0.5} color={"blue"} />
      <directionalLight
        position={[4, -1.5, 1]}
        intensity={0.2}
        color={"blue"}
      />
      <directionalLight
        position={[0, 2, 2]}
        intensity={1.5}
        color={"#f9fafb"}
      />
      <ambientLight intensity={0.5} />
      <Float rotationIntensity={0.4} floatIntensity={0.1}>
        <primitive
          object={Mac.scene}
          rotation={isIPhone13 ? [0.04, 0.45, 0] : [0.2, 0.35, 0]}
          position={isIPhone13 ? [0.08, -0.09, 0] : [0.04, -0.09, 0]}>
          <Html
            transform
            wrapperClass="htmlScreen"
            distanceFactor={0.118}
            position={isIPhone13 ? [-0.004, 0.27, -0.147] : [0, 0.101, -0.147]}
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
