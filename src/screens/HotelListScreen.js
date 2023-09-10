import React, { useState, useEffect } from "react";
import axios from "axios";
import Hotel from "../components/Hotel";
import Loader from "../components/Loader";

function Homescreen() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const data = (await axios.get("/api/hotels/getallhotels")).data;
        setHotels(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error.message);
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          hotels.map((hotel) => {
            return (
              <div className="col-md-9 mt-3">
                <Hotel hotel={hotel} />
              </div>
            );
          })
        )}
      </div>
      <div className="row justify-content-center mt-5">
        <h6 style={{ color: "gray" }}>Found {hotels.length} hotels...</h6>
      </div>
    </div>
  );
}

export default Homescreen;
