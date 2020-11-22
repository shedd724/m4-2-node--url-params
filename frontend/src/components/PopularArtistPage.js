import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Content from "./Content";
import SongListItem from './SongListItem';
const MyUl = styled.ul`
    
`;

const PopularArtistPage = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("/top50/popular-artist")
      .then((res) => res.json())
      .then((json) => {
        setSongs(json.data);
      });
  }, []);

  console.log("PopularArtistPage.js: songs: ", songs);
  const popularArtistList = songs.map((song) =>
  <SongListItem song={song}/>   
      );

  return (
    <>
      <Header pageTitle="Most Popular Artist" />
      <Content>Most popular artist's songs...</Content>
      <MyUl>
        {popularArtistList}
    </MyUl>
    </>
  );
};

export default PopularArtistPage;
