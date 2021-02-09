import Grid from '@material-ui/core/Grid'

import ProductCard from '../../components/ProductCard'
import ProductListSkeleton from '../../components/ProductListSkeleton'

export default function ProductList(props) {
    return (
        <Grid container spacing={3} >
            {props.isLoading ?
                <ProductListSkeleton />
            : 
                props.products.content.map(product => (
                    <Grid xs={12} sm={6} md={6} lg={4} item key={product.productId}>
                        <ProductCard product={product} />
                    </Grid>
                ))
            }
        </Grid>
    )
}
