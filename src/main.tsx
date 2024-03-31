import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Container className="my-4">
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Container>
);
