import React from "react";
import "./searchItem.css";
function SearchItem() {
  return (
    <div className="searchItem">
      <img
        className="siImg"
        src="https://cf.bstatic.com/xdata/images/hotel/square600/577502428.webp?k=2f77ddad796032de7110aeff11fe76a686b64bd2d97335870103ce5fcfa228a1&o="
        alt=""
      />
      <div className="siDescription">
        <h1 className="siTitle">Tower Street Apartments</h1>
        <span className="siDistance">500m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="detailRating">
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className="detailPrice">
          <span className="price">$112</span>
          <span className="subtitle">includes taxes and fees</span>
          <button>See Availability</button>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
