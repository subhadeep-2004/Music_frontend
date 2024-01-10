import { Icon } from '@iconify/react';
import IconText from '../components/shared/IconsText';
import { Howl } from 'howler';
import React, { Children, useContext, useLayoutEffect,useRef } from 'react';
import { useState } from 'react';
import songContext from '../contexts/songContext';
import artistFirstNameContext from '../contexts/artistFirstName';
import artistLastNameContext from '../contexts/artistLastName';
// import Icon  from '@iconify/react';
import { useEffect } from 'react';
import CreatePlayListModals from '../modals/CreatePlayListModals';
// using children props to send the middle content  in react to more generalize our logged in screen which includes the nav bar,top bar and bottom bar 
import AddtoPlayListModal from '../modals/AddtoPlayListModal';
import { makeAuthenticatedpostRequest } from '../util/serverHelper';
import { makeAuthenticatedgetRequest } from '../util/serverHelper';
import user from '../imageFolder/user.png'

function  LoggedInContainer({children,currActiveScreen,songData}){
    // h full means it will take the full screen of the parent
    // const[isPause,SetIsPause]= useState(true)
    

    // const[songPlayed, setSongPlayed]= useState(null)


    //for create playList popup
    const [createPlayListModalOccur,setCreatePlayListModalOccur]=useState(false);

    // for add PlayList popup
    const [addPlayListModalOccur,setAddPlayListModalOccur]=useState(false);


    const {currentSong,setCurrSong,songPlayed,setSongPlayed,isPause,SetIsPause,currIndex,setCurrIndex,username,setUserName}= useContext(songContext);

    const{currentartistFirstName, setartistFirstName}=useContext(artistFirstNameContext);
    const{currentartistLastName, setartistLastName}= useContext(artistLastNameContext);

    
    // console.log(currentSong);

    // console.log(currSong);



    // console.log(currIndex);

    const firstUpdate = useRef(true);
    useLayoutEffect(()=>{

        // the following if statement will prevent the useEffect from the first render
        //prevent for multiple rendering of the changeSong
        if(firstUpdate.current){
            firstUpdate.current=false;
            return;
        }
        if(!currentSong){
            return;
        }
        
            
    //     }
    //     userDetails()
        if(currentSong!==null){
            function findIndexById(data, targetId) {
                if(data)
                return data.findIndex(element => element._id === targetId);
                
            }
            // const idx=findIndexById(props.songData,currentSong._id);
            console.log(songData);
            // const idx=songData.findIndex(currentSong._id);
            const idx=findIndexById(songData,currentSong._id)
            setCurrIndex(idx);
            
       }
        changeSong(currentSong.track);
    },[currentSong &&currentSong.track ] )// dependancies is there for useEffect


    // console.log(currIndex);
    
    //Handle Click for the next click
    const handleNextClick = () => {
        // Ensure currIndex is defined and not exceeding the array bounds
        console.log(songData);
        if (currIndex !== undefined && currIndex!=-1 && currIndex < songData.length - 1) {
            const nextIndex = currIndex + 1;
            setCurrIndex(nextIndex);
            const nextSong = songData[nextIndex];
            changeSong(nextSong.track);
            setCurrSong(nextSong);

        }
    };

    // Previous song click 
    const handlePreviousClick = () => {
        // Ensure currIndex is defined and not less than 0
        if (currIndex !== undefined && currIndex > 0) {
            const previousIndex = currIndex - 1;
            setCurrIndex(previousIndex);
            const previousSong = songData[previousIndex];
            if(previousSong.track!==undefined){
            changeSong(previousSong.track);
            setCurrSong(previousSong);
            }
        }
    };

    // Handle repeat

    function repeat() {
        changeSong(currentSong.track)
    }
    



    //add song to the playList
    async function addSongtoPlayList(playlistId) {
        const song_id= currentSong._id;
        const data={
            playlistId:playlistId,
            songId:song_id

        }
       const response = await makeAuthenticatedpostRequest("/playlist/add/song",data);
       if(response._id && !response.err){
        console.log("Song added to the Playlist");
        console.log(response);
        setAddPlayListModalOccur(false)
       }else{
        console.log("err");
       }
    }


    //Where the song is pause from there it will continue again till the song is changed
    const playSound= ()=>{
        if(!songPlayed){
            return;
        }
        songPlayed.play();
    }
    
    
    const changeSong=(Songsrc)=>{

        // when the one card is clicked if the previous  song is already playing then stop it and play the new song 
        if(songPlayed){            
            songPlayed.stop()
          }

        var sound = new Howl({
            src: [Songsrc],

            html5: true
          });
        setSongPlayed(sound)
       
        sound.play()
        SetIsPause(false)
     
       
    }

    function pauseSong() {
        songPlayed.pause()
    }

    function togglePlayPause() {
        if(isPause){
           playSound(currentSong.track) 
            SetIsPause(false)
        }else{
            SetIsPause(true)
            pauseSong()
        }

    }
    


    return (
            <div className=" h-full w-full bg-black">
                {/* condtion rendering the Create the playModal*/}
              { createPlayListModalOccur &&
               <CreatePlayListModals 
              closeModal={
                ()=>{setCreatePlayListModalOccur(false) // When again taking the 
                }
                }/> }
                {addPlayListModalOccur&&
                
                <AddtoPlayListModal
                    closeModal={()=>{setAddPlayListModalOccur(false)}}
                    addSong= {addSongtoPlayList}
                    />
                    
                }
            <div className={`loginHomepage ${currentSong?"":"h-full" } w-full flex`}>
            <div className="h-full w-1/5 bg-black flex flex-col justify-between ">
                    {/* Justify between is used as we divided the top in one div and language in the other  */}
                    {/* So the last div moves to the end */}
                {/* left panel */}

                <div>
                    {/*  p-5  my-4*/}
                <div className="logo w-full  ">


                    <div className='border border-emerald-500 rounded-full flex justify-center m-4 p-4' >
                        <Icon  icon="fxemoji:musicalnote" width={40}/>
                        <h1 className=' ml-2 font-bold text-2xl text-white'>Musicify</h1>  
                    </div>
                </div>
                <div className=' flex p-4 items-center' >
                    <img src={user} alt="" className='w-1/6'/>
                    <div className='text-white px-2'>{username} </div>
                </div>
                <div>                
                    <IconText name="mingcute:search-fill"
                        text="Search"
                        
                        active={currActiveScreen === 'search'}
                        targetLink='/search'

                />
                
                  <IconText name="material-symbols:home"
                        text="Home"
                        active={currActiveScreen === 'home'}
                        targetLink="/home"
                />
                  <IconText name="bi:stack"
                        text="Library"
                        active={currActiveScreen === 'library'}
                        targetLink="/library"

                />
                </div>

                <div className='mt-10'>
                <IconText name="gala:add"
                        text="Create Playlist"
                        active={currActiveScreen === 'createPlayList'}

                        // onclick this icon will pass a function which will setCreatePlayListModal true which goes to the IconText.jsx

                        onClick={()=>{setCreatePlayListModalOccur(true)}}
                       
                />

                <IconText name="iconamoon:heart"
                        text="Liked Songs"
                        active={currActiveScreen === 'LikedSongs'}

                />
                 <IconText name="vaadin:music"
                        text="My Song"
                        active={currActiveScreen === 'mySong'}

                        targetLink="/mySong"
                    />
                </div>
                <IconText name="streamline:music-folder-song-solid"
                            text="Upload Song"
                            active={currActiveScreen =='uploadSong'}
                            targetLink="/uploadSong"  />
                </div>
                <div className='text-xs text-gray-700 p-5 hover:text-emerald-400'>
                    Language-English
                </div>

    
            </div>
            <div className="content h-full w-4/5 overflow-auto">
                <div className='NavBar  w-full text-gray-400 flex justify-end items-center'>
                    <IconText name="bx:headphone"
                        text="Free Music"
                    />

                    <div className='h-1/2 border-r flex items-center m-2'>

                    </div>
                    {/* <button className='button h-1/2 bg-emerald-300 font-semibold  rounded-full  text-black text-sm flex justify-center items-center p-2'>UserName</button>
                    <button className='button h-1/2 bg-emerald-300 font-semibold  rounded-full text-black  text-sm flex justify-center items-center mx-2 p-2'>Active</button> */}


                </div>
                {/* right panel */}

                {/* sending the card details in the form of props different List should have different card detailss */}
                {/* 
                   < PlayListView title="Focus" 
                        cardDetails={FirstcardDetails}
                   
                   />
                   < PlayListView title="Sound of India"
                        cardDetails={FirstcardDetails}
                   />
                   < PlayListView title="Rock" 
                        cardDetails={FirstcardDetails}
                   />
                 */}
                 <div className='w-full p-5 pt-0'>

                    {children}
                </div>
            </div>
            </div>
                


         
        { 
            
            currentSong  && 
            
            <div className='songBar flex items-center p-7 text-white w-full rounded-full border border-emerald-500 '>
                
            {/* divide the whole part into three  part that is in 4:2:4 */}
            <div className='w-1/4 flex items-center'>
            <img className='w-10 h-10 rounded-full' src={currentSong.thumbnail} alt="" />
            <div className='p-4'>
                <div className='text-gray-400 hover:text-white text-sm'>{currentSong.name}</div>
                <div className='text-emerald-300 hover:text-emerald-500 text-xs'>{currentartistFirstName} {" "+currentartistLastName}</div>
            </div>
            </div>
            {/* from-green-400 to-blue-500  */}
            <div className={`w-1/2 h-12 flex flex-col bg-gradient-to-r  justify-center items-center bg-emerald-500 text-black rounded-full ${isPause?( "from-green-400 to-blue-500"):("from-pink-500 to-yellow-500")   }`}>
                <div className='flex w-1/3  text-xl justify-between'>
                    {/* Controls */}
                    {/* <Icon icon="mingcute:shuffle-line"    fontSize={20} className='cursor-pointer   text-white   '/> */}
                    <Icon icon="fluent:previous-16-filled"fontSize={20}  className='cursor-pointer  text-white'onClick={handlePreviousClick}   />
                    
                    {isPause? (<Icon icon="solar:play-bold"  fontSize={30}  className='cursor-pointer  text-white '  onClick={togglePlayPause} />): (<Icon icon="zondicons:pause-solid"    fontSize={30}  className='cursor-pointer  text-white '  onClick={togglePlayPause}    />)
                    }
                    
                    
                    <Icon icon="fluent:next-32-filled"    fontSize={20}  className='cursor-pointer  text-white '   
                    onClick={handleNextClick}
                 
                    
                    / >
                    <Icon icon="material-symbols:repeat"  fontSize={20}  className='cursor-pointer  text-white' onClick={repeat}  />
                </div> 
                {/* <div className="w-1/2 border flex  " >
               
                </div> */}
         
            </div>
          
            <div className='flex w-1/4 justify-end items-center cursor-pointer'

            // click for the first time set the addPlayList to true
            onClick={()=>{
                setAddPlayListModalOccur(true)
            }}
            
            >
            <Icon icon="material-symbols:playlist-add" fontSize={25} 
                    
            />
            </div>

        </div>
  
            }
         </div>)

}

export default  LoggedInContainer