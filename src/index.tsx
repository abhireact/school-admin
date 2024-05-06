import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import store from "layouts/pages/redux/store";
import { Provider } from "react-redux";
// Material Dashboard 2 PRO React TS Context Provider
import { MaterialUIControllerProvider } from "context";
const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </Provider>
);
