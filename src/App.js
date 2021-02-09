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
} from 'react-query'


function App() {

    const [redosled, setRedosled] = useState('Naziv')
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(20)

    const handleChangeRedosled = (event) => {
        setRedosled(event.target.value);
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
        window.scrollTo(0, 0)
        window.history.pushState({page: newPage}, "Strana " + newPage, "?page=" + newPage)
    }

    const fetchProducts = (page = 1, size = 20) => fetch(
        process.env.REACT_APP_API_ROOT + "/products?size=" + size + "&page=" + page
    ).then((res) => res.json())

    const { isLoading, data: products, error, isSuccess } = useQuery(["productsData", page], () =>
        fetchProducts(page, size), { keepPreviousData: true })

    if (error) return "An error has occurred: " + error.message

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

                            <ProductList products={products} isLoading={isLoading} />
                        </Grid>

                        <Grid xs={2} item>

                        </Grid>

                        <Grid xs={10} item>
                            {isSuccess &&
                                <Pagination
                                    count={products.pageSection.totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    boundaryCount={3}
                                    siblingCount={2}
                                />
                            }
                        </Grid>

                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default App;
