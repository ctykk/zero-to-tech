import { useState } from "react";
import Nav from "./Nav";
import PageHeading from "./PageHeading";
import AnimatedCardGrid from "./AnimatedCardGrid";
import InputCard from "./InputCard";
import ResultCard from "./ResultCard";
import { analyzeText } from "../services/api";
import type { AnalysisResult } from "@/types";

export default function TextLabPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeText(text);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "分析失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedCardGrid className="dashboard-grid">
      <article className="hero-stage panel-full">
        <Nav />
        <PageHeading title="文字实验室" subtitle="拼音和情绪，挖掘中文里的细节" />
      </article>

      <InputCard onAnalyze={handleAnalyze} loading={loading} result={result} />
      {error ? (
        <article className="panel panel-half lab-panel result-panel card">
          <div className="panel-heading">
            <p className="section-kicker">结果区</p>
            <h3>分析结果</h3>
          </div>
          <p style={{ color: "red" }}>{error}</p>
        </article>
      ) : (
        <ResultCard result={result} loading={loading} />
      )}
    </AnimatedCardGrid>
  );
}
