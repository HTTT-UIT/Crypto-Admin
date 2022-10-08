import MainLayout from "@/components/Layout";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { AdminRoutes } from "./config";
import Login from "./pages/Login";

export default function App() {
  return (
    <ErrorBoundary>
      <ConfigProvider locale={enUS}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainLayout />}>
              {AdminRoutes?.map((route) => (
                <Route key={route.path} path={route.path} element={route.page} />
              ))}
            </Route>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </ErrorBoundary>
  );
}
