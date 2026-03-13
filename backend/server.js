const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

/* MongoDB connection */

mongoose.connect("mongodb://localhost:27017/mindwell")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* TEST ROUTE */

app.get("/",(req,res)=>{
res.send("MindWell Backend Running");
});

/* REGISTER API */

app.post("/register", async (req,res)=>{

try{

const {username,password,name,bio,image} = req.body;

const cleanUsername = username.trim();
const cleanPassword = password.trim();

const existingUser = await User.findOne({username: cleanUsername});

if(existingUser){
return res.status(400).json({message:"Username already exists"});
}

const newUser = new User({
username: cleanUsername,
password: cleanPassword,
name: name ? name.trim() : "",
bio: bio || "",
image: image || "",
joined:new Date().toLocaleDateString()
});

await newUser.save();

res.json({
message:"Account created",
user:newUser
});

}catch(error){

console.log(error);
res.status(500).json({message:"Server error"});

}

});

/* LOGIN API */

app.post("/login", async (req,res)=>{

try{

const {username,password} = req.body;

const cleanUsername = username.trim();
const cleanPassword = password.trim();

const user = await User.findOne({username: cleanUsername});

if(!user){
return res.status(400).json({message:"User not found"});
}

if(user.password !== cleanPassword){
return res.status(400).json({message:"Incorrect password"});
}

res.json({
message:"Login successful",
user
});

}catch(error){

console.log(error);
res.status(500).json({message:"Server error"});
}

});

/* UPDATE PROFILE API (for photo, username, bio) */

app.put("/updateProfile", async (req,res)=>{

try{

const {username,bio,image} = req.body;

const updatedUser = await User.findOneAndUpdate(
{username},
{bio,image},
{new:true}
);

res.json({
message:"Profile updated successfully",
user:updatedUser
});

}catch(error){

console.log(error);
res.status(500).json({message:"Profile update failed"});

}

});

/* SERVER */

app.listen(5000,()=>{
console.log("Server running on port 5000");
});
