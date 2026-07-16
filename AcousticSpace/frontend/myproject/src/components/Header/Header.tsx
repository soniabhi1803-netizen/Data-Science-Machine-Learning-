import { FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-6 flex justify-between items-center">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">

          Audio Analysis Dashboard

        </h1>

        <p className="text-slate-500 mt-1">

          Upload audio files and analyze acoustic fingerprints.

        </p>

      </div>

      <div className="flex items-center gap-3">

        <div className="bg-blue-100 text-blue-600 p-3 rounded-full">

          <FiUser size={20} />

        </div>

        <div>

          <p className="font-semibold">

            Analyst

          </p>

          <p className="text-sm text-slate-500">

            Security Team

          </p>

        </div>

      </div>

    </header>
  );
};

export default Header;