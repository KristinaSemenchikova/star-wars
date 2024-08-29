import React, {
  useEffect,
  useState,
  useDeferredValue,
} from "react";
import { fetchCharacters } from "../../services/api";
import CharacterCard from "../CharacterCard/CharacterCard";
import { Character } from "../../types";
import {
  Box,
  LinearProgress,
  Pagination,
  TextField,
} from "@mui/material";
import { getCharacterId, getFromLS } from "../../utils";

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    setLoading(true);
    fetchCharacters(page, deferredSearch).then((data) => {
      setCharacters(data.results);
      setTotalPages(Math.ceil(data.count / 10));
      setLoading(false);
    });
  }, [page, deferredSearch]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <Box>
      <Box>
        <TextField
          label="Search Characters"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSearch(e.target.value)
          }
          sx={{ marginBottom: 2 }}
        />
        {loading && <LinearProgress />}
      </Box>
      <Box
        sx={{
          marginBottom: 2,
          overflowY: "scroll",
          height: "60vh",
          marginTop: loading ? 0 : '4px',
        }}
      >
        {characters.map((character) => {
          const id = getCharacterId(character.url)
          const savedCharacter = getFromLS<Character>(`character-${id}`);
          return (
            <CharacterCard key={character.url} character={savedCharacter || character} id={id}/>
          )
        })}
      </Box>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
        color="primary"
      />
    </Box>
  );
};

export default CharacterList;
