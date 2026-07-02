interface PageHeadingProps {
  title: string;
  subtitle: string;
}

export default function PageHeading({ title, subtitle }: PageHeadingProps) {
  return (
    <div className="max-w-155">
      <h1 className="bg-brand-gradient bg-clip-text text-[clamp(56px,10vw,96px)] leading-[1.04] font-semibold tracking-[-0.06em] text-transparent sm:text-[48px]">
        {title}
      </h1>
      <p className="text-textSoft mt-2.5 max-w-135 text-[clamp(18px,2.2vw,24px)] leading-[1.28] tracking-[-0.02em] sm:mt-3.5 sm:text-[18px]">
        {subtitle}
      </p>
    </div>
  );
}
