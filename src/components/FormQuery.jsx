import { doc } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../common/firebase";
import {
  convertStatusToText,
  getFormattedDate,
  getStatusColor,
} from "../assest/util/util";
import { useDocumentData } from "react-firebase-hooks/firestore";
import ImageView from "./ImageView";
import Spinner from "./Spinner";

export default function FormQuery() {
  const [applicationCode, setApplicationCode] = useState(null);
  const [value, loading, error] = useDocumentData(
    applicationCode ? doc(db, "forms", applicationCode) : null
  );
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    setApplicationCode(data.applicationCode);
  };
  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-gray-100 rounded-md text-center break-words">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="applicationCode"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Başvuru Numarası:
        </label>
        <input
          type="text"
          id="applicationCode"
          className="w-full p-2 border-b-transparent border-b focus:outline-none focus:border-b-red-500 rounded-md mb-4"
          {...register("applicationCode")}
          placeholder="ZCR5ebakqdbqZ3ZLIpu7"
        />

        <button
          type="submit"
          className="max-w-fit bg-red-500 text-white py-2 px-10 rounded-full font-medium hover:bg-red-400 transition-all"
        >
          Gönder
        </button>
      </form>
      <div className="mt-4 text-red-500">
        {loading && <Spinner />}
        {error && <p>Error: {error.message}</p>}

        {applicationCode && !value && !loading && (
          <p>
            Veri bulunamadı. Lütfen başvuru numaranızı kontrol edip tekrar
            deneyin
          </p>
        )}
      </div>

      {value && (
        <div className="mt-4">
          <div className="border-t border-t-red-500 my-3"></div>
          <p className="mb-2">
            <span className="font-semibold">İsim Soyisim:</span> {value.name} {value.surname}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Başvuru Özeti:</span>{" "}
            {value.applicationReason}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Oluşturma Tarihi:</span>{" "}
            {getFormattedDate(value.createAt)}
          </p>
          {value.updateAt && (
            <p className="mb-2">
              <span className="font-semibold">Güncellenme Tarihi:</span>{" "}
              {getFormattedDate(value.updateAt)}
            </p>
          )}
          <p className="mb-2">
            <span className="font-semibold">Mesaj:</span> {value.message}
          </p>
          <p className={`mb-2 ${getStatusColor(value.status)}`}>
            <span className="font-semibold">Durum:</span>{" "}
            {convertStatusToText(value.status)}
          </p>
          {<ImageView imageUrl={value.imageUrl}/>}
        </div>
      )}
    </div>
  );
}
