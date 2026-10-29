type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export const SectionHeader = ({ eyebrow, title, description }: SectionHeaderProps) => (
  <div className="mb-8 max-w-2xl">
    <p className="mb-3 text-sm font-black uppercase text-emerald-700">{eyebrow}</p>
    <h1 className="text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">{title}</h1>
    {description ? <p className="mt-4 text-base leading-7 text-slate-600">{description}</p> : null}
  </div>
);
