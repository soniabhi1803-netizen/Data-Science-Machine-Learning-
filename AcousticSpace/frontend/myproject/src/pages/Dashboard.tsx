import { useState } from "react";
import { motion } from "framer-motion";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import UploadCard from "../components/Upload/UploadCard";
import ResultCard from "../components/Result/ResultCard";
import KPICard from "../components/Dashboard/KPICard";

import type { AnalysisResult } from "../types/analysis";

import {
  FiShield,
  FiTrendingUp,
  FiCpu,
  FiActivity,
} from "react-icons/fi";

const Dashboard = () => {
  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResult | null>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  return (
    <div className="flex min-h-screen bg-slate-900">

      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">

        <Header />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="flex-1 p-8 overflow-auto"
        >
          <div className="mb-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            <KPICard
              title="Detection"
              value={analysisResult? analysisResult.prediction : "Waiting"}
              icon={<FiShield className="text-blue-400" size={22} />}
              iconBg="bg-blue-600/20"
            />

            <KPICard
              title="Confidence"
              value={
                analysisResult
                  ? `${analysisResult.confidence.toFixed(1)}%`
                  : "0%"
              }
              valueColor="text-emerald-400"
              icon={<FiTrendingUp className="text-emerald-400" size={22} />}
              iconBg="bg-emerald-500/20"
            />

            <KPICard
              title="AI Model"
              value={analysisResult ? "CNN" : "--"}
              icon={<FiCpu className="text-purple-400" size={22} />}
              iconBg="bg-purple-500/20"
            />

            <KPICard
              title="Status"
              value={analysisResult ? "Completed" : "Waiting"}
              valueColor={
                analysisResult
                  ? "text-emerald-400"
                  : "text-amber-400"
              }
              icon={
                <FiActivity
                  className={
                    analysisResult
                      ? "text-emerald-400"
                      : "text-amber-400"
                  }
                  size={22}
                />
              }
              iconBg={
                analysisResult
                  ? "bg-emerald-500/20"
                  : "bg-amber-500/20"
              }
            />

          </div>

          <div className="grid gap-8 xl:grid-cols-12">

            <motion.div  
                className="xl:col-span-5"
                initial={{ opacity:0 , x: -20}}
                animate={{opacity:1, x: 0 }}
                >

              <UploadCard
                onUploadSuccess={setAnalysisResult}
                onFileSelect={setSelectedFile}
              />

            </motion.div>

            <motion.div 
                className="xl:col-span-7"
                initial={{ opacity:0,x:20}}
                animate={{ opacity:1,x:0}}
                transition={{delay: 0.2}}
                >

              <ResultCard
                result={analysisResult}
                selectedFile={selectedFile}
              />

            </motion.div>

          </div>

        </motion.div>

      </main>

    </div>
  );
};

export default Dashboard;