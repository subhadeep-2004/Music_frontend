import React from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from '@iconify/react';
import { useState } from "react";
import TextInput from "../components/shared/TextInput";
import {makeAuthenticatedgetRequest} from "../util/serverHelper"
import { useEffect } from "react";



function AddtoPlayListModal({addSong,closeModal}) {
    // Creating a modal type screen

    // console.log(playListName)
    // ;
    // console.log(playListThumbnail);


    // sending get request for playList
    const [playListData,setplayListData]= useState([]);
    
    useEffect(()=>{
        async function getData(){
                const response = await makeAuthenticatedgetRequest("/playlist/get/me");
                console.log(response.data);
                setplayListData(response.data);
           
     
        }
        getData()
    },[])

  function PlayListComponent(props) {


    return (<div className="bg-black flex space-x-3 items-center w-full p-3 bg-gray-700 bg-opacity-30  hover:bg-opacity-50  rounded-lg"
    onClick={()=>{addSong(props._id)} }>

            <div className="">
                <img src={props.thumbnail} alt="" className="w-7 h-7 rounded" />
            </div>
            <div className="text-sm font-semibold">
                {props.name}
            </div>


    </div>)
    
  }

    return (<div className="text-white absolute w-screen bg-black h-screen flex justify-center items-center bg-opacity-50"

    // onclick the modal again will run the closeModal Function from where we are passing the setModalOccur value false in the LoggedInContainer that is in the LoggedinContainer
    onClick={closeModal}>

    <div  className="playlist flex flex-col p-5 w-1/2 rounded-xl "onClick={(e)=>{
        e.stopPropagation() // such that when we click in this div it will stop the click to take action according to it like it will sethecloseModel in true 
    }}>
       
    <div className="flex  space-y-3 items-center  " >
    <div className="text-xl font-semibold w-full flex flex-col space-y-3">
           <div className="font-bold">Select PlayList </div>


            {playListData.map((item)=>{
                return <PlayListComponent thumbnail={item.thumbnail}
                        name={item.name}
                        _id={item._id}
                        
                        />

            })}
    </div>

   
        
      
    </div>
   
    </div>










    </div>)
}


export default AddtoPlayListModal