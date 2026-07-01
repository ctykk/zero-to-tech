import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "@/components/Nav";
import PageHeading from "@/components/PageHeading";
import AnimatedCardGrid from "@/components/AnimatedCardGrid";
import { fetchIdentity } from "@/services/api.ts";

export default function HomePage() {
  const [motto, setMotto] = useState("-");
  const navigate = useNavigate();

  // 组件挂载时从后端获取 motto
  useEffect(() => {
    fetchIdentity()
      .then((r) => {
        setMotto(r.motto);
      })
      .catch((err) => setMotto(String(err)));
  }, []);

  return (
    <AnimatedCardGrid className="grid grid-cols-12 gap-[18px]">
      <section className="col-span-12 grid min-h-0 content-center py-2 pb-[18px] sm:min-h-[36vh] sm:py-3 sm:pb-5">
        <Nav />

        <PageHeading title="关于我" subtitle="项目，创意，灵感，心得，我的作品" />
      </section>

      <section
        className="col-span-12 grid min-h-[220px] animate-card-enter content-center gap-2 rounded-panel bg-surface p-6 py-7 pr-7 shadow-card"
        data-card=""
      >
        <p className="mb-3 text-xs font-semibold leading-[1.33] tracking-[-0.12px] text-textMuted">
          作品
        </p>
        <p className="max-w-[720px] text-[clamp(34px,4.2vw,52px)] font-semibold leading-[1.04] tracking-[-0.05em] sm:text-[24px]">
          文字实验室
        </p>
        <p className="max-w-[520px] text-[clamp(17px,2vw,21px)] leading-[1.28] tracking-[-0.02em] text-textSoft">
          拼音和情绪，挖掘中文里的细节
        </p>
        <a
          className="mt-1.5 inline-flex w-fit cursor-pointer items-center gap-[10px] transition-opacity duration-200 hover:opacity-[0.86]"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/text-lab");
          }}
        >
          <p className="text-[17px] leading-[1.47] tracking-[-0.37px] text-brand">打开作品{">"}</p>
        </a>
      </section>

      <section
        className="col-span-12 grid animate-card-enter grid-cols-1 items-start gap-6 rounded-panel bg-surface p-6 py-5 pr-7 shadow-card md:grid-cols-2"
        data-card=""
      >
        <div className="pt-1">
          <p className="mb-3 text-xs font-semibold leading-[1.33] tracking-[-0.12px] text-textMuted">
            座右铭
          </p>
          <p className="max-w-[520px] text-[clamp(20px,2.2vw,28px)] font-medium leading-[1.4] tracking-[-0.02em]">
            {motto}
          </p>
        </div>
        <div className="pt-1">
          <p className="mb-3 text-xs font-semibold leading-[1.33] tracking-[-0.12px] text-textMuted">
            正在学习
          </p>
          <p className="text-[clamp(24px,3vw,32px)] font-semibold leading-[1.12] tracking-[-0.04em]">
            零到全栈
          </p>
        </div>
      </section>
    </AnimatedCardGrid>
  );
}
