import { useEffect, useRef } from "react";

export default function SpotlightCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    let raf;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      // gentle easing so the spotlight trails just slightly behind the cursor
      curX += (mouseX - curX) * 0.15;
      curY += (mouseY - curY) * 0.15;
      el.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="spotlight-cursor" aria-hidden="true" />;
}
