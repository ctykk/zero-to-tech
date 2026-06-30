import type { AnalysisResult } from "@/types";

interface ResultCardProps {
  result: AnalysisResult | null;
  loading: boolean;
}

export default function ResultCard({ result, loading }: ResultCardProps) {
  if (loading) {
    return (
      <article className="panel panel-half lab-panel result-panel card">
        <div className="panel-heading">
          <p className="section-kicker">结果区</p>
          <h3>分析结果</h3>
        </div>
        <div className="result-stack">
          <p style={{ color: "var(--text-muted)" }}>正在分析中...</p>
        </div>
      </article>
    );
  }

  if (!result) {
    return (
      <article className="panel panel-half lab-panel result-panel card">
        <div className="panel-heading">
          <p className="section-kicker">结果区</p>
          <h3>分析结果</h3>
        </div>
        <div className="result-stack">
          <p style={{ color: "var(--text-muted)" }}>输入文字后点击"开始分析"</p>
        </div>
      </article>
    );
  }

  return (
    <article className="panel panel-half lab-panel result-panel card">
      <div className="panel-heading">
        <p className="section-kicker">结果区</p>
        <h3>分析结果</h3>
      </div>
      <div className="result-stack">
        <div className="result-item">
          <span>原文</span>
          <p>{result.origin_text}</p>
        </div>
        <div className="result-item">
          <span>拼音</span>
          <p>{result.pin_yin.join(" ")}</p>
        </div>
        <div className="result-grid">
          <div className="result-badge">
            <span>情感分数</span>
            <strong>{result.emotion_score.toFixed(3)}</strong>
          </div>
          <div className="result-badge">
            <span>情感判断</span>
            <strong>{result.emotion}</strong>
          </div>
        </div>
      </div>
    </article>
  );
}
