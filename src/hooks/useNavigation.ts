import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
    const navigate = useNavigate();
    const goToQuestionList = () => {
        navigate('/questions');
    }
    const goToQuestionWrite = () => {
        navigate('/question/write');
    }

    return {
        goToQuestionList,
        goToQuestionWrite,
    }
}

