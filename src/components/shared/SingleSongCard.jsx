import { useState } from "react"
import ReactHowler from 'react-howler'
import { useContext } from "react";
import songContext from "../../contexts/songContext";
import artistFirstNameContext from "../../contexts/artistFirstName";
import artistLastNameContext from "../../contexts/artistLastName";
function SingleSongCard({info,playSound,  artistFirstName,artistLastName}) {

    // function secondsToMinutesAndSeconds(seconds) {
    //     const minutes = Math.floor(seconds / 60);
    //     const remainingSeconds = Math.floor(seconds % 60); // Round down to remove decimal part
        
    //     // Adding leading zero if necessary
    //     const formattedMinutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    //     const formattedSeconds = (remainingSeconds < 10) ? `0${remainingSeconds}` : `${remainingSeconds}`;
    
    //     return `${formattedMinutes}:${formattedSeconds}`;
    // }

    // const[isPlayed,setPlayed]=useState(false);
    const{isPause,SetIsPause}=useContext(songContext)
    const{songPlayed,setSongPlayed}= useContext(songContext);

    console.log(songPlayed);
    // console.log(songPlayed.duration());
    
    const{ currentSong,setCurrSong}= useContext(songContext);
    const {currentartistFirstName,  setartistFirstName} = useContext(artistFirstNameContext);
    const {  currentartistLastName,setartistLastName}= useContext(artistLastNameContext)
    // console.log(props.info);
    
    // console.log(currentSong);
    // console.log(currentSong);
    return  <div className="mysong-card flex p-2 m-3 bg-gray-700 bg-opacity-30 hover:bg-opacity-50 rounded-lg " 
    
    onClick={()=>{
        // props.playSound(props.track)
        // console.log(info);
        setCurrSong(info)
        setartistFirstName(artistFirstName);
        setartistLastName(artistLastName)
    //    if(isPlayed){
    //     setPlayed(false)
    //    }else{
    //     setPlayed(true)
    //    }


    }}>
         {/* <ReactHowler
       src={info.track}
       playing={isPlayed}
       loop={true}
     /> */}
        {/* for bg-cover and center we are setting the background image nicely */}
        <div className="mysong-image w-12 h-12 bg-cover flex items-center justify-center bg-center rounded cursor-pointer hover:rounded-full" style={{backgroundImage:`url(${info.thumbnail})`}}>
        
        </div>


        <div className="flex w-full">
        <div className="Text text-white pl-3 flex flex-col justify-center  cursor-pointer w-5/6">
            <div className="text-gray-400 hover:text-white text-sm ">
               {info.name}
            </div>

            <div className="text-xs text-emerald-300 hover:text-emerald-500">
                {artistFirstName} {artistLastName}
            </div>

        </div>
        
        <div className="w-1/6 text-white space-x-2 flex items-center justify-center">
            
            
            {/* <div>   

            {!isPause?

           ( 
            <div className="flex p-3">    
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="currentColor" d="M120.16 45A20.162 20.162 0 0 0 100 65.16v381.68A20.162 20.162 0 0 0 120.16 467h65.68A20.162 20.162 0 0 0 206 446.84V65.16A20.162 20.162 0 0 0 185.84 45zm206 0A20.162 20.162 0 0 0 306 65.16v381.68A20.162 20.162 0 0 0 326.16 467h65.68A20.162 20.162 0 0 0 412 446.84V65.16A20.162 20.162 0 0 0 391.84 45z"/></svg>
            
            
            
        
            </div>

           )
            :
            (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z"/></svg>
            )
           
            
            }
           
         
            
            
            
            
            </div> */}

{/* 
            <div>
                {secondsToMinutesAndSeconds(songPlayed.duration())}
            </div> */}
        </div>
        


        </div>


        </div>
 
    
}


export default SingleSongCard