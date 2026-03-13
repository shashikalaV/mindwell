import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

const navigate = useNavigate();

const [isLogin,setIsLogin] = useState(true);

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");

const [name,setName] = useState("");
const [bio,setBio] = useState("");

/* AUTO FILL USERNAME */

useEffect(()=>{

const storedUser = JSON.parse(localStorage.getItem("mindwell_user"));

if(storedUser){
setUsername(storedUser.username);
}

},[]);


/* LOGIN FUNCTION */

const login = async ()=>{

if(!username || !password){
alert("Please enter username and password");
return;
}

try{

const response = await fetch("http://127.0.0.1:5000/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username: username.trim(),
password: password.trim()
})
});

const data = await response.json();

console.log("LOGIN RESPONSE:",data);

if(response.status === 400){
alert(data.message);
return;
}

if(response.status === 500){
alert("Server error");
return;
}

/* SAVE USER */

localStorage.setItem("mindwell_user",JSON.stringify(data.user));

/* FORCE NAVIGATION */

window.location.href = "/mindwell/#/home";

}catch(error){

console.log(error);
alert("Cannot connect to server");

}

};


/* CREATE ACCOUNT */

const createAccount = async ()=>{

if(!username || !password || !name){
alert("Please fill required fields");
return;
}

try{

const response = await fetch("http://127.0.0.1:5000/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username: username.trim(),
password: password.trim(),
name: name.trim(),
bio
})
});

const data = await response.json();

console.log("REGISTER RESPONSE:",data);

if(response.status === 400){
alert(data.message);
return;
}

localStorage.setItem("mindwell_user",JSON.stringify(data.user));

navigate("/home");

}catch(error){

console.log(error);
alert("Server error");

}

};


return(

<div style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
height:"80vh",
background:"#f4f6fb"
}}>

<div style={{
background:"white",
padding:"40px",
borderRadius:"12px",
boxShadow:"0 5px 20px rgba(0,0,0,0.1)",
width:"350px",
textAlign:"center"
}}>

<h2>{isLogin ? "Login" : "Create Account"}</h2>

<input
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
style={inputStyle}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={inputStyle}
/>

{!isLogin && (

<>
<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={inputStyle}
/>

<textarea
placeholder="Bio"
value={bio}
onChange={(e)=>setBio(e.target.value)}
style={{...inputStyle,height:"80px"}}
/>
</>

)}

<button
type="button"
onClick={isLogin ? login : createAccount}
style={buttonStyle}
>

{isLogin ? "Login" : "Create Account"}

</button>

<p
onClick={()=>setIsLogin(!isLogin)}
style={{marginTop:"15px",cursor:"pointer",color:"#6C63FF"}}
>

{isLogin ? "Create new account" : "Back to Login"}

</p>

</div>

</div>

);

}


const inputStyle={
width:"100%",
padding:"10px",
marginTop:"15px",
borderRadius:"8px",
border:"1px solid #ccc"
};

const buttonStyle={
marginTop:"20px",
padding:"12px",
width:"100%",
background:"#6C63FF",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer"
};

export default Login;