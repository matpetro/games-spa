import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./components/Home/HomePage";
import Connect4Page from "./components/Connect4/Connet4Page";
import GuessNumPage from "./components/GuessNum/GuessNumPage";
import TenziesPage from "./components/Tenzies/TenziesPage";
import TicTacToePage from "./components/TicTacToe/TicTacToePage";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/games-spa" element={<HomePage />}/>
        <Route path="/games-spa/tic-tac-toe" element={<TicTacToePage />} />
        <Route path="/games-spa/tenzies" element={<TenziesPage />} />
        <Route path="/games-spa/guessthenumber" element={<GuessNumPage />} />
        <Route path="/games-spa/connect4" element={<Connect4Page />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
