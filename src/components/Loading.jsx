import React from "react";
import Spinner from "../assets/Spinner.svg";

export default function Loading() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <figure className="flex flex-col justify-center items-center">
        <img className="flex justify-center w-20" src={Spinner} alt="Loader Img" />
        <figcaption className="text-white">Loading...</figcaption>
      </figure>
    </div>
  );
}
