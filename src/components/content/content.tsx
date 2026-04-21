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
      <div className="relative flex flex-col md:flex-row items-stretch gap-12 pt-10 px-5">
        <div className="flex-1 min-w-0">
          <div className="mt-5 space-y-2.5 text-5xl font-semibold">
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
              <span className="block text-blue-500 font-bold mt-2">
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
            <p className="text-muted-foreground">
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

            <button className="bg-card border rounded-2xl hover:bg-muted transition px-5 text-foreground">
              Our Curriculum
            </button>
          </div>
        </div>

        <div className="shrink-0 relative min-h-full w-160">
          <Image
            src="/ischool-homepage.png"
            alt="User Picture"
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="hover:scale-105 duration-200 rounded-xl opacity-90 object-cover object-top"
            priority
          />
        </div>
      </div>

      <FooterContent />
    </motion.div>
  );
}
