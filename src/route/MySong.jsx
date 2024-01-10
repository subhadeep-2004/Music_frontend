import { Icon } from '@iconify/react';
import IconText from '../components/shared/IconsText';
import TextInput from '../components/shared/TextInput';
import React, { useContext } from 'react';
import SingleSongCard from '../components/shared/SingleSongCard';
import { useState } from 'react';
import { makeAuthenticatedgetRequest } from '../util/serverHelper';
import { useEffect } from 'react';
import {Howl, Howler} from 'howler';

import songContext from '../contexts/songContext';
// import { useContext } from 'react';
import LoggedInContainer from '../containers/LoggedInContainer';


function MySong(){

    // const [songData,setSongData]= useState([]);
    const[FirstName,setFirstName]=useState("");
    const[LastName,setLastName]=useState(null);



    const[songPlayed, setSongPlayed]= useState(false)

 
    const{songData,setSongData,username,setUserName}= useContext(songContext);
 
    const playSound=((Songsrc)=>{

        // when the one card is clicked if the previous  song is already playing then stop it and play the new song 
        if(songPlayed){
          
            // console.log(sound);
            
            songPlayed.stop()
          }

        var sound = new Howl({
            src: [Songsrc],

            html5: true
          });
          setSongPlayed(sound)
       
        sound.play()
       
       
       
    })


    


    // By using this(useEffect) Hook, you tell React that your component needs to do something after render the page with when click or onChange
    useEffect(()=>{

        async function getMySong() {

            const response= await makeAuthenticatedgetRequest("/song/get/Mysongs")
        
          // It helps yo set the SongData response.songs is a array of many songs
         
            // console.log(response.songs);
            // console.log(respons);
            setSongData(response.songs);
            setFirstName(response.artistFirstName)
            setLastName(response.artistLastName)
            
            
            
        }
        async function userDetails() {
            const response= await makeAuthenticatedgetRequest("/song/user");
            console.log(response);
            setUserName(response.userName)
               
            }
        getMySong()
        userDetails()
    },[])






    return (
        // By using the children prop in React
        <LoggedInContainer currActiveScreen='mySong' songData={songData}>

                <div  className='pl-4 pt-4 font-semibold text-xl text-white '>
                    My Song
                </div>

               
               {
                songData &&
                songData.map((item)=>{

                    return <div>
                    <SingleSongCard
                    // info={item}
                    // name={item.name}
                    // thumbnail={item.thumbnail}
                    info={item}

                    artistFirstName={FirstName}
                    artistLastName={LastName}
                   
                    playSound={playSound}
                  
                
                    />
                    {/* <ReactHowler playing={songPlayed}  /> */}
                    </div>
                
                })
               }
              
        </LoggedInContainer>
    )

   
}

export default MySong