import Confetti from "canvas-confetti";

export * from "./canon";

type ConfettiOptions = Confetti.Options & {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  flat?: boolean;
  ticks?: number;
  origin?: { x: number; y: number };
  colors?: string[];
  shapes?: Confetti.Shape[];
  zIndex?: number;
  disableForReducedMotion?: boolean;
  useWorker?: boolean;
  resize?: boolean;
  canvas?: HTMLCanvasElement | null;
  scalar?: number;
};

const confetti = (options: ConfettiOptions) => {
  if (
    options.disableForReducedMotion &&
    window.matchMedia("(prefers-reduced-motion)").matches
  ) {
    return;
  }

  const confettiInstance = options.canvas
    ? Confetti.create(options.canvas, {
        resize: options.resize ?? true,
        useWorker: options.useWorker ?? true,
      })
    : Confetti;

  confettiInstance({
    ...options,
  });
};

confetti.shapeFromPath = (options: { path: string; [key: string]: any }) => {
  return Confetti.shapeFromPath({ ...options });
};

confetti.shapeFromText = (options: { text: string; [key: string]: any }) => {
  return Confetti.shapeFromText({ ...options });
};

export { confetti };
