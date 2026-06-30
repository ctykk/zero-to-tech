import axios from "axios";
import type { AnalysisResult } from "@/types";

const api = axios.create({
  baseURL: "/api",
});

export async function analyzeText(text: string): Promise<AnalysisResult> {
  const { data } = await api.post<AnalysisResult>("/analysis", { text });
  return data;
}

export async function fetchMotto(): Promise<string> {
  const { data } = await api.get<{ motto: string }>("/identity");
  return data.motto;
}
