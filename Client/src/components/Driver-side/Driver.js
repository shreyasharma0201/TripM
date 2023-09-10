import React from 'react'
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const intialValues = {
  email: "", password: "", 
}

function Driver() {
  const navigate = useNavigate();
  const [values, setValues] = useState(intialValues);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const LoginDriver = async(e) =>{
    e.preventDefault();
    const { email, password } = values;

    const res = await fetch("/driver-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        email, password
      })                 
    });

    const data = res.json();
    if(res.status === 200){
      navigate('/driver');
    }else{
      window.alert("Invalid Credentials");
    }
  }

  return (
    <div className='container-xxl mt-4'>
      <NavLink className="link" to="/">
        <span className='m-3'>Back to Home</span>
      </NavLink>
      <hr></hr>

      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h3 className="text-center mb-5 fs-5">Login</h3>
              <form method='POST' className='mx-auto mt-5'>
                <div className="form-outline ">
                  <FontAwesomeIcon icon={faUser} />
                  <label className="form-label" htmlFor="form2Example1">Username</label>
                  <input type="email" id="form2Example1" className="form-control" name="email"
                    value={values.email} onChange={handleInputs} placeholder="sujit@gmail.com"/>
                </div>

                <div className="form-outline ">
                  <FontAwesomeIcon icon={faLock} />
                  <label className="form-label" htmlFor="form2Example2">Password</label>
                  <input type="password" id="form2Example2" className="form-control" name="password"
                    value={values.password} onChange={handleInputs} placeholder="Sujit@1"/>
                </div>

                <button type="button" className="btn btn-outline-primary" onClick={LoginDriver}>Log In</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Driver