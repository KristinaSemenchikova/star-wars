import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Character } from "../../types";
import "./CharacterCard.css";

type CharacterCardProps = {
  character: Character;
  id: number;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character, id }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5">
          <Link
            to={`/character/${id}`}
            state={JSON.stringify(character)}
            className="CharacterCard_link"
          >
            {character.name}
          </Link>
        </Typography>
        <Typography variant="body2">Height: {character.height}</Typography>
        <Typography variant="body2">Mass: {character.mass}</Typography>
        <Typography variant="body2">Gender: {character.gender}</Typography>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;
