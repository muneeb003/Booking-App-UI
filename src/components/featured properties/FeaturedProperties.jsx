import React from "react";
import "./featuredproperties.css";
function FeaturedProperties() {
  return (
    <div className="fP">
      <div className="fPItem">
        <img
          src="https://xx.bstatic.com/xdata/images/hotel/600x600/496073690.jpg?k=bab1ac4e3aed035987b5540d23f0312e5443197f4c21f086e769a8e7ce53dbf7&o="
          alt=""
          className="fPImg"
        />
        <span className="fPName">Cenote Residence</span>
        <span className="fPCity">San Pablo, Mexico</span>
        <span className="fPPrice">Starting from $120</span>
        <div className="fPRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fPItem">
        <img
          src="https://xx.bstatic.com/xdata/images/hotel/square600/185580679.jpg?k=50467f2d9cdcf28cfc2f89b262800be132f747d2305c86f8bf633da404d23455&o="
          alt=""
          className="fPImg"
        />
        <span className="fPName">La Gasperinna</span>
        <span className="fPCity">Positano, Italy</span>
        <span className="fPPrice">Starting from $130</span>
        <div className="fPRating">
          <button>9.1</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fPItem">
        <img
          src="https://xx.bstatic.com/xdata/images/hotel/600x600/440847746.jpg?k=e7839814f33ba3eb0756dae38fdaf9aceca29922c6eb604d87d424ba7f6f22a8&o="
          alt=""
          className="fPImg"
        />
        <span className="fPName">Bo HO by Casa Oso</span>
        <span className="fPCity">Ahwahnee, USA</span>
        <span className="fPPrice">Starting from $70</span>
        <div className="fPRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProperties;
