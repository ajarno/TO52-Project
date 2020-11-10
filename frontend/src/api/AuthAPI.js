import API from "./API"; 

const config = {
  headers :{
    "Content-Type": "application/json",
   }
}

const signIn = (email, password) => API.post(
    "auth/users/", 
    {email,password},
    config
  )
  .catch((error) => console.log( error.response.request._response ) );

export { signIn };