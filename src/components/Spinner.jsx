import React from "react";
import { TbFidgetSpinner } from "react-icons/tb";

export default function Spinner() {
  return (
    <>
      <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
      <div className="absolute  -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 z-20">
        <TbFidgetSpinner className="animate-spin w-10 h-10" />
      </div>
    </>
  );
}
