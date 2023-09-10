import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

function Bookingscreen() {
  const { roomid, fromDate, toDate } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();

  const daysDiff =
    moment
      .duration(
        moment(toDate, "DD-MM-YYYY").diff(moment(fromDate, "DD-MM-YYYY"))
      )
      .asDays() + 1;
  const totalAmount = daysDiff * room?.rentperday;

  useEffect(() => {

    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
    }

    async function getData() {
      try {
        setLoading(true);
        const data = (
          await axios.post("/api/rooms/getroombyid", { roomid: roomid })
        ).data;
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    getData();
  }, [roomid]);

  async function onToken(token) {
    const bookingDetails = {
      room,
      userId: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromDate,
      toDate,
      totalAmount,
      totalDays: daysDiff,
      token,
    };

    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      setLoading(false);
      Swal.fire("Congrats", "Your Room Booked Successfully", "success").then(result => {
        window.location.href = "/profile";
      });
    } catch (error) {
      setLoading(false);
      Swal.fire("Oooops", "Something went wrong", "error");
    }
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>
                    Name :{" "}
                    {JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>From Date : {fromDate}</p>
                  <p>To Date : {toDate}</p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days : {daysDiff} days</p>
                  <p>Rent per day : {room.rentperday} €</p>
                  <p>Total Amount : {totalAmount} €</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <StripeCheckout
                  currency="EUR"
                  amount={totalAmount * 100}
                  token={onToken}
                  stripeKey="pk_test_51Nn1VCGSqQYWzQWWh8EGiOLdxFET6OH4jBjyj7XcXEuJEIjhV8zqkGsAnP57t004E4lApa4hKLXSXS9vjNOFf8Q600lTsG3BdP"
                >
                  <button className="btn btn-primary">Pay Now </button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
