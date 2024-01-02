import React from "react";
import ApplicationManage from "../components/ApplicationManage";
import { useParams } from "react-router-dom";

export default function ApplicationManagement() {
  const { basvuruNo } = useParams();
  return <ApplicationManage basvuruNo={basvuruNo} />;
}
