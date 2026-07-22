import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string;
  icon: ReactNode;
  iconBg: string;
  valueColor?: string;
}

const KPICard = ({
  title,
  value,
  icon,
  iconBg,
  valueColor = "text-white",
}: KPICardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="bg-slate-950 border border-slate-800 rounded-2xl p-6"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h2 className={`text-3xl font-bold mt-3 ${valueColor}`}>
            {value}
          </h2>
        </div>

        <div
          className={`h-12 w-12 rounded-xl flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default KPICard;