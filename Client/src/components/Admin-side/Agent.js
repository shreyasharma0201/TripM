import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import Alert from './Alert';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faUserAlt, faMessage } from "@fortawesome/free-solid-svg-icons";
import agent from "../images/travel-agent.png"
import { validname, validEmail, validphone } from "../Validations/Validates";

const intialValues = {
    name: "", email: "", phone: Number 
}

const Agent = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState(intialValues);
    const [Errors, setErrors] = useState({});
    const [alert, setalert] = useState(null);

    const handleInputs = (e) => {
        const { name, value } = e.target;
        let currentErrors = JSON.parse(JSON.stringify(Errors));
        
        switch (name) {
            case 'name':
                setValues({ ...values, name: value });
                if(validname(value)){
                    currentErrors[name] = 'Name should have 2-30 characters.'
                }else{
                    delete currentErrors[name];
                }
                break;
            case 'email':
                setValues({ ...values, email: value });
                if (!value || validEmail(value)) {
                    currentErrors[name] = 'Please fill email properly.'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'phone':
                setValues({ ...values, phone: value });
                if (validphone(value)) {
                    currentErrors[name] = 'Phone no. should be 10 digits.'
                } else {
                    delete currentErrors[name];
                }
                break;
            default:
                break;
        }

        setErrors(currentErrors);
    };

    const showAlert = (message, Type) => {
        setalert({ message: message, type: Type });
    }

    const PostData = async (e) => {
        e.preventDefault();
        
        const { name, email, phone } = values;
        
        const res = await fetch("/admin/add-agent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                name, email, phone
            })
        });

        const data = await res.json();
        const getalert = new Object(data);

        if (res.status === 422 || !data) {
            window.scroll(0, 0);
            if (!showAlert(getalert.message, "danger")) {
                window.location.reload();
            } 
        } else {
            window.scroll(0, 0);
            showAlert(getalert.message, "success");
            window.location.reload();
        }
    }

    return (
        <>
            
            <Alert alert={alert} />
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form my-1">
                            <h2 className="form-title"> Add Agent's Details</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-xl-6">
                                <div className="text-center">
                                    <img src={agent} alt="user" className="image-res" />
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-6">
                                <form method="POST" noValidate>
                                    <div className="input-field">
                                        <label htmlFor="name" className="form-label">
                                            <FontAwesomeIcon icon={faUserAlt} /> Name
                                        </label>
                                        <input
                                            autoComplete="off"
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            id="name"
                                            placeholder="Agent's name"
                                            onBlur={handleInputs}
                                            formNoValidate
                                        />
                                        <span className={Errors && Errors.name ? 'error' : 'validation'}>{Errors.name}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="email" className="form-label">
                                            <FontAwesomeIcon icon={faMessage} /> Email ID
                                        </label>
                                        <input
                                            autoComplete="off"
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Agent's email id"
                                            onBlur={handleInputs}
                                            formNoValidate
                                        />
                                        <span className={Errors && Errors.email ? 'error' : 'validation'}>{Errors.email}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="phone" className="form-label">
                                            <FontAwesomeIcon icon={faPhone} /> Phone
                                        </label>
                                        <input
                                            type="Number"
                                            name="phone"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Agent's phone number"
                                            onBlur={handleInputs}
                                            formNoValidate
                                            autoComplete="off"
                                        />
                                        <span className={Errors && Errors.phone ? 'error' : 'validation'}>{Errors.phone}</span>
                                    </div>
                                    <button type="submit" className="btn btn-outline-secondary" disabled={Object.entries(Errors || {}).length > 0} onClick={PostData} >Add Agent</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Agent;
