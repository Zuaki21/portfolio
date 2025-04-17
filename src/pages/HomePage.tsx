// @ts-expect-error: OrbitControls has no type declaration
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// @ts-expect-error: SVGLoader has no type declaration
import { SVGLoader, SVGResult } from "three/examples/jsm/loaders/SVGLoader";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import Header from "../components/Header"; // Header コンポーネントをインポート

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(152.41, -120.14, 208.12);
    camera.rotation.set(0.01, 0.06, -0.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;

    // ズームの最小距離と最大距離を設定
    controls.minDistance = 150; // 最小距離（ズームイン制限）
    controls.maxDistance = 500; // 最大距離（ズームアウト制限）

    let prevAzimuth = controls.getAzimuthalAngle();
    let prevPolar = controls.getPolarAngle();

    scene.add(new THREE.AmbientLight(0x8888aa, 1.2));
    const lights = [
      new THREE.DirectionalLight(0xffcccc, 0.8),
      new THREE.DirectionalLight(0xccccff, 0.6),
      new THREE.DirectionalLight(0xffffff, 0.4),
      new THREE.DirectionalLight(0xffffff, 0.4),
      new THREE.PointLight(0xff00ff, 0.5, 300),
      new THREE.PointLight(0xffffff, 0.3),
      new THREE.PointLight(0x88ccff, 0.5, 300),
      new THREE.DirectionalLight(0xffddcc, 0.4),
    ];
    lights[0].position.set(-30, 50, 30);
    lights[1].position.set(50, -30, -30);
    lights[2].position.set(0, 100, 100);
    lights[3].position.set(-100, -100, 50);
    lights[4].position.set(0, 0, 100);
    lights[5].position.set(0, 50, -50);
    lights[6].position.set(100, 100, -100);
    lights[7].position.set(-50, 150, 50);
    lights.forEach((light) => scene.add(light));

    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const positions = [];
    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      positions.push(x, y, z);
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const starTexture = new THREE.TextureLoader().load("/image/star.png");

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 6,
      sizeAttenuation: true,
      map: starTexture,
      alphaTest: 0.1,
      transparent: true,
      depthWrite: false,
    });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    const loader = new SVGLoader();
    loader.load(
      `${import.meta.env.BASE_URL}image/shinri_icon.svg`,
      (data: SVGResult) => {
        const paths = data.paths;
        const group = new THREE.Group();

        for (const path of paths) {
          const material = new THREE.MeshStandardMaterial({
            color: 0x8e7cc3,
            roughness: 1.0,
            metalness: 0.0,
            side: THREE.DoubleSide,
          });

          const shapes = SVGLoader.createShapes(path);
          for (const shape of shapes) {
            const geometry = new THREE.ExtrudeGeometry(shape, {
              depth: 50,
              bevelEnabled: false,
            });
            const mesh = new THREE.Mesh(geometry, material);
            group.add(mesh);
          }

          for (const shape of shapes) {
            const front = new THREE.Mesh(
              new THREE.ShapeGeometry(shape),
              material
            );
            const back = new THREE.Mesh(
              new THREE.ShapeGeometry(shape),
              material
            );
            front.position.z = 0;
            back.position.z = 50;
            group.add(front, back);
          }
        }

        group.scale.set(0.2, -0.2, -0.2);
        const box = new THREE.Box3().setFromObject(group);
        const center = new THREE.Vector3();
        box.getCenter(center);
        group.position.sub(center);
        scene.add(group);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      const currentAzimuth = controls.getAzimuthalAngle();
      const currentPolar = controls.getPolarAngle();
      const deltaAzimuth = Math.abs(currentAzimuth - prevAzimuth);
      const deltaPolar = Math.abs(currentPolar - prevPolar);
      const movement = deltaAzimuth + deltaPolar;

      if (movement < 0.0015) {
        camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.002);
        camera.lookAt(0, 0, 0);
      }

      prevAzimuth = currentAzimuth;
      prevPolar = currentPolar;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Header />
      {/* 背景グラデーションとアニメーション */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(-45deg, #b3aee1 0%, #a1c4fd 15%, #c2e9fb 30%, #c5dd8e 45%, #fbc2eb 60%, #f4978e 75%, #c68cd1 100%)",

          backgroundSize: "600% 600%",
          animation: "gradientBG 15s ease infinite",
          zIndex: -1,
        }}
      />
      <style>
        {`@keyframes gradientBG {
            0% { background-position: 0% 50%; filter: hue-rotate(0deg); }
            25% { background-position: 50% 50%; filter: hue-rotate(90deg); }
            50% { background-position: 100% 50%; filter: hue-rotate(180deg); }
            75% { background-position: 50% 50%; filter: hue-rotate(270deg); }
            100% { background-position: 0% 50%; filter: hue-rotate(360deg); }
        }`}
      </style>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
      {/* タイトルとタイプライター風テキスト */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#ffffff",
          fontSize: "clamp(3rem, 20vw, 8rem)", // 画面幅に応じたサイズに変更
          fontWeight: "bold",
          pointerEvents: "none", // 文字部分のドラッグ判定を無視
          textShadow: "0px 0px 5px rgba(0, 0, 0, 0.4)", // 影を追加
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              margin: "0",
              paddingTop: "10px",
              fontFamily: "Roboto Slab, serif",
              fontSize: "1em", // サイズを調整
              textShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)", // 影を追加
              position: "relative",
            }}
          >
            Zuaki's <br /> Portfolio
            <span
              style={{
                position: "absolute",
                top: 0,
                left: "0",
                right: "0",
                borderTop: "2px solid white",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.)", // 上部線に影
              }}
            />
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              marginTop: "10px",
              animation:
                "typing 3s steps(30) 1s forwards, blink 0.75s step-end infinite",
              paddingBottom: "0px",
              fontFamily: "Roboto Slab, serif",
              textShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)", // 影を追加
            }}
          >
            Welcome to my portfolio!
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: "0",
                right: "0",
                borderBottom: "2px solid white",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)", // 下部線に影
              }}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
