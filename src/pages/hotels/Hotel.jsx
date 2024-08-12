import React, { useContext, useState } from "react";
import "./hotel.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FaLocationDot } from "react-icons/fa6";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { BsFullscreenExit } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import { SearchContext } from "../../context/SearchContext.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import Reserve from "../../components/reserve/Reserve.jsx";
function Hotel() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showSlider, setShowSlider] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const handleOpen = (i) => {
    setSlideIndex(i);
    setShowSlider(true);
  };
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading } = useFetch(`/hotels/find/${id}`);

  const { dates, options } = useContext(SearchContext);
  const milliSeconds_Per_Day = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / milliSeconds_Per_Day);
    return diffDays;
  }
  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);
  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideIndex === 0 ? 5 : slideIndex - 1;
    } else {
      newSlideNumber = slideIndex === 5 ? 0 : slideIndex + 1;
    }
    setSlideIndex(newSlideNumber);
  };
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setOpenModel(true);
    }
  };
  return (
    <div>
      <Navbar type={"list"} />
      <Header type={"list"} />
      {showSlider && (
        <div className="slider">
          <BsFullscreenExit
            className="close"
            onClick={() => setShowSlider(false)}
          />
          <FaArrowAltCircleLeft
            className="arrow"
            onClick={() => {
              handleMove("l");
            }}
          />
          <div className="slideWrapper">
            <img src={data.images[slideIndex]} alt="" className="sliderImg" />
          </div>
          <FaArrowAltCircleRight
            className="arrow"
            onClick={() => {
              handleMove("r");
            }}
          />
        </div>
      )}
      {loading ? (
        "Loading pls wait"
      ) : (
        <div className="hotelContainer">
          <div className="hotelWrapper">
            <div className="hotelImages">
              {data.images?.map((photo, i) => (
                <div className="hotelImgWrapper">
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>

            <div className="hotelDetails">
              <div className="hotelDetailsText">
                <h1 className="hotelName">{data.name}</h1>
                <div className="hotelAddress">
                  <FaLocationDot />
                  <span>{data.address}</span>
                </div>
                <span className="hotelDistance">
                  Excellent location – ${data.distance}m from center
                </span>
                <span className="hotelPriceHighlight">
                  Book a stay over ${data.cheapestPrice} at this property and
                  get a free airport taxi
                </span>
                <span className="hotelTitle">{data.title}</span>
                <span className="hotelDesc">{data.description}</span>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bottomContainer">
        <MailList />
        <Footer />
      </div>
      {openModel && <Reserve setOpen={setOpenModel} hotelId={id} />}
    </div>
  );
}

export default Hotel;
