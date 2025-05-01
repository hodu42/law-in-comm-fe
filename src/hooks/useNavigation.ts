import { useNavigate, useSearchParams } from 'react-router-dom';

export const useNavigation = () => {
    const navigate = useNavigate();
    const goToQuestionList = (keyword: string = '', category: string = '', page: string = '0') => {
        navigate(`/questions?keyword=${keyword}&category=${category}&page=${page}`);
    }
    const goToQuestionWrite = () => {
        navigate('/question/write');
    }

    return {
        goToQuestionList,
        goToQuestionWrite,
    }
}

