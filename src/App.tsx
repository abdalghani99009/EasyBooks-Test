import "devextreme/dist/css/dx.material.custom-scheme.css";
import "./App.css";
import AppRoutes from "./routes";
import useApp from "./common/hooks/App/useApp";

function App() {
  const { dir } = useApp();
  return (
    <main dir={dir}>
      <AppRoutes />
    </main>
  );
}

export default App;
