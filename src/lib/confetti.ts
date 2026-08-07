import confetti from 'canvas-confetti';

export function triggerSuccessConfetti() {
  // Fire a burst of celebratory confetti
  const count = 60;
  const defaults = {
    origin: { y: 0.7 },
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f97316', '#fbbf24', '#10b981'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#3b82f6', '#ec4899', '#f97316'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#10b981', '#fbbf24', '#f97316'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#6366f1', '#10b981', '#f97316'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#fbbf24', '#f97316'],
  });
}
