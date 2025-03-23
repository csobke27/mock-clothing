import { useState, useEffect } from 'react';
import ProductCard from '../product-card/product-card.component';

import {CategoryPreviewContainer, Title, Preview} from './category-preview.styles';

const CategoryPreview = ({ title, products }) => {
    const [maxProducts, setMaxProducts] = useState(4);

    useEffect(() => {
        const updateMaxProducts = () => {
            if(window.innerWidth < 667) {
                setMaxProducts(3);
            } else {
                setMaxProducts(4);
            }
        }

        updateMaxProducts();
        window.addEventListener('resize', updateMaxProducts);

        return () => {
            window.removeEventListener('resize', updateMaxProducts);
        };
    }, []);
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={`/shop/${title}`}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {
                    products.filter((_, idx) => idx < maxProducts)
                    .map((product) =>  <ProductCard key={product.id} product={product} />)  
                }                 
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;