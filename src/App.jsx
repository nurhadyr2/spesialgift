import { useEffect, useState } from "react";
import Lenis from "lenis";
import SpotlightCursor from "./components/SpotlightCursor";
import MusicController from "./components/MusicController";
import Layer1Opening from "./components/Layer1Opening";
import Layer2Prologue from "./components/Layer2Prologue";
import Layer3Gallery from "./components/Layer3Gallery";
import Layer4Timeline from "./components/Layer4Timeline";
import Layer5Reasons from "./components/Layer5Reasons";
import Layer6Vault from "./components/Layer6Vault";
import Layer7Closing from "./components/Layer7Closing";
import { BIRTHDAY_DATE } from "./data/content";

function isTimeUp() {
  return Date.now() >= new Date(BIRTHDAY_DATE).getTime();
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      setProgress(scrollable > 0 ? h.scrollTop / scrollable : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "2px",
        width: `${progress * 100}%`,
        background: "var(--gold)",
        zIndex: 10000,
        transition: "width 0.05s linear",
      }}
    />
  );
}

export default function App() {

  const [unlocked, setUnlocked] = useState(isTimeUp);

  useEffect(() => {
    if (unlocked) return;
    const id = setInterval(() => {
      if (isTimeUp()) setUnlocked(true);
    }, 1000);
    return () => clearInterval(id);
  }, [unlocked]);

  useEffect(() => {
    document.body.style.overflow = unlocked ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [unlocked]);

  useEffect(() => {
    if (!unlocked) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [unlocked]);

  return (
    <>
      <SpotlightCursor />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      {unlocked && <ScrollProgress />}

      <MusicController active={unlocked} />

      <main>
        <Layer1Opening locked={!unlocked} />
        {unlocked && (
          <>
            <Layer2Prologue />
            <Layer3Gallery />
            <Layer4Timeline />
            <Layer5Reasons />
            <Layer6Vault />
            <Layer7Closing />
          </>
        )}
      </main>
    </>
  );
}
