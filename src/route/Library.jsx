
import React from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useState } from "react";
import { useEffect } from "react";
import { makeAuthenticatedgetRequest } from "../util/serverHelper";
import { useNavigate } from "react-router-dom";
import songContext from "../contexts/songContext";
import { useContext } from "react";
function Library() {
    const [playListData,setplayListData]= useState([]);
    
    const{songData,setSongData,username,setUserName}=useContext(songContext)
    

    useEffect(()=>{
        async function getData(){
                const response = await makeAuthenticatedgetRequest("/playlist/get/me");
                console.log(response.data);
                setplayListData(response.data);
           
     
        }
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
        getMySong()
        getData()
        userDetails()
    },[])

    function  Card(props) {
            const navigate= useNavigate()

        return <div className=' card w-full p-3  rounded-lg' onClick={()=>{navigate("/playlist/"+props.playListId)}}>

                <div className=' pb-2'>
                     <img className=' img w-full rounded-md' src={props.imgUrl} alt="" />
                </div>
                <div className='title text-white font-bold py-4'>{props.title}</div>
                <div className='description text-gray-500 '>{props.description}</div>
                </div>
    }
    return ( <LoggedInContainer currActiveScreen="library" songData={songData} > <div className="text-white p-4 font-semibold text-xl">My PlayLists</div>

        <div className=" py-5 grid gap-4 grid-cols-5  ">
        {/* <Card title="Title" description="" imgUrl="https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_1280.png" />
        <Card title="Title" description="" imgUrl="https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_1280.png" />
        <Card title="Title" description="" imgUrl="https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_1280.png" />
        <Card title="Title" description="" imgUrl="https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_1280.png" />
        <Card title="Title" description="" imgUrl="https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_1280.png" /> */}

        {
            playListData.map((item)=>{
                return <Card title={item.name} 
                    imgUrl={item.thumbnail}
                    description="Your PlayList"
                    playListId={item._id}
                />
            })

        }
        
        
        
        </div>
    </LoggedInContainer>
    
    
    
    
    
    
    
    
    
    
    )
    
}


export default Library