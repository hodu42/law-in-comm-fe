import { useNavigation } from "@/hooks/useNavigation";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { clearTokens } from "@/api/auth/token";
import { searchActions } from "@/store/search";
import { userActions } from "@/store/user";
import { chatWidgetActions } from "@/store/chatWidget";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigation();

  const handleLogout = () => {
    clearTokens();
    dispatch(searchActions.setKeyword(""));
    dispatch(chatWidgetActions.clearChatroomId());
    dispatch(chatWidgetActions.closeChat());
    dispatch(userActions.logout());
    navigate.goToLogin();
  };

  return handleLogout;
};
