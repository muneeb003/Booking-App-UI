import "./featured.css";

function Featured() {
  return (
    <div className="featured">
      <div className="featuredItems">
        <img
          src="https://cf.bstatic.com/xdata/images/city/600x600/688249.jpg?k=42442ea62b97c8d6b57b4b6171b406e6778a9b160b4ce0c69f53726b397c7d3e&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitle">
          <h1>Lahore</h1>
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
        </div>
      </div>
    </div>
  );
}

export default Featured;
