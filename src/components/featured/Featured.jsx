import useFetch from "../../hooks/useFetch";
import "./featured.css";
import { useNavigate } from "react-router-dom";
import { FaSearchLocation } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { RiReservedLine } from "react-icons/ri";
function Featured() {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Lahore,Dubai,Islamabad"
  );
  const navigate = useNavigate();

  return (
    <div className="featureDetail">
      <div className="detailCard">
        <div className="d">
          <FaSearchLocation className="fdicon" />
          <h3>Search Your destination</h3>
          <span>
            Easily find your dream vacation spot by searching for destinations
            worldwide. Explore various cities and attractions to plan your
            perfect getaway.
          </span>
        </div>
        <div className="d">
          <FaHotel className="fdicon" />
          <h3>Choose your Hotel</h3>
          <span>
            Browse through our extensive list of hotels to find the perfect
            accommodation for your stay. Filter by price, amenities, and guest
            ratings to ensure a comfortable and enjoyable experience.
          </span>
        </div>
        <div className="d">
          <RiReservedLine className="fdicon" />
          <h3>Reserve your room</h3>
          <span>
            Book your room with just a few clicks! Choose your preferred dates
            and room type, and secure your reservation instantly for a
            hassle-free travel experience.
          </span>
        </div>
      </div>
      <h2>Most Visited</h2>
      <div className="featured">
        {loading ? (
          "loding pls wait"
        ) : (
          <>
            <div className="featuredItems">
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/688249.jpg?k=42442ea62b97c8d6b57b4b6171b406e6778a9b160b4ce0c69f53726b397c7d3e&o="
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitle">
                <h1>Lahore</h1>
                <p>{data[0]} Properties</p>
              </div>
            </div>
            <div className="featuredItems">
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/977220.jpg?k=ee4b7b42c35b8cbf09c8ddb7630092b40cd706fec153c41904ed6e252a883938&o="
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitle">
                <h1>Dubai</h1>
                <p>{data[1]} Properties</p>
              </div>
            </div>
            <div className="featuredItems">
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/724981.jpg?k=d2a74ca55c128d783c4a6836713abe2ef7874ba2cc276b9f671df017ff24da19&o="
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitle">
                <h1>Islamabad</h1>
                <p>{data[2]} Properties</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Featured;
