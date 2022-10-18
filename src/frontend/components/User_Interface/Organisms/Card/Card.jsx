import React from "react";
import { Link } from "react-router-dom";

const Card = ({
  imageUrl,
  alternativeText,
  title,
  cardText,
  secondarycardText,
  thirdText,
  smallText,
  cardBody,
  loading,
}) => {
  return (
    <>
      <div className="card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <img
                src={imageUrl}
                className="img-fluid"
                lazy={loading}
                alt={alternativeText}
              />
            </div>
            <div className="col-md-8">
              <div className={cardBody}>
                <h3>{title}</h3>
                <p>{cardText}</p>
                <p>{secondarycardText}</p>
                <p>{thirdText}</p>
                <Link to="/Home">{smallText}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
