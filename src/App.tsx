import { useEffect } from "react";
import { drawPyramid } from "./drawPyramid";
import { clamp } from "./functions/clamp";
import { useStore } from "./useStore";

function App() {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    drawPyramid(canvas);
  }, []);

  return (
    <canvas
      id="canvas"
      className="w-svh h-svh"
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
}

export default App;
