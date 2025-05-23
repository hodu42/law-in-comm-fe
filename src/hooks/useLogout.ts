import { useNavigation } from "@/hooks/useNavigation";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { clearTokens } from "@/api/auth/token";
import { searchActions } from "@/store/search";
import { userActions } from "@/store/user";

export const useLogout = () => {
  const navigate = useNavigation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    clearTokens();
    dispatch(searchActions.setKeyword(""));
    dispatch(userActions.logout());
    navigate.goToLogin();
  };

  return { handleLogout };
};
