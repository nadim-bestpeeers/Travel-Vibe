"use client";

import { Mail, Phone, MapPin, Globe,  } from "lucide-react";

export default function ContactUs() {
  return (
    <section className="bg-[#0b1d1a] text-white px-6 md:px-20 py-16">
      <div className="text-center mb-12 bg-[url('/images/avatars/contact.jpg')] bg-cover bg-center bg-no-repeat py-16 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
        <p className="text-gray-900">Home / Contact Us</p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
     
        <div className="md:col-span-2 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-lime-200/10 focus:outline-none" />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 bg-lime-200/10 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-3 bg-lime-200/10 focus:outline-none"          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full px-4 py-3 bg-lime-200/10 focus:outline-none"
          />
          <button className="bg-lime-700 hover:bg-lime-500 cursor-pointer text-white font-bold py-2 px-6 rounded transition">
            Send Message
          </button>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-lime-300">Get In Touch</h3>
          <p className="text-sm text-white">
            Nulla fermentum ullamcorper diam sit amet porta. Etiam ac enim velit. Ut in mi sed purus euismod sagittis.
          </p>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-lime-700" />
              <span className="text-white">+123-234-1234</span>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-lime-700" />
              <span className="text-white">hello@awesomesite.com</span>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-lime-700" />
              <span className="text-white">www.awesomesite.com</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-lime-700" />
              <span className="text-white">99 Roving St, Big City, PKU 23456</span>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <div className="w-8 h-8 bg-lime-800 text-white rounded-full flex items-center justify-center">F</div>
            <div className="w-8 h-8 bg-lime-800 text-white rounded-full flex items-center justify-center">T</div>
            <div className="w-8 h-8 bg-lime-800 text-white rounded-full flex items-center justify-center">I</div>
          </div>
        </div>
      </div>
    </section>
  );
}
