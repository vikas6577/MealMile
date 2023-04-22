import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

export default function Signup() {
  const [credentials,setCredentinals]=useState({name:"",email:"",password:"",geolocation:""})
  let navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:5000/api/createuser",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name:credentials.name,email:credentials.email, password:credentials.password, location:credentials.geolocation})
    });
    const json=await response.json();
    console.log(json);
    
    if(!json.success){
        alert("Enter Valid Credentials")
    }
    if(json.success){
      navigate('/')
    }
  }
  const onChange=(event)=>{
    setCredentinals({...credentials,[event.target.name]:event.target.value})
    // console.log(event.target.value)
  }
  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
          <div id="emailHelp" className="form-text">
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control" name="geolocation" value={credentials.location} onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1" name="password" value={credentials.password } onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <Link to="/login" className="btn btn-primary m-3">Already a user</Link>
      </form>
    </div>
  );
}
