import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Info from "./components/Info";

export default function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/:id" element={<Info />}/>
        </Routes>
    </Router>
  );
}