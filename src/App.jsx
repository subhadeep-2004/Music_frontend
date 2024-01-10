import logo from './logo.svg';
// import './App.css';

import { useState } from 'react';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import Login from './route/Login.jsx';
import SignUp from './route/SignUp.jsx'
import Home from './route/Home.jsx'
import LoggedInHome from './route/LoggedInHome.jsx'
import { useCookies } from 'react-cookie';
import UploadSong from './route/UploadSong.jsx'
import MySong from './route/MySong.jsx'
import SearchPage from './route/SearchPage.jsx';
import songContext from './contexts/songContext.jsx';
import artistFirstNameContext from './contexts/artistFirstName.jsx';
import artistLastNameContext from './contexts/artistLastName.jsx';
import SinglePlayListView from './route/SinglePlayListView.jsx';
import Library from './route/Library.jsx';
import { makeAuthenticatedgetRequest } from './util/serverHelper.jsx';
import { useEffect } from 'react';
const a= <h1 className='bg-blue-500'>Hii</h1>
function App() {


  

  const [currentSong,setCurrSong]=useState(null)
  const [ currentartistFirstName,setartistFirstName]=useState(null)
  const[currentartistLastName,setartistLastName]=useState(null);
  const [cookie,setCookie]=useCookies(["token"]);
  const[currIndex,setCurrIndex]= useState();
  const [songData,setSongData]=useState()
  const[isPause,SetIsPause]= useState(true)
  const[songPlayed, setSongPlayed]= useState(null)
  // For checking cookie move to the inspect then application
  const[username,setUserName]=  useState();


  return (
    <div className="App">
      <div className="w-screen h-screen ">
      <BrowserRouter>

      {/* if the token exist in the cookie then we can visit /home */}
      
        {cookie.token ?(

          //Logged in Route
          <songContext.Provider value={{currentSong,setCurrSong,songPlayed,setSongPlayed,isPause,SetIsPause,currIndex,setCurrIndex,songData,setSongData,username,setUserName} }>  
          <artistFirstNameContext.Provider value={{currentartistFirstName,setartistFirstName}}>
          <artistLastNameContext.Provider value={{currentartistLastName,setartistLastName}}>
        <Routes>
          {/* addING routes component */} 
      

                {/*this element have the acess to all the logged in page with the help of songCOntextProvider */}

          <Route path='/' element={a} ></Route>

              
          <Route path='/home' element={<LoggedInHome/>}></Route>

          <Route path='/uploadSong' element={<UploadSong/>}/>
          {/* if any random route or login or signup is called then navigate to the home route*/}
          
          <Route path='/mySong' element={<MySong />}/>
          <Route path='*' element={<Navigate to="/home"/>} />
          <Route path='/uploadSong' element={ <UploadSong/>} />
          <Route path='/search' element={<SearchPage />}  />
          <Route path='/library' element={ <Library />} />
          <Route path='/playlist/:playlistId' element={<SinglePlayListView />} />
          </Routes>

          </artistLastNameContext.Provider> 
          </artistFirstNameContext.Provider> 
          </songContext.Provider>

          ):(
            //looged out routes
            <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signUp' element={<SignUp/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
          
          {/* if any random route or login or signup is called then navigate to the home route*/}
            <Route path='*' element={<Navigate to="/login"/>} />
            </Routes>
            
          )



       
        }
      </BrowserRouter>

      </div>



    </div>
  );
}


export default App;
