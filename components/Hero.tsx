'use client'
import { useState, useEffect } from "react";
import { Sansita_Swashed, Petrona } from "next/font/google";
const sasita = Sansita_Swashed({ subsets: ["latin"] });
import { useAccount, useConnect, useDisconnect} from "wagmi";
const petrona = Petrona({ subsets: ["latin"] });
import StoreModal from "./StoreModal";
import axios from "axios";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
import { useRouter } from "next/navigation";
import { britney } from "@/app/fonts";

import dynamic from 'next/dynamic';
import Indexer from "./indexer";
const Hero=() =>{
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { connectors, connect, status, error } = useConnect();
  const [copied, setCopied] = useState(false);
  const {address} = useAccount();
  const connector = connectors[0];

function Copy() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
function Tick() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}


  function handleCopyAddress() {
    if (!address) return;
    navigator.clipboard
      .writeText(address)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }

  const handleVerify = async (shopifyToken: string, publicUrl: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/ship`, {
        shopifyToken,
        publicUrl,
        address
      });
      const objectId = response.data._id;
      router.push(`/shop/${objectId}`);
    } catch (error) {
      console.error("Error verifying:", error);
    }
    setShowModal(false);
  };



  return (
    <section className="min-h-screen">
    {showModal && (
      <StoreModal setShowModal={setShowModal} handleVerify={handleVerify} />
    )}

<div className="custom-hero-gradient min-h-screen scale-x-[-1]">
  <div
    className={
      montserrat.className +
      " text-black scale-x-[-1] flex text-4xl md:text-[60px] leading-[1.2] font-bold flex-col items-start pl-6 md:pl-28 justify-center"
    }
  >
    <div className="h-[50vh] pb-2 w-full md:w-[700px] flex flex-col justify-end">
      <span>
        <span
          className={`${sasita.className} text-transparent bg-clip-text bg-gradient-to-br from-slate-500 mt-2 to-[#01f141]`}
        >
          ShopifyBased
        </span>
        <br />
        Customers can order your products right within{" "}
        Frames
      </span>
    </div>
    <div className="text-white pt-2">
      <span>
        Shopify <span className={britney.className}>OnChain</span>
      </span>
    </div>
    <p className="pt-16 pb-8 text-white font-normal text-base w-full md:w-[700px]">
      Get a frame link from the product page and share it with your customers to order your products right within Frames with Rewards{" "}
      <span className={britney.className}>Onchain</span>
    </p>
    <div className="flex flex-row w-auto gap-4">
      <button
        onClick={() => setShowModal(true)}
        className="px-5 py-3 bg-slate-300 hover:bg-indigo-600 rounded text-base font-semibold shadow-md transition duration-300 ease-in-out"
      >
        Get Started
      </button>
      {address ? (
        <div className="text-center text-xl">
          <button
            onClick={handleCopyAddress}
            className="px-5 py-3 bg-blue-500 hover:bg-violet-800 text-white font-bold rounded-lg shadow-md flex items-center gap-2 transition duration-300 ease-in-out"
          >
            <span>{`${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`}</span>
            <span className="text-[10px]">
              {/* {copied ? <Tick /> : <Copy />} */}
            </span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => connect({ connector })}
          className="px-5 py-3 rounded-md bg-white text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition duration-300 ease-in-out"
        >
          Log In
        </button>
      )}
    </div>

    <div className="mt-8 text-blue-500">
      Chat with our indexer
    <Indexer/>
    </div>
  </div>
</div>

  </section>
  
  );
}
// export default Hero;
export default dynamic(() => Promise.resolve(Hero), { ssr: false });
