import { Canvas } from "./Canvas";
import { useStore } from "./useStore";

function App() {
  const state = useStore();

  return (
    <div>
      <div className="fixed right-0 top-0 m-5 grid grid-cols-[auto_auto] gap-3 rounded bg-white px-5 py-3">
        <label>Division Count: </label>
        <div className="flex place-items-center gap-3">
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
        </div>
      </div>
      <Canvas />
    </div>
  );
}

export default App;
