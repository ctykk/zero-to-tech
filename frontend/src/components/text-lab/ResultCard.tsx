import type { AnalysisResult } from "@/types";

interface ResultCardProps {
  result: AnalysisResult | null;
  loading: boolean;
}

export default function ResultCard({ result, loading }: ResultCardProps) {
  if (loading) {
    return (
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
        <div className="grid gap-[14px]">
          <p className="text-textMuted">正在分析中...</p>
        </div>
      </article>
    );
  }

  if (!result) {
    return (
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
        <div className="grid gap-[14px]">
          <p className="text-textMuted">输入文字后点击"开始分析"</p>
        </div>
      </article>
    );
  }

  return (
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
      <div className="grid gap-[14px]">
        <div className="rounded-soft bg-surfaceSoft p-5">
          <span className="mb-2 block text-xs leading-[1.33] tracking-[-0.12px] text-textMuted">
            原文
          </span>
          <p className="break-words text-[17px] leading-[1.47] tracking-[-0.37px] text-textMain">
            {result.origin_text}
          </p>
        </div>
        <div className="rounded-soft bg-surfaceSoft p-5">
          <span className="mb-2 block text-xs leading-[1.33] tracking-[-0.12px] text-textMuted">
            拼音
          </span>
          <p className="break-words text-[17px] leading-[1.47] tracking-[-0.37px] text-textMain">
            {result.pin_yin.join(" ")}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-[14px] md:grid-cols-1">
          <div className="rounded-soft bg-surfaceSoft p-5">
            <span className="mb-2 block text-xs leading-[1.33] tracking-[-0.12px] text-textMuted">
              情感分数
            </span>
            <strong className="text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-textMain sm:text-[24px]">
              {result.emotion_score.toFixed(3)}
            </strong>
          </div>
          <div className="rounded-soft bg-surfaceSoft p-5">
            <span className="mb-2 block text-xs leading-[1.33] tracking-[-0.12px] text-textMuted">
              情感判断
            </span>
            <strong className="text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-textMain sm:text-[24px]">
              {result.emotion}
            </strong>
          </div>
        </div>
      </div>
    </article>
  );
}
