import { React, useState } from "react";
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faDriversLicense, faHouse } from "@fortawesome/free-solid-svg-icons";
import dl from "../images/driver-license.png"
import { validValidUpto, validdob, validisssueDate } from '../Validations/Validates';
import Alert from "./Alert";

const intialValues = {
    issueDate: new Date(), validUpto: new Date(), OLAuthority: "", dob: new Date(), address: ""
}
const DLdetails = () => {

    const navigate = useNavigate();
    const [values, setValues] = useState(intialValues);
    const [Errors, setErrors] = useState({});
    const [alert, setalert] = useState(null);
    const showAlert = (message, Type) => {
        setalert({ message: message, type: Type });
    }

    const handleInputs = (e) => {
        const { name, value } = e.target;

        let currentErrors = JSON.parse(JSON.stringify(Errors));

        switch (name) {
            case 'issueDate':
                setValues({ ...values, issueDate: value });
                if (!value || validisssueDate(value)) {
                    currentErrors[name] = 'Please enter valid Issue Date.'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'dob':
                setValues({ ...values, dob: value });
                if (validdob(value)) {
                    currentErrors[name] = 'Please enter valid Date of Birth.'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'validUpto':
                if (validValidUpto(values.issueDate, value, currentErrors)) {
                    setValues({ ...values, validUpto: value });
                }
                break;
            case 'OLAuthority':
                setValues({ ...values, OLAuthority: value });
                if (!value) {
                    currentErrors[name] = 'Please enter valid DL Authority No..'
                } else {
                    delete currentErrors[name];
                }
                break;
            case 'address':
                setValues({ ...values, address: value });
                if (!value) {
                    currentErrors[name] = 'Address must be as mentioned in DL.'
                } else {
                    delete currentErrors[name];
                }
                break;
            default:
                break;
        }

        setErrors(currentErrors);
    };

    const PostData = async (e) => {
        e.preventDefault();
        const { issueDate, validUpto, OLAuthority, dob, address } = values

        const res = await fetch("/admin/add-driver/dldetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                issueDate, validUpto, OLAuthority, dob, address
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
            navigate('/admin/add-driver/dldetails/dlvehicleclass', { replace: true });
        }
    }
    return (
        <>
            <Alert alert={alert} />
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title"> Driving Licence Details </h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-xl-6">
                                <div className="text-center">
                                    <img src={dl} alt="user" className="image-res" />
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-6">
                                <form method="POST">
                                    <div className="input-field">
                                        <label htmlFor="issueDate" className="form-label">
                                            <FontAwesomeIcon icon={faCalendarDay} /> Issue Date
                                        </label>
                                        <input
                                            formNoValidate
                                            autoComplete="off"
                                            type="Date"
                                            name="issueDate"
                                            className="form-control"
                                            id="issueDate"
                                            placeholder="Issue Date"
                                            onBlur={handleInputs}
                                        />
                                        <span className={Errors && Errors.issueDate ? 'error' : 'validation'}>{Errors.issueDate}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="validUpto" className="form-label">
                                            <FontAwesomeIcon icon={faCalendarDay} /> Valid Upto
                                        </label>
                                        <input
                                            formNoValidate
                                            autoComplete="off"
                                            type="Date"
                                            name="validUpto"
                                            className="form-control"
                                            id="validUpto"
                                            placeholder="Valid Upto"
                                            onBlur={handleInputs}
                                        />
                                        <span className={Errors && Errors.validUpto ? 'error' : 'validation'}>{Errors.validUpto}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="OLAuthority" className="form-label">
                                            <FontAwesomeIcon icon={faDriversLicense} /> DL Authority
                                        </label>
                                        <input
                                            formNoValidate
                                            autoComplete="off"
                                            type="text"
                                            name="OLAuthority"
                                            className="form-control"
                                            id="OLAuthority"
                                            placeholder="DL Authority as per DL"
                                            onBlur={handleInputs}
                                        />
                                        <span className={Errors && Errors.OLAuthority ? 'error' : 'validation'}>{Errors.OLAuthority}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="dob" className="form-label">
                                            <FontAwesomeIcon icon={faCalendarDay} /> DOB
                                        </label>
                                        <input
                                            formNoValidate
                                            autoComplete="off"
                                            type="Date"
                                            name="dob"
                                            className="form-control"
                                            id="dob"
                                            placeholder="Your date of birth"
                                            onBlur={handleInputs}
                                        />
                                        <span className={Errors && Errors.dob ? 'error' : 'validation'}>{Errors.dob}</span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="address" className="form-label">
                                            <FontAwesomeIcon icon={faHouse} /> Address
                                        </label>
                                        <input
                                            formNoValidate
                                            autoComplete="off"
                                            type="text"
                                            name="address"
                                            className="form-control"
                                            id="address"
                                            placeholder="Address mentioned in DL"
                                            onBlur={handleInputs}
                                        />
                                        <span className={Errors && Errors.address ? 'error' : 'validation'}>{Errors.address}</span>
                                    </div>
                                    <button type="submit" className="btn btn-outline-secondary" disabled={Object.entries(Errors || {}).length > 0} onClick={PostData}>Save & Next</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DLdetails;