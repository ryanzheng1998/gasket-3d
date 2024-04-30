import { useEffect } from "react";
import { drawBoxMouseRotate } from "./drawBoxMouseRoate";
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
            console.log(
              e.movementX,
              e.movementY,
              state.rotationX,
              state.rotationY,
            );
            useStore.setState({
              rotationX: state.rotationX - e.movementY / 500,
              rotationY: state.rotationY + e.movementX / 500,
            });
          };

          const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
          };

          // setInterval(() => {
          //   const state = useStore.getState();
          //   useStore.setState({
          //     rotationX: state.rotationX + 0.01,
          //   });
          // }, 100);

          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseup", onMouseUp);
        }}
      />
    </>
  );
}

export default App;
