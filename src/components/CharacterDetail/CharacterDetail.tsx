import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchCharacterDetail } from "../../services/api";
import { Character } from "../../types";
import {
  TextField,
  Button,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";
import axios from "axios";

interface RelatedData {
  homeworldName: string;
  filmsNames: string[];
  speciesNames: string[];
  starshipsNames: string[];
  vehiclesNames: string[];
}

const CharacterDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state = "" } = useLocation();

  const [character, setCharacter] = useState<Character | null>(null);
  const [relatedData, setRelatedData] = useState<RelatedData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const characterData = await fetchCharacterDetail(id!);
      localStorage.setItem(`character-${id}`, JSON.stringify(characterData));

      setCharacter(characterData);
    };

    const fetchRelatedData = async (character: Character) => {
      try {
        const [
          homeworldResponse,
          filmsResponses,
          speciesResponses,
          starshipsResponses,
          vehiclesResponses,
        ] = await Promise.all([
          axios.get(character.homeworld),
          Promise.all(character.films.map((url) => axios.get(url))),
          Promise.all(character.species.map((url) => axios.get(url))),
          Promise.all(character.starships.map((url) => axios.get(url))),
          Promise.all(character.vehicles.map((url) => axios.get(url))),
        ]);

        setRelatedData({
          homeworldName: homeworldResponse.data.name,
          filmsNames: filmsResponses.map((res) => res.data.title),
          speciesNames: speciesResponses.map((res) => res.data.name),
          starshipsNames: starshipsResponses.map((res) => res.data.name),
          vehiclesNames: vehiclesResponses.map((res) => res.data.name),
        });
      } catch (error) {
        console.error("Failed to fetch related data:", error);
      }
    };

    const baseInfo = JSON.parse(state) as Character;

    if (!baseInfo) {
      fetchData();
    } else {
      setCharacter(baseInfo);
    }

    fetchRelatedData(baseInfo);
  }, [state, id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCharacter((prev) => prev && { ...prev, [name]: value });
  };

  const handleSave = () => {
    if (character) {
      localStorage.setItem(`character-${id}`, JSON.stringify(character));
    }
  };

  if (!character) return <LinearProgress />;

  return (
    <div>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent sx={{ overflowY: "scroll", height: "70vh" }}>
          <h2>{character.name}</h2>
          <TextField
            label="Name"
            name="name"
            value={character.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Height"
            name="height"
            value={character.height}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Mass"
            name="mass"
            value={character.mass}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Gender"
            name="gender"
            value={character.gender}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          {relatedData && (
            <>
              <TextField
                label="Homeworld"
                value={relatedData.homeworldName}
                disabled
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Films"
                value={relatedData.filmsNames.join(", ")}
                disabled
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Species"
                value={relatedData.speciesNames.join(", ")}
                disabled
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Starships"
                value={relatedData.starshipsNames.join(", ")}
                disabled
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Vehicles"
                value={relatedData.vehiclesNames.join(", ")}
                disabled
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            </>
          )}
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ marginRight: 2 }}
      >
        Back
      </Button>
      <Button variant="contained" color="secondary" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default CharacterDetail;
