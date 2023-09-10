import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Tag, Divider } from "antd";

const { TabPane } = Tabs;

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <MyProfile />
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileScreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const data = await (
          await axios.post("/api/bookings/getbookingsbyuserid", {
            userId: user._id,
          })
        ).data;
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
    getData();
  }, []);

  async function cancelBooking(bookingId, roomId) {
    try {
      setLoading(true);
      const result = await (
        await axios.post("/api/bookings/cancelbooking", { bookingId, roomId })
      ).data;
      setLoading(false);
      Swal.fire("Congrats", "Your booking has been cancelled", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Oooops", "Something went wrong", "error");
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs">
                  <h1>{booking.room}</h1>
                  <p>
                    <b>BookingId:</b> {booking._id}
                  </p>
                  <p>
                    <b>CheckIn:</b> {booking.fromDate}
                  </p>
                  <p>
                    <b>CheckOut:</b> {booking.toDate}
                  </p>
                  <p>
                    <b>Amount: </b> {booking.totalAmount} €
                  </p>
                  <p>
                    <b>Status:</b>{" "}
                    {booking.status === "booked" ? (
                      <Tag color="green">CONFIRMED</Tag>
                    ) : (
                      <Tag color="red">CANCELLED</Tag>
                    )}
                  </p>
                  {booking.status !== "cancelled" && (
                    <div className="text-right">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          cancelBooking(booking._id, booking.roomId);
                        }}
                      >
                        CANCEL BOOKING
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div style={{ height: 40 }} />
    </div>
  );
}

export function MyProfile() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <div className="bs">
            <h1>My Profile</h1>
            <br />
            <h1>Name: {user.name}</h1>
            <h1>Email: {user.email}</h1>
            <h1>isAdmin: {user.isAdmin ? "Yes" : "No"}</h1>
            <div className="text-right">
              <button className="btn btn-primary" onClick={() => {}}>
                EDIT PROFILE
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 40 }} />
    </div>
  );
}
