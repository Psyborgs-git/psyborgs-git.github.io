import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const aura = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const lag = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) dot.current.style.transform = `translate(${e.clientX - 5}px,${e.clientY - 5}px)`;
      if (aura.current) aura.current.style.transform = `translate(${e.clientX - 110}px,${e.clientY - 110}px)`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let raf: number;

    const loop = () => {
      lag.current.x = lerp(lag.current.x, pos.current.x, 0.1);
      lag.current.y = lerp(lag.current.y, pos.current.y, 0.1);
      if (ring.current) ring.current.style.transform = `translate(${lag.current.x - 14}px,${lag.current.y - 14}px)`;
      raf = requestAnimationFrame(loop);
    };

    loop();

    const big = () => ring.current?.classList.add("big");
    const small = () => ring.current?.classList.remove("big");
    const shrink = () => dot.current?.classList.add("shrink");
    const grow = () => dot.current?.classList.remove("shrink");

    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", shrink);
    document.addEventListener("mouseup", grow);

    document.querySelectorAll("[data-h]").forEach((el) => {
      el.addEventListener("mouseenter", big);
      el.addEventListener("mouseleave", small);
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", shrink);
      document.removeEventListener("mouseup", grow);
    };
  }, []);

  return (
    <>
      <style>{`.cur-aura{position:fixed;top:0;left:0;width:220px;height:220px;pointer-events:none;z-index:9990; background:radial-gradient(circle,rgba(95,221,188,.035) 0%,transparent 65%);border-radius:50%;will-change:transform;} .cur-ring{position:fixed;top:0;left:0;width:28px;height:28px;pointer-events:none;z-index:9992; border:1px solid rgba(95,221,188,.35);border-radius:50%;will-change:transform; transition:width 180ms,height 180ms,margin 180ms,border-color 180ms;} .cur-ring.big{width:44px;height:44px;margin:-8px 0 0 -8px;border-color:var(--signal);} .cur-dot{position:fixed;top:0;left:0;width:10px;height:10px;pointer-events:none;z-index:9993; background:var(--bright);border-radius:50%;mix-blend-mode:difference;will-change:transform; transition:width 80ms,height 80ms;} .cur-dot.shrink{width:5px;height:5px;}`}</style>
      <div ref={aura} className="cur-aura" />
      <div ref={ring} className="cur-ring" />
      <div ref={dot} className="cur-dot" />
    </>
  );
}
