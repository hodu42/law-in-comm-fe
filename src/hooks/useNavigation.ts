import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
    const navigate = useNavigate();

    const goToMain = () => {
        navigate('/main');
    }
    const goToLogin = () => {
        navigate('/login');
    }
    const goToPreviousPage = () => {
        navigate(-1);
    }
    const goToQuestionList = (keyword: string = '', category: string = '', page: string = '0') => {
        const searchParams = new URLSearchParams();
        searchParams.set('keyword', keyword);
        searchParams.set('category', category);
        searchParams.set('page', page);
        navigate(`/questions?${searchParams.toString()}`);
    }
    const goToQuestionWrite = () => {
        navigate('/question/write');
    }
    const goToQuestionDetail = (questionId: string) => {
        navigate(`/question/${questionId}`);
    }
    const goToQuestionModify = (questionId: string) => {
        navigate(`/question/modify/${questionId}`);
    }

    return {
        goToMain,
        goToLogin,
        goToQuestionList,
        goToQuestionWrite,
        goToQuestionDetail,
        goToQuestionModify,
        goToPreviousPage,
    }
}

