import { motion } from "framer-motion";
import {
  FiBell,
  FiCalendar,
  FiSearch,
  FiUser,
} from "react-icons/fi";

const Header = () => {
  const today = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="bg-slate-950 border-b border-slate-800 px-6 lg:px-10 py-5 flex items-center justify-between"
    >
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">
          AI Audio Intelligence Dashboard
        </h1>

        <div className="hidden md:flex items-center gap-4 mt-2 text-sm text-slate-400">
          <span>Deepfake Audio Detection & Acoustic Analysis</span>

          <span className="flex items-center gap-2">
            <FiCalendar />
            {today}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">

        <div className="hidden xl:flex items-center bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 w-72">
          <FiSearch className="text-slate-500" />

          <input
            placeholder="Search..."
            className="ml-3 bg-transparent outline-none w-full text-white placeholder:text-slate-500"
          />
        </div>

        <button className="relative h-11 w-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-blue-500 transition">
          <FiBell />

          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="hidden lg:flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2">

          <div className="h-11 w-11 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">

            <FiUser />

          </div>

          <div>

            <p className="font-semibold text-white">

              Analyst

            </p>

            <p className="text-xs text-slate-400">

              Security Operations Center

            </p>

          </div>

        </div>

      </div>
    </motion.header>
  );
};

export default Header;