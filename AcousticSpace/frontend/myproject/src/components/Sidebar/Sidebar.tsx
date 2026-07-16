import {
  FiGrid,
  FiClock,
  FiSettings,
  FiShield,
} from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col min-h-screen">

      <div className="p-8 border-b border-slate-800">

        <div className="flex items-center gap-3">

          <div className="bg-blue-600 p-3 rounded-xl">

            <FiShield size={24} />

          </div>

          <div>

            <h1 className="text-xl font-bold">

              AcousticSpace

            </h1>

            <p className="text-xs text-slate-400">

              Deepfake Detection

            </p>

          </div>

        </div>

      </div>

      <nav className="flex-1 px-5 py-8">

        <ul className="space-y-3">

          <li className="flex items-center gap-3 bg-blue-600 px-4 py-3 rounded-xl cursor-pointer">

            <FiGrid />

            Dashboard

          </li>

          <li className="flex items-center gap-3 hover:bg-slate-800 px-4 py-3 rounded-xl cursor-pointer transition">

            <FiClock />

            History

          </li>

          <li className="flex items-center gap-3 hover:bg-slate-800 px-4 py-3 rounded-xl cursor-pointer transition">

            <FiSettings />

            Settings

          </li>

        </ul>

      </nav>

      <div className="p-5 text-xs text-slate-500">

        Version 1.0

      </div>

    </aside>
  );
};

export default Sidebar;