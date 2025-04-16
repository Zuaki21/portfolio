import { useEffect, useRef } from "react";
import * as THREE from "three";

interface CustomMesh extends THREE.Mesh {
  velocity: THREE.Vector3;
  opacityDelta: number;
  fadingOut: boolean;
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // 背景グラデーション（赤 + 青）
    const backgroundCanvas = document.createElement("canvas");
    backgroundCanvas.width = 2;
    backgroundCanvas.height = 2;
    const ctx = backgroundCanvas.getContext("2d")!;
    const gradient = ctx.createLinearGradient(0, 0, 2, 2);
    gradient.addColorStop(0, "#ff99aa"); // 赤寄り
    gradient.addColorStop(1, "#99bbff"); // 青寄り
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2, 2);
    const texture = new THREE.CanvasTexture(backgroundCanvas);
    scene.background = texture;

    // ライト
    const light1 = new THREE.PointLight(0xffcccc, 1, 100);
    light1.position.set(10, 0, 20);
    scene.add(light1);
    const light2 = new THREE.PointLight(0xccccff, 1, 100);
    light2.position.set(-10, 0, 20);
    scene.add(light2);

    const shapes: CustomMesh[] = [];
    const shapeTypes = ["circle", "triangle", "square", "cross"];

    const createShape = (type: string): THREE.Mesh | null => {
      let shape: THREE.Shape;
      switch (type) {
        case "circle":
          shape = new THREE.Shape();
          shape.absarc(0, 0, 0.5, 0, Math.PI * 2);
          break;
        case "triangle":
          shape = new THREE.Shape();
          shape.moveTo(0, 0.6);
          shape.lineTo(-0.5, -0.3);
          shape.lineTo(0.5, -0.3);
          shape.lineTo(0, 0.6);
          break;
        case "square":
          shape = new THREE.Shape();
          shape.moveTo(-0.5, -0.5);
          shape.lineTo(0.5, -0.5);
          shape.lineTo(0.5, 0.5);
          shape.lineTo(-0.5, 0.5);
          shape.lineTo(-0.5, -0.5);
          break;
        case "cross": {
          const cross = new THREE.Shape();
          const w = 0.1,
            l = 0.6;
          cross.moveTo(-l, -w);
          cross.lineTo(-w, -w);
          cross.lineTo(-w, -l);
          cross.lineTo(w, -l);
          cross.lineTo(w, -w);
          cross.lineTo(l, -w);
          cross.lineTo(l, w);
          cross.lineTo(w, w);
          cross.lineTo(w, l);
          cross.lineTo(-w, l);
          cross.lineTo(-w, w);
          cross.lineTo(-l, w);
          cross.lineTo(-l, -w);
          shape = cross;
          break;
        }
        default:
          return null;
      }

      const geometry = new THREE.ShapeGeometry(shape);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      if (type === "cross") mesh.rotation.z = Math.PI / 4;
      return mesh;
    };

    const totalParticles = 100;
    for (let i = 0; i < totalParticles; i++) {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const rawShape = createShape(type);
      if (!rawShape) continue;

      const shape = rawShape as unknown as CustomMesh;

      shape.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 10
      );

      const dir = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      )
        .normalize()
        .multiplyScalar(0.002);

      shape.velocity = dir;
      shape.opacityDelta = Math.random() * 0.003 + 0.001;
      shape.fadingOut = true;

      const mat = shape.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.1 + Math.random() * 0.5;

      scene.add(shape);
      shapes.push(shape);
    }

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      for (const shape of shapes) {
        const mat = shape.material as THREE.MeshBasicMaterial;

        // フェード処理
        if (shape.fadingOut) {
          mat.opacity -= shape.opacityDelta;
          if (mat.opacity <= 0) {
            shape.position.set(
              (Math.random() - 0.5) * 40,
              (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 10
            );
            mat.opacity = 0;
            shape.fadingOut = false;
          }
        } else {
          mat.opacity += shape.opacityDelta;
          if (mat.opacity >= 0.6) {
            mat.opacity = 0.6;
            shape.fadingOut = true;
          }
        }

        shape.position.add(shape.velocity);
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    />
  );
}
