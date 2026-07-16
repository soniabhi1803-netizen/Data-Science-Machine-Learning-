import { useState } from "react";
import api from "../services/api";

export const useUpload = () => {
  const [loading, setLoading] = useState(false);

  const uploadAudio = async (file: File) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/api/upload", formData);

      return response.data;

    } finally {
      setLoading(false);
    }
  };

  return {
    uploadAudio,
    loading,
  };
};