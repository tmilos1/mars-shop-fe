import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import ProductCard from '../../components/ProductCard'
import ProductListSkeleton from '../../components/ProductListSkeleton'

export default function ProductList(props) {
    return (
        <Box m={2}>
            <Grid container spacing={3} >
                {props.isLoading ?
                    <ProductListSkeleton />
                : 
                    props.products.content.map(product => (
                        <Grid xs={12} sm={6} md={6} lg={4} item key={product.productId}>
                            <ProductCard product={product} sessionId={props.sessionId} />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}
