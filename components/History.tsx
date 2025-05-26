import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function History() {
  return (
    <div className="relative min-h-screen">
      <h1 className='text-2xl md:text-4xl font-bold mb-2 px-6 md:px-16 '>History of Indore</h1>
      <section className="px-6 md:px-16 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className="flex flex-col md:flex-row items-center gap-8 rounded-lg overflow-hidden bg-gradient-to-t from-black/80 to-transparent"
        >
          <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative">
            <Image
              src="/images/mandu1.jpg"
              alt="Indore History"
              fill
              className="object-cover brightness-[0.7]"
            />
          </div>

          <div className="w-full md:w-1/2 p-6 text-white">
            <h2 className="text-3xl font-bold mb-4">History of Indore</h2>
            <p className="text-lg text-gray-300">
              Indore, the largest city in Madhya Pradesh, has a rich history
              that dates back to the 7th century. It was originally a small
              village called <strong>&quot;Indrapur&quot;</strong> and later
              became a prominent trading center during the Maratha Empire.
              <br />
              <br />
              The city is known for its historical landmarks, including the{" "}
              <strong>Rajwada Palace</strong> and
              <strong> Lal Bagh Palace</strong>, which reflect its royal
              heritage. It also hosts various cultural festivals like the{" "}
              <strong>Indore Festival</strong>, celebrating tradition and
              history.
            </p>
          </div>
        </motion.div>
      </section>
      <section className="px-6 md:px-16 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className="flex flex-col md:flex-row-reverse items-center gap-8 rounded-lg overflow-hidden bg-gradient-to-t from-black/80 to-transparent"
        >
          <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative">
            <Image
              src="/images/tomb.png"
              alt="Indore History"
              fill
              className="object-cover brightness-[0.7]"
            />
          </div>

          <div className="w-full md:w-1/2 p-6 text-white">
            <h2 className="text-3xl font-bold mb-4">History of Indore</h2>
            <p className="text-lg text-gray-300">
              Indore, the largest city in Madhya Pradesh, has a rich history
              that dates back to the 7th century. It was originally a small
              village called <strong>&quot;Indrapur&quot;</strong> and later
              became a prominent trading center during the Maratha Empire.
              <br />
              <br />
              The city is known for its historical landmarks, including the{" "}
              <strong>Rajwada Palace</strong> and
              <strong> Lal Bagh Palace</strong>, which reflect its royal
              heritage. It also hosts various cultural festivals like the{" "}
              <strong>Indore Festival</strong>, celebrating tradition and
              history.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
