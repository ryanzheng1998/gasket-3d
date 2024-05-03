import { Canvas } from "./Canvas";
import { useStore } from "./useStore";

function App() {
  const state = useStore();

  return (
    <div>
      <input
        type="range"
        value={state.divisionCount}
        min={0}
        max={7}
        onChange={(e) => {
          const value = e.target.value;

          useStore.setState({ divisionCount: parseInt(value) });
        }}
      />
      <label>{state.divisionCount}</label>
      <Canvas />
    </div>
  );
}

export default App;
