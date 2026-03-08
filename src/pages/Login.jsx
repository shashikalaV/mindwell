import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

const navigate = useNavigate();

const [isLogin,setIsLogin] = useState(true);

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");

const [name,setName] = useState("");
const [bio,setBio] = useState("");

const login = () => {

const account = JSON.parse(localStorage.getItem("mindwell_account"));

if(!account){
alert("Account not found. Please create one.");
return;
}

if(account.username === username && account.password === password){

localStorage.setItem("mindwell_user",JSON.stringify(account));

navigate("/");

}else{
alert("Invalid username or password");
}

};

const createAccount = () => {

if(!username || !password || !name){
alert("Please fill required fields");
return;
}

const account = {
username,
password,
name,
bio,
joined:new Date().toLocaleDateString()
};

localStorage.setItem("mindwell_account",JSON.stringify(account));

localStorage.setItem("mindwell_user",JSON.stringify(account));

navigate("/");

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