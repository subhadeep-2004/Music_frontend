
import * as React from 'react'
import { useParams } from "react-router-dom"
import { useState  } from 'react';
import LoggedInContainer from '../containers/LoggedInContainer';
import { useEffect } from 'react';
import { makeAuthenticatedgetRequest } from '../util/serverHelper';
import SingleSongCard from '../components/shared/SingleSongCard';
import songContext from '../contexts/songContext';
import { useContext } from 'react';
// Using useParams

function  SinglePlayListView() {
    const[playListData,setplayListData] = useState({})
  
    const {usename,setUserName}= useContext(songContext);


    const {playlistId}= useParams();
    useEffect(()=>{
        async function getData(){
            
                const response = await makeAuthenticatedgetRequest("/playlist/get/playlist/"+playlistId );
                console.log("ed");
                console.log(response.data);
                setplayListData(response.data);
           
     
        }
        async function userDetails() {
            const response= await makeAuthenticatedgetRequest("/song/user");
            console.log(response);
            setUserName(response.userName)
    
               
            }
            userDetails()
        getData()
    },[])
       
    return(<LoggedInContainer currActiveScreen="library" songData={playListData.songs}> 

    {       
    
    playListData._id &&
             <div>
            <div className='text-white font-bold p-4 text-lg'>{playListData.name}</div>
            <div>{
                playListData.songs.map((item)=>{
                   return< SingleSongCard info={item}
                            artistFirstName={item.artist.firstName}
                            artistLastName={item.artist.lastName}
                   
                   />
                })
                
                }

            </div>


            
            </div>
}
          </LoggedInContainer>)


}


export default SinglePlayListView