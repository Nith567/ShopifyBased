"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleVerify: (
    shopifyToken: string,
    publicUrl: string,
  ) => void;
}

const StoreModal: React.FC<Props> = ({ handleVerify, setShowModal }) => {
  const [shopifyToken, setShopifyToken] = useState<string>("");
  const [publicUrl, setPublicUrl] = useState<string>("");
  return (
    <div
      onClick={() => setShowModal(false)}
      className="bg-black/60 fixed top-0 left-0 z-[3000] w-screen h-screen flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex relative flex-col p-9 w-[90%] lg:w-[550px] gap-3 items-center custom-modal-bg rounded-md"
      >
        <div
          className="h-6 w-6 absolute top-6 right-6 text-gray-500 cursor-pointer"
          onClick={() => setShowModal(false)}
        >
          <XCircleIcon />
        </div>
        <p className="font-bold">Terms and Condition</p>

        <input
          type="text"
          id='shopifyToken'
          value={shopifyToken}
          onChange={(e) => setShopifyToken(e.target.value)}
          placeholder="Shopify Access Token"
          className="p-2 rounded w-full outline outline-1 bg-transparent focus:outline-2 outline-neutral-600"
        ></input>

          <input
            type="text"
            id='publicUrl'
            onChange={(e) => setPublicUrl(e.target.value)}
            placeholder="Enter your shopify website"
            className="p-2 rounded w-full outline outline-1 bg-transparent  focus:outline-2 outline-neutral-600"
          ></input>

                  <span>
            <Link
              target="_blank"
              href="https://medium.com/@nithinkatkam504106/automating-nft-rewards-for-shopify-orders-using-owl-protocol-and-zapier-ef2195518c54"
              className="underline text-purple-950"
            >
              ZapierTutorial
            </Link>
          </span>
          
        <div className="">
          By clicking the button below,make sure you follow this conditions:
          <ul className="list-disc px-5">
            <li>This app is for only ecomFrame,Kindly give Access Token enough scope permissions for orders </li>
            <li> Enter a key from the ShopifyDashboard</li>
            Disclaimer: It takes really some time to get a link, kindly wait for 2-3 minutes
          </ul>
        </div>

        <div>
          <button className="bg-[--green] hover:bg-[#7eaa2b] text-white rounded px-6 py-2"
          
          onClick={() =>
              handleVerify(
                (document.getElementById("shopifyToken") as HTMLInputElement)
                  ?.value,
                (document.getElementById("publicUrl") as HTMLInputElement)
                  ?.value,
              )
          }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreModal;
