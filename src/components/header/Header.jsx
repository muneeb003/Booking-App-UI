import "./header.css";
import { FaBed } from "react-icons/fa";
import { FaPlane } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import { MdAttractions } from "react-icons/md";
import { FaTaxi } from "react-icons/fa";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaPerson } from "react-icons/fa6";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
function Header({ type }) {
  const [showDate, setShowDate] = useState(false);
  const [showCount, setShowCount] = useState(false);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
  });

  const navigate = useNavigate();
  const handleClick = (name, operation) => {
    setOptions((prevState) => {
      return {
        ...prevState,
        [name]:
          operation === "i"
            ? options[name] + 1
            : options[name] === 0
            ? options[name] + 0
            : options[name] - 1,
      };
    });
  };
  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };
  const style = {
    height: "120px",
  };
  return (
    <div className="header" style={type === "list" ? style : null}>
      <div className="header-container">
        <div className="headerList">
          <div className="list-item active">
            <FaBed />
            <span>Stay</span>
          </div>
          <div className="list-item">
            <FaPlane />
            <span>Flights</span>
          </div>
          <div className="list-item">
            <FaCar />
            <span>Car Rentals</span>
          </div>
          <div className="list-item">
            <MdAttractions />
            <span>Attractions</span>
          </div>
          <div className="list-item">
            <FaTaxi />
            <span>Taxi</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">A piece of paradise just for you</h1>
            <p className="description">
              Book entire houses, villas, cabins, and more
            </p>
            <button className="btn">Login/Register</button>

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FaBed />
                <input
                  type="text"
                  placeholder="Where you wanna go?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <IoCalendarNumberOutline />
                <span
                  onClick={() => {
                    setShowDate(!showDate);
                  }}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                  date[0].endDate,
                  "dd/MM/yyyy"
                )}`}</span>
                {showDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FaPerson />
                <span
                  onClick={() => {
                    setShowCount(!showCount);
                  }}
                  className="headerSearchText"
                >{`${options.adult} adults ${options.children} children `}</span>

                {showCount && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adults</span>
                      <div className="optionCounter">
                        <button
                          className="optionbtn"
                          onClick={() => handleClick("adult", "i")}
                        >
                          +
                        </button>
                        <span className="count">{options.adult}</span>
                        <button
                          disabled={options.adult <= 0}
                          className="optionbtn"
                          onClick={() => handleClick("adult", "d")}
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          className="optionbtn"
                          onClick={() => handleClick("children", "i")}
                        >
                          +
                        </button>
                        <span className="count">{options.children}</span>
                        <button
                          disabled={options.children <= 0}
                          className="optionbtn"
                          onClick={() => handleClick("children", "d")}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button
                  className="headerSearchButton btn"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
