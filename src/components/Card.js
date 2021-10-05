import React from "react";
import { StarRate } from "@material-ui/icons";

export const Card = ({ stay, index }) => {
  const {
    city,
    country,
    superHost,
    title,
    rating,
    maxGuests,
    type,
    beds,
    photo,
  } = stay;

  return (
    <article className="card" key={index}>
      <div className="stay-pic">
        <img src={photo} alt="stay" />
      </div>
      <div className="stay-info">
        {superHost && (
          <div className="super-host-border">
            <p className="super-host-text">SUPER HOST</p>
          </div>
        )}
        <p
          className="stay-type"
          style={{ marginLeft: `${!superHost ? "0px" : "11px"}` }}
        >
          {type}
          {beds && ` . ${beds} beds`}
        </p>

        <p className="rating">
          <StarRate className="star" />
          {rating}
        </p>
      </div>
      <h3 className="title">{title}</h3>
    </article>
  );
};
