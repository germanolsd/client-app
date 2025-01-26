// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

import { Routes, Route } from "react-router-dom";
import DeviceList from "./pages/DeviceList.tsx";
import DeviceDetail from "./pages/DeviceDetail.tsx";

function App() {
  return (
    <Routes>
      <Route path="/devices" element={<DeviceList />}>
        <Route path=":id" element={<DeviceDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
