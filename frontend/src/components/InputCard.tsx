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
    <article className="panel panel-half lab-panel card">
      <div className="panel-heading">
        <p className="section-kicker">输入区</p>
        <h3>贴一段中文</h3>
      </div>
      <form
        className="lab-form"
        onSubmit={(e) => {
          e.preventDefault();
          void onAnalyze(text);
        }}
      >
        <label htmlFor="text-input">文本内容</label>
        <textarea
          id="text-input"
          rows={8}
          placeholder="例如：生活没有标准答案，但每一天都值得认真感受。"
          value={text}
          onChange={(e) => {
            const val = e.target.value;
            setText(val);
            localStorage.setItem(STORAGE_KEY, val);
          }}
        />
        <p className="lab-count">已输入 {text.length} 字</p>
        <button className="primary-button" type="submit" disabled={loading || !text.trim()}>
          {loading ? <span className="loading-spinner" /> : "开始分析"}
        </button>
      </form>
    </article>
  );
}
