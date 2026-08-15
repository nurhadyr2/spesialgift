import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

export default function useScrollDirection() {
  const { scrollY } = useScroll();
  const previousY = useRef(0);
  const [direction, setDirection] = useState("down");

  useMotionValueEvent(scrollY, "change", (currentY) => {
    const nextDirection = currentY >= previousY.current ? "down" : "up";
    previousY.current = currentY;
    setDirection((current) => (current === nextDirection ? current : nextDirection));
  });

  return direction;
}
