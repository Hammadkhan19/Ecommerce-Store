import React from "react";
import Hero from "./HomeComponets/Hero";
import Divider from "./Divider";
import TopSelling from "./HomeComponets/TopSelling";
import StyleBrowse from "./HomeComponets/StyleBrowse";
import HappyCustomers from "./HomeComponets/HappyCustomers";

const Home = () => {
  return (
    <>
  
      <Hero />
      <TopSelling />
      <Divider />
      <StyleBrowse />
      <HappyCustomers />
      <br />
    </>
  );
};

export default Home;
