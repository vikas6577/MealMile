import React from "react";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

const Home = () => {
  return (
    <div>
      {/* <div>
        <Navbar />
      </div> */}
      <div>
        <Carousel/>
      </div>
      <div>
        <Card />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
