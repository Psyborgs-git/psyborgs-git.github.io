import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ProjectCanvasProps {
  accent: string;
  geoType: "torus-knot" | "torus" | "octahedron";
}

export function ProjectCanvas({ accent, geoType }: ProjectCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 50);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0, 0);
    el.appendChild(renderer.domElement);

    const c = new THREE.Color(accent);

    let geo: THREE.BufferGeometry;
    if (geoType === "torus-knot") {
      geo = new THREE.TorusKnotGeometry(1, 0.38, 120, 18);
    } else if (geoType === "torus") {
      geo = new THREE.TorusGeometry(1.1, 0.45, 18, 36);
    } else {
      geo = new THREE.OctahedronGeometry(1.6, 2);
    }

    const mat = new THREE.MeshPhongMaterial({
      color: 0x0d0d1a,
      emissive: c,
      emissiveIntensity: 0.12,
      shininess: 80,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const wmat = new THREE.MeshBasicMaterial({
      color: c,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    scene.add(new THREE.Mesh(geo, wmat));

    const pl = new THREE.PointLight(c, 4, 20);
    pl.position.set(3, 3, 3);
    scene.add(pl);
    scene.add(new THREE.AmbientLight(0x0d0d1a, 3));

    let t = 0;
    let raf: number;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.007;

      mesh.rotation.x = t * 0.35;
      mesh.rotation.y = t * 0.5;

      renderer.render(scene, camera);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [accent, geoType]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
