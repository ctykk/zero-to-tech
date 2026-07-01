import { useState } from "react";
import Nav from "@/components/Nav";
import PageHeading from "@/components/PageHeading";
import AnimatedCardGrid from "@/components/AnimatedCardGrid";
import InputCard from "@/components/text-lab/InputCard";
import ResultCard from "@/components/text-lab/ResultCard";
import { analyzeText } from "@/services/api";
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
    <AnimatedCardGrid className="grid grid-cols-12 gap-[18px]">
      <article className="col-span-12 grid min-h-[36vh] content-center py-2 pb-[18px] sm:min-h-0 sm:py-3 sm:pb-5">
        <Nav />
        <PageHeading title="文字实验室" subtitle="拼音和情绪，挖掘中文里的细节" />
      </article>

      <InputCard onAnalyze={handleAnalyze} loading={loading} result={result} />
      {error ? (
        <article
          className="col-span-6 min-h-[340px] animate-card-enter rounded-panel bg-surface p-6 pr-7 shadow-card md:col-span-12 md:min-h-0"
          data-card=""
        >
          <div className="mb-5">
            <p className="mb-3 text-xs font-semibold leading-[1.33] tracking-[-0.12px] text-textMuted">
              结果区
            </p>
            <h3 className="text-[28px] font-semibold leading-[1.14] tracking-[-0.03em] sm:text-[24px]">
              分析结果
            </h3>
          </div>
          <p className="text-red-500">{error}</p>
        </article>
      ) : (
        <ResultCard result={result} loading={loading} />
      )}
    </AnimatedCardGrid>
  );
}
