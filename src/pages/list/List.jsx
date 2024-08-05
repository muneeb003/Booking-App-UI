import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.css";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch.js";
import { SearchContext } from "../../context/SearchContext.js";

function List() {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [showDate, setShowDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetchData } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );
  const { dispatch } = useContext(SearchContext);
  const handleClick = (e) => {
    e.prventDefault();
    reFetchData();
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
  };
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
              <input
                onChange={(e) => setDestination(e.target.value)}
                placeholder={destination}
                type="text"
              />
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
                  <input
                    onChange={(e) => setMin(e.target.value)}
                    className="optionInput"
                    type="number"
                    min={1}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="optionText">Max Price</span>
                  <input
                    onChange={(e) => setMax(e.target.value)}
                    className="optionInput"
                    type="number"
                    min={1}
                  />
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
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading pls wait"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
