import { useState } from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'

import AppMenu from './components/AppMenu'
import CategoryMenu from './components/CategoryMenu'

import ProductSortSelect from './components/ProductSortSelect'
import ProductList from './containers/ProductList'

import {
    useQuery,
    useMutation,
    useQueryClient,
} from 'react-query'


function App() {

    const [redosled, setRedosled] = useState('Naziv')

    const handleChangeRedosled = (event) => {
        setRedosled(event.target.value);
    }

    const { isLoading, data: products, error, isFetching } = useQuery("productsData", () =>
        fetch(
            process.env.REACT_APP_API_ROOT + "/products?size=20&page=1"
        ).then((res) => res.json())
    );

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    return (
        <div className="App">
            <Container>
                <Box component="span" m={5}>
                    <Grid container spacing={2} >

                        <Grid xs={12} item>
                            <AppMenu />
                        </Grid>

                        <Grid sm={12} md={2} item>
                            <CategoryMenu />
                        </Grid>

                        <Grid xs={10} item>
                            <ProductSortSelect onChange={handleChangeRedosled} value={redosled} />

                            <ProductList products={products.content} />
                        </Grid>

                        <Grid xs={2} item>

                        </Grid>

                        <Grid xs={10} item>
                            <Pagination count={10} />
                        </Grid>

                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default App;
