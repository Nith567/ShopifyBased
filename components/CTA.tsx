"use client";
import Link from "next/link";
import { ClipboardIcon } from "@heroicons/react/24/outline";
export default function CTA({ id }: { id: any }) {
  const copyToClipboard = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/next/${id}`;
      await navigator.clipboard.writeText(url);
      alert("Copy and Paste in Frames!");
    } catch (error) {
      console.error("Failed to copy: ", error);
      alert("Failed to copy content to clipboard");
    }
  };
  return (
    <div className="custom-cta min-h-screen">
      <div className="bg-repeat w-full h-full text-primary-100 heropattern-topography-slate-500">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <img src="/shopifyBased.jpeg" alt="shopify" className=" h-24 mx-auto mb-5" />
            <h2
              className={`text-3xl font-bold tracking-tight text-white sm:text-4xl px-2 py-1`}
            >
              The only thing you can share link to your customers to order your
              products right within Frames with zap automation Rewards.
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <p className="font-mono text-blue-500 break-all flex whitespace-pre-wrap">
                {process.env.NEXT_PUBLIC_SITE_URL}/api/shop/{id}
                <button onClick={copyToClipboard}> copy
                  <ClipboardIcon />
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
