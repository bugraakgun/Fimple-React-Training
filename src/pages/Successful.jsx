import React from "react";
import Header from "../components/Header";
import SuccessfulMessage from "../components/SuccessfulMessage";
import { useParams } from "react-router-dom";

export default function Successful() {
  const { basvuruNo } = useParams();
  return (
    <>
      
      <Header />
      <SuccessfulMessage basvuruNo={basvuruNo} />
    </>
  );
}
