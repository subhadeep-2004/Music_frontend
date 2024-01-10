import { Icon } from '@iconify/react';
import IconText from '../components/shared/IconsText';
import { Howl } from 'howler';
import React from 'react';
import { useState } from 'react';
import LoggedInContainer from '../containers/LoggedInContainer';
import { makeAuthenticatedgetRequest } from '../util/serverHelper';
import { useEffect } from 'react';
import { useContext } from 'react';
import songContext from '../contexts/songContext';
// import Icon  from '@iconify/react';
function  Home(){
    const{songData,setSongData,username,setUserName}=useContext(songContext)
   

    useEffect(()=>{

        async function getMySong() {

            const response= await makeAuthenticatedgetRequest("/song/get/Mysongs")
        
          // It helps yo set the SongData response.songs is a array of many songs
         
            // console.log(response.songs);
            // console.log(respons);
            setSongData(response.songs);           
            
        }
        // getting the user details
        async function userDetails() {
            const response= await makeAuthenticatedgetRequest("/song/user");
            console.log(response);
            setUserName(response.userName)
    
               
            }
        getMySong()
        userDetails()
    },[])
    





    // Temporay card details for only one list which contains 5
const FirstcardDetails=[
    {
        title:"Peaceful Piano",
        description:"Relax and indulge with beautiful piano pieces",
        imgUrl:"https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    {
        title:"Peacuful Guitar",
        description:"Relax and snoothing tunning of guitar",
        imgUrl:"https://images.unsplash.com/photo-1605020420620-20c943cc4669?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    {
        title:"Deep Focus",
        description:"Keep calm and focus on your goal",
        imgUrl:"https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    {
        title:"Instrumental Study",
        description:"Focus with soft study for long time",
        imgUrl:"https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    {
        title:"Lofi to Focus",
        description:"Lofi Song to focus for long time",
        imgUrl:"https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }



]

    function  PlayListView(props) {
        return <div>
                <div className='heading font-bold mb-3 mt-4 text-xl text-white'>{props.title}</div>

                <div className='w-full text-xs flex justify-between space-x-3'>


                    {
                        // Js code to map
                        props.cardDetails.map((item)=>{
                            return <Card title={item.title} 
                                  description={item.description}
                                  imgUrl={item.imgUrl}
                            />
                        })
                    }
                  
                </div>                            
                </div>
    }

    // https://cdn.pixabay.com/photo/2017/10/08/17/22/cello-2830670_1280.jpg

    function  Card(props) {
        return <div className=' card w-1/5 p-3  rounded-lg '>

                <div className=' pb-2'>
                     <img className=' img w-full rounded-md' src={props.imgUrl} alt="" />
                </div>
                <div className='title text-white font-bold py-4'>{props.title}</div>
                <div className='description text-gray-500 '>{props.description}</div>
                </div>
    }


     return(<LoggedInContainer currActiveScreen='home' songData={songData}>

                < PlayListView title="Focus" 
                        cardDetails={FirstcardDetails}
                   
                   />
                   < PlayListView title="Sound of India"
                        cardDetails={FirstcardDetails}
                   />
                   < PlayListView title="Rock" 
                        cardDetails={FirstcardDetails}
                   />

     </LoggedInContainer>)
    

}

export default  Home