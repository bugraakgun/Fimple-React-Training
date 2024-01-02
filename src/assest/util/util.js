import { format } from 'date-fns'
export const convertStatusToText = (status) => {
  switch (status) {
    case 0:
      return "Bekliyor";
    case 1:
      return "İptal Edildi";
    case 2:
      return "Çözüldü";
    default:
      return "Bilinmeyen Durum";
  }
};
export const getFormattedDate = (date) =>{
  if(date === null || date === undefined){
    return "-";
  }
  return format (new Date(date.seconds * 1000),"dd/MM/yyyy - HH:mm");
}

export const getStatusColor = (status) => {
  if (status === 1) {
    return 'text-red-500'; // İptal Edildi durumu için kırmızı
  } else if (status === 2) {
    return 'text-green-500'; // Çözüldü durumu için yeşil
  } else {
    return 'text-gray-500'; // Bekliyor durumu için gri
  }
};

export const imageValidator = (file) => {
  const acceptedImageTypes = ["image/jpeg","image/jpg", "image/png", "image/gif", "image/svg+xml", "image/bmp", "image/webp"];

  return file && acceptedImageTypes.includes(file.type);
};
