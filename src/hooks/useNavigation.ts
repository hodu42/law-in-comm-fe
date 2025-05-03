import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
    const navigate = useNavigate();

    const goToMain = () => {
        navigate('/main');
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

    return {
        goToMain,
        goToQuestionList,
        goToQuestionWrite,
    }
}

