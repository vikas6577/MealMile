import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

const Home = () => {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/fooddata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log(data.data,data.categorydata)
    setfoodItem(data.data);
    setfoodCat(data.categorydata);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        <Carousel />
      </div>
      <div className="container">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr/>
                  {foodItem!==[]?foodItem.filter((item)=>item.CategoryName===data.CategoryName).map(filterItems=>{
                    return (
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-4"> <Card/> </div>
                    )
                  })

                  :<div>No data found</div>}
                </div>
              );
            })
          : ""}
        {/* <Card /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
