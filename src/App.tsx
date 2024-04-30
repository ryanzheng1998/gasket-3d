import { useEffect } from "react";
import { drawBox } from "./drawBox";

function App() {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    // drawGasket(canvas);
    drawBox(canvas);
    // drawTriangleRotate(canvas);
  }, []);

  return (
    <>
      <canvas id="canvas" className="h-screen w-screen" />
    </>
  );
}

export default App;
