import React from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from '@iconify/react';
import { useState } from "react";
import TextInput from "../components/shared/TextInput";
import {makeAuthenticatedpostRequest} from "../util/serverHelper"




function CreatePlayListModals(props) {
    // Creating a modal type screen

    const[playListName,setPlayListName]= useState("");
    const[playListThumbnail,setPlayListThumbnail]= useState("");

    // console.log(playListName)
    // ;
    // console.log(playListThumbnail);


   async function createPlayList() {

    const data={
        name:playListName,
        thumbnail: playListThumbnail,
        songs: []
    }
       const response= await makeAuthenticatedpostRequest("/playlist/create",data)
        if(response.data._id){
           {props.closeModal()} // to close the modal when closeModal is called setModal false is send from the Loggedincontainer
           console.log(response.data);
        }else{
          
            console.log("Er");
        }
    }















    return (<div className="text-white absolute w-screen bg-black h-screen flex justify-center items-center bg-opacity-50"

    // onclick the modal again will run the closeModal Function from where we are passing the setModalOccur value false in the LoggedInContainer that is in the LoggedinContainer
    onClick={props.closeModal}>

    <div  className="playlist p-3 w-1/2 rounded-xl "onClick={(e)=>{
        e.stopPropagation() // such that when we click in this div it will stop the click to take action according to it like it will sethecloseModel in true 
    }}>
       
    <div className="flex flex-col justify-center space-y-3 items-center p-4" >
    <div className="text-xl font-semibold">
            Create PlayList
        </div>
        <div className="border border-emerald-400 rounded-full p-4 w-1/2">
        <input type="text" placeholder="PlayList Name" value={playListName} className="playlist h-full w-full outline-none "
        
        
        onChange={(e)=>{
            // When we log e it contains some key and value like target,which key you press
            setPlayListName(e.target.value)
        }}
        
        />                
        </div>
        {/* <div>
        <input type="text" placeholder="Thumbnail" className="playlist h-full w-full " />                
        </div> */}
         <div className="border border-emerald-400 rounded-full p-4 w-1/2 ">
        <input type="text" value={playListThumbnail} placeholder="Thumbnail" className="playlist h-full w-full outline-none"
        
        onChange={(e)=>{
            setPlayListThumbnail(e.target.value);
        }}
        
        />                
        </div>
        <div className="rounded-full text-xs p-2 flex justify-center items-center bg-emerald-400 px-0  w-1/6 cursor-pointer"
        
        onClick={createPlayList}
        
        >
            Create
        </div>
      
    </div>
   
    </div>










    </div>)
}


export default CreatePlayListModals