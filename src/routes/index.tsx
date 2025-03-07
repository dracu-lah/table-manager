import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { CanvasProvider } from "../context/CanvasContext";
import AreaManager from "../pages/AreaManager";
import CustomerView from "../pages/CustomerView";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <CanvasProvider>
        <Routes>
          <Route path="/" element={<AreaManager />} />
          <Route path="/customer-view" element={<CustomerView />} />
        </Routes>
      </CanvasProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
