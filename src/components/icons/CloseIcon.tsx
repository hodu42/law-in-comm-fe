export const CloseIcon: React.FC<{ className?: string }> = (
  { className = "w-6 h-6" } // 기본 크기 w-6 h-6 (24px)
) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5} // 아이콘 선 두께 (BackIcon과 동일하게)
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
