import { React, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Alert from "./Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faCab, faIndianRupee, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import expense from "../images/expenses.png"

const intialValues = {
  expenseDate: null, expenseType: "", trip: "", amount: Number
}

const Expense = () => {
  const [values, setValues] = useState(intialValues);
  const [alert, setalert] = useState(null);
  const [Errors, setErrors] = useState({});
  const [trips, setTrips] = useState([{}]);

  const showAlert = (message, Type) => {
    setalert({ message: message, type: Type });
  }

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    let currentErrors = JSON.parse(JSON.stringify(Errors));

    switch (name) {
      case 'expenseDate':
        if (!value) {
          currentErrors[name] = 'Choose expense Date.'
        } else {
          delete currentErrors[name];
        }
        break;
      case 'expenseType':
        if (!value) {
          currentErrors[name] = 'Choose type of expense.'
        } else {
          delete currentErrors[name];
        }
        break;
      case 'trip':
        if (!value) {
          currentErrors[name] = 'Choose trip no.'
        } else {
          delete currentErrors[name];
        }
        break;
      case 'amount':
        if (!value || value <= 0) {
          currentErrors[name] = 'Enter valid expense amount.'
        } else {
          delete currentErrors[name];
        }
        break;
      default:
        break;
    }
    setErrors(currentErrors);
  }

  function removeTime(date) {
    if (typeof date === 'string') {
      date = date.split('T')[0];
      return date;
    }
  }

  const callExpensePage = async () => {
    try {
      const res = await fetch('/driver/expense', {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      setTrips(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    callExpensePage();
  }, []);

  const PostData = async (e) => {
    e.preventDefault();
    const { expenseDate, expenseType, trip, amount } = values;

    const res = await fetch("/driver/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        expenseDate, expenseType, trip, amount
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
      window.alert(getalert.message);
      window.location.reload();
    }
  }

  const popover = (index) => {
    <h2>Hello</h2>
  }

  return (
    <>
      <Alert alert={alert} />
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title"> Expense </h2>
            </div>
            <div className="row">
              <div className="col-md-6 col-xl-6">
                <div className="text-center">
                  <img src={expense} alt="user" className="image-res" />
                </div>
              </div>
              <div className="col-md-6 col-xl-6">
                <div className="input-field">
                  <label htmlFor="expenseDate" className="form-label">
                    <FontAwesomeIcon icon={faCalendarDay} /> Expense Date
                  </label>
                  <input
                    autoComplete="off"
                    type="Date"
                    name="expenseDate"
                    className="form-control"
                    id="expenseDate"
                    placeholder="Expense Date"
                    onBlur={handleInputs}
                    formNoValidate
                  />
                  <span className={Errors && Errors.expenseDate ? 'error' : 'validation'}>{Errors.expenseDate}</span>
                </div>
                <form className={values.expenseDate === null ? "hide-form" : "nohide-form"}>
                  <div className="input-field">
                    <label htmlFor="expenseType" className="form-label">
                      <FontAwesomeIcon icon={faIndianRupee} /> Type of Expense
                    </label>
                    <select
                      autoComplete="off"
                      type="text"
                      name="expenseType"
                      className="form-control"
                      id="expenseType"
                      onBlur={handleInputs}
                      formNoValidate
                      placeholder="Choose type of expense"
                    >
                      <option value="Foods">Foods</option>
                      <option value="Fuel">Fuel</option>
                      <option value="Toll Tax">Toll Tax</option>
                      <option value="Servicing">Servicing</option>
                      <option value="Fine">Fine</option>
                      <option value="Others">Others</option>
                    </select>
                    <span className={Errors && Errors.expenseType ? 'error' : 'validation'}>{Errors.expenseType}</span>
                  </div>
                  <div className="input-field">
                    <label htmlFor="trip" className="form-label">
                      <FontAwesomeIcon icon={faCab} /> On which trip?
                    </label>
                    <select
                      autoComplete="off"
                      type="text"
                      name="trip"
                      className="form-control"
                      id="trip"
                      onBlur={handleInputs}
                      formNoValidate
                      
                    >
                      {trips.map((trip, index) => (
                        
                        // if(values.expenseDate === trip.tripDate)
                        // {
                        //   <option value={trip._id} key={index} data-bs-toggle="tooltip" data-bs-placement="top" title={removeTime(trip.tripDate)} > {trip.fromPlace} to {trip.toPlace}  </option>
                        // }
                        <option value={trip._id} key={index} data-bs-toggle="tooltip" data-bs-placement="top" title={removeTime(trip.tripDate)} > {trip.fromPlace} to {trip.toPlace}  </option>
                      ))}
                    </select>
                    <span className={Errors && Errors.trip ? 'error' : 'validation'}>{Errors.trip}</span>
                  </div>
                  <div className="input-field">
                    <label htmlFor="amount" className="form-label">
                      <FontAwesomeIcon icon={faIndianRupee} /> Expense
                    </label>
                    <input
                      autoComplete="off"
                      type="number"
                      name="amount"
                      className="form-control"
                      id="amount"
                      placeholder="Your expense amount(in INR)"
                      onBlur={handleInputs}
                      formNoValidate
                    />
                    <span className={Errors && Errors.amount ? 'error' : 'validation'}>{Errors.amount}</span>
                  </div>

                  <button type="submit" disabled={Object.entries(Errors || {}).length > 0} onClick={PostData} className="btn btn-outline-secondary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Expense;
