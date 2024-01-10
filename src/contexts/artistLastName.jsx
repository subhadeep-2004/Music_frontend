import React from "react";

import { createContext } from "react";
// Globally To control song
const artistLastNameContext=createContext({
    currentartistLastName:null,
    setartistLastName:(artistLastName)=>{

    }

})

export default artistLastNameContext