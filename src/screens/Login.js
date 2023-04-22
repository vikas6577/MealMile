import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [credentials, setCredentials] = useState({email:"",password:""})
  const handleLogin=async()=>{

    const response=await fetch('http://localhost:5000/login',{
        method:'post',
        body:JSON.stringify({email:credentials.email,password:credentials.password}),
        headers:{
            'Content-Type':'application/json'
        }
    });
    const json=await response.json();
    console.log(json);
    
    if(!json.success){
        alert("Enter Valid Credentials")
    }
  }
  const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
    console.log(event.target.value)
  }

  return (
    <div className='container mt-5'><form onSubmit={handleLogin}>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange}/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} />
    </div>
    <button type="submit" className="btn btn-success">Submit</button>
    <Link to="/createuser" className='m-3 btn btn-primary'>New User</Link>
  </form></div>
  )
}
