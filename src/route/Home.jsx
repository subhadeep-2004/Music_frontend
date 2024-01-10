import { Icon } from '@iconify/react';
import IconText from '../components/shared/IconsText';
import { makeAuthenticatedgetRequest } from '../util/serverHelper';
import { useEffect } from 'react';
import { useContext } from 'react';
import songContext from '../contexts/songContext';
import React from 'react';

function  Home(){
    // h full means it will take the full screen of the parent

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


    function  Card(props) {
        return <div className=' card w-1/5 p-3  rounded-lg'>

                <div className=' pb-2'>
                     <img className=' img w-full rounded-md' src={props.imgUrl} alt="" />
                </div>
                <div className='title text-white font-bold py-4'>{props.title}</div>
                <div className='description text-gray-500 '>{props.description}</div>
                </div>
    }


    return <div className="h-full w-full flex">
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
                <div>                
                    <IconText name="mingcute:search-fill"
                        text="Search"
                        active="true"
                />
                  <IconText name="material-symbols:home"
                        text="Home"
                        active="false"
                />
                  <IconText name="bi:stack"
                        text="Library"
                        active="false"
                />
                </div>

                <div className='mt-10'>
                <IconText name="gala:add"
                        text="Create Playlist"
                        active="false"
                />

                <IconText name="iconamoon:heart"
                        text="Liked Songs"
                        active="false"
                />
                </div>

                </div>
                <div className='text-xs text-gray-700 p-5 hover:text-emerald-400'>
                    Language-English
                </div>

    
            </div>
            <div className="content h-full w-4/5 overflow-auto">
                <div className='NavBar w-full text-gray-400 flex justify-end items-center'>
                    <IconText name="bx:headphone"
                        text="Free Music"
                    />

                    <div className='h-1/2 border-r flex items-center m-2'>

                    </div>
                    <button className='button h-1/2 bg-emerald-300 font-semibold  rounded-full  text-black text-sm flex justify-center items-center p-2'>Log In</button>
                    <button className='button h-1/2 bg-emerald-300 font-semibold  rounded-full text-black  text-sm flex justify-center items-center mx-2 p-2'>Sign Up</button>


                </div>
                {/* right panel */}

                <div className='w-full p-5 pt-0'>
                    {/* sending the card details in the form of props different List should have different card detailss */}
                   < PlayListView title="Focus" 
                        cardDetails={FirstcardDetails}
                   
                   />
                   < PlayListView title="Sound of India"
                        cardDetails={FirstcardDetails}
                   />
                   < PlayListView title="Rock" 
                        cardDetails={FirstcardDetails}
                   />
                </div>
            </div>
         </div>
}




export default  Home