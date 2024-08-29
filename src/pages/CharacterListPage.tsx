import React from "react";
import { CharacterList } from "../components";
import { Box } from "@mui/material";

const CharacterListPage: React.FC = () => {
  return (
    <Box sx={{ padding: 8 }}>
      <h1>Star Wars Characters</h1>
      <CharacterList />
    </Box>
  );
};

export default CharacterListPage;
