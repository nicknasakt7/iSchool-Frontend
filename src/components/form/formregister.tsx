"use client";

import { useForm } from "react-hook-form";

type FormData = {
  parentFirstName: string;
  parentLastName: string;
  studentFirstName: string;
  studentLastName: string;
  email: string;
  phone: string;
  grade: string;
};

export default function FormRegister() {
  const { register, handleSubmit ,reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset()
  };

  return (
    <section className="flex justify-center px-4 py-20" id="contect">
      <div className="w-full max-w-4xl bg-linear-to-br from-blue-600 to-sky-400 rounded-[40px] p-8 sm:p-12 text-white shadow-xl">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Join the Future of Learning
          </h2>
          <p className="text-sm opacity-90 mt-3 max-w-xl mx-auto">
            Admissions are now open for the upcoming academic year. Secure your
            spot in the global community of innovators.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {/* Parent First */}
          <div>
            <label className="text-xs opacity-80 font-bold">PARENT S FIRST NAME</label>
            <input
              {...register("parentFirstName")}
              placeholder="Enter first name"
              className="w-full mt-1 p-3 rounded-full bg-white/10 border border-white/20 placeholder-white/60 outline-none text-sm"
            />
          </div>

          {/* Parent Last */}
          <div>
            <label className="text-xs opacity-80 font-bold">PARENT S LAST NAME</label>
            <input
              {...register("parentLastName")}
              placeholder="Enter last name"
              className="w-full mt-1 p-3 rounded-full bg-white/10 border border-white/20 placeholder-white/60 outline-none text-sm"
            />
          </div>

          {/* Student First */}
          <div>
            <label className="text-xs opacity-80 font-bold">STUDENT S FIRST NAME</label>
            <input
              {...register("studentFirstName")}
              placeholder="Enter student's first name"
              className="w-full mt-1 p-3 rounded-full bg-white/10 border border-white/20 placeholder-white/60 outline-none text-sm"
            />
          </div>

          {/* Student Last */}
          <div>
            <label className="text-xs opacity-80 font-bold">STUDENT S LAST NAME</label>
            <input
              {...register("studentLastName")}
              placeholder="Enter student's last name"
              className="w-full mt-1 p-3 rounded-full bg-white/10 border border-white/20 placeholder-white/60 outline-none text-sm"
            />
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label className="text-xs opacity-80 font-bold">EMAIL ADDRESS</label>
            <input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              className="w-full mt-1 p-3 rounded-full bg-white/10 border border-white/20 placeholder-white/60 outline-none text-sm"
            />
          </div>

          {/* Phone */}
          <div className="sm:col-span-2">
            <label className="text-xs opacity-80 font-bold">TELEPHONE NUMBER</label>
            <input
              {...register("phone")}
              placeholder="+1 (555) 000-0000"
              className="w-full mt-1 p-3 rounded-full bg-white/10 border border-white/20 placeholder-white/60 outline-none text-sm"
            />
          </div>

          {/* Grade */}
          <div className="sm:col-span-2">
            <label className="text-xs opacity-80 font-bold">SELECT GRADE</label>
            <select
              {...register("grade")}
              className="w-full mt-1 p-3 rounded-full bg-white/10 border border-white/20 text-white outline-none text-sm "
            >
              <option value="">Select student grade</option>
              <option value="grade1">Grade 1</option>
              <option value="grade2">Grade 2</option>
              <option value="grade3">Grade 3</option>
            </select>
          </div>

          {/* BUTTON */}
          <div className="sm:col-span-2 mt-4 flex justify-center">
            <button
              type="submit"
              className="bg-white text-blue-600 w-full py-3 rounded-full hover:scale-105 transition font-bold"
            >
              SUBMIT APPLICATION
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}