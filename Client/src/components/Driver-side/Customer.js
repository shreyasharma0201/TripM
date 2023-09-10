import React from "react";
import Navbar from './Navbar';
import { useState } from "react";
import customer from "../images/customer.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPhone } from "@fortawesome/free-solid-svg-icons";
import { validname, validphone } from '../Validations/Validates';
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

const intialValues = {
    name: "", phone: Number
}
const defaultValues = {
    name: "default", phone: Number(9999999999)
}

const Customer = () => {
    const [Default, setDefault] = useState(defaultValues);
    const [values, setValues] = useState(intialValues);
    const [alert, setalert] = useState(null);
    const [Errors, setErrors] = useState({});
    const navigate = useNavigate();

    const showAlert = (message, Type) => {
        setalert({ message: message, type: Type });
    }

    const handleInputs = (e) => {
        const { name, value } = e.target;
        let currentErrors = JSON.parse(JSON.stringify(Errors));

        switch (name) {
            case 'name':
                setValues({ ...values, name: value });
                if (validname(value)) {
                    currentErrors[name] = 'Name should have 2-30 characters.'
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
    }

    const PostDefault = async (e) => {
        e.preventDefault();
        const {name, phone} = Default;

        const res = await fetch("/driver/customer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                name, phone
            })
        });

        const data = await res.json();
        const getalert = new Object(data);

        if (res.status === 422 || !data) {
            window.scroll(0, 0);
            if (!showAlert(getalert.message, "danger")) {
                
            }
        } else {
            window.scroll(0, 0);
            if (!showAlert(getalert.message, "success")) {
                navigate('/driver/customer/trip-details', { replace: true });
            }
        }
    }

    const PostData = async (e) => {
        e.preventDefault();
        const { name, phone } = values;

        const res = await fetch("/driver/customer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                name, phone
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
            if (!showAlert(getalert.message, "success")) {
                navigate('/driver/customer/trip-details', { replace: true });
            }
        }
    }

    return (
        <>
            <Alert alert={alert} />
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Customer's Details</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-xl-6">
                                <div className="text-center">
                                    <img src={customer} alt="user" className="image-res" />
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-6">
                                <form>
                                    <div className="input-field">
                                        <label htmlFor="name" className="form-label">
                                            <FontAwesomeIcon icon={faUserCircle} /> Name
                                        </label>
                                        <input 
                                            autoComplete="off"
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            id="name"
                                            placeholder="Customer's name"
                                            onBlur={handleInputs}
                                            formNoValidate 
                                        />
                                        <span className={Errors && Errors.name ? 'error' : 'validation'}>{Errors.name}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="phone" className="form-label">
                                            <FontAwesomeIcon icon={faPhone} /> Phone
                                        </label>
                                        <input
                                            autoComplete="off"
                                            type="Number"
                                            name="phone"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Customer's phone number"
                                            formNoValidate
                                            onBlur={handleInputs}
                                        />
                                        <span className={Errors && Errors.phone ? 'error' : 'validation'}>{Errors.phone}</span>
                                    </div>
                                    <button type="submit" disabled={Object.entries(Errors || {}).length > 0} onClick={PostData} className="btn btn-outline-secondary">Save & Next</button>
                                    
                                    <button type="submit" onClick={PostDefault} className="mx-3 btn btn-outline-warning">Skip</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Customer;
