
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../common/firebase";
import { collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { convertStatusToText, getFormattedDate,getStatusColor } from "../assest/util/util";
import BreadCrumb from "./BreadCrumb";
import Spinner from "./Spinner";

export default function ApplicationListManage() {
  const [values, loading, error] = useCollection(collection(db, "forms"));

  const sorting = (a, b) => {
    return b.data().createAt - a.data().createAt;
  
  };
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg bg-gray-50">
      <div className="mt-4 text-red-500">
        {loading && <Spinner />}
        {error && <p>Error: {error.message}</p>}

        {!values && !loading && (
          <p>
            Veri bulunamadı. Lütfen başvuru numaranızı kontrol edip tekrar
            deneyin
          </p>
        )}
      </div>
      <BreadCrumb className="p-3 border border-gray-700 rounded-lg " />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              İsim Soyisim
            </th>
            <th scope="col" className="px-6 py-3">
              Başvuru Numarası
            </th>
            <th scope="col" className="px-6 py-3">
              Oluşturulma Tarihi
            </th>
            <th scope="col" className="px-6 py-3">
              Güncellenme Tarihi
            </th>
            <th scope="col" className="px-6 py-3">
              Başvuru Durumu
            </th>
            <th scope="col" className="px-6 py-3">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody>
          {values?.docs &&
            values.docs
              .sort((a, b) => sorting(a, b))
              .map((value) => (
                <tr
                  key={value.id}
                  className={`odd:bg-white  even:bg-gray-50 `}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {value.data().name}  {value.data().surname}
                  </td>
                  <td className="px-6 py-4">
                    {value.id}
                  </td>
                  <td className="px-6 py-4">
                    {getFormattedDate(value.data().createAt)}
                  </td>
                  <td className="px-6 py-4">
                    {getFormattedDate(value.data().updateAt)}
                  </td>
                  <td className={`px-6 py-4 ${getStatusColor(value.data().status)}`}>
                    {convertStatusToText(value.data().status)}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/admin/basvuru/${value.id}`}
                      className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                    >
                      Düzenle
                    </Link>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
