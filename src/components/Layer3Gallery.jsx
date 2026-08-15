import { useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { GALLERY } from "../data/content";
import useScrollDirection from "../hooks/useScrollDirection";

const SWIPE_THRESHOLD = 120;
const VISIBLE_DEPTH = 4; // how many cards deep are rendered for the stack-peek effect

function StackCard({ item, depth, isTop, onSwiped }) {
  const x = useMotionValue(0);
  const dragRotate = useTransform(x, [-260, 260], [-18, 18]);
  const dragOpacity = useTransform(x, [-260, -140, 0, 140, 260], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_, info) => {
    const passed = Math.abs(info.offset.x) > SWIPE_THRESHOLD || Math.abs(info.velocity.x) > 500;
    if (!passed) {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 26 });
      return;
    }
    const dir = info.offset.x > 0 ? 1 : -1;
    animate(x, dir * 700, { duration: 0.32, ease: "easeIn" }).then(() => {
      x.set(0);
      onSwiped();
    });
  };

  const isChat = item.type === "chat";
  const restRotate = depth === 0 ? 0 : depth % 2 === 0 ? -3 - depth : 3 + depth;

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragElastic={0.6}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={isTop ? handleDragEnd : undefined}
      style={{
        position: "absolute",
        inset: 0,
        x: isTop ? x : 0,
        rotate: isTop ? dragRotate : restRotate,
        opacity: isTop ? dragOpacity : 1,
        zIndex: VISIBLE_DEPTH - depth,
        cursor: isTop ? "grab" : "default",
        touchAction: "pan-y",
      }}
      animate={{
        scale: 1 - depth * 0.055,
        y: depth * 16,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: isChat ? "#0d1210" : "var(--surface-raised)",
          border: `1px solid ${isChat ? "rgba(201,162,75,0.25)" : "var(--line)"}`,
          borderRadius: isChat ? "22px" : "2px",
          boxShadow: "0 30px 70px -20px rgba(0,0,0,0.7)",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isChat && (
          <div
            style={{
              height: "22px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "1px solid rgba(201,162,75,0.15)",
            }}
          >
            <div style={{ width: "36px", height: "3px", borderRadius: "2px", background: "rgba(242,237,228,0.2)" }} />
          </div>
        )}
        <div
          style={{
            position: "relative",
            flex: 1,
            overflow: "hidden",
            background: isChat ? "#05070a" : "var(--surface-raised)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.img
            src={item.src}
            alt={item.caption}
            draggable="false"
            whileHover={isTop ? { scale: 1.025 } : undefined}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: isChat ? "contain" : "cover",
              objectPosition: "center",
              filter: isChat ? "none" : "grayscale(15%) contrast(1.05)",
              userSelect: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: isChat
                ? "linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,0.75) 100%)"
                : "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "1.2rem",
              bottom: "1.1rem",
              right: "1.2rem",
            }}
          >
            <div className="eyebrow" style={{ marginBottom: "0.35rem" }}>
              {item.moment}
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text)", lineHeight: 1.5 }}>{item.caption}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Layer3Gallery() {
  const scrollDirection = useScrollDirection();
  const [order, setOrder] = useState(() => GALLERY.map((_, i) => i));
  const [round, setRound] = useState(0); // increments each full pass, just for a subtle counter reset feel

  const sendToBack = () => {
    setOrder((o) => {
      const next = [...o.slice(1), o[0]];
      return next;
    });
    setRound((r) => r + 1);
  };

  const visible = order.slice(0, Math.min(VISIBLE_DEPTH, order.length));
  const currentPosition = (round % GALLERY.length) + 1;

  return (
    <section className="section" style={{ minHeight: "100svh" }}>
      <div className="section-inner" style={{ textAlign: "center" }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: scrollDirection === "down" ? 0 : 0.2 }}
          style={{ marginBottom: "1rem" }}
        >
          Galeri
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            marginBottom: "0.75rem",
          }}
        >
          Momen yang aku simpan
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: scrollDirection === "down" ? 0.2 : 0 }}
          style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "3.5rem" }}
        >
          geser kartunya untuk lanjut ke momen berikutnya
        </motion.p>

        {GALLERY.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>Belum ada foto ditambahkan.</p>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 70, rotate: -5, scale: 0.88 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ type: "spring", stiffness: 110, damping: 18 }}
              style={{
                position: "relative",
                width: "min(340px, 82vw)",
                aspectRatio: "4 / 5.3",
                margin: "0 auto",
              }}
            >
              {visible.map((galleryIndex, depth) => (
                <StackCard
                  key={galleryIndex}
                  item={GALLERY[galleryIndex]}
                  depth={depth}
                  isTop={depth === 0}
                  onSwiped={sendToBack}
                />
              ))}
            </motion.div>

            <div
              style={{
                marginTop: "2.2rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--muted)",
                letterSpacing: "0.1em",
              }}
            >
              {String(currentPosition).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
