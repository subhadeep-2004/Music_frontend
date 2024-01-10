import React from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from '@iconify/react';
import { useState } from "react";
import { makeAuthenticatedgetRequest } from "../util/serverHelper";
import SingleSongCard from "../components/shared/SingleSongCard";
import songContext from "../contexts/songContext";
import { useContext } from "react";
import { useEffect } from "react";

function SearchPage() {
   
    const{songData,setSongData,username,setUserName}=useContext(songContext)

    useEffect(()=>{

        async function getMySong() {

            const response= await makeAuthenticatedgetRequest("/song/get/Mysongs")
        
          // It helps yo set the SongData response.songs is a array of many songs
         
            // console.log(response.songs);
            // console.log(respons);
            setSongData(response.songs);           
            
        }
        async function userDetails() {
            const response= await makeAuthenticatedgetRequest("/song/user");
            console.log(response);
            setUserName(response.userName)
    
               
            }
            userDetails()
       
        getMySong()
    },[])
    
    console.log(songData);



    const[inputFocused,setInputFocused]=useState(false);

    const[textChange,setTextChange]= useState("");

    const[SongData,SetSongData]= useState([]);


    async function searchSong(){

        const response= await makeAuthenticatedgetRequest("/song/get/songname/"+textChange);

        if(response && !response.err){
            
            SetSongData(response.data)
            alert("Get request sucessfully sent")
        }else{
            alert("Error")
        }

    }



    return (<LoggedInContainer currActiveScreen='search' songData={songData}>

        <div className="w-full  pt-4 ">
            <div className={`search w-1/3 flex justify-center items-center space-x-2 text-white p-2 px-5 rounded-full ${inputFocused?"border border-emerald-500":""} `}>
           
            <input type="text" placeholder="Search..." className="search w-full"
            value={textChange}
            onFocus={()=>{
                setInputFocused(true)
            }}
            onBlur={()=>{
                setInputFocused(false)
            }}
            onChange={(e)=>{
                e.preventDefault();
                setTextChange(e.target.value)
            }}

        //  When enter is clicked
            onKeyDown={(e)=>{
                if(e.key==='Enter'){
                    searchSong();
                }
            
            }}
            />
            <div className=""
            onClick={()=>{
                searchSong()
                
            }}
                
            ><Icon icon="mingcute:search-line" fontSize={25} type="submit"/></div>




            </div>
        </div>
        

        { SongData.length>0?
        <div className="p-4 text-white">
                <div className="flex">
                Search Result for 
               
                <div className="text-emerald-400 px-2 font-semibold">
                {`  ${textChange} :` }
                </div>
                </div>
                {                                
                SongData.map((item)=>{  
                    // null is not taken as not-defineds
                    if(!item||!item.artist.firstName|| !item.artist.lastName){
                        return;
                    }
                    console.log(item.artist.firstName);
                    return( 
                         <SingleSongCard
                        info={item}
                        artistFirstName={item.artist.firstName}
                        artistLastName={item.artist.lastName}
                    /> 
                    
                    
                    )
                    })
            }

                    
            </div>:
            <div className="flex  p-5 text-white">
                Nothing to show here.

                
                <div className="text-emerald-400 px-2 font-semibold">
                    Try Again!
                </div>
            </div>



        }

    </LoggedInContainer>)



}


export default SearchPage