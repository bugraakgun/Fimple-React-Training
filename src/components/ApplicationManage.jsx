import React from "react";
import { db } from "../common/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import {
  convertStatusToText,
  getFormattedDate,
  getStatusColor,
} from "../assest/util/util";
import BreadCrumb from "./BreadCrumb";
import Spinner from "./Spinner";
import ImageView from "./ImageView";
import { yupResolver } from "@hookform/resolvers/yup";
import { applicationManageSchema } from "../common/yupSchema";
import { MAX_MESSAGE_LENGTH } from "../common/constant";

export default function ApplicationManage({ basvuruNo }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ resolver: yupResolver(applicationManageSchema) });
  const [value, loading, error] = useDocumentData(doc(db, "forms", basvuruNo));
  const onSubmit = (data) => {
    let status = Number(data.status);
    updateDoc(doc(db, "forms", basvuruNo), {
      message: data.message,
      status: status > -1 ? status : 0,
      updateAt: new Date(),
    }).then(()=>{
      reset();
    }).catch((err) => {
      console.log("hata", err);
    });
  };
  return (
    <div className="container overflow-auto shadow-md sm:rounded-lg bg-gray-100">
      <div className="mt-4 text-red-500">
        {loading && <Spinner />}
        {error && <p>Error: {error.message}</p>}

        {!value && !loading && (
          <p>
            Veri bulunamadı. Lütfen başvuru numaranızı kontrol edip tekrar
            deneyin
          </p>
        )}
      </div>
      <BreadCrumb className="p-3 border border-gray-700 rounded-lg" />
      {value && (
        <div className="flex flex-col justify-center items-center py-10 gap-3 ">
          <div className="px-5 grid md:grid-cols-2 items-center w-full">
            <div className="flex flex-col items-center break-all">
              <span className="p-2 hover:bg-gray-200 transition-all">
                <strong>İsim Soyisim:</strong> {value.name} - {value.surname}
              </span>
              <span className="p-2 hover:bg-gray-200 transition-all">
                <strong>Adres:</strong> {value.address}
              </span>
              <span className="p-2 hover:bg-gray-200 transition-all ">
                <strong>Kimlik Numarası:</strong> {value.identityNumber}
              </span>
              <span className="p-2 hover:bg-gray-200 transition-all ">
                <strong>Yaş:</strong> {value.age}
              </span>
              <span
                className={`p-2 hover:bg-gray-200 transition-all ${getStatusColor(
                  value.status
                )}`}
              >
                <strong>Durum:</strong> {convertStatusToText(value.status)}
              </span>
              <span className="p-2 hover:bg-gray-200 transition-all">
                <strong>Başvuru Nedeni:</strong> {value.applicationReason}
              </span>
              <span className="p-2 hover:bg-gray-200 transition-all">
                <strong>Mesaj:</strong> {value.message}
              </span>
              <span className="p-2 hover:bg-gray-200 transition-all ">
                <strong>Oluşturma Zamanı:</strong>{" "}
                {getFormattedDate(value.createAt)}
              </span>
            </div>
            <div className="lg:w-2/3">
              <ImageView imageUrl={value.imageUrl} />
            </div>
          </div>

          <form
            className=" md:w-2/3 w-full px-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Mesaj Giriniz
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Mesaj giriniz..."
              {...register("message")}
            >
              {value.message}
            </textarea>
            <p className="text-red-600 text-sm italic mx-1">
              {errors.message?.message}
            </p>
            <span className="text-gray-500 text-sm float-right">{`${MAX_MESSAGE_LENGTH}/${
              watch("message")?.length ? watch("message")?.length : 0
            }`}</span>

            <select
              className="bg-gray-50 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              {...register("status")}
            >
              <option value="-1" selected>
                Seçiniz
              </option>
              <option value="0">{convertStatusToText(0)}</option>
              <option value="1">{convertStatusToText(1)}</option>
              <option value="2">{convertStatusToText(2)}</option>
            </select>
            <p className="text-red-600 text-sm italic mx-1">
              {errors.status?.message}
            </p>

            <button
              type="submit"
              className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
