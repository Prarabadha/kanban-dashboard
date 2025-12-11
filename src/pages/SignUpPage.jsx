import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";


export default function SignUpPage() {
  const navigate = useNavigate()
  const[name,setName] = useState('');
  const[userName,setUserName] = useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[contactNum,setContactNum] = useState(0);

 const handleSignUp=(e)=>{
  e.preventDefault()
  localStorage.setItem('userlogin' , JSON.stringify({name , userName , email , password}));
  navigate('/')
 }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100">
      <div className="w-[450px] p-8 bg-white shadow-2xl rounded-2xl border border-gray-200">

        <div>
         <Link to='/'>
          <FaArrowLeft className='w-5 h-5 cursor-pointer'/>
         </Link>
        </div>
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Kanban App
        </h2>

        {/* Login Form */}
        <form className="flex flex-col gap-5">

          {/* Email or Username */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold">Name</label>
            <input 
              type="text"
              placeholder="Enter your name"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e)=> setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold">UserName</label>
            <input 
              type="text"
              placeholder="Enter your username"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e)=>setUserName(e.target.value)}
              value={userName}
            />
          </div>

                    <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold">Email</label>
            <input 
              type="text"
              placeholder="Enter email"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold">Contact Number</label>
            <input 
              type="number"
              placeholder="Enter contact number"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e)=>setContactNum(e.target.value)}
              value={contactNum}
            />
          </div>


          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-semibold">Password</label>
            <input 
              type="password"
              placeholder="Enter password"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
            />
          </div>

          {/* Login Button */}
          <button 
            onClick={handleSignUp}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg transition-all duration-200 cursor-pointer"
          >
            Sign Up
          </button>
        </form>


      </div>
    </div>
  )
}
