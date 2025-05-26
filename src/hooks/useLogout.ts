import { useNavigation } from "@/hooks/useNavigation";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { clearTokens } from "@/api/auth/token";
import { searchActions } from "@/store/search";
import { userActions } from "@/store/user";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation();
  clearTokens();
  dispatch(searchActions.setKeyword(""));
  dispatch(userActions.logout());
  navigate.goToLogin();
};
