import React from "react";

const TopBar = () => {
  return (
    <>
      <div className=" w-full h-7 bg-black  ">
        <div className=" flex justify-center text-white gap-2 font-sans">
          <h4>Signup and get 20% off on your first offer. </h4>
         <a className=" underline" href="">Signup</a>
        </div>
      </div>
    </>
  );
};

export default TopBar;
