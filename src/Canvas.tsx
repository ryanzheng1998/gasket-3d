import { useEffect } from "react";
import { drawGasketSurfaceSubdivision } from "./draw/drawGasketSurfaceSubdivision";
import { drawGasketVolumeSubdivision } from "./draw/drawGasketVolumeSubdivision";
import { clamp } from "./functions/clamp";
import { useStore } from "./useStore";

export const Canvas = () => {
  const state = useStore();

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    if (state.gasketType === "volume") {
      const cancel = drawGasketVolumeSubdivision(canvas);
      return () => {
        cancel?.();
      };
    }

    const cancel = drawGasketSurfaceSubdivision(canvas);

    return () => {
      cancel?.();
    };
  }, [state.divisionCount, state.gasketType]);

  useEffect(() => {
    setInterval(() => {
      const state = useStore.getState();
      useStore.setState({ rotationY: state.rotationY + 1 });
    }, 16);
  }, []);

  return (
    <canvas
      id="canvas"
      className="w-svh fixed inset-0 -z-10 h-svh"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);

        const onPointerMove = (e: MouseEvent) => {
          const state = useStore.getState();

          const rotationX = state.rotationX - e.movementY;

          useStore.setState({
            rotationX: clamp(rotationX, -180, 180),
            rotationY: state.rotationY + e.movementX,
          });
        };

        const onPointerUp = () => {
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", onPointerUp);
        };

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
      }}
    />
  );
};
