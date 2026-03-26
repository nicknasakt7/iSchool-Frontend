"use client";

import Image from "next/image";
import { toast } from "sonner";

type TitleProps = {
  title: string;
  desc: string;
};

const Title = ({ title, desc }: TitleProps) => {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <h2 className="text-3xl sm:text-5xl font-semibold dark:text-white">
        {title}
      </h2>
      <p className="max-w-lg text-gray-500 dark:text-white/75">{desc}</p>
    </div>
  );
};

export default function ContectForm() {
  const handleOnsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget; // ✅ เก็บไว้ก่อน

    const formData = new FormData(form);
    formData.append("access_key", "c91063a3-1e52-4fb8-8c70-4d21ff16af83");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Thank you for your submission!");
        form.reset();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div id="contect">
      <div
        className="flex flex-col items-center pt-20 gap-6 px-4 sm:px-12 lg:px-24 xl:px-40 text-gray-800 dark:text-white"
      >
        <Title
          title="Join the Future of Learning"
          desc="Admissions are now open for the upcoming academic year. Secure
          your spot in the global community of innovators."
        />

        <form onSubmit={handleOnsubmit} className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl w-full">
          <div>
            <p className="mb-2 text-sm font-medium">Your name</p>
            <div className="flex flex-cols sm:flex-row border border-gray-200 rounded-xl pl-2 dark:border-gray-600">
              <Image src="/email_icon.svg" alt="email" width={20} height={20} />
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 text-sm outline-none"
                required
              />
              {/* required = ฟิลด์นี้ “ต้องกรอกห้ามเว้นว่าง” ก่อนกดส่งฟอร์ม ✅ */}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Email id</p>
            <div className="flex flex-cols sm:flex-row border border-gray-200 rounded-xl pl-2 dark:border-gray-600">
              <Image
                src="/person_icon.svg"
                alt="email"
                width={20}
                height={20}
              />
              <input
                name="email"
                type="user"
                placeholder="Enter your Email"
                className="w-full p-3 text-sm outline-none"
                required
              />
            </div>
          </div>

          <div className="col-span-2">
            <p className="mb-2 text-sm font-medium">Message</p>
            <textarea
              name="message"
              rows={8}
              placeholder="Entet your message"
              className="text-sm w-full border border-gray-200 rounded-xl pl-2 pt-2 dark:border-gray-600 outline-none"
              required
            />
          </div>
          {/* w-max กว้างเท่ากับเนื้อหาภายในทั้งหมด */}
          <button
            type="submit"
            className="w-max bg-linear-to-r from-[#1d4ed8] to-[#38bdf8] shadow-lg hover:opacity-90 transition-all flex gap-2 text-white text-sm px-8 py-3 rounded-full cursor-pointer hover:scale-105 duration-400 "
          >
            Submit Application{" "}
            <Image src="/arrow_icon.svg" alt="submit" width={20} height={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
