import React from "react";

import { createContext } from "react";
// Globally To control song of mySong route and fix user
const songContext=createContext({
    currentSong:null,
    setCurrSong:(currSong)=>{},
    isPause:false,
    SetIsPause:()=>{},
    
    songPlayed:null,
     setSongPlayed:()=>{},


     currIndex:null,
     setCurrIndex:()=>{},

    
     // this is for the mySong
     songData:null,
    
     setSongData:()=>{},

     username:null,
     setUserName:()=>{}

    





})

export default songContext