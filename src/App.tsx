import React from "react";
import { Routes, Route } from "react-router-dom";
import MainView from "./pages/MainView";
import DetailView from "./pages/DetailView";
import "./styles/Global.css";
import MainHeader from "./pages/MainHeader";

function App() {
  return (
    <>
      <MainHeader />
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/:id" element={<DetailView />} />
      </Routes>
    </>
  );
}

export default App;
