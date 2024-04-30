import { useEffect } from "react";
import { drawTriangle } from "./drawTriangle";

function App() {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    // drawGasket(canvas);
    drawTriangle(canvas);
  }, []);

  return (
    <>
      <canvas id="canvas" className="h-screen w-screen" />
    </>
  );
}

export default App;
