import React from "react";
import styled from "styled-components";
import SongListItem from './SongListItem';

const MyUl = styled.ul`
    
`;

const SongList = ({songs}) =>{
    const top50 = songs.map((song) =>
        <SongListItem song={song}/>   
            );
    return (
    <MyUl>
        {top50}
    </MyUl>
    )

}
export default SongList; 