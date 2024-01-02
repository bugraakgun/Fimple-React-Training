import { MAX_ADDRESS_LENGTH, MAX_REASON_LENGTH,MAX_MESSAGE_LENGTH } from "./constant";
import * as yup from "yup";

//CREATE FORM MAIN PAGE SCHEMA
export const createFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("* Ad zorunludur")
    .matches(
      /^[\s]*[a-zA-ZğüşıöçĞÜŞİÖÇ]+[\s]*$/,
      "* Ad sadece harf içermelidir"
    ),
  surname: yup
    .string()
    .required("* Soyad zorunludur")
    .matches(
      /^[\s]*[a-zA-ZğüşıöçĞÜŞİÖÇ]+[\s]*$/,
      "* Soyad sadece harf içermelidir"
    ),
  age: yup
    .string()
    .required("* Yaş zorunludur")
    .matches(/^[0-9]+$/, "* Yaş alanına sadece sayı girişi yapılabilir"),
  identityNumber: yup
    .string()
    .required("* Tc zorunludur")
    .matches(/^[0-9]{11}$/, "* TC Kimlik Numarası 11 haneli olmalıdır"),
  applicationReason: yup
    .string()
    .required("* Başvuru Nedeni zorunludur")
    .max(
      MAX_REASON_LENGTH,
      `* Başvuru Nedeni en fazla ${MAX_REASON_LENGTH} karakter olmalıdır`
    ),
  address: yup
    .string()
    .required("* Adres zorunludur")
    .max(
      MAX_ADDRESS_LENGTH,
      `* Adres en fazla ${MAX_ADDRESS_LENGTH} karakter olmalıdır`
    ),
});
//END--CREATE FORM MAIN PAGE SCHEMA 

//APPLICATION MANAGE SCHEMA
export const applicationManageSchema = yup.object().shape({
  message: yup.string().required("Mesaj alanı zorunludur").max(
    MAX_MESSAGE_LENGTH,
    `* Başvuru Nedeni en fazla ${MAX_MESSAGE_LENGTH} karakter olmalıdır`
  ),
  status: yup
    .number()
    .min(0, "* Durum alanı geçerli değil")
    .required("* Durum alanı zorunludur"),
});

//END--APPLICATION MANAGE SCHEMA
