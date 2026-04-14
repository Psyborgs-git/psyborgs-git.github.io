import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070710, 0.032);

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 120);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x070710);
    el.appendChild(renderer.domElement);

    // Particles
    const N = 1800;
    const pos0 = new Float32Array(N * 3);
    const posA = new Float32Array(N * 3);

    for (let i = 0; i < N; i++) {
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      const r = 5 + Math.random() * 13;

      pos0[i * 3] = posA[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos0[i * 3 + 1] = posA[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos0[i * 3 + 2] = posA[i * 3 + 2] = r * Math.cos(ph);
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos0, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.055,
      color: 0xc4c4dc,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    // Core geometry
    const cGeo = new THREE.IcosahedronGeometry(2, 4);
    const cMat = new THREE.MeshPhongMaterial({
      color: 0x0d0d1a,
      emissive: 0x08080f,
      shininess: 120,
    });
    const core = new THREE.Mesh(cGeo, cMat);
    scene.add(core);

    const wMat = new THREE.MeshBasicMaterial({
      color: 0x1a1a2e,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wire = new THREE.Mesh(cGeo.clone(), wMat);
    scene.add(wire);

    // Lights
    scene.add(new THREE.AmbientLight(0x070710, 3));
    const L1 = new THREE.PointLight(0x5fddbc, 5, 35);
    L1.position.set(6, 5, 8);
    scene.add(L1);

    const L2 = new THREE.PointLight(0x9b7ffa, 3, 22);
    L2.position.set(-5, -4, 5);
    scene.add(L2);

    const onMM = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / innerHeight) * 2 + 1;
    };

    const onRS = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("mousemove", onMM);
    window.addEventListener("resize", onRS);

    const PA = pGeo.attributes.position.array as Float32Array;
    const CA = cGeo.attributes.position;
    const origCA = Float32Array.from(CA.array);
    let t = 0;
    let raf: number;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.004;

      // Particle orbital + repulsion
      for (let i = 0; i < N; i++) {
        const ix = i * 3;
        const iy = ix + 1;
        const iz = ix + 2;

        PA[ix] += (posA[ix] - PA[ix]) * 0.0015;
        PA[iy] += (posA[iy] - PA[iy]) * 0.0015;

        const an = Math.atan2(PA[iy], PA[ix]);
        const rr = Math.sqrt(PA[ix] ** 2 + PA[iy] ** 2);
        const sp = 0.00025 / (1 + Math.abs(PA[iz]) * 0.1);

        PA[ix] = rr * Math.cos(an + sp);
        PA[iy] = rr * Math.sin(an + sp);

        const mx = mouse.current.x * 9;
        const my = mouse.current.y * 9;
        const dx = PA[ix] - mx;
        const dy = PA[iy] - my;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < 3.5) {
          const f = ((3.5 - d) / 3.5) * 0.1;
          PA[ix] += (dx / d) * f;
          PA[iy] += (dy / d) * f;
        }
      }

      pGeo.attributes.position.needsUpdate = true;

      // Core morph
      for (let i = 0; i < CA.count; i++) {
        const ox = origCA[i * 3];
        const oy = origCA[i * 3 + 1];
        const oz = origCA[i * 3 + 2];
        const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const n = 1 + 0.07 * Math.sin(t * 1.4 + i * 0.45);

        CA.setXYZ(i, (ox / len) * 2 * n, (oy / len) * 2 * n, (oz / len) * 2 * n);
      }

      CA.needsUpdate = true;
      cGeo.computeVertexNormals();

      core.rotation.x = t * 0.18;
      core.rotation.y = t * 0.28;
      wire.rotation.x = t * 0.18;
      wire.rotation.y = t * 0.28;

      L1.position.x = Math.sin(t * 0.45) * 9;
      L1.position.y = Math.cos(t * 0.3) * 7;
      L2.position.x = Math.cos(t * 0.38) * 8;
      L2.position.y = Math.sin(t * 0.55) * 6;

      camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (mouse.current.y * 0.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMM);
      window.removeEventListener("resize", onRS);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />;
}
