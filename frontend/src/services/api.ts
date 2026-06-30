import axios from "axios";
import type { AnalysisResult } from "@/types";

const api = axios.create({
  baseURL: "/api",
});

export async function analyzeText(text: string): Promise<AnalysisResult> {
  const { data } = await api.post<AnalysisResult>("/analysis", { text });
  return data;
}
