import type { AnalysisResult, PinyinChar } from "@/types";

interface ResultCardProps {
  result: AnalysisResult | null;
  loading: boolean;
  error: string | null;
}

function LabeledValue({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="rounded-soft bg-surfaceSoft p-5">
      <span className="text-textMuted mb-2 block text-xs leading-[1.33] tracking-[-0.12px]">
        {label}
      </span>
      <strong
        className={`text-[28px] leading-[1.15] font-semibold tracking-[-0.03em] sm:text-[24px] ${muted ? "text-textMuted" : "text-textMain"}`}
      >
        {value}
      </strong>
    </div>
  );
}

function EmotionGrid({
  score,
  emotion,
  muted = false,
}: {
  score?: string;
  emotion?: string;
  muted?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
      <LabeledValue label="情感分数" value={score ?? "—"} muted={muted} />
      <LabeledValue label="情感判断" value={emotion ?? "—"} muted={muted} />
    </div>
  );
}

function PinyinText({ pinyin }: { pinyin: PinyinChar[] }) {
  return (
    <p className="text-textMain text-[17px] leading-[1.47] tracking-[-0.37px] whitespace-pre-wrap">
      {pinyin.map((item, i) =>
        item.pinyin ? (
          <span key={i}>
            <ruby key={i}>
              {item.char}
              <rt className="text-textSoft text-xs">{item.pinyin}</rt>
            </ruby>
          </span>
        ) : (
          <span key={i}>{item.char}</span>
        ),
      )}
    </p>
  );
}

export default function ResultCard({ result, loading, error }: ResultCardProps) {
  return (
    <article
      className="animate-card-enter rounded-panel bg-surface shadow-card col-span-12 min-h-0 p-6 pr-7 md:col-span-6 md:min-h-[340px]"
      data-card=""
    >
      <div className="mb-5">
        <p className="text-textMuted mb-3 text-xs leading-[1.33] font-semibold tracking-[-0.12px]">
          结果区
        </p>
        <h3 className="text-[28px] leading-[1.14] font-semibold tracking-[-0.03em] sm:text-[24px]">
          分析结果
        </h3>
      </div>
      <div className="grid gap-[14px]">
        {loading ? (
          <p className="text-textMuted">正在分析中...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : !result ? (
          <>
            <div className="rounded-soft bg-surfaceSoft p-5">
              <span className="text-textMuted mb-2 block text-xs leading-[1.33] tracking-[-0.12px]">
                拼音
              </span>
              <p className="text-textMuted text-[17px] leading-[1.47] tracking-[-0.37px] whitespace-pre-wrap">
                &mdash;
              </p>
            </div>
            <EmotionGrid muted />
          </>
        ) : (
          <>
            <div className="rounded-soft bg-surfaceSoft p-5">
              <span className="text-textMuted mb-2 block text-xs leading-[1.33] tracking-[-0.12px]">
                拼音
              </span>
              <PinyinText pinyin={result.pinyin} />
            </div>
            <EmotionGrid score={result.emotion_score.toFixed(3)} emotion={result.emotion} />
          </>
        )}
      </div>
    </article>
  );
}
