import { useEffect } from "react";
import { drawBoxMouseRotate } from "./drawBoxMouseRoate";
import { clamp } from "./functions/clamp";
import { useStore } from "./useStore";

function App() {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    drawBoxMouseRotate(canvas);
  }, []);

  return (
    <>
      <canvas
        id="canvas"
        className="h-screen w-screen"
        onMouseDown={() => {
          const onMouseMove = (e: MouseEvent) => {
            const state = useStore.getState();
            console.log(state.rotationX, state.rotationY);

            const rotationX = state.rotationX - e.movementY;

            useStore.setState({
              rotationX: clamp(rotationX, -180, 180),
              rotationY: state.rotationY + e.movementX,
            });
          };

          const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
          };

          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseup", onMouseUp);
        }}
      />
    </>
  );
}

export default App;
