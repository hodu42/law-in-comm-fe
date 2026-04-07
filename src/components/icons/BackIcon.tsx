export const BackIcon: React.FC<{ className?: string }> = (
  { className = "w-7 h-7" } // 기본 크기 w-7 h-7 (28px)
) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5} // 아이콘 선 두께 (조금 더 두껍게)
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);
