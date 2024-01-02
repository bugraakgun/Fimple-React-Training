
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../common/firebase";
import {
  convertStatusToText,
  getFormattedDate,
  getStatusColor,
} from "../assest/util/util";
import Spinner from "./Spinner";
import ImageView from "./ImageView";

export default function ApplicationDetail({ basvuruNo }) {
  const [value, loading, error] = useDocumentData(
    doc(db, "forms", basvuruNo)
  );

  return (
    <>
      {loading && <Spinner />}
      <div className="max-w-md mx-auto mt-8  bg-gray-100 rounded-md text-center">
        {error && <span>error</span>}

        {value ? (
          <div className="p-4 break-words">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              Başvuru Detayları
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Başvuru Numarası:</strong> {basvuruNo}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>İsim-Soyisim:</strong> {value.name}  {value.surname}
            </p>
            <p className="text-lg text-gray-700 mb-4 ">
              <strong>Başvuru Nedeni:</strong> {value.applicationReason}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Oluşturma Zamanı:</strong> {getFormattedDate(value.createAt)}
            </p>
            {value.updateAt && (
              <p className="text-lg text-gray-700 mb-4">
                <strong>Güncelleme Zamanı:</strong> {getFormattedDate(value.updateAt)}
              </p>
            )}

            <p
              className={`text-lg text-gray-700 mb-4 ${getStatusColor(
                value.status
              )}`}
            >
              <strong>Durum:</strong> {convertStatusToText(value.status)}
            </p>
            <div className="bg-white p-4 rounded-md shadow-md">
              <p className="font-bold text-green-700">Mesaj:</p>
              <p className="text-gray-700">
                {value.message?.length
                  ? value.message
                  : "Yönetici tarafından mesaj girilmemiştir."}
              </p>
            </div>
            <ImageView  imageUrl={value.imageUrl} />
          </div>
        ) : (
          !loading && (
            <div className="text-red-500 text-lg font-bold p-3">
              Veri bulunamadı. Lütfen başvuru numaranızı kontrol edip tekrar
              deneyin
            </div>
          )
        )}
      </div>
    </>
  );
}
