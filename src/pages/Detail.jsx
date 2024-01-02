import { useParams } from "react-router-dom";
import ApplicationDetail from "../components/ApplicationDetail";
import Header from "../components/Header";

export default function Detail() {
  const { basvuruNo } = useParams();

  return (
    <>
      <Header />
      <ApplicationDetail basvuruNo={basvuruNo} />
    </>
  );
}
