import {
  ContactShadows,
  Float,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

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
          position={[0.05, -0.058, 0]}>
          <Html
            transform
            wrapperClass="htmlScreen"
            distanceFactor={0.118}
            position={[0, 0.101, -0.147]}
            rotation-x={-0.35}>
            <iframe src="https://cv-gabs.vercel.app/" />
            {/* https://www.behance.net/embed/project/164549871?ilo0=1 */}
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
