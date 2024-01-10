import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TextInput';
import { Link, useNavigate } from 'react-router-dom';

import Password from '../components/shared/Password';
import { useState } from 'react';
import {makeUnAuthenticatedpostRequest} from '../util/serverHelper'
import { useCookies} from 'react-cookie';

function SignUp() {

    // Using Hooks 
    const [email,setEmail]=useState("");
    const [Confirmemail,setConfirmEmail]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [FirstName,setFirstName]=useState("");
    const [LastName,setLastName]=useState("");
    const navigate=useNavigate()

    //hooks  initially a array with token is send
    const[cookie,setCookie]= useCookies(["token"]);

   async function signUp (){
        if(Confirmemail!=email){
            alert("Not match");
            return;

        };
        const data={
            email:email,
            pwd:password,
            userName:username,
            firstName:FirstName,
            lastName:LastName
        };
        
       const response=await makeUnAuthenticatedpostRequest("/auth/register",data)
       if(response){
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
        <div className="signUp w-full h-full flex flex-col items-center ">

            <div className='logo bg-neutral-200 p-5 w-full flex justify-center'>
                            
                <Icon icon="fxemoji:musicalnote" width={40}/>
                <h1 className=' ml-2 font-bold text-3xl'>Musicify</h1>  
                {/* <Icon icon="icon-park:music-cd" />
                */}
            </div> 
            <div className='TextInput w-1/4 py-8 flex flex-col items-center justify-center'>
                <div className='font-bold  mb-5 text-lg'>Sign up to start Listening</div>
               
               {/* Email address */}
                <TextInput
                    label="Email address"
                    placeholderName="Enter your email address"
                    value={email}
                    setValue={setEmail}
               />
                <TextInput
                    label="Confirm Email address"
                    placeholderName="Enter your email again"
                    value={Confirmemail}
                    setValue={setConfirmEmail}
               />

               {/* Password */}

                <Password
                    label="Create password"
                    placeholderName="Enter your password"
                    value={password}
                    setValue={setPassword}

                />


               
                <TextInput
                    label="What should we call you?"
                    placeholderName="Enter a username"
                    value={username}
                    setValue={setUsername}
               />
             
             
                <TextInput
                    label="First Name"
                    placeholderName="First Name"
                    value={FirstName}
                    setValue={setFirstName}
               />

                <TextInput
                    label="Last Name"
                    placeholderName="Last Name"
                    value={LastName}
                    setValue={setLastName}
               />
              


                <div className='Button w-full flex justify-end mb-2'>

                    {/*OnClick the button then signUp is called*/}
                <button className='button bg-emerald-300  font-semibold py-1 px-3  rounded-full' 
                onClick={(e)=>{
                e.preventDefault();
                signUp()
                }}>Sign Up

                </button>
                </div>

                {/* for the line */}
                <div className='my-2 w-full border-b border-solid border-gray-400'></div>

                <div className='my-2  font-semibold text-xs' >Already have an account? </div>

                <div className='SignUp   w-full border border-black rounded-full flex justify-center p-1 text-sm hover:underline' >  <Link to="/login">LOGIN FOR MUSIC </Link></div>

            </div>
           
        </div>
    );

}

export default SignUp;