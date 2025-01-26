import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import DeviceListPage from "./pages/DeviceListPage.tsx";
import DeviceDetailPage from "./pages/DeviceDetailPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/devices" element={<DeviceListPage />}>
        <Route path=":id" element={<DeviceDetailPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/devices" />} />
    </Routes>
  );
}

export default App;
