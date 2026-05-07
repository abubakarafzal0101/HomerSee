import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContextProvider.jsx";
import UserContextProvider from "./contexts/UserContextProvider.jsx";
import ListingContextProvider from "./contexts/ListingContextProvider.jsx";
import BookingContextProvider from "./contexts/BookingContextProvider.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BookingContextProvider>
      <ListingContextProvider>
        <UserContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </UserContextProvider>
      </ListingContextProvider>
    </BookingContextProvider>
  </BrowserRouter>,
);
