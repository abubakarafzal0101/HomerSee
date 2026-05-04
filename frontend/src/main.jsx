import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContextProvider.jsx";
import UserContextProvider from "./contexts/UserContextProvider.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </UserContextProvider>
  </BrowserRouter>,
);
