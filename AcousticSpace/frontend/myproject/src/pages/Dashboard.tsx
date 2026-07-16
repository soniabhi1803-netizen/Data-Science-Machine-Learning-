import { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/header";
import UploadCard from "../components/Upload/UploadCard";
import ResultCard from "../components/Result/ResultCard";

const Dashboard = () => {

  const [analysisResult, setAnalysisResult] = useState<any>(null);

  return (

    <div className="flex bg-slate-50 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <div className="p-8">

          <div className="grid grid-cols-2 gap-6">

            <UploadCard
              onUploadSuccess={setAnalysisResult}
            />

            <ResultCard
              result={analysisResult}
            />

          </div>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;