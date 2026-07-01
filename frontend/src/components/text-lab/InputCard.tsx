import { useState } from "react";
import type { AnalysisResult } from "@/types";

interface InputCardProps {
  onAnalyze: (text: string) => Promise<void>;
  loading: boolean;
  result: AnalysisResult | null;
}

const DEFAULT_TEXT = "今天的风很轻，适合把脑海里的想法慢慢写下来。";

export default function InputCard({ onAnalyze, loading }: InputCardProps) {
  const STORAGE_KEY = "lastLabInput";

  const [text, setText] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_TEXT;
  });

  return (
    <article
      className="col-span-6 min-h-[340px] animate-card-enter rounded-panel bg-surface p-6 pr-7 shadow-card md:col-span-12 md:min-h-0"
      data-card=""
    >
      <div className="mb-5">
        <p className="mb-3 text-xs font-semibold leading-[1.33] tracking-[-0.12px] text-textMuted">
          输入区
        </p>
        <h3 className="text-[28px] font-semibold leading-[1.14] tracking-[-0.03em] sm:text-[24px]">
          贴一段中文
        </h3>
      </div>
      <form
        className="grid gap-[14px]"
        onSubmit={(e) => {
          e.preventDefault();
          void onAnalyze(text);
        }}
      >
        <label
          htmlFor="text-input"
          className="text-[17px] leading-[1.47] tracking-[-0.37px] text-textSoft"
        >
          文本内容
        </label>
        <textarea
          id="text-input"
          rows={8}
          className="min-h-[220px] w-full resize-y rounded-soft border border-borderSoft bg-surfaceSoft px-5 py-[18px] text-[17px] leading-[1.47] tracking-[-0.37px] text-textMain outline-none placeholder:text-textMuted focus:border-brand focus:shadow-[0_0_0_2px_rgba(0,113,227,0.14)]"
          placeholder="例如：生活没有标准答案，但每一天都值得认真感受。"
          value={text}
          onChange={(e) => {
            const val = e.target.value;
            setText(val);
            localStorage.setItem(STORAGE_KEY, val);
          }}
        />
        <p className="text-[13px] leading-[1.3] tracking-[-0.12px] text-textMuted">
          已输入 {text.length} 字
        </p>
        <button
          className="min-w-[128px] cursor-pointer justify-self-start rounded-full bg-brand px-4 py-2 text-[17px] leading-[1.41] text-white transition-opacity duration-200 hover:opacity-[0.86] disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          disabled={loading || !text.trim()}
        >
          {loading ? (
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            "开始分析"
          )}
        </button>
      </form>
    </article>
  );
}
