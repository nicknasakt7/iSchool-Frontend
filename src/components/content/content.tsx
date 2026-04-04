'use client';

import { PATH } from '@/constants/path.constant';
import { ArrowBigRight } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import FooterContent from './footercontent';

export default function Hero() {
  const text1 = 'Smart';
  const text2 = 'School with ';
  const highlight = 'Ai Insight';

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const child = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col md:flex-row pt-10 px-5">
        <div>
          <div className="bg-[#f0f4f8] inline-block">
            <h1 className="text-[10px]">
              🔵 Reimagining Education for the Future
            </h1>
          </div>

          <div className="mt-5 space-y-2.5 text-5xl">
            <motion.p variants={container} initial="hidden" animate="visible">
              {text1.split('').map((char, i) => (
                <motion.span key={i} variants={child}>
                  {char}
                </motion.span>
              ))}
            </motion.p>

            <motion.p variants={container} initial="hidden" animate="visible">
              {text2.split('').map((char, i) => (
                <motion.span key={i} variants={child}>
                  {char}
                </motion.span>
              ))}
              <span className="text-blue-500">
                {highlight.split('').map((char, i) => (
                  <motion.span key={i} variants={child}>
                    {char}
                  </motion.span>
                ))}
              </span>
              {/* <span className="animate-pulse"></span> */}
            </motion.p>
          </div>

          <div className="mt-5">
            <p className="text-gray-400">
              Step into The Digital Atrium—where advanced technology meets
              human-centric learning to cultivate tomorrow global leaders.
            </p>
          </div>

          <div className="mt-5 flex gap-5">
            <Link href={PATH.CONTENT}>
              <button className="flex items-center font-bold bg-linear-to-r from-[#1d4ed8] to-[#38bdf8] shadow-lg hover:opacity-90 transition-all px-5 py-1.5 rounded-2xl text-white">
                <p>Explore School</p>
                <ArrowBigRight />
              </button>
            </Link>

            <button className="bg-white rounded-2xl hover:bg-[#f7f9fb] px-5">
              Our Curriculum
            </button>
          </div>
        </div>

        <div>
          <Image
            src="/content.png"
            alt="User Picture"
            width={628}
            height={628}
            className=" hover:scale-105 duration-200"
          />
        </div>
      </div>

      <FooterContent />
    </motion.div>
  );
}
