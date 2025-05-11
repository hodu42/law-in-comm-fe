import { useNavigation } from "@/hooks/useNavigation";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { clearTokens } from "@/api/auth/token";

export const useLogout = () => {
  const navigate = useNavigation();
  const { clearKeyword } = useAppDispatch();

  const handleLogout = () => {
    clearTokens();
    clearKeyword();
    navigate.goToLogin();
  };

  return { handleLogout };
};
