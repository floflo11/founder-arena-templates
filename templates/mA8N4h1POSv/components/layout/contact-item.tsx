import Link from "next/link";

interface ContactItemProps {
  label: string;
  value: string;
  href: string;
  ariaLabel?: string;
}

export function ContactItem({
  label,
  value,
  href,
  ariaLabel,
}: ContactItemProps) {
  return (
    <div className="flex flex-col lg:grid grid-cols-9 lg:gap-gap place-items-baseline">
      <span className="text-subtitle font-semibold opacity-30">{label}</span>
      <Link
        aria-label={ariaLabel || `${label} link`}
        title={ariaLabel || `${label} link`}
        rel="noopener noreferrer"
        className="text-heading font-black uppercase col-span-8"
        href={href}
      >
        {value}
      </Link>
    </div>
  );
}
