import { useState } from "react";
import { FaCopy, FaRegCopy } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function SuccessfulMessage({ basvuruNo }) {
  const [copied, setCopied] = useState(false);
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(basvuruNo);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (error) {
      console.error("Kopyalama işlemi başarısız", error);
    }
  };
  return (
    <>
      <div className="max-w-lg p-8 mx-auto mt-8  bg-gray-100 rounded-md text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Başvurunuz Başarıyla Alındı!
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Teşekkür ederiz! Başvurunuz alınmıştır. Başvurunuzu takip edeceğiniz
          kod aşağıda yer almaktadır:
        </p>
        <div className="bg-white p-4 rounded-md shadow-md">
          <p className="font-bold text-green-700 mb-3">Başvuru Kodu:</p>
          <div className="flex justify-center items-center">
            <Link
              to={`/detay/${basvuruNo}`}
              className="text-red-500 font-semibold hover:text-gray-700"
            >
              {basvuruNo}
            </Link>

            <button
              className="ml-2 px-3 py-1 text-xl inline"
              onClick={handleCopyClick}
            >
              {copied ? (
                <>
                  <FaCopy className="inline-block" /> 
                  <span className="text-gray-700 text-sm px-3 ml-1 absolute bg-gray-100 p-1 rounded-3xl">
                    kopyalandı
                  </span>
                </>
              ) : (
                  <FaRegCopy className="inline-block" />
              )}
            </button>
          </div>
        </div>
        <p className="text-normal text-gray-700 mt-4">
          Başvurunuzu sorgulama ekranı ile veya
          <Link
            to={`/detay/${basvuruNo}`}
            className="text-red-500 hover:text-gray-700"
          >
            {" "}
            link
          </Link>{" "}
          üzerinden takip edebilirsiniz.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          Başvurunuzla ilgili herhangi bir güncelleme olduğunda size
          bildireceğiz.
        </p>
      </div>
    </>
  );
}
