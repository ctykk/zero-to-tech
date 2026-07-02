import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "@/components/Nav";
import PageHeading from "@/components/PageHeading";
import AnimatedCardGrid from "@/components/AnimatedCardGrid";
import { fetchIdentity } from "@/services/api.ts";

export default function HomePage() {
  const [motto, setMotto] = useState("-");
  const [identityError, setIdentityError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 组件挂载时从后端获取 motto
  useEffect(() => {
    fetchIdentity()
      .then((r) => {
        setMotto(r.motto);
      })
      .catch((err) => setIdentityError(err instanceof Error ? err.message : "获取座右铭失败"));
  }, []);

  return (
    <AnimatedCardGrid className="grid grid-cols-12 gap-4.5">
      <section className="col-span-12 grid min-h-0 content-center py-2 pb-4.5 sm:min-h-[36vh] sm:py-3 sm:pb-5">
        <Nav />

        <PageHeading title="关于我" subtitle="项目，创意，灵感，心得，我的作品" />
      </section>

      <section
        className="animate-card-enter rounded-panel bg-surface shadow-card col-span-12 grid min-h-55 content-center gap-2 p-6 py-7 pr-7"
        data-card=""
      >
        <p className="text-textMuted mb-3 text-xs leading-[1.33] font-semibold tracking-[-0.12px]">
          作品
        </p>
        <p className="max-w-180 text-[clamp(34px,4.2vw,52px)] leading-[1.04] font-semibold tracking-tighter sm:text-[24px]">
          文字实验室
        </p>
        <p className="text-textSoft max-w-130 text-[clamp(17px,2vw,21px)] leading-[1.28] tracking-[-0.02em]">
          拼音和情绪，挖掘中文里的细节
        </p>
        <a
          className="mt-1.5 inline-flex w-fit cursor-pointer items-center gap-2.5 transition-opacity duration-200 hover:opacity-[0.86]"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/text-lab");
          }}
        >
          <p className="text-brand text-[17px] leading-[1.47] tracking-[-0.37px]">打开作品{">"}</p>
        </a>
      </section>

      <section
        className="animate-card-enter rounded-panel bg-surface shadow-card col-span-12 grid grid-cols-1 items-start gap-6 p-6 py-5 pr-7 md:grid-cols-2"
        data-card=""
      >
        <div className="pt-1">
          <p className="text-textMuted mb-3 text-xs leading-[1.33] font-semibold tracking-[-0.12px]">
            座右铭
          </p>
          {identityError ? (
            <p className="text-red-500">{identityError}</p>
          ) : (
            <p className="max-w-130 text-[clamp(20px,2.2vw,28px)] leading-[1.4] font-medium tracking-[-0.02em]">
              {motto}
            </p>
          )}
        </div>
        <div className="pt-1">
          <p className="text-textMuted mb-3 text-xs leading-[1.33] font-semibold tracking-[-0.12px]">
            正在学习
          </p>
          <p className="text-[clamp(24px,3vw,32px)] leading-[1.12] font-semibold tracking-[-0.04em]">
            零到全栈
          </p>
        </div>
      </section>
    </AnimatedCardGrid>
  );
}
