import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Content from "./Content";
import SongListItem from './SongListItem';

const ArtistPage = () => {
  const { artistName } = useParams();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch(`/top50/artist/${artistName}`)
      .then((res) => res.json())
      .then((json) => {
        setSongs(json.data);
      });
  }, []);

  console.log("ArtistPage.js: songs: ", songs);
  const artistSongList = songs.map((song) =>
  <SongListItem song={song}/>   
    );

  return (
    <>
      <Header pageTitle={`Songs by ${artistName}`} />
      <Content>Songs by this artist...</Content>
      <ul>
        {artistSongList}
      </ul>
    </>
  );
};

export default ArtistPage;
