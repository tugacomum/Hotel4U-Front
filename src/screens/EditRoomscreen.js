import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";
import Loader from "../components/Loader";

export default function EditRoomscreen() {
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "/login";
  }

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const roomid = id;
  const [room, setRoom] = useState();
  const [name, setName] = useState(room?.name);
  const [maxCount, setMaxCount] = useState(room?.maxcount);
  const [phoneNumber, setPhoneNumber] = useState(room?.phonenumber);
  const [rentPerDay, setRentPerDay] = useState(room?.rentperday);
  const [imageUrl1, setImageUrl1] = useState(room?.imageurls[0]);
  const [imageUrl2, setImageUrl2] = useState(room?.imageurls[1]);
  const [imageUrl3, setImageUrl3] = useState(room?.imageurls[2]);
  const [type, setType] = useState(room?.type);
  const [description, setDescription] = useState(room?.description);
  const [services, setServices] = useState(room?.services);

  useEffect(() => {
    async function getRoomById() {
      try {
        setLoading(true);
        const room = await (
          await axios.post("/api/rooms/getroombyid", { roomid })
        ).data;
        setRoom(room);
        setName(room.name);
        setMaxCount(room.maxcount);
        setPhoneNumber(room.phonenumber);
        setRentPerDay(room.rentperday);
        setImageUrl1(room.imageurls[0]);
        setImageUrl2(room.imageurls[1]);
        setImageUrl3(room.imageurls[2]);
        setType(room.type);
        setDescription(room.description);
        setServices(room.services);
        console.log(room);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getRoomById();
  }, [id]);

  async function editRoom() {
    const room = {
      id,
      name,
      maxCount,
      phoneNumber,
      rentPerDay,
      imageUrl1,
      imageUrl2,
      imageUrl3,
      type,
      description,
      services,
    };
    try {
      setLoading(true);
      await (
        await axios.post("/api/rooms/editroom", {
          room,
        })
      ).data;
      setLoading(false);
      Swal.fire("Congrats", "Room Editted Successfully", "success").then(() => {
        window.location.href = "/admin";
      });
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
              <h2>Edit room</h2>
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
                type="number"
                className="form-control"
                placeholder="max count"
                value={maxCount}
                onChange={(e) => {
                  setMaxCount(e.target.value);
                }}
              />
              <input
                type="number"
                className="form-control"
                placeholder="phone number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <input
                type="number"
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
                placeholder="type"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
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
                placeholder="services"
                value={services}
                onChange={(e) => {
                  setServices(e.target.value);
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
              <button className="btn btn-primary mt-3" onClick={editRoom}>
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
