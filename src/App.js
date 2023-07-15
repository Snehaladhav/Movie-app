import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./Components/MovieComponent";

const API_KEY = `82ca2463`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  background-color: white;
  width: 50%;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 39px;
  height: 32px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeOutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);

  const fetchData = async (searchString) => {
    const response = await axios.get(
      ` http://www.omdbapi.com/?i=tt3896198&apikey=82ca2463`
    );
    console.log(response);
    updateMovieList(response.data.search);
  };

  const onTextChange = (event) => {
    clearTimeout(timeOutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/movie-icon.svg" />
          React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>

      <MovieListContainer>
        {movieList?.length
          ? movieList.map((movie, index) => (
              <MovieComponent key={index} movie={movie} />
            ))
          : "No Movie Search"}
      </MovieListContainer>
    </Container>
  );
}
export default App;
