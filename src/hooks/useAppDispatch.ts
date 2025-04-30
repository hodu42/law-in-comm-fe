import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { searchActions } from '@/store/search';

export const useAppDispatch = () => {
    const dispatch = useDispatch<AppDispatch>();

    return {
        setKeyword: (keyword: string) => dispatch(searchActions.setKeyword(keyword)),
        setCategory: (category: string) => dispatch(searchActions.setCategory(category)),
        clearKeyword: () => dispatch(searchActions.setKeyword('')),
        clearCategory: () => dispatch(searchActions.setCategory('')),
    }
}
