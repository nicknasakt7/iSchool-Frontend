'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

export default function PageContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-linear-to-b from-gray-100 to-white min-h-screen">
        <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
          <span className="text-xs tracking-widest bg-blue-100 text-blue-600 px-4 py-1 rounded-full mb-6">
            THE ISCHOOL JOURNEY
          </span>
          <h1 className="text-4xl sm:text-6xl font-semibold text-gray-800 leading-tight">
            Beyond the Horizon: <br />
            <span className="text-blue-500">The iSchool Story</span>
          </h1>
          <p className="mt-6 max-w-xl text-gray-500">
            Where the legacy of academic rigor meets the limitless potential of
            the digital frontier. Welcome to the atrium of tomorrow.
          </p>
          <ChevronDown className="mt-6 text-blue-500 animate-bounce" />
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/content.png"
              alt="library"
              width={600}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Foundations of the{' '}
              <span className="text-blue-500">Digital Atrium</span>
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Our story began in 1924, rooted in a simple but powerful
              philosophy: that education should be a sanctuary for the mind. For
              nearly a century, we cultivated excellence through classical
              pedagogy and deep human connection.
            </p>

            <p className="text-gray-600 leading-relaxed">
              As the world pivoted toward the silicon era, iSchool did not
              merely adapt—we reimagined. We preserved the sacred bond between
              mentor and student, while stripping away the physical constraints
              of the traditional classroom.
            </p>

            <div className="flex gap-10 pt-4">
              <div>
                <p className="text-blue-500 text-xl font-bold">100+</p>
                <p className="text-xs text-gray-500">YEARS OF WISDOM</p>
              </div>
              <div>
                <p className="text-blue-500 text-xl font-bold">20+</p>
                <p className="text-xs text-gray-500">TECH PATENTS</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent" />
            <div className="absolute inset-0 backdrop-blur-[2px]" />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              The Birth of the Ischool <br />{' '}
              <span className="text-blue-500">AI Insight Layer</span>
            </h2>

            <p className="text-gray-600 leading-relaxed">
              We didnt build AI to replace teachers; we built it to liberate
              them. The AI Insight Layer was born from a radical question: What
              if technology could handle the data, so humans could focus on the
              soul?
            </p>

            <div className="flex gap-10 pt-4"></div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/content.png"
              alt="library"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      </div>
    </motion.div>
  );
}
