import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.css";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [showDate, setShowDate] = useState(false);
  return (
    <div>
      <Navbar />
      <Header type={"list"} />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="">Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label htmlFor="">Check In</label>
              <span onClick={() => setShowDate(!showDate)}>{`${format(
                date[0].startDate,
                "dd/MM/yyyy"
              )} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
              {showDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                  style={{ width: "inherit" }}
                />
              )}
            </div>
            <div className="lsItem">
              <label htmlFor="">Options</label>
              <div className="optionItems">
                <div className="lsOptionItem">
                  <span className="optionText">Min Price</span>
                  <input className="optionInput" type="number" />
                </div>
                <div className="lsOptionItem">
                  <span className="optionText">Max Price</span>
                  <input className="optionInput" type="number" />
                </div>
                <div className="lsOptionItem">
                  <span className="optionText">Adults</span>
                  <input
                    className="optionInput"
                    min={1}
                    type="number"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="optionText">Children</span>
                  <input
                    className="optionInput"
                    min={0}
                    type="number"
                    placeholder={options.children}
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
