import { Routes, Route, Outlet } from "react-router-dom";
import { Suspense } from "react";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Suspense fallback={"abc"}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
