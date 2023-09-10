import React, { useState, useEffect } from "react";
import { Tabs, Modal, Space } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";

const { confirm } = Modal;
const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/hotels";
    }
  }, []);

  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Hotels" key="2">
          <Hotels />
        </TabPane>
        <TabPane tab="Rooms" key="3">
          <Rooms />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
        <TabPane tab="Add Room" key="5">
          <AddRoom />
        </TabPane>
        <TabPane tab="Add User" key="6">
          <AddUser />
        </TabPane>
        <TabPane tab="Add Hotel" key="7">
          <AddHotel />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    async function getData() {
      try {
        const data = await (await axios.get("/api/hotels/getallhotels")).data;
        setHotels(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    }
    getData();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Hotels</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Hotel Id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Description</th>
              <th>Rating</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {hotels.length <= 0 ? (
              <h1 style={{ padding: 10 }}>No Hotels found</h1>
            ) : (
              hotels.map((hotels) => {
                return (
                  <tr>
                    <td>{hotels._id}</td>
                    <td>{hotels.name}</td>
                    <td>{hotels.address}</td>
                    <td>{hotels.description}</td>
                    <td>{hotels.rating}</td>
                    <td className="text-center">
                      <i
                        onClick={() => showHotelEditConfirm(hotels._id)}
                        className="fa-solid fa-pen-to-square"
                        style={{ color: "white", cursor: "pointer" }}
                      ></i>
                    </td>
                    <td className="text-center">
                      <i
                        onClick={() => showHotelDeleteConfirm(hotels._id)}
                        className="fa-solid fa-trash"
                        style={{ color: "white", cursor: "pointer" }}
                      ></i>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    async function getData() {
      try {
        const data = await (
          await axios.get("/api/bookings/getallbookings")
        ).data;
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    }
    getData();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Cancel</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length <= 0 ? (
              <h1 style={{ padding: 10 }}>No Bookings found</h1>
            ) : (
              bookings.map((bookings) => {
                return (
                  <tr>
                    <td>{bookings._id}</td>
                    <td>{bookings.userId}</td>
                    <td>{bookings.room}</td>
                    <td>{bookings.fromDate}</td>
                    <td>{bookings.toDate}</td>
                    <td>{bookings.status}</td>
                    <td className="text-center">
                      <i
                        onClick={() => showBookingEditConfirm(bookings._id)}
                        className="fa-solid fa-pen-to-square"
                        style={{ color: "white", cursor: "pointer" }}
                      ></i>
                    </td>
                    <td className="text-center">
                      {bookings.status === "cancelled" ? (
                        <i
                          className="fa-solid fa-eye-slash"
                          style={{ color: "white" }}
                        ></i>
                      ) : (
                        <i
                          onClick={() =>
                            showBookingDisableConfirm(
                              bookings._id,
                              bookings.roomId
                            )
                          }
                          className="fa-solid fa-eye"
                          style={{ color: "white", cursor: "pointer" }}
                        ></i>
                      )}
                    </td>
                    <td className="text-center">
                      <i
                        onClick={() =>
                          showBookingDeleteConfirm(
                            bookings._id,
                            bookings.roomId
                          )
                        }
                        className="fa-solid fa-trash"
                        style={{ color: "white", cursor: "pointer" }}
                      ></i>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    async function getData() {
      try {
        const data = await (await axios.get("/api/rooms/getallrooms")).data;
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    }
    getData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
              <th>Services</th>
              <th>Status</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Disable</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length <= 0 ? (
              <h1 style={{ padding: 10 }}>No Rooms found</h1>
            ) : (
              rooms.map((rooms) => {
                return (
                  <tr>
                    <td>{rooms._id}</td>
                    <td>{rooms.name}</td>
                    <td>{rooms.type}</td>
                    <td>{rooms.rentperday}</td>
                    <td>{rooms.maxcount}</td>
                    <td>{rooms.phonenumber}</td>
                    <td>{rooms.services}</td>
                    <td>{rooms.status}</td>
                    <td className="text-center">
                      <i
                        onClick={() => showRoomEditConfirm(rooms._id)}
                        className="fa-solid fa-pen-to-square"
                        style={{ color: "white", cursor: "pointer" }}
                      ></i>
                    </td>
                    <td className="text-center">
                      <i
                        onClick={() =>
                          showRoomDisableConfirm({ id: rooms._id })
                        }
                        className={
                          rooms.status === "disabled"
                            ? "fa-solid fa-eye-slash"
                            : "fa-solid fa-eye"
                        }
                        style={{ color: "white", cursor: "pointer" }}
                      ></i>
                    </td>
                    <td className="text-center">
                      <i
                        onClick={() => showRoomDeleteConfirm({ id: rooms._id })}
                        className="fa-solid fa-trash"
                        style={{ color: "white", cursor: "pointer" }}
                      ></i>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    async function getData() {
      try {
        const data = await (await axios.get("/api/users/getallusers")).data;
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    }
    getData();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loader />}
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Tax Payer Number</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th>Status</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Disable</th>
              <th className="text-center">Delete</th>
              <th className="text-center">Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.address}</td>
                    <td>{user.taxpayerNumber}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                    <th>{user.status}</th>
                    <td className="text-center">
                      <i
                        onClick={() => showUserEditConfirm(user._id)}
                        className="fa-solid fa-pen-to-square"
                        style={{ color: "white", cursor: "pointer" }}
                      ></i>
                    </td>
                    <td className="text-center">
                      <i
                        onClick={() => showUserDisableConfirm(user._id)}
                        className={
                          user.status === "disabled"
                            ? "fa-solid fa-eye-slash"
                            : "fa-solid fa-eye"
                        }
                        style={{ color: "white", cursor: "pointer" }}
                      ></i>
                    </td>
                    <td className="text-center">
                      <i
                        onClick={() => showUserDeleteConfirm(user._id)}
                        className="fa-solid fa-trash"
                        style={{ color: "white", cursor: "pointer" }}
                      ></i>
                    </td>
                    <td className="text-center">
                      <i
                        onClick={() => showUserAdminConfirm(user._id)}
                        className={
                          user.isAdmin === true
                            ? "fa-solid fa-toggle-on"
                            : "fa-solid fa-toggle-off"
                        }
                        style={{ color: "white", cursor: "pointer" }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AddUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [taxPayerNumber, setTaxPayerNumber] = useState();
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  async function addUser() {
    if (password == cpassword) {
      const user = {
        name,
        email,
        taxPayerNumber,
        address,
        password,
      };
      try {
        setLoading(true);
        const result = await (
          await axios.post("/api/users/register", { user })
        ).data;
        console.log(result);
        setLoading(false);
        Swal.fire("Congrats", "User Added Successfully", "success").then(
          (result) => {
            window.location.reload();
          }
        );
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
        Swal.fire("Oops...", "Something went wrong", "error");
      }
    } else {
      alert("Password does not match");
    }
  }

  return (
    <div className="row">
      <div className="col-md-5">
        {loading && <Loader />}
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
        <div className="text-right">
          <button className="btn btn-primary mt-2" onClick={addUser}>
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}

export function AddHotel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState();
  const [imageUrl1, setImageUrl1] = useState();
  const [imageUrl2, setImageUrl2] = useState();
  const [imageUrl3, setImageUrl3] = useState();

  async function addHotel() {
    const newhotel = {
      name: name,
      address,
      description,
      rating,
      imageurls: [imageUrl1, imageUrl2, imageUrl3],
    };
    try {
      setLoading(true);
      const result = await (
        await axios.post("/api/hotels/addhotel", newhotel)
      ).data;
      console.log(result);
      setLoading(false);
      Swal.fire("Congrats", "Hotel Added Successfully", "success").then(
        (result) => {
          window.location.href = "/hotels";
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
      Swal.fire("Oops...", "Something went wrong", "error");
    }
  }
  return (
    <div className="row">
      <div className="col-md-5">
        {loading && <Loader />}
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
          placeholder="rating"
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="image url 1"
          value={imageUrl1}
          onChange={(e) => {
            setImageUrl1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="image url 2"
          value={imageUrl2}
          onChange={(e) => {
            setImageUrl2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="image url 3"
          value={imageUrl3}
          onChange={(e) => {
            setImageUrl3(e.target.value);
          }}
        />
        <div className="text-right">
          <button className="btn btn-primary mt-2" onClick={addHotel}>
            Add Hotel
          </button>
        </div>
      </div>
    </div>
  );
}

export function AddRoom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [hotelId, setHotelId] = useState();
  const [maxCount, setMaxCount] = useState();
  const [rentPerDay, setRentPerDay] = useState();
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [services, setServices] = useState("");
  const [imageUrl1, setImageUrl1] = useState();
  const [imageUrl2, setImageUrl2] = useState();
  const [imageUrl3, setImageUrl3] = useState();

  async function addRoom() {
    const newroom = {
      hotelId: hotelId,
      name: name,
      rentperday: rentPerDay,
      maxcount: maxCount,
      description: description,
      type: type,
      phonenumber: phoneNumber,
      services: services,
      imageurls: [imageUrl1, imageUrl2, imageUrl3],
    };
    try {
      setLoading(true);
      const result = await (
        await axios.post("/api/rooms/addroom", newroom)
      ).data;
      console.log(result);
      setLoading(false);
      Swal.fire("Congrats", "Room Added Successfully", "success").then(
        (result) => {
          window.location.href = "/hotels";
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
      Swal.fire("Oops...", "Something went wrong", "error");
    }
  }

  return (
    <div className="row">
      <div className="col-md-5">
        {loading && <Loader />}
        <input
          type="text"
          className="form-control"
          placeholder="room name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="hotel id"
          value={hotelId}
          onChange={(e) => {
            setHotelId(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="rent per day"
          value={rentPerDay}
          onChange={(e) => {
            setRentPerDay(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="max count"
          value={maxCount}
          onChange={(e) => {
            setMaxCount(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="phone number"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </div>
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="services"
          value={services}
          onChange={(e) => {
            setServices(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="image url 1"
          value={imageUrl1}
          onChange={(e) => {
            setImageUrl1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="image url 2"
          value={imageUrl2}
          onChange={(e) => {
            setImageUrl2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="image url 3"
          value={imageUrl3}
          onChange={(e) => {
            setImageUrl3(e.target.value);
          }}
        />
        <div className="text-right">
          <button className="btn btn-primary mt-2" onClick={addRoom}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}

function showBookingDeleteConfirm(bookingId, roomId) {
  async function deleteBooking(bookingId, roomId) {
    try {
      const result = await (
        await axios.post("/api/bookings/deletebooking", { bookingId, roomId })
      ).data;
      Swal.fire("Congrats", "Booking Deleted Successfully", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Oops...", "Something went wrong", "error");
    }
  }
  confirm({
    title: "Do you want to delete this booking?",
    content: "This action cannot be reversed.",
    okText: "Delete",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      deleteBooking(bookingId, roomId);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

function showRoomDeleteConfirm({ id }) {
  async function deleteRoom(id) {
    try {
      const result = await (
        await axios.post("/api/rooms/deleteroom", { _id: id })
      ).data;
      Swal.fire("Congrats", "Room Deleted Successfully", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Oops...", "Something went wrong", "error");
    }
  }
  confirm({
    title: "Do you want to delete this room?",
    content: "This action cannot be reversed.",
    okText: "Delete",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      deleteRoom(id);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

function showUserDeleteConfirm(id) {
  async function deleteUser(id) {
    try {
      const result = await (
        await axios.post("/api/users/deleteuser", { id })
      ).data;
      Swal.fire("Congrats", "User Deleted Successfully", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Oops...", "Something went wrong", "error");
    }
  }
  confirm({
    title: "Do you want to delete this user?",
    content: "This action cannot be reversed.",
    okText: "Delete",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      deleteUser(id);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

function showHotelDeleteConfirm(id) {
  async function deleteHotel(id) {
    try {
      const result = await (
        await axios.post("/api/hotels/deletehotel", { id })
      ).data;
      Swal.fire("Congrats", "Hotel Deleted Successfully", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Oops...", "Something went wrong", "error");
    }
  }
  confirm({
    title: "Do you want to delete this hotel?",
    content: "This action cannot be reversed.",
    okText: "Delete",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      deleteHotel(id);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

function showRoomDisableConfirm(id, roomId) {
  async function disableRoom(id, roomId) {
    try {
      const result = await (
        await axios.post("/api/rooms/disableroom", { id, roomId })
      ).data;
      Swal.fire(
        "Congrats",
        "Room Status Has Been Changed Successfully",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Oops...", "Something went wrong", "error");
    }
  }
  confirm({
    title: "Do you want to disable this room?",
    content: "It is possible to reactivate the room later.",
    okText: "Disable",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      disableRoom(id, roomId);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

function showUserDisableConfirm(id, roomId) {
  async function disableUser(id, roomId) {
    try {
      const result = await (
        await axios.post("/api/users/disableuser", { id, roomId })
      ).data;
      Swal.fire(
        "Congrats",
        "User Status Has Been Changed Successfully",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Oops...", "Something went wrong", "error");
    }
  }
  confirm({
    title: "Do you want to disable this user?",
    content: "It is possible to reactivate the user later.",
    okText: "Disable",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      disableUser(id, roomId);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

function showBookingDisableConfirm(bookingId, roomId) {
  async function disableBooking(bookingId, roomId) {
    console.log(bookingId, roomId);
    try {
      await (
        await axios.post("/api/bookings/cancelbooking", { bookingId, roomId })
      ).data;
      Swal.fire(
        "Congrats",
        "Booking Status Has Been Changed Successfully",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Oops...", "Something went wrong", "error");
    }
  }
  confirm({
    title: "Do you want to cancel this booking?",
    content: "It is not possible to reactivate the booking later.",
    okText: "Disable",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      disableBooking(bookingId, roomId);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

function showUserAdminConfirm(id) {
  async function adminUser(id) {
    try {
      const result = await (
        await axios.post("/api/users/roleuser", { id })
      ).data;
      Swal.fire(
        "Congrats",
        "User Role Has Been Changed Successfully",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Oops...", "Something went wrong", "error");
    }
  }
  confirm({
    title: "Do you want to change this user's role?",
    content: "You can change it later again...",
    okText: "Yes",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      adminUser(id);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

function showUserEditConfirm(id) {
  confirm({
    title: "Do you want to edit this user?",
    content: "You can edit it later again...",
    okText: "Yes",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      window.location.href = `/edituser/${id}`;
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

function showRoomEditConfirm(id) {
  confirm({
    title: "Do you want to edit this room?",
    content: "You can edit it later again...",
    okText: "Yes",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      window.location.href = `/editroom/${id}`;
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

function showBookingEditConfirm(id) {
  confirm({
    title: "Do you want to edit this booking?",
    content: "You can edit it later again...",
    okText: "Yes",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      window.location.href = `/editbooking/${id}`;
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

function showHotelEditConfirm(id) {
  confirm({
    title: "Do you want to edit this hotel?",
    content: "You can edit it later again...",
    okText: "Yes",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {
      window.location.href = `/edithotel/${id}`;
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}
