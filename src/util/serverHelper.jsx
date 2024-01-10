
import { data } from "autoprefixer";
import backEndUrl from "./config.js";


// for the un-authenticate request like in sign-up 
// route is the specific route  like /auth/register
// async function makeUnAuthenticatedpostRequest (route,body) {
//     // fetch in deafult gives a get request
//    const p= await fetch(backEndUrl+route, {
//     method: 'POST',
//     body: JSON.stringify(body),
//     headers: {
//       'Content-type': 'application/json',
//     },
//   })
//    let response= await p.json();
//    return response;

// }



export const makeUnAuthenticatedpostRequest = async (route, body) => {

//  fetch(backEndUrl+route, {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//       },
     
//       body: JSON.stringify(body),
//   }).then((response) =>{ response.json()
//     .then(data=>{
//       console.log(data);
      
//     })
//   })
  
//   .catch(err =>{
//     console.log(err);
//   });

try {
  const response = await fetch(backEndUrl + route, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
  });

  const data = await response.json();
  

  return data; // Return the data to the caller
} catch (err) {
  console.error(err);
  throw err; // Rethrow the error to the caller if needed
}
  

//   const p = await fetch(backEndUrl+route, {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
// })

// let response= await p.json();
// return response;



  
  // const formattedResponse = await response.json();
  // return formattedResponse;
};


// for the authenticate request like to create song
// route is the specific route  like /song/create

export const makeAuthenticatedpostRequest=async function makeAuthenticatedpostRequest( route ,body){
const token=getToken();

  try {
    const response = await fetch(backEndUrl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`

            // token is in the cookie
        },
        body: JSON.stringify(body),
    });
  
    const data = await response.json();
    
  return data; // Return the data to the caller
} catch (err) {
  console.error(err);
  throw err; // Rethrow the error to the caller if needed
}
}


// export const makeAuthenticatedgetRequest=async function makeAuthenticatedgetRequest( route ){
//   const token=getToken();
  
//     try {
//       const response = await fetch(backEndUrl + route, {
//           method: "GET",
//           headers: {
//               "Content-Type": "application/json",
//               Authorization:`Bearer ${token}`
  
//               // token is in the cookie
//           },
         
//       });
    
//       const data = await response.json();
      
//     return data; // Return the data to the caller
//   } catch (err) {
//     console.error(err);
//     throw err; // Rethrow the error to the caller if needed
//   }
//   }
  
export const makeAuthenticatedgetRequest = async (route) => {
  const token = getToken();

try{
  const response = await fetch(backEndUrl + route, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
  });
 
  const formattedResponse = await response.json();
 
  return formattedResponse;

}catch(err){
  console.log(err);
  throw err
}
};








function getToken() {
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
);

return accessToken;
  
}



