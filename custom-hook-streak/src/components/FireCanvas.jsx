import { useEffect, useRef } from "react";

export default function FireCanvas({ streak }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!streak || streak <= 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 120;
    canvas.height = 100;

    let particles = [];
    let animationId;

    const intensity = Math.min(streak, 7); // controla força do fogo

    function createParticle() {
      return {
        x: canvas.width / 2 + (Math.random() * 40 - 20),
        y: canvas.height - 5,
        radius: Math.random() * 6 + 4,
        speedY: Math.random() * 2.5 + 0.8,
        alpha: 1,
        hue: Math.random() * 25 + 15, // amarelo → laranja
      };
    }

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // gera partículas conforme intensidade
      for (let i = 0; i < intensity; i++) {
        particles.push(createParticle());
      }

      particles.forEach((p, i) => {
        p.y -= p.speedY;
        p.alpha -= 0.02;
        p.radius *= 0.96;

        const lightness = p.radius > 6 ? 65 : 55;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, ${lightness}%, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.alpha <= 0 || p.radius <= 0.5) {
          particles.splice(i, 1);
        }
      });

      animationId = requestAnimationFrame(update);
    }

    update();

    return () => cancelAnimationFrame(animationId);
  }, [streak]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: streak > 0 ? "block" : "none",
        margin: "0 auto -6px",
        filter: "blur(0.4px)",
      }}
    />
  );
}
