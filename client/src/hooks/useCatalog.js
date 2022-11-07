import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCategoriesList } from '../store/categories';
const useCatalog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState({ path: 'price', order: 'asc' });

    const confectionary = useSelector(getConfectionaryList());
    const categories = useSelector(getCategoriesList());
};
