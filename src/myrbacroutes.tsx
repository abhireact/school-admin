import React from "react";
import { useSelector } from "react-redux";

const Myrbacroutes = () => {
  const data = useSelector((state: any) => state);
  console.log("my redux data", data);

  // Store the data in the window object

  return (
    <ul>
      {data?.myrbac.map((item: string, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default Myrbacroutes;
