import React from "react";
import styled from "styled-components";

const MyLi = styled.li`
    display: flex;
    margin-top: 10px; 
    padding: 10px;
    
    
`;

const SongListItem = ({song}) =>{
    return(
        <MyLi key={song.rank}>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <span style={{fontSize:"60px", padding:"0px", marginBottom:"3px"}}>{`#${song.rank}`}</span>
                <span style={{margin:"0px"}}>{`(${song.streams} streams)`}</span>
                </div>
            <div style={{display:"flex", flexDirection:"column", flexGrow:"1", marginLeft:"30px", marginTop:"20px"}}>
                <div style={{fontSize:"40px", padding:"10px", fontWeight:"500"}}>{song.title}</div>
                <div style={{fontStyle:"italic", paddingLeft:"12px"}}>{`by ${song.artist}`}</div>
                <span style={{alignSelf:"flex-end", color:"gray"}}>{`publication date: ${song.publicationDate}`}</span>
                </div>
        </MyLi>
    )

}
export default SongListItem; 