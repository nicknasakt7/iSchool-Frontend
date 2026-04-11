'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { fetchPublicGrades, PublicGrade } from '@/lib/api/grade/grade-public';
import { submitLead } from '@/lib/api/lead/lead.service';

type FormData = {
  parentFirstName: string;
  parentLastName: string;
  studentFirstName: string;
  studentLastName: string;
  email: string;
  tel: string;
  gradeId: string;
};

export default function InterestedForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [grades, setGrades] = useState<PublicGrade[]>([]);
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    fetchPublicGrades().then(setGrades);
  }, []);

  const onSubmit = (data: FormData) => {
    setError(undefined);
    startTransition(async () => {
      try {
        await submitLead({
          parentFirstName: data.parentFirstName,
          parentLastName: data.parentLastName,
          email: data.email,
          tel: data.tel || undefined,
          studentFirstName: data.studentFirstName,
          studentLastName: data.studentLastName,
          gradeId: data.gradeId,
        });
        reset();
        setSubmitted(true);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'เกิดข้อผิดพลาด กรุณาลองใหม่');
      }
    });
  };

  if (submitted) {
    return (
      <section className="flex justify-center px-4 py-20" id="contect">
        <div className="w-full max-w-4xl bg-linear-to-br from-blue-600 to-sky-400 rounded-[40px] p-8 sm:p-12 text-white shadow-xl text-center space-y-4">
          <div className="text-5xl">🎉</div>
          <h2 className="text-2xl sm:text-3xl font-semibold">Thank You!</h2>
          <p className="text-sm opacity-90 max-w-md mx-auto">
            We have received your application. Our team will contact you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:scale-105 transition"
          >
            Submit Another
          </button>
        </div>
      </section>
    );
  }

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
            <label className="text-xs opacity-80 font-bold">
              PARENT S FIRST NAME
            </label>
            <input
              {...register('parentFirstName', { required: true })}
              placeholder="Enter first name"
              className="w-full mt-1 p-3 rounded-full bg-white/10 border border-white/20 placeholder-white/60 outline-none text-sm"
            />
          </div>

          {/* Parent Last */}
          <div>
            <label className="text-xs opacity-80 font-bold">
              PARENT S LAST NAME
            </label>
            <input
              {...register('parentLastName', { required: true })}
              placeholder="Enter last name"
              className="w-full mt-1 p-3 rounded-full bg-white/10 border border-white/20 placeholder-white/60 outline-none text-sm"
            />
          </div>

          {/* Student First */}
          <div>
            <label className="text-xs opacity-80 font-bold">
              STUDENT S FIRST NAME
            </label>
            <input
              {...register('studentFirstName', { required: true })}
              placeholder="Enter student's first name"
              className="w-full mt-1 p-3 rounded-full bg-white/10 border border-white/20 placeholder-white/60 outline-none text-sm"
            />
          </div>

          {/* Student Last */}
          <div>
            <label className="text-xs opacity-80 font-bold">
              STUDENT S LAST NAME
            </label>
            <input
              {...register('studentLastName', { required: true })}
              placeholder="Enter student's last name"
              className="w-full mt-1 p-3 rounded-full bg-white/10 border border-white/20 placeholder-white/60 outline-none text-sm"
            />
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label className="text-xs opacity-80 font-bold">
              EMAIL ADDRESS
            </label>
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="example@email.com"
              className="w-full mt-1 p-3 rounded-full bg-white/10 border border-white/20 placeholder-white/60 outline-none text-sm"
            />
          </div>

          {/* Phone */}
          <div className="sm:col-span-2">
            <label className="text-xs opacity-80 font-bold">
              TELEPHONE NUMBER
            </label>
            <input
              {...register('tel')}
              placeholder="+1 (555) 000-0000"
              className="w-full mt-1 p-3 rounded-full bg-white/10 border border-white/20 placeholder-white/60 outline-none text-sm"
            />
          </div>

          {/* Grade — dynamic from backend */}
          <div className="sm:col-span-2">
            <label className="text-xs opacity-80 font-bold">SELECT GRADE</label>
            <select
              {...register('gradeId', { required: true })}
              className="w-full mt-1 p-3 rounded-full bg-white/10 border border-white/20 text-white outline-none text-sm"
            >
              <option value="">Select student grade</option>
              {grades.map(g => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="sm:col-span-2 bg-white/20 rounded-2xl px-4 py-3 text-sm text-center">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <div className="sm:col-span-2 mt-4 flex justify-center">
            <button
              type="submit"
              disabled={isPending}
              className="bg-white text-blue-600 w-full py-3 rounded-full hover:scale-105 transition font-bold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
