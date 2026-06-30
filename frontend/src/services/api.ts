import axios from "axios";
import type { AnalysisResult, IdentityResult } from "@/types";

const api = axios.create({
  baseURL: "/api",
});

export async function analyzeText(text: string): Promise<AnalysisResult> {
  const { data } = await api.post<AnalysisResult>("/analysis", { text: text });
  return data;
}

export async function fetchIdentity(): Promise<IdentityResult> {
  const { data } = await api.get<IdentityResult>("/identity");
  return data;
}
