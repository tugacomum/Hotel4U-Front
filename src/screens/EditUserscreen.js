import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";
import Loader from "../components/Loader";

export default function EditUserscreen() {
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "/login";
  }
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(user?.address);
  const [taxPayerNumber, setTaxPayerNumber] = useState(user?.taxpayerNumber);

  useEffect(() => {
    async function getUserById() {
      try {
        setLoading(true);
        const user = await (
          await axios.post("/api/users/getuserbyid", { id })
        ).data;
        setUser(user);
        setName(user.name);
        setEmail(user.email);
        setAddress(user.address);
        setTaxPayerNumber(user.taxpayerNumber);
        console.log(user);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getUserById();
  }, [id]);

  async function editUser() {
    const user = {
      id,
      name,
      email,
      taxPayerNumber,
      address,
    };
    try {
      setLoading(true);
      const result = await (
        await axios.post("/api/users/edituser", {
          user,
        })
      ).data;
      localStorage.removeItem("currentUser");
      localStorage.setItem("currentUser", JSON.stringify(result));
      setLoading(false);
      Swal.fire("Congrats", "User Editted Successfully", "success").then(
        () => {
          window.location.href = '/admin';
        }
      );
    } catch (error) {
      setLoading(false);
      Swal.fire("Oops...", "Something went wrong", "error");
    }
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="row justify-content-center mt-5">
          <div className="col-md-5 mt-5">
            <div className="bs">
              <h2>Edit user</h2>
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
              <button className="btn btn-primary mt-3" onClick={editUser}>
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
