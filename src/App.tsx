import "devextreme/dist/css/dx.material.custom-scheme.css";
import "./App.css";
import AppRoutes from "./routes";
import useI18nStore from "./store/i18n/useI18nStore";

function App() {
  const { dir } = useI18nStore();
  return (
    <main dir={dir}>
      <AppRoutes />
    </main>
  );
}

export default App;
