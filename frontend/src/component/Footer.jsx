import React from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const SOCIALS = [
  { name: 'GitHub', url: 'https://github.com/IamHarshhh122/', icon: <FaGithub /> },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/harsh-bhatta-915ab5349/', icon: <FaLinkedinIn /> },
  { name: 'Instagram', url: 'https://www.instagram.com/bhatta_harsh/', icon: <FaInstagram /> },
];

export default function Footer() {
  return (
    <footer className="bg-[#101827] text-gray-400 px-6 pt-10 pb-5">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Brand */}
          <div className="max-w-sm">
            <h2 className="text-2xl font-bold text-white tracking-wide">
              TT<span className="text-emerald-400">.</span>
            </h2>

            <p className="mt-3 text-sm leading-6">
              Smart Attendance Management System
              <br />
              Making attendance simple, accurate and accessible.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li>Student Portal</li>
              <li>Faculty Portal</li>
              <li>Admin Portal</li>
            </ul>
          </div>

          {/* Project */}
          <div>
            <h3 className="text-white font-semibold mb-4">Project</h3>
            <ul className="space-y-2 text-sm">
              <li>B.Voc Software Development</li>
              <li>Student Assignment</li>
              <li>Academic Year 2026</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4 text-xl">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="hover:text-emerald-400 transition"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 my-7"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>
            © 2026 Student Attendance Management System. All rights reserved.
          </p>
          <p className="text-gray-500">
            Designed with care for academic use.
          </p>
        </div>

      </div>
    </footer>
  );
}