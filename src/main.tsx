import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// Restaura o path original após redirect do 404.html
const redirect = sessionStorage.redirect;
delete sessionStorage.redirect;
if (redirect && redirect !== location.href) {
  history.replaceState(null, '', redirect.replace(location.origin, ''));
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
