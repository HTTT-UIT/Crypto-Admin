import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Main from "./pages/Main";

export default function App() {
  return (
    <ConfigProvider locale={enUS}>
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    </ConfigProvider>
  );
}
