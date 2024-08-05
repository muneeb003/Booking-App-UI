import { useContext, useState } from "react";
import "./reserve.css";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import axios, { all } from "axios";
import { useNavigate } from "react-router-dom";

function Reserve({ setOpen, hotelId }) {
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { date } = useContext(SearchContext);
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const getDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = [];
    while (date <= end) {
      list.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return list;
  };
  const allDates = getDates(date[0].startDate, date[0].endDate);

  const isAvailable = (roomNumber) => {
    console.log(roomNumber);
    if (!roomNumber || !Array.isArray(roomNumber.unavailableDates)) {
      return false; // or true, depending on how you want to handle this case
    }

    // Use 'some' to check if any unavailable date is found in allDates
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return isFound;
  };
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      console.log("handleCLikc");
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="reserve ">
      <div className="rcontainer">
        <RxCross2 className="rClose" onClick={() => setOpen(false)} />
        <span>Select Your Rooms</span>
        {data.map((item) => {
          return (
            <div className="rItem">
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.description}</div>
                <div className="rMax">Max People:{item.maxPeople}</div>
                <div className="rPrice">Price: {item.price}</div>
                {item.roomNumber.map((room) => {
                  return (
                    <div className="room">
                      <label htmlFor="">{room.number}</label>
                      <input
                        type="checkbox"
                        value={room._id}
                        onChange={handleSelect}
                        disabled={isAvailable(room.number)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <button onClick={handleClick} className="rbtn">
          Reserve Now
        </button>
      </div>
    </div>
  );
}

export default Reserve;
