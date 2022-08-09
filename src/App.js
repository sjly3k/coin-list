import { Provider } from "jotai";
import CoinTemplate from "./components/CoinTemplate";

function App() {
  return (
    <Provider>
      <CoinTemplate />
    </Provider>
  );
}

export default App;
