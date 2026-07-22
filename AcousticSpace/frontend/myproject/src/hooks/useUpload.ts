import { useState } from "react";
import api from "../services/api";
import type { AnalysisResult } from "../types/analysis";


export const useUpload = () => {
  const [loading, setLoading] = useState(false);

  const uploadAudio = async (file: File): Promise<AnalysisResult> => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/api/upload", formData);
      console.log(response.data);

      return response.data as AnalysisResult;

    } finally {
      setLoading(false);
    }
  };

  return {
    uploadAudio,
    loading,
  };
};