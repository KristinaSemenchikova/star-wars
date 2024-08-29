import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterListPage from "./pages/CharacterListPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<CharacterListPage />} />
            <Route path="/character/:id" element={<CharacterDetailPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
