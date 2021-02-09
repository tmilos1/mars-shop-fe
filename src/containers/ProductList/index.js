import Grid from '@material-ui/core/Grid'

import ProductCard from '../../components/ProductCard'

export default function ProductList(props) {
    return (
        <Grid container spacing={3} >
            {props.products.map(product => (
                <Grid xs={12} sm={6} md={6} lg={4} item>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    )
}
