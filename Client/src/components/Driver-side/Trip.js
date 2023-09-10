import { React, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faCab, faUser, faMoneyBill, faMoneyBillTransfer, faRoad, faMapLocation } from "@fortawesome/free-solid-svg-icons";
import Alert from "./Alert";
import trip from "../images/road-trip.png"

var today = new Date().toISOString().split('T')[0];

const round = {
  bookingDate: today, tripDate: today, tripType: "Outstation round trip", agent: "", vehicle: "", fromPlace: "", toPlace: "",
  totalKM: Number, GrossIncome: Number, Commission: '0'
}

const oneway = {
  bookingDate: today, tripDate: today, tripType: "Outstation one-way", agent: "", vehicle: "", fromPlace: "", toPlace: "",
  totalKM: Number, GrossIncome: Number, Commission: '0'
}

const local = {
  bookingDate: today, tripDate: today, tripType: "Local", agent: "62cd7612224e277caac2cffe", vehicle: "", fromPlace: "Patna", toPlace: "Patna",
  totalKM: '0', GrossIncome: Number, Commission: '0'
}

const Trip = () => {
  const navigate = useNavigate();
  const [agents, setagents] = useState([{}]);
  const [vehicles, setvehicles] = useState([{}]);
  const [alert, setalert] = useState(null);
  const [values, setValues] = useState(round);
  const [Errors, setErrors] = useState({});
  const [dis, setdis] = useState(0);
 
  const showAlert = (message, Type) => {
    setalert({ message: message, type: Type });
  }

  const setlocalCity = (e) => {
    let value = e.target.value;
      setValues({
        ...values,
        toPlace: value,
        fromPlace: value,
      });
  }

  const changeDate = (e) => {
    let val = e.target.value;
    let name = e.target.name;

    setValues({
      ...values,
      [name]: val,
    });
  }

  const selectTripType = (e) => {
    let val = e.target.value;
       
    switch (val){
      case '1':
        setValues(round);
        setdis(1);
        setErrors({});
        break;
      case '2':
        setValues(oneway)
        setdis(1);
        setErrors({});
        break;
      case '3':
        setValues(local)
        setdis(3);
        setErrors({});
        break;
      default:
        break;  
    }
  }

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    let currentErrors = JSON.parse(JSON.stringify(Errors));
    switch (name) {
      case 'bookingDate':
        if (!value) {
          currentErrors[name] = 'Select booking date.'
        } else {
          delete currentErrors[name];
        }
        break;
      case 'tripDate':
        if (!value) {
          currentErrors[name] = 'Select Trip date.'
        } else {
          delete currentErrors[name];
        }
        break;
      case 'tripType':
        if (!value) {
          currentErrors[name] = 'Choose Trip Type.'
        } else {
          delete currentErrors[name];
        }
        break;
      case 'agent':
        if (!value) {
          currentErrors[name] = 'Choose Agent.'
        } else {
          delete currentErrors[name];
        }
        break;
      case 'vehicle':
        if (!value) {
          currentErrors[name] = 'Choose Vehicle.'
        } else {
          delete currentErrors[name];
        }
        break;
      case 'fromPlace':
        if (!value) {
          currentErrors[name] = 'Please enter source.'
        } else {
          delete currentErrors[name];
        }
        break;
      case 'toPlace':
        if (!value) {
          currentErrors[name] = 'Please enter destination.'
        } else {
          delete currentErrors[name];
        }
        break;
      case 'totalKM':
        if (!value) {
          currentErrors[name] = 'Please enter Total KM.'
        } else {
          delete currentErrors[name];
        }
        break;
      case 'GrossIncome':
        if (!value) {
          currentErrors[name] = 'Please enter GrossIncome.'
        } else {
          delete currentErrors[name];
        }
        break;
      case 'Commission':
        if (!value) {
          currentErrors[name] = 'Please enter commission if any else enter 0.'
        } else {
          delete currentErrors[name];
        }
        break;
      default:
        break;
    }

    setErrors(currentErrors);
  }

  const callTripPage = async () => {
    try {
      const res = await fetch('/driver/customer/trip-details', {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      setagents(data.agents);
      setvehicles(data.vehicles);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    callTripPage();
  }, []);

  const PostData = async (e) => {
    e.preventDefault();
    const { bookingDate, tripDate, tripType, agent, vehicle, fromPlace,
      toPlace, totalKM, GrossIncome, Commission } = values;

    const res = await fetch("/driver/customer/trip-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        bookingDate, tripDate, tripType, agent, vehicle, fromPlace,
        toPlace, totalKM, GrossIncome, Commission
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
      window.alert(getalert.message);
      navigate('/driver', { replace: true });
    }
  }

  return (
    <>
      <Alert alert={alert} />
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title"> Trip Details </h2>
            </div>
            <div className="row">
              <div className="col-md-6 col-xl-6">
                <div className="text-center">
                  <img src={trip} alt="user" className="image-res" />
                </div>
              </div>
              <div className="col-md-6 col-xl-6">
                <div className="input-field">
                  <label htmlFor="tripType" className="form-label">
                    <FontAwesomeIcon icon={faRoad} /> Choose Trip Type
                  </label>
                  <select
                    autoComplete="off"
                    type="text"
                    name="tripType"
                    className="form-control"
                    id="tripType"
                    placeholder="Trip Type"
                    onChange={selectTripType}
                    formNoValidate
                  >
                    <option value={0}>--select trip type--</option>
                    <option value={1}>Outstation-round trip</option>
                    <option value={2}>Outstation-one way</option>
                    <option value={3}>Local</option>
                  </select>
                </div>
                <form className={dis === 1 ? "nohide-form": "hide-form"}>
                  <div className="input-field">
                    <label htmlFor="bookingDate" className="form-label">
                      <FontAwesomeIcon icon={faCalendarDay} /> Booking Date
                    </label>
                    <input
                      autoComplete="off"
                      type="Date"
                      name="bookingDate"
                      className="form-control"
                      id="bookingDate"
                      placeholder="Booking Date"
                      value = {values.bookingDate}
                      onChange = {changeDate}
                      onBlur={handleInputs}
                      formNoValidate
                    />
                    <span className={Errors && Errors.bookingDate ? 'error' : 'validation'}>{Errors.bookingDate}</span>
                  </div>
                  <div className="input-field">
                    <label htmlFor="tripDate" className="form-label">
                      <FontAwesomeIcon icon={faCalendarDay} /> Trip Date
                    </label>
                    <input
                      autoComplete="off"
                      type="Date"
                      name="tripDate"
                      className="form-control"
                      id="tripDate"
                      placeholder="Trip Date"
                      onChange={changeDate}
                      value={values.tripDate}
                      onBlur={handleInputs}
                      formNoValidate
                    />
                    <span className={Errors && Errors.tripDate ? 'error' : 'validation'}>{Errors.tripDate}</span>
                  </div>
                  <div className="input-field">
                    <label htmlFor="agent" className="form-label">
                      <FontAwesomeIcon icon={faUser} /> Agent
                    </label>
                    <select
                      autoComplete="off"
                      type="text"
                      name="agent"
                      className="form-control"
                      id="agent"
                      placeholder="Agent"
                      onBlur={handleInputs}
                      formNoValidate
                    >
                      <option value={""} >--select agent--</option>
                      {agents.map((agent, index) => (
                        <option value={agent._id} key={index}>{agent.name}, {agent.phone}</option>
                      ))}
                    </select>
                    <span className={Errors && Errors.agent ? 'error' : 'validation'}>{Errors.agent}</span>
                  </div>
                  <div className="input-field">
                    <label htmlFor="vehicle" className="form-label">
                      <FontAwesomeIcon icon={faCab} /> Vehicle
                    </label>
                    <select
                      autoComplete="off"
                      type="text"
                      name="vehicle"
                      className="form-control"
                      id="vehicle"
                      placeholder="Vehicle"
                      onBlur={handleInputs}
                      formNoValidate
                    >
                      <option value={""}>--select vehicle--</option>
                      {vehicles.map((vehicle, index) => (
                        <option value={vehicle.regno} key={index}>{vehicle.regno}</option>
                      ))}
                    </select>
                    <span className={Errors && Errors.vehicle ? 'error' : 'validation'}>{Errors.vehicle}</span>
                  </div>
                  <div className="input-field">
                    <label htmlFor="fromPlace" className="form-label">
                      <FontAwesomeIcon icon={faMapLocation} /> From place
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      name="fromPlace"
                      className="form-control"
                      id="fromPlace"
                      placeholder="From Place"
                      onBlur={handleInputs}
                      formNoValidate
                    />
                    <span className={Errors && Errors.fromPlace ? 'error' : 'validation'}>{Errors.fromPlace}</span>
                  </div>
                  <div className="input-field">
                    <label htmlFor="toPlace" className="form-label">
                      <FontAwesomeIcon icon={faMapLocation} /> To place
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      name="toPlace"
                      className="form-control"
                      id="toPlace"
                      placeholder="To Place"
                      onBlur={handleInputs}
                      formNoValidate
                    />
                    <span className={Errors && Errors.toPlace ? 'error' : 'validation'}>{Errors.toPlace}</span>
                  </div>
                  <div className="input-field">
                    <label htmlFor="totalKM" className="form-label">
                      <FontAwesomeIcon icon={faRoad} /> Total KM
                    </label>
                    <input
                      autoComplete="off"
                      type="number"
                      name="totalKM"
                      className="form-control"
                      id="totalKM"
                      placeholder="Total KM"
                      onBlur={handleInputs}
                      formNoValidate
                    />
                    <span className={Errors && Errors.totalKM ? 'error' : 'validation'}>{Errors.totalKM}</span>
                  </div>
                  <div className="input-field">
                    <label htmlFor="GrossIncome" className="form-label">
                      <FontAwesomeIcon icon={faMoneyBill} /> Gross Income
                    </label>
                    <input
                      autoComplete="off"
                      type="number"
                      name="GrossIncome"
                      className="form-control"
                      id="GrossIncome"
                      placeholder="GrossIncome"
                      onBlur={handleInputs}
                      formNoValidate
                    />
                    <span className={Errors && Errors.GrossIncome ? 'error' : 'validation'}>{Errors.GrossIncome}</span>
                  </div>
                  <div className="input-field">
                    <label htmlFor="Commission" className="form-label">
                      <FontAwesomeIcon icon={faMoneyBillTransfer} /> Commission(if any)
                    </label>
                    <input
                      autoComplete="off"
                      type="number"
                      name="Commission"
                      className="form-control"
                      id="Commission"
                      placeholder="Commisssion"
                      onBlur={handleInputs}
                      formNoValidate
                    />
                    <span className={Errors && Errors.Commission ? 'error' : 'validation'}>{Errors.Commission}</span>
                  </div>
                  <button type="submit" disabled={Object.entries(Errors || {}).length > 0} onClick={PostData} className="btn btn-outline-secondary">Submit</button>
                </form>
                <form className={dis === 3 ? "nohide-form" : "hide-form"}>
                  <div className="input-field">
                    <label htmlFor="vehicle" className="form-label">
                      <FontAwesomeIcon icon={faCab} /> Vehicle
                    </label>
                    <select
                      autoComplete="off"
                      type="text"
                      name="vehicle"
                      className="form-control"
                      id="vehicle"
                      placeholder="Vehicle"
                      onBlur={handleInputs}
                      formNoValidate
                    >
                      <option value={""}>--select vehicle--</option>
                      {vehicles.map((vehicle, index) => (
                        <option value={vehicle.regno} key={index}>{vehicle.regno}</option>
                      ))}
                    </select>
                    <span className={Errors && Errors.vehicle ? 'error' : 'validation'}>{Errors.vehicle}</span>
                  </div>
                  <div className="input-field">
                    <label htmlFor="toPlace" className="form-label">
                      <FontAwesomeIcon icon={faMapLocation} /> Trip City
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      name="toPlace"
                      className="form-control"
                      id="toPlace"
                      placeholder="Trip City"
                      value={values.toPlace}
                      onBlur={handleInputs}
                      onChange={setlocalCity}
                      formNoValidate
                    />
                    <span className={Errors && Errors.toPlace ? 'error' : 'validation'}>{Errors.toPlace}</span>
                  </div>
                  <div className="input-field">
                    <label htmlFor="GrossIncome" className="form-label">
                      <FontAwesomeIcon icon={faMoneyBill} /> Gross Income
                    </label>
                    <input
                      autoComplete="off"
                      type="number"
                      name="GrossIncome"
                      className="form-control"
                      id="GrossIncome"
                      placeholder="GrossIncome"
                      onBlur={handleInputs}
                      formNoValidate
                    />
                    <span className={Errors && Errors.GrossIncome ? 'error' : 'validation'}>{Errors.GrossIncome}</span>
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

export default Trip;
