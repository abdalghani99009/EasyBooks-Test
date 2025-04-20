import "@/common/assets/css/dx.material.custom-scheme.css";
import "./App.css";
import useApp from "./common/hooks/App/useApp";
import { Suspense, lazy } from "react";
import PagesLoader from "./common/components/Loading/PagesLoader";

const AppRoutes = lazy(() => import("@/routes/index"));

function App() {
  const { dir } = useApp();
  return (
    <main dir={dir}>
      <Suspense fallback={<PagesLoader />}>
        <AppRoutes />
      </Suspense>
    </main>
  );
}

export default App;
