import React from "react";
import Header from "../components/UI/Header";
import profiles from "/profiles.png";
import {
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterXFill,
} from "react-icons/ri";
import { useState } from "react";
import { toast } from "sonner";
const serverUrl = import.meta.env.VITE_SERVER_URL;
const Waitlist = () => {
  const [joiningWaitlist, setJoiningWaitlist] = useState(false);
  const [email, setEmail] = useState("");
  const joinWaitlist = async () => {
    if (!email) {
      return toast.warning("Please provide your email!");
    }
    setJoiningWaitlist(true);
    const loading = toast.loading("Addding you to the waitlist");
    try {
      const res = await fetch(`${serverUrl}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.status === "success") {
        toast.dismiss(loading);
        toast.success(data.message);
      } else {
        toast.dismiss(loading);
        toast.error(
          data.message || "Failed to join waitlist, please try again"
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loading);
      setJoiningWaitlist(false);
    }
  };

  return (
    <section className="flex flex-col gap-25 lg:gap-14 h-screen bg-transparent px-8 py-7 text-tertiary">
      <nav className="flex justify-between items-center">
        <h3 className="font-medium text-base sm:text-xl lg:text-2xl text-tertiary">
          Flow<span className="font-bold">Unit</span>
        </h3>
        
      </nav>
      <main className="flex w-full flex-col justify-center items-center gap-18 lg:gap-12">
        <div className="flex flex-col gap-7 items-center">
          <div className="flex flex-col gap-5 items-center">
            <div className="flex items-center gap-1 bg-tertiary/10 text-xs lg:text-sm p-1 rounded-[18px]">
              <img
                src={profiles}
                alt="profiles"
                className="w-[50px] lg:w-[60px] object-contain"
              />
              <h4 className="py-2 pl-0 pr-2 font-semibold">
                100+ currently on the waitlist
              </h4>
            </div>
            <div className="flex flex-col text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-6xl font-bold">
                Transforming Workflows
              </h2>
              <h2 className="text-2xl sm:text-3xl lg:text-6xl font-light italic">
                One Task at a Time.
              </h2>
            </div>
          </div>
          <div
            className="text-center text-sm lg:text-base font-medium flex flex-col gap-0"
            style={{ lineHeight: 1 }}
          >
            <p>Stay ahead of your tasks before anyone else does.</p>
            <p>Join the waitlist for early access and updates.</p>
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:gap-5 items-center">
          <div className="bg-tertiary/10 rounded-[18px] flex items-center p-2">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Enter Your Email"
              className="text-tertiary text-sm lg:text-base font-semibold outline-0 px-2 lg:px-3 border-0 w-[50%] lg:w-[60%]"
              disabled={true}
            />
            <button
              disabled={true}
              onClick={joinWaitlist}
              className="bg-tertiary w-[50%] lg:w-[40%] text-primary font-medium text-sm px-3 lg:px-3 py-2 lg:py-3 cursor-pointer transition-all rounded-[18px]"
            >
              Join The Waitlist
            </button>
          </div>
          <div className="flex gap-3 items-center">
            <a
              href="https://instagram.com/zenithdevtech"
              target="_blank"
              className="bg-tertiary/10 p-2 rounded-[10px] text-sm"
            >
              <RiInstagramFill />
            </a>
            <a
              href="https://x.com/zenithdevtech"
              target="_blank"
              className="bg-tertiary/10 p-2 rounded-[10px] text-sm"
            >
              <RiTwitterXFill />
            </a>
            <a
              href="https://linkedin.com/in/bamitale-abdulazeem-i-214026333/"
              target="_blank"
              className="bg-tertiary/10 p-2 rounded-[10px] text-sm"
            >
              <RiLinkedinFill />
            </a>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Waitlist;
