import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TextInput';
import { Link } from 'react-router-dom';
import Password from '../components/shared/Password';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import {makeUnAuthenticatedpostRequest} from '../util/serverHelper';
import  {useNavigate}  from 'react-router-dom';
function Login() {


    //Using the hooks to change  the present state 
    const[email,setEmail]= useState("");
    const[password,setPassword]= useState("");
    
    const[cookie,setCookie]= useCookies(["token"])

    const navigate=useNavigate();

   async function logIn (){
   
    const data={
        email:email,
        pwd:password,
       
    };
    
   const response=await makeUnAuthenticatedpostRequest("/auth/login",data)
   if(response && !response.err){
    const token=response.token;
    const date= new Date();
    date.setDate(date.getDate()+30);
    // addding cookie with the help of useCookie from react-dom so that our cookie valid upto 30 days
    setCookie("token",token,{path:"/",expires:date}) //we can use setCookie after importiing a hooks name useCookies
    console.log(response);
    alert("sucess");
    navigate("/home")
   }
   else{
    console.log(response);
    console.log("Failure");
   }
}

 
    return ( 
        <div className="login w-full h-full flex flex-col items-center ">

            <div className='logo bg-neutral-200 p-5 w-full flex justify-center'>
                            
                <Icon icon="fxemoji:musicalnote" width={40}/>
                <h1 className=' ml-2 font-bold text-3xl'>Musicify</h1>  
                {/* <Icon icon="icon-park:music-cd" />
                */}
            </div> 
            <div className='TextInput w-1/4 py-8 flex flex-col items-center justify-center'>
                <div className='font-bold  mb-5 text-lg'>To continue please Login!</div>
                <TextInput
                    label="Email address or username"
                    placeholderName="Email address or username"
                    value={email}
                    setValue={setEmail}
               />

                <Password
                    label="Password"
                    placeholderName="Password"
                    value={password}
                    setValue={setPassword}


                />

                {/*  */}
                <div className='Button w-full flex justify-end mb-2'>
                <button className='button bg-emerald-300 font-semibold py-1 px-3  rounded-full'
                onClick={(e)=>{
                    e.preventDefault();
                    

                    logIn()
                }}

                >Log In

                </button>
                </div>

                {/* for the line */}
                <div className='my-2 w-full border-b border-solid border-gray-400'></div>

                <div className='my-2  font-semibold text-xs' >Don't have an account? </div>

                <div className='SignUp  text-sm  w-full border border-black rounded-full flex  justify-center items-center  p-1  hover:underline' >
                    

                    {/* Difference between Link and anchor tag realoads the whole page all the common things  like icon in anchor but in link the common things didn't re load */}
                    
               
                    <Link to="/signup "
                    className=' ' > SIGN UP FOR MUSIC</Link>

                   
                    </div>

            </div>
           
        </div>
    );

}

export default Login;