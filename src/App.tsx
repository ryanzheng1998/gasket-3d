import { useEffect } from "react";
import { drawTriangleRotate } from "./drawTriangleRotate";

function App() {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    // drawGasket(canvas);
    drawTriangleRotate(canvas);
  }, []);

  return (
    <>
      <canvas id="canvas" className="h-screen w-screen" />
    </>
  );
}

export default App;
