import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from "react-modal";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReflectionComponentLS from "./components/ReflectionComponentLS";

ReactModal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/reflection"
          element={
            <ReflectionComponentLS requestClose={() => window.close()} />
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
