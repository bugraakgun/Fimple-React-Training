import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../common/firebase";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { MAX_REASON_LENGTH, MAX_ADDRESS_LENGTH } from "../common/constant";
import { createFormSchema } from "../common/yupSchema";
import { imageValidator } from "../assest/util/util";
const formRef = collection(db, "forms");

function CreateForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(createFormSchema),
  });
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    let formUrl = null;
    const currentDate = new Date();
    try {
      if (data.image[0]) {
        if (imageValidator(data.image[0])) {
          let imageUrl = `${data.name}-${data.surname}-${currentDate.getTime()}`;
          const imageRef = ref(storage, imageUrl);
          await uploadFile(imageRef, data.image[0]);
          formUrl = await getDownloadURL(imageRef);
        } else {
          console.log("dosya tipi desteklenmiyor.");
        }
      }

      const docRef = await addDoc(formRef, {
        name: data.name,
        surname: data.surname,
        age: data.age,
        identityNumber: data.identityNumber,
        applicationReason: data.applicationReason,
        address: data.address,
        createAt: currentDate,
        updateAt: null,
        status: 0,
        imageUrl: formUrl,
      });
      reset();
      navigate(`/basarili/${docRef.id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto mt-8 p-4 py-8 bg-gray-100 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] gap-6 grid"
    >
      <div className="grid md:grid-cols-2 md:gap-6">
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Ad:
          </label>

          <input
            className="w-full p-2 border rounded-md border-b-transparent border-b focus:outline-none focus:border-b-red-500"
            {...register("name")}
          />
          <p className="text-red-600 text-sm italic mx-1">
            {errors.name?.message}
          </p>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Soyad:
          </label>

          <input
            className="w-full p-2 border rounded-md border-b-transparent border-b focus:outline-none focus:border-b-red-500"
            {...register("surname")}
          />
          <p className="text-red-600 text-sm italic mx-1">
            {errors.surname?.message}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Yaş:
          </label>
          <input
            className="remove-arrow w-full p-2 border rounded-md border-b-transparent border-b focus:outline-none focus:border-b-red-500"
            type="text"
            {...register("age")}
          />
          <p className="text-red-600 text-sm italic mx-1">
            {errors.age?.message}
          </p>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            TC:
          </label>
          <input
            className="remove-arrow w-full p-2 border rounded-md border-b-transparent border-b focus:outline-none focus:border-b-red-500"
            type="text"
            {...register("identityNumber")}
          />
          <p className="text-red-600 text-sm italic mx-1">
            {errors.identityNumber?.message}
          </p>
        </div>
      </div>

      <div className="">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Başvuru Nedeni:
        </label>
        <textarea
          className="w-full p-2 border rounded-md border-b-transparent border-b focus:outline-none focus:border-b-red-500 over"
          {...register("applicationReason")}
        />
        <p className="text-red-600 text-sm italic -mt-1 mx-1">
          {errors.applicationReason?.message}
        </p>
        <span className="text-gray-500 text-sm float-right">{`${MAX_REASON_LENGTH}/${
          watch("applicationReason")?.length
            ? watch("applicationReason")?.length
            : 0
        }`}</span>
      </div>

      <div className="">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Adres Bilgisi:
        </label>

        <textarea
          className="w-full p-2 border rounded-md border-b-transparent border-b focus:outline-none focus:border-b-red-500"
          {...register("address")}
        />
        <p className="text-red-600 text-sm italic -mt-1 mx-1">
          {errors.address?.message}
        </p>
        <span className="text-gray-500 text-sm float-right">{`${MAX_ADDRESS_LENGTH}/${
          watch("address")?.length ? watch("address")?.length : 0
        }`}</span>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Fotoğraflar/Ekler
        </label>

        <input
          className="relative m-0 block w-full min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:bg-red-500  file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-red-400 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none file:hover:bg-red-400 hover:cursor-pointer "
          type="file"
          id="image"
          {...register("image")}
          accept="image/*"
        />
        <div className="w-full bg-gray-200 rounded-full mt-2 text-xs font-medium text-gray-800">
          {snapshot?.bytesTransferred && (
            <div
              className="bg-red-500 text-center p-0.5 leading-none rounded-full"
              style={{
                width: `${(
                  (snapshot.bytesTransferred / snapshot.totalBytes) *
                  100
                ).toFixed(2)}%`,
              }}
            >
              {(
                (snapshot.bytesTransferred / snapshot.totalBytes) *
                100
              ).toFixed(2)}{" "}
              %
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="outline-none max-w-fit bg-red-500 text-white py-2 px-10 rounded-full font-medium hover:bg-red-400 transition-all"
        >
          Gönder
        </button>
      </div>
    </form>
  );
}

export default CreateForm;
