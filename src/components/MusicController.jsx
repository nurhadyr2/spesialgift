import { useEffect, useRef, useState } from "react";
import { MUSIC_SRC, MUSIC_VOLUME, MUSIC_REVERB_MIX } from "../data/content";

export default function MusicController({ active }) {
  const audioElRef = useRef(null);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const graphBuiltRef = useRef(false);
  const graphSourceRef = useRef(null);
  const triggeredRef = useRef(false);

  const [needsTapToPlay, setNeedsTapToPlay] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [volume, setVolume] = useState(MUSIC_VOLUME);


  const buildGraphIfNeeded = () => {
    if (graphBuiltRef.current) return;
    const audioEl = audioElRef.current;
    if (!audioEl) return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      const source = ctx.createMediaElementSource(audioEl);

      const masterGain = ctx.createGain();
      masterGain.gain.value = volume;

      const dryGain = ctx.createGain();
      dryGain.gain.value = 1;

      const delay = ctx.createDelay(1.5);
      delay.delayTime.value = 0.32;

      const feedback = ctx.createGain();
      feedback.gain.value = 0.32;

      const wetGain = ctx.createGain();
      wetGain.gain.value = MUSIC_REVERB_MIX;

      source.connect(dryGain);
      dryGain.connect(masterGain);

      source.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(wetGain);
      wetGain.connect(masterGain);

      masterGain.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = masterGain;
      graphSourceRef.current = source;
      graphBuiltRef.current = true;
    } catch (err) {

      graphBuiltRef.current = "failed";
    }
  };

  const attemptPlay = () => {
    const audioEl = audioElRef.current;
    if (!audioEl) return;

    buildGraphIfNeeded();

    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === "suspended") {

      ctx.resume().catch(() => {});
    }

    audioEl
      .play()
      .then(() => {
        setNeedsTapToPlay(false);
        setShowPanel(true);
      })
      .catch(() => {
        setNeedsTapToPlay(true);
        setShowPanel(false);
      });
  };

  useEffect(() => {
    if (!active || triggeredRef.current) return;
    triggeredRef.current = true;
    attemptPlay();
  }, [active]);


  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = volume;
    } else if (audioElRef.current) {
      audioElRef.current.volume = volume;
    }
  }, [volume]);

  if (!active) return null;

  return (
    <>
      <audio ref={audioElRef} src={MUSIC_SRC} loop preload="auto" />

      {needsTapToPlay && (
        <button
          onClick={attemptPlay}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 10001,
            padding: "0.7rem 1.3rem",
            background: "var(--surface)",
            border: "1px solid var(--gold)",
            color: "var(--gold-soft)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.06em",
            cursor: "pointer",
            borderRadius: "999px",
            boxShadow: "0 10px 30px -8px rgba(0,0,0,0.6)",
          }}
        >
          ♪ putar musik
        </button>
      )}

      {showPanel && (
        <div
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 10001,
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.55rem 0.9rem",
            background: "rgba(18,18,18,0.85)",
            backdropFilter: "blur(8px)",
            border: "1px solid var(--line)",
            borderRadius: "999px",
            boxShadow: "0 10px 30px -8px rgba(0,0,0,0.6)",
          }}
        >
          <span style={{ color: "var(--gold)", fontSize: "0.85rem" }} aria-hidden="true">
            ♪
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="Volume musik"
            style={{
              width: "90px",
              accentColor: "var(--gold)",
              cursor: "pointer",
            }}
          />
        </div>
      )}
    </>
  );
}