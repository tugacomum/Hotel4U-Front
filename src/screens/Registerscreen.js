import React, { useState, useEffect } from "react";
import axios from 'axios';
import Success from "../components/Success";
import Error from "../components/Error";
import Loader from "../components/Loader";

function Registerscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [taxPayerNumber, setTaxPayerNumber] = useState();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  async function Register() {
    if (password == cpassword) {
      const user = {
        name,
        email,
        taxPayerNumber,
        address,
        password
      }
      try {
        console.log(user)
        setLoading(true);
        const result = await(await axios.post('/api/users/register', {user})).data
        setLoading(false);
        setSuccess(true);
        window.location.href = '/login'
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true); 
      }
    } else {
      alert('Password does not match')
    }
  }
  return (
    <div>
      { loading && (<Loader />)}
      { error && (<Error />)}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
        { success && (<Success message='Registration Success'/>) }
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
          type="text"
          className="form-control"
          placeholder="address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <input
          type="number"
          className="form-control"
          placeholder="tax payer number"
          value={taxPayerNumber}
          onChange={(e) => {
            setTaxPayerNumber(e.target.value);
          }}
        />
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
            />
            <button className='btn btn-primary mt-3' onClick={Register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
