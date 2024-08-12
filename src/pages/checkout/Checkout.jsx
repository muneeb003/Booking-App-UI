import React, { useContext, useState } from "react";
import "./checkout.css";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { format } from "date-fns";
import { userInputs } from "../../FormInputs";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Checkout() {
  const { user } = useContext(AuthContext);
  const { dates, options } = useContext(SearchContext);
  const [userInfo, setUserInfo] = useState("");
  const [pay, setpay] = useState("");
  const location = useLocation();
  const { state } = location;
  const { hotelId, selectedRoomNumber, selectedRooms } = state;
  const { data } = useFetch(`/hotels/find/${hotelId}`); //hotel data

  const milliSeconds_Per_Day = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / milliSeconds_Per_Day);
    return diffDays;
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      const newBooking = {
        userInfo,
        data,
        selectedRoomNumber,
      };
      console.log(newBooking);
      await axios.post("/booking", newBooking);
      navigate("/home");
      alert("You Reservation was successful.");
    } catch (err) {
      console.log(err);
      alert("unsuccessful");
    }
  };
  return (
    <div className="">
      <Navbar type={"list"} />
      <div className="checkoutContainer">
        <div className="checkoutWrapper">
          <div className="leftContainer">
            <div className="hotelInfo">
              <span className="htype">{data.type}</span>
              <span className="hname">{data.name}</span>
              <span className="haddress">{data.address}</span>
              <span className="hcity">{data.city}</span>
              <span className="htitle">{data.title}</span>
              <span className="hdistance">Distance: {data.distance}</span>
              <div className="rating">
                <button className="cbtn">8.9</button>
                <span className="rtitle">Excellent</span>
              </div>
            </div>
            <div className="bookingInfo">
              <h3> Your Booking Details</h3>
              <div className="checkInOut">
                <div className="checkIn">
                  <span className="cText">Check In</span>
                  <span className="cDate">
                    {format(dates[0].startDate, "dd/MM/yyyy")}
                  </span>
                </div>
                <div className="vl"></div>
                <div className="checkout">
                  <span className="cText">Check Out</span>
                  <span className="cDate">
                    {format(dates[0].endDate, "dd/MM/yyyy")}
                  </span>
                </div>
              </div>
              <div className="stayTime">
                <span>Total lenght of stay: </span>
                <span className="cDays">{days} nights</span>
              </div>
              <div className="hr"></div>
              <div className="optionShow">
                <span className="cText">You selected:</span>
                <span className="cDate">
                  {options.adult} Adult {options.children} children{" "}
                  {options.room} Room
                </span>
              </div>
            </div>
          </div>
          <div className="rightContainer">
            <div className="userInfo">
              {user ? (
                <div>
                  <h1>Enter your details</h1>
                  <form>
                    <div className="inputs">
                      {userInputs.map((input) => (
                        <>
                          <span className="inputLabel">{input.label}: </span>
                          <input
                            className="inputInput"
                            type={input.type}
                            placeholder={input.placeholder}
                            id={input.id}
                            name={input.id}
                            onChange={handleChange}
                          />
                        </>
                      ))}
                    </div>
                  </form>
                </div>
              ) : (
                <div className="ulogin">
                  <div className="loginWrapper">
                    <span className="ulText">
                      Please Login to continue your reservation process.
                    </span>
                    <Link to="/login">
                      <button className="ulBtn">Login</button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="paymentInfo">
              <span className="payText">Payment Summary</span>
              <div className="priceMoney">
                <span>Price:</span>
                <span> ${days * data.cheapestPrice * options.room} </span>
              </div>
              <div className="priceInfo">
                <span>Price Information</span>
                <ul>
                  <li>
                    This price is converted to show you the approximate cost in
                    PKR. You'll pay in US$. The exchange rate might change
                    before you pay.
                  </li>
                  <li>
                    Keep in mind that your card issuer may charge you a foreign
                    transaction fee.
                  </li>
                  <li>
                    You'll be charged a prepayment of the total price at any
                    time.
                  </li>
                  <li>
                    If you cancel, you'll pay $
                    {days * data.cheapestPrice * options.room}
                  </li>
                </ul>
              </div>
            </div>
            <div className="special">
              <h3>Special Requests</h3>
              <span>
                Special requests can't be guaranteed, but the property will do
                its best to meet your needs. You can always make a special
                request after your booking is complete.
              </span>
              <h5>Please write your requests in English. (optional)</h5>
              <textarea onChange={handleChange} name="request" id=""></textarea>
            </div>
            <button onClick={() => setpay(true)} className="ulBtn">
              Pay
            </button>
          </div>
        </div>
      </div>
      {pay && (
        <div className="payment">
          <div className="payForm">
            <h2>Enter your card details</h2>
            <div className="cross" onClick={() => setpay(false)}>
              <ImCross />
            </div>
            <span>CardHolder</span>
            <input type="text" />
            <span>Card Number</span>
            <input type="text" />
            <span>Expiration Date</span>
            <input type="text" />
            <span>CVC</span>
            <input type="text" />
            <button onClick={handleSubmit} className="ulBtn">
              Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
