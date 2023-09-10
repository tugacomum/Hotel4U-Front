import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Hotel({ hotel }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={hotel.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-7">
        <h1>{hotel.name}</h1>
        <p>Address : {hotel.address}</p>
        <p>Rating : {hotel.rating}</p>
        <p>Description : {hotel.description}</p>
        <div style={{ float: "right" }}>
        <Link to={`/home/${hotel._id}`}>
              <button className="btn btn-primary m-2">View rooms</button>
            </Link>
          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{hotel.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {hotel.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg " src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p style={{ marginTop: 20 }}><b>Rating: </b>{hotel.rating}</p>
          <p style={{ marginTop: 0 }}>{hotel.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Hotel;