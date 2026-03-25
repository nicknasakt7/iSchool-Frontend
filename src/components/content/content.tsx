'use client'

import Image from "next/image";
import { MdArrowRightAlt } from "react-icons/md";
import { motion } from "motion/react";

// export default function ContentHome() {
//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         scale: 0.5,
//       }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       <div className="flex flex-col md:flex-row pt-10 px-5">
//         <div>
//           <div className="bg-[#f0f4f8] inline-block ">
//             <h1 className="text-[10px]">
//               🔵 Reimagining Education for the Future
//             </h1>
//           </div>
//           <div className="mt-5 space-y-2.5">
//             <p className="text-5xl">Smart</p>
//             <p className="text-5xl">School with</p>
//             <p className="text-5xl text-blue-500">Ai Insight</p>
//           </div>
//           <div className="mt-5">
//             <p className="text-gray-400">
//               Step into The Digital Atrium—where advanced technology meets
//               human-centric learning to cultivate tomorrow global leaders.
//             </p>
//           </div>
//           <div className="mt-5 flex gap-5">
//             <button className="flex items-center bg-linear-to-r from-[#1d4ed8] to-[#38bdf8] shadow-lg hover:opacity-90 transition-all px-5 py-1.5 rounded-2xl text-white">
//               <p>Explore School</p>
//               <MdArrowRightAlt />
//             </button>
//             <button className="bg-[#ffffff] rounded-2xl hover:bg-[#f7f9fb] px-5">
//               Our Curriculum
//             </button>
//           </div>
//         </div>
//         <div>
//           <div>
//             <Image
//               src={"/content.png"}
//               alt="User Picture"
//               width={628}
//               height={628}
//             />
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

export default function Hero() {

  const text1 = "Smart";
  const text2 = "School with ";
  const highlight = "Ai Insight";

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
        {/* LEFT */}
        <div>
          <div className="bg-[#f0f4f8] inline-block">
            <h1 className="text-[10px]">
              🔵 Reimagining Education for the Future
            </h1>
          </div>

          {/* 🔥 Typing Text */}
          <div className="mt-5 space-y-2.5 text-5xl">
            <motion.p variants={container} initial="hidden" animate="visible">
              {text1.split("").map((char, i) => (
                <motion.span key={i} variants={child}>
                  {char}
                </motion.span>
              ))}
            </motion.p>

            <motion.p variants={container} initial="hidden" animate="visible">
              {text2.split("").map((char, i) => (
                <motion.span key={i} variants={child}>
                  {char}
                </motion.span>
              ))}
              <span className="text-blue-500">
                {highlight.split("").map((char, i) => (
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
            <button className="flex items-center bg-linear-to-r from-[#1d4ed8] to-[#38bdf8] shadow-lg hover:opacity-90 transition-all px-5 py-1.5 rounded-2xl text-white">
              <p>Explore School</p>
              <MdArrowRightAlt />
            </button>

            <button className="bg-white rounded-2xl hover:bg-[#f7f9fb] px-5">
              Our Curriculum
            </button>
          </div>
        </div>

        {/* RIGHT */}
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
      
    </motion.div>
  );
}