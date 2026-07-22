import {
  FiGrid,
  FiClock,
  FiSettings,
  FiShield,
  FiFileText,
  FiActivity,
  FiCpu,
} from "react-icons/fi";

const menu = [
  {
    icon: <FiGrid size={18} />,
    title: "Dashboard",
    active: true,
  },
  {
    icon: <FiActivity size={18} />,
    title: "Audio Analysis",
  },
  {
    icon: <FiClock size={18} />,
    title: "History",
  },
  {
    icon: <FiFileText size={18} />,
    title: "Reports",
  },
  {
    icon: <FiSettings size={18} />,
    title: "Settings",
  },
];

const Sidebar = () => {
  return (
    <aside className="w-72 bg-slate-950 border-r border-slate-800 text-white flex flex-col min-h-screen">

      {/* Logo */}

      <div className="px-7 py-8 border-b border-slate-800">

        <div className="flex items-center gap-4">

          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">

            <FiShield size={28} />

          </div>

          <div>

            <h1 className="text-xl font-bold tracking-wide">

              AcousticSpace

            </h1>

            <p className="text-slate-400 text-sm">

              AI Detection Platform

            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5 py-8">

        <p className="text-xs uppercase tracking-widest text-slate-500 mb-5">

          Navigation

        </p>

        <div className="space-y-2">

          {menu.map((item) => (
            <button
              key={item.title}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${
                item.active
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              {item.icon}

              <span className="font-medium">{item.title}</span>
            </button>
          ))}
        </div>

        {/* System Status */}

        <div className="mt-10">

          <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">

            System Status

          </p>

          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">

            <div className="flex justify-between items-center mb-3">

              <span className="text-sm text-slate-400">

                API

              </span>

              <span className="text-emerald-400 text-sm">

                ● Online

              </span>

            </div>

            <div className="flex justify-between items-center mb-3">

              <span className="text-sm text-slate-400">

                CNN Model

              </span>

              <span className="text-emerald-400 text-sm">

                Loaded

              </span>

            </div>

            <div className="flex justify-between items-center">

              <span className="text-sm text-slate-400">

                GPU

              </span>

              <span className="flex items-center gap-2 text-blue-400">

                <FiCpu />

                Ready

              </span>

            </div>

          </div>

        </div>

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-6">

        <p className="text-slate-500 text-xs">

          AcousticSpace v1.0

        </p>

        <p className="text-slate-600 text-xs mt-1">

          AI Audio Intelligence Dashboard
        </p>

      </div>

    </aside>
  );
};

export default Sidebar;