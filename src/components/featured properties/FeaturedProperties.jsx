import React from "react";
import "./featuredproperties.css";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
function FeaturedProperties() {
  const { data, loading } = useFetch("/hotels?features=true");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/hotels/${data._id}`);
  };
  return (
    <div className="fP">
      {loading ? (
        "Loading pls wait"
      ) : (
        <>
          {data.map((item) => (
            <div className="fPItem" key={item._id}>
              <img src={item.images[0]} alt="" className="fPImg" />
              <span className="fPName">{item.name}</span>
              <span className="fPCity">{item.city}</span>
              <span className="fPPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating || (
                <div className="fPRating">
                  <button>8.9</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default FeaturedProperties;
