import { useNavigation } from "@/hooks/useNavigation";

export const MobileBackButton = (): React.JSX.Element => {
  const { goToPreviousPage } = useNavigation();
  return (
    <button
      onClick={() => goToPreviousPage()}
      className="pc:hidden flex items-center text-black z-10 ml-6"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </button>
  );
};
