interface KomdigiEmblemProps {
  className?: string;
}

export function KomdigiEmblem({ className = 'w-8 h-8' }: KomdigiEmblemProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="#0A244D" />
      <path
        d="M11 28V12H15.2V19.1L22.3 12H27.6L19.9 19.6L28.2 28H22.8L16.7 21.6L15.2 23.1V28H11Z"
        fill="#FFFFFF"
      />
      <path
        d="M27.5 11.5C29.8 13.8 31 16.8 31 20C31 21.8 30.6 23.5 29.8 25"
        stroke="#0095DA"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="29.5" cy="12.5" r="1.8" fill="#0095DA" />
    </svg>
  );
}
