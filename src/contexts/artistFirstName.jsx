import React from "react";

import { createContext } from "react";
// Globally To control song
const artistFirstNameContext=createContext({
    currentartistFirstName:null,
    setartistFirstName:(artistFirstName)=>{

    }

})

export default artistFirstNameContext