import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//na aula o typescript dizia que o root poderia deixar de existir no html. A
//solução seria colocar um (!) após o root, para dizer que ele seria mantido.
//No meu código não mostrou o erro então deixei sem o ponto.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
