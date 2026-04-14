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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
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
      color: 0x1f345f,
      emissive: 0x274aa0,
      emissiveIntensity: 0.68,
      specular: 0xbaf7ff,
      shininess: 240,
      flatShading: true,
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

    const glowGeo = new THREE.IcosahedronGeometry(1.35, 2);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x4bd4ff,
      transparent: true,
      opacity: 0.34,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    const centerOrbGeo = new THREE.SphereGeometry(0.22, 24, 24);
    const centerOrbMat = new THREE.MeshBasicMaterial({
      color: 0xe9d6c1,
      transparent: true,
      opacity: 0.96,
      depthTest: false,
      depthWrite: false,
    });
    const centerOrb = new THREE.Mesh(centerOrbGeo, centerOrbMat);
    centerOrb.position.set(0.56, -0.04, 1.22);
    centerOrb.renderOrder = 8;
    scene.add(centerOrb);

    const haloRingGeo = new THREE.TorusGeometry(0.62, 0.018, 12, 64);
    const haloRingMat = new THREE.MeshBasicMaterial({
      color: 0x63d2c5,
      transparent: true,
      opacity: 0.52,
      depthTest: false,
      depthWrite: false,
    });
    const haloRing = new THREE.Mesh(haloRingGeo, haloRingMat);
    haloRing.rotation.x = Math.PI / 2;
    haloRing.position.copy(centerOrb.position);
    haloRing.renderOrder = 9;
    scene.add(haloRing);

    const shimmerCanvas = document.createElement("canvas");
    shimmerCanvas.width = 256;
    shimmerCanvas.height = 256;
    const shimmerCtx = shimmerCanvas.getContext("2d");
    if (shimmerCtx) {
      const gradient = shimmerCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.18, "rgba(240,250,255,0.98)");
      gradient.addColorStop(0.38, "rgba(95,221,188,0.46)");
      gradient.addColorStop(1, "rgba(95,221,188,0)");
      shimmerCtx.fillStyle = gradient;
      shimmerCtx.fillRect(0, 0, 256, 256);
    }
    const shimmerTexture = new THREE.CanvasTexture(shimmerCanvas);
    shimmerTexture.needsUpdate = true;
    const shimmerMat = new THREE.SpriteMaterial({
      map: shimmerTexture,
      color: 0xeefcff,
      transparent: true,
      opacity: 0.82,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const shimmer = new THREE.Sprite(shimmerMat);
    shimmer.position.set(0.58, 0.14, 1.38);
    shimmer.scale.set(4.6, 4.6, 1);
    shimmer.renderOrder = 10;
    scene.add(shimmer);

    // Lights
    scene.add(new THREE.AmbientLight(0x070710, 2.4));
    scene.add(new THREE.HemisphereLight(0x8ab2ff, 0x070710, 1.9));

    const keyDir = new THREE.DirectionalLight(0xe8fbff, 2.8);
    keyDir.position.set(5, 4, 12);
    keyDir.target.position.set(0.2, 0.05, 0);
    scene.add(keyDir);
    scene.add(keyDir.target);

    const keySpot = new THREE.SpotLight(0xdff7ff, 12, 50, Math.PI / 5, 0.35, 1);
    keySpot.position.set(7, 6, 14);
    keySpot.target.position.set(0.2, 0, 0);
    scene.add(keySpot);
    scene.add(keySpot.target);

    const L0 = new THREE.PointLight(0xc4f3ff, 10, 30);
    L0.position.set(0, 0, 11);
    scene.add(L0);

    const L1 = new THREE.PointLight(0x5fddbc, 7.5, 35);
    L1.position.set(6, 5, 8);
    scene.add(L1);

    const L2 = new THREE.PointLight(0x9b7ffa, 5, 24);
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
    const CA = cGeo.attributes.position as THREE.BufferAttribute;
    const origCA = Float32Array.from(CA.array as ArrayLike<number>);
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
      glow.rotation.x = t * 0.18;
      glow.rotation.y = t * 0.28;
      glow.scale.setScalar(1 + Math.sin(t * 2.2) * 0.04);
      centerOrb.rotation.x = t * 0.28;
      centerOrb.rotation.y = t * 0.4;
      centerOrb.scale.setScalar(1 + Math.sin(t * 3.1) * 0.08);
      haloRing.rotation.z = t * 0.35;
      glowMat.opacity = 0.28 + Math.sin(t * 2.4) * 0.08;
      centerOrbMat.opacity = 0.88 + Math.sin(t * 3.4 + 1.2) * 0.08;
      haloRingMat.opacity = 0.42 + Math.sin(t * 3.8) * 0.12;
      shimmer.position.x = 0.58 + Math.sin(t * 1.9) * 0.08;
      shimmer.position.y = 0.14 + Math.cos(t * 1.5) * 0.05;
      shimmer.scale.setScalar(4.5 + Math.sin(t * 3.7) * 0.24);
      shimmerMat.opacity = 0.72 + Math.sin(t * 4.6) * 0.12;

      L0.position.x = Math.sin(t * 0.6) * 1.2;
      L0.position.y = Math.cos(t * 0.48) * 0.9;
      L0.position.z = 11 + Math.sin(t * 0.8) * 0.6;
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
