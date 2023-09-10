import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { DatePicker, Space } from "antd";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

import moment from "moment";

const { RangePicker } = DatePicker;

export default function EditBookingscreen() {
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "/login";
  }

  const [rooms, setRooms] = useState([]);
  const [duplicaterooms, setDuplicateRooms] = useState([]);

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [booking, setBooking] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  useEffect(() => {
    async function getBookingById() {
      try {
        setLoading(true);
        const booking = await (
          await axios.post("/api/bookings/getbookingbyid", { id })
        ).data;
        setBooking(booking);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getBookingById();
  }, [id]);

  async function editBooking() {
    const daysDiff =
    moment
      .duration(
        moment(toDate, "DD-MM-YYYY").diff(moment(fromDate, "DD-MM-YYYY"))
      )
      .asDays() + 1;
    if (rooms.length) {
      const booking = {
        id,
        fromDate,
        toDate,
        totalDays: daysDiff
      };
      try {
        setLoading(true);
        await (
          await axios.post("/api/bookings/editbooking", {
            booking,
          })
        ).data;
        setLoading(false);
        Swal.fire("Congrats", "Booking Editted Successfully", "success").then(
          () => {
            window.location.href = "/admin";
          }
        );
      } catch (error) {
        setLoading(false);
        Swal.fire("Oops...", "Something went wrong", "error");
      }
    } else {
      // Error
      console.warn("Já existe uma reserva nessa data");
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getData();
  }, []);

  function filterByDate(dates) {
    setFromDate(dates[0].format("DD-MM-YYYY"));
    setToDate(dates[1].format("DD-MM-YYYY"));

    var temprooms = [];

    for (const room of duplicaterooms) {
      var availability = false;

      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            )
          ) {
            if (
              dates[0].format("DD-MM-YYYY") !== booking.fromDate &&
              dates[0].format("DD-MM-YYYY") !== booking.toDate &&
              dates[1].format("DD-MM-YYYY") !== booking.fromDate &&
              dates[1].format("DD-MM-YYYY") !== booking.toDate
            ) {
              availability = true;
            }
          }
        }
      } else {
        availability = true;
      }

      if (availability === true) {
        temprooms.push(room);
      }
    }
    setRooms(temprooms);
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="row justify-content-center mt-5">
          <div className="col-md-5 mt-5">
            <div className="bs">
              <h2>Edit booking</h2>
              <div className="col-md-3">
                <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
              </div>
              <button className="btn btn-primary mt-3" onClick={editBooking}>
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}