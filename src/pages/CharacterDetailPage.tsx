import React from "react";
import CharacterDetail from "../components/CharacterDetail/CharacterDetail";
import { Box } from "@mui/material";

const CharacterDetailPage: React.FC = () => {
  return (
    <Box sx={{ padding: 8 }}>
      <h1>Character Detail</h1>
      <CharacterDetail />
    </Box>
  );
};

export default CharacterDetailPage;
