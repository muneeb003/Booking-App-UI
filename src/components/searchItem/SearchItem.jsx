import React from "react";
import "./searchItem.css";
import { Link } from "react-router-dom";
function SearchItem({ item }) {
  return (
    <div className="searchItem">
      <img className="siImg" src={item.images[0]} alt="" />
      <div className="siDescription">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{item.description}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating || (
          <div className="detailRating">
            <span>Excellent</span>
            <button>8.9</button>
          </div>
        )}
        <div className="detailPrice">
          <span className="price">${item.cheapestPrice}</span>
          <span className="subtitle">includes taxes and fees</span>

          <Link to={`/hotels/${item._id}`}>
            <button className="availableBtn">See Availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
