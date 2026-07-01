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
      <span className="mb-2 block text-xs leading-[1.33] tracking-[-0.12px] text-textMuted">
        {label}
      </span>
      <strong
        className={`text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[24px] ${muted ? "text-textMuted" : "text-textMain"}`}
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
    <p className="whitespace-pre-wrap text-[17px] leading-[1.47] tracking-[-0.37px] text-textMain">
      {pinyin.map((item, i) =>
        item.pinyin ? (
          <span key={i}>
            <ruby key={i}>
              {item.char}
              <rt className="text-xs text-textSoft">{item.pinyin}</rt>
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
      className="col-span-12 min-h-0 animate-card-enter rounded-panel bg-surface p-6 pr-7 shadow-card md:col-span-6 md:min-h-[340px]"
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
        {loading ? (
          <p className="text-textMuted">正在分析中...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : !result ? (
          <>
            <div className="rounded-soft bg-surfaceSoft p-5">
              <span className="mb-2 block text-xs leading-[1.33] tracking-[-0.12px] text-textMuted">
                拼音
              </span>
              <p className="whitespace-pre-wrap text-[17px] leading-[1.47] tracking-[-0.37px] text-textMuted">
                &mdash;
              </p>
            </div>
            <EmotionGrid muted />
          </>
        ) : (
          <>
            <div className="rounded-soft bg-surfaceSoft p-5">
              <span className="mb-2 block text-xs leading-[1.33] tracking-[-0.12px] text-textMuted">
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
