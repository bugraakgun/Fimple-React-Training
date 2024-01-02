import React from "react";
import { Link } from "react-router-dom";
import noPhoto from "../assest/img/no-photo.jpg";

export default function ImageView({ imageUrl }) {
  return imageUrl ? (
    <Link to={imageUrl} target="_blank" className="relative inline-block group">
      <img
        src={imageUrl}
        alt="img"
        className="w-4/5 mx-auto my-4 transition-transform transform group-hover:scale-105"
      />
    </Link>
  ) : (
    <img
      src={noPhoto}
      alt="img"
      className="w-4/5 mx-auto my-4 transition-transform transform hover:scale-105 cursor-pointer"
    />
  );
}
