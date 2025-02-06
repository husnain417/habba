import React from "react";
import Header from "../components/header";
import AnimatedFooter from "../components/footer";
import { Typography } from "@material-tailwind/react";

const Checkoutpage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      

      <AnimatedFooter />
    </div>
  );
};

export default Checkoutpage;