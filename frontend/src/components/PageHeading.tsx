interface PageHeadingProps {
  title: string;
  subtitle: string;
}

export default function PageHeading({ title, subtitle }: PageHeadingProps) {
  return (
    <div className="max-w-[620px]">
      <h1 className="bg-brand-gradient bg-clip-text text-[clamp(56px,10vw,96px)] font-semibold leading-[1.04] tracking-[-0.06em] text-transparent sm:text-[48px]">
        {title}
      </h1>
      <p className="mt-[10px] max-w-[540px] text-[clamp(18px,2.2vw,24px)] leading-[1.28] tracking-[-0.02em] text-textSoft sm:mt-[14px] sm:text-[18px]">
        {subtitle}
      </p>
    </div>
  );
}
