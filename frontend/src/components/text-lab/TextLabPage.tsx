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
      <section className="col-span-12 grid min-h-0 content-center py-2 pb-[18px] sm:min-h-[36vh] sm:py-3 sm:pb-5">
        <Nav />

        <PageHeading title="文字实验室" subtitle="拼音和情绪，挖掘中文里的细节" />
      </section>

      <InputCard onAnalyze={handleAnalyze} loading={loading} result={result} />
      <ResultCard result={result} loading={loading} />
    </AnimatedCardGrid>
  );
}
