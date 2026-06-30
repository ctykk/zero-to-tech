import { type ReactNode, useEffect, useRef } from "react";

interface AnimatedCardGridProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedCardGrid({ children, className }: AnimatedCardGridProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = ref.current?.querySelectorAll(".card");
    if (!cards || cards.length === 0) return;

    cards.forEach((card, i) => {
      (card as HTMLElement).style.animationDelay = `${i * 0.12}s`;
    });
  }, []);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
