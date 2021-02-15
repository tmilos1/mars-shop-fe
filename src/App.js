import { useState } from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'

import AppMenu from './components/AppMenu'
import CategoryMenu from './components/CategoryMenu'
import FilterMenu from './components/FilterMenu'

import ProductSortSelect from './components/ProductSortSelect'
import ProductPerPageSelect from './components/ProductPerPageSelect'
import SearchField from './components/SearchField'
import SearchByProductIdsField from './components/SearchByProductIdsField'
import ShoppingBasketButton from './components/ShoppingBasketButton'
import ProductList from './containers/ProductList'

import { useQuery } from 'react-query'

function App() {

    const [redosled, setRedosled] = useState('Naziv')
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(9)
    const [category, setCategory] = useState('')

    const handleChangeRedosled = (event) => {
        setRedosled(event.target.value)
        setPage(1)
    }

    const handleChangeSize = (event) => {
        setSize(event.target.value)
        setPage(1)
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
        window.scrollTo(0, 0)
        window.history.pushState({ page: newPage }, "Strana " + newPage, "?page=" + newPage)
    }

    const handleCategoryChange = (event, value) => {
        setCategory(value)
        setPage(1)
        window.scrollTo(0, 0)
    }

    const fetchProducts = (page = 1, size = 20) => fetch(
        process.env.REACT_APP_API_ROOT
        + "/products?size=" + size
        + "&page=" + page
        + "&category=" + category
        + "&order=" + redosled
    ).then((res) => res.json())

    const { isLoading, data: products, error, isSuccess }
        = useQuery(["productsData", size, page, category, redosled], () =>
            fetchProducts(page, size), { keepPreviousData: true })

    if (error) return "An error has occurred: " + error.message

    return (
        <div className="App">
            <Container>
                <Box component="span" m={5}>
                    <Grid container spacing={2} >

                        <Grid xs={12} item>
                            {/* <AppMenu /> */}
                        </Grid>

                        <Grid sm={12} md={2} item>
                            <CategoryMenu onCategoryChange={handleCategoryChange} />
                            <FilterMenu />
                            <SearchByProductIdsField />
                        </Grid>

                        <Grid xs={10} item>
                            <Grid container justify="space-between">
                                <Grid md={2} item>
                                    <ProductSortSelect onChange={handleChangeRedosled} value={redosled} />
                                </Grid>
                                <Grid md={7} item>
                                    <SearchField />
                                </Grid>
                                <Grid md={2} item>
                                    <ProductPerPageSelect onChange={handleChangeSize} value={size} />
                                </Grid>
                                <Grid md={1} item>
                                    <ShoppingBasketButton />
                                </Grid>
                            </Grid>

                            <ProductList products={products} isLoading={isLoading} />
                        </Grid>

                        <Grid xs={2} item>

                        </Grid>

                        <Grid xs={10} item>
                            {isSuccess &&
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <Pagination
                                        count={products.pageSection.totalPages}
                                        page={page}
                                        onChange={handlePageChange}
                                        boundaryCount={3}
                                        siblingCount={2}
                                    />
                                </div>
                            }
                        </Grid>

                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default App;
