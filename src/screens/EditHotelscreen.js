import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";
import Loader from "../components/Loader";

export default function EditHotelcreen() {
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "/login";
  }

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const hotelid = id;
  const [hotel, setHotel] = useState();
  const [name, setName] = useState(hotel?.name);
  const [imageUrl1, setImageUrl1] = useState(hotel?.imageurls[0]);
  const [imageUrl2, setImageUrl2] = useState(hotel?.imageurls[1]);
  const [imageUrl3, setImageUrl3] = useState(hotel?.imageurls[2]);
  const [description, setDescription] = useState(hotel?.description);
  const [rating, setRating] = useState(hotel?.rating);
  const [address, setAddress] = useState(hotel?.address);

  useEffect(() => {
    async function getHotelById() {
      try {
        setLoading(true);
        const hotel = await (
          await axios.post("/api/hotels/gethotelbyid", { hotelid })
        ).data;
        setHotel(hotel);
        setName(hotel.name);
        setImageUrl1(hotel.imageurls[0]);
        setImageUrl2(hotel.imageurls[1]);
        setImageUrl3(hotel.imageurls[2]);
        setRating(hotel.rating);
        setAddress(hotel.address);
        setDescription(hotel.description);
        console.log(hotel);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getHotelById();
  }, [id]);

  async function editHotel() {
    const hotel = {
      id,
      name,
      imageUrl1,
      imageUrl2,
      imageUrl3,
      description,
      rating, 
      address,
    };
    try {
      setLoading(true);
      await (
        await axios.post("/api/hotels/edithotel", {
          hotel,
        })
      ).data;
      setLoading(false);
      Swal.fire("Congrats", "Hotel Editted Successfully", "success").then(() => {
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
              <h2>Edit hotel</h2>
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
              <button className="btn btn-primary mt-3" onClick={editHotel}>
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
