import "devextreme/dist/css/dx.light.css";
import "./App.css";
import AppRoutes from "./routes";
import i18n from "./config/i18n";

function App() {
  return (
    <div dir={i18n.dir(i18n.language)}>
      <AppRoutes />
    </div>
  );
}

export default App;
