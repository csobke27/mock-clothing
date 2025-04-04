import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

import {CategoryContainer, CategoryTitle} from './category.styles';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (categoriesMap[category]) {
            setProducts(categoriesMap[category]);
        }
    }, [categoriesMap, category]);
    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {
                    products.map((product) => {
                        return <ProductCard key={product.id} product={product} />
                    })
                }
            </CategoryContainer>
        </Fragment>
    )
}

export default Category;