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
      className="animate-card-enter rounded-panel bg-surface shadow-card col-span-12 min-h-0 p-6 pr-7 md:col-span-6 md:min-h-85"
      data-card=""
    >
      <div className="mb-5">
        <p className="text-textMuted mb-3 text-xs leading-[1.33] font-semibold tracking-[-0.12px]">
          输入区
        </p>
        <h3 className="text-[28px] leading-[1.14] font-semibold tracking-[-0.03em] sm:text-[24px]">
          贴一段中文
        </h3>
      </div>
      <form
        className="grid gap-3.5"
        onSubmit={(e) => {
          e.preventDefault();
          void onAnalyze(text);
        }}
      >
        <label
          htmlFor="text-input"
          className="text-textSoft text-[17px] leading-[1.47] tracking-[-0.37px]"
        >
          文本内容
        </label>
        <textarea
          id="text-input"
          rows={8}
          className="rounded-soft border-borderSoft bg-surfaceSoft text-textMain placeholder:text-textMuted focus:border-brand min-h-55 w-full resize-y border px-5 py-4.5 text-[17px] leading-[1.47] tracking-[-0.37px] outline-hidden focus:shadow-[0_0_0_2px_rgba(0,113,227,0.14)]"
          placeholder="例如：生活没有标准答案，但每一天都值得认真感受。"
          value={text}
          onChange={(e) => {
            const val = e.target.value;
            setText(val);
            localStorage.setItem(STORAGE_KEY, val);
          }}
        />
        <p className="text-textMuted text-[13px] leading-[1.3] tracking-[-0.12px]">
          已输入 {text.length} 字
        </p>
        <button
          className="bg-brand min-w-32 cursor-pointer justify-self-start rounded-full px-4 py-2 text-[17px] leading-[1.41] text-white transition-opacity duration-200 hover:opacity-[0.86] disabled:cursor-not-allowed disabled:opacity-50"
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
