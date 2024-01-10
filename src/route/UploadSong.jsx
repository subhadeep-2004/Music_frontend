import { Icon } from '@iconify/react';
import IconText from '../components/shared/IconsText';
import TextInput from '../components/shared/TextInput';
import React from 'react';
import CloudinaryUpload from '../components/shared/CloudinaryUpload';
import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from 'react';
import {makeAuthenticatedpostRequest} from '../util/serverHelper.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import  {upload_preset} from '../config_cloudinary.js';
import LoggedInContainer from '../containers/LoggedInContainer';
import { useEffect } from 'react';
import songContext from '../contexts/songContext.jsx';
import { useContext } from 'react';
import { makeAuthenticatedgetRequest } from '../util/serverHelper.jsx';


function  UploadSong(){
    // h full means it will take the full screen of the parent
    const [name,setName]= useState("")
    const[thumbnail,setThumbnail]= useState("")
    const[playlist,setPlayListUrl]=useState("")
    const [song,setSongUrl]= useState("")
    const[uploadedSongFileName,setUploadedSongFileName]= useState("");
    const [publicId, setPublicId] = useState("");
    const [cloudName] = useState("dekotpl63");

    const[inputFocused,setInputFocused]= useState(false);

    const{songData,setSongData,username,setUserName}=useContext(songContext)
    useEffect(()=>{

        async function getMySong() {

            const response= await makeAuthenticatedgetRequest("/song/get/Mysongs")
        
          // It helps yo set the SongData response.songs is a array of many songs
         
            // console.log(response.songs);
            // console.log(respons);
            setSongData(response.songs);           
            
        }

        //getting the userDetails 
        async function userDetails() {
            const response= await makeAuthenticatedgetRequest("/song/user");
            console.log(response);
            setUserName(response.userName)
    
               
            }
            userDetails()
        getMySong()
    },[])




    const navigate= useNavigate();


   async function submitSong() {
        // console.log(thumbnail);
        // console.log(name);
        // console.log(song);
        const data={
            name:name,
            thumbnail:thumbnail,
            track:song
        }

        const response = await makeAuthenticatedpostRequest('/song/create',data);
        if(response &&!response.err){
            alert("Song Created")
            console.log(response);
            navigate("/home")
        }else{
            alert("Song not created");
        }

        
    }
    
  const [uwConfig] = useState({
    cloudName,
    upload_preset
  })
  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });



    return (<LoggedInContainer songData={songData} currActiveScreen="uploadSong" >
        <div class="flex flex-col items-center justify-center h-screen ">


        <div class="mb-4 flex items-center justify-center w-full ">
             <img class="w-1/5 rounded-md" src="https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Centered Image" />
        </div>

    
        <div class="">
        <div className='text-white font-bold text-xl p-1 px-0'>Upload Song</div>
        <div className='my-3 flex flex-col'>



        <label htmlFor="name" class="block text-sm text-white">Name</label>
        <input id="name" type="text" placeholder="Enter your name" className="p-2 border text-sm border-gray-400 rounded-full my-3" 
        value={name}
        onFocus={()=>{
            setInputFocused(true)
        }}
        onChange={(e)=>{
            setName(e.target.value)
        }}
        
        />

       
        
        <label htmlFor="Thumbnail" className="block text-sm text-white">Thumbnail</label>
        <input id="Thumbnail" type="text" placeholder="Enter your Thumbnail" className="p-2 border text-sm border-gray-400  my-3 rounded-full" 
        value={thumbnail}

        onChange={(e)=>{
            setThumbnail(e.target.value)
        }}
        
        />
        {uploadedSongFileName? 
        (<div className='upload-song  bg-white my-5 flex rounded-full p-2'>
        
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36"><path fill="currentColor" d="M32.16 16.08L8.94 4.47A2.07 2.07 0 0 0 6 6.32v23.21a2.06 2.06 0 0 0 3 1.85l23.16-11.61a2.07 2.07 0 0 0 0-3.7Z" class="clr-i-solid clr-i-solid-path-1"/><path fill="none" d="M0 0h36v36H0z"/></svg> 
         
         
         <div className='px-3 font-semibold'>
         {uploadedSongFileName.substring(0,20)}...
         </div>
        </div>                       
        
        ) :
        (
        // Functionality provided by the cloudinary that is the select track button 
        <CloudinaryUpload
         uwConfig={uwConfig}
        setUrl={setSongUrl}
         setPublicId={setPublicId}
         setName={setUploadedSongFileName}
        />
        )}


{uploadedSongFileName?(        
<div className="flex w-full justify-end"> 
 <button id="upload_widget"
    className="button bg-emerald-300 text-xs my-4 font-semibold py-1 px-3  rounded-lg"
   onClick={submitSong}
 >
     Submit
 </button>
 </div>
):null }
        </div>
        </div>

    </div>

    </LoggedInContainer>
    
)   
       
       
}




export default  UploadSong