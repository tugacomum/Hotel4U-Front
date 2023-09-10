import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { useParams } from "react-router-dom";

const { RangePicker } = DatePicker;

function Homescreen() {
  const { id } = useParams();

  const [rooms, setRooms] = useState([]);
  const [duplicaterooms, setDuplicateRooms] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const data = (await axios.post("/api/rooms/getallrooms", { id })).data;
        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error.message);
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

  function filterBySearch() {
    const temprooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setRooms(temprooms);
  }

  function filterByType(e) {
    if (e !== "all") {
      const temprooms = duplicaterooms.filter(
        (room) => room.type.toLowerCase() == e.toLowerCase()
      );
      setRooms(temprooms);
    } else {
      setRooms(duplicaterooms);
    }
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="search rooms"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => filterByType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-3">
                {room.status === "active" && (
                  <Room room={room} fromDate={fromDate} toDate={toDate} />
                )}
              </div>
            );
          })
        )}
      </div>
      <div className="row justify-content-center mt-5">
        <h6 style={{ color: "gray" }}>
          Found{" "}
          {rooms.filter((room) => room.status === "active").length > 1
            ? rooms.filter((room) => room.status === "active").length + " rooms..."
            : rooms.filter((room) => room.status === "active").length + " room..."}
        </h6>
      </div>
    </div>
  );
}

export default Homescreen;