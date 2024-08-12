import FeaturedProperties from "../../components/featured properties/FeaturedProperties";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/property list/PropertyList";
import "./home.css";

function Home() {
  return (
    <div>
      <div className="navhead">
        <Navbar />
        <Header />
      </div>

      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse By Type</h1>
        <PropertyList />
        <h1 className="homeTitle">Featured</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
