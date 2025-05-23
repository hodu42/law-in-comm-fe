import { useNavigation } from "@/hooks/useNavigation";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { clearTokens } from "@/api/auth/token";
import { searchActions } from "@/store/search";
import { userRoleActions } from "@/store/userRole";

export const useLogout = () => {
  const navigate = useNavigation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    clearTokens();
    dispatch(searchActions.setKeyword(""));
    dispatch(userRoleActions.logout());
    navigate.goToLogin();
  };

  return { handleLogout };
};
