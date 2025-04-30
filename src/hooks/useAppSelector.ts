import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export const useAppSelector = () => {
    const keyword = useSelector((state: RootState) => state.search.keyword);
    const category = useSelector((state: RootState) => state.search.category);

    return {
        keyword,
        category,
    }
}
