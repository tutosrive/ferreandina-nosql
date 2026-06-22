import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import routers from "./routes/routes";

const DefaultLayout = lazy(() => import("./layout/Default.layout"));

function App() {
  return (
    <Routes>
      <Route
        element={
          <Suspense
            fallback={
              <div className="w-screen h-screen fixed top-1/2 text-center">
                Cargando diseño...
              </div>
            }
          >
            <DefaultLayout />
          </Suspense>
        }
      >
        {routers.map((router, index) => (
          <Route
            key={index}
            path={router.path}
            element={
              <Suspense
                fallback={
                  <div className="w-screen h-screen fixed top-1/2 text-center">
                    Cargando módulo...
                  </div>
                }
              >
                {router.element}
              </Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
