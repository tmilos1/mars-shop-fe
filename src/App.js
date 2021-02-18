import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

import CategoryMenu from './components/CategoryMenu'
import FilterMenu from './components/FilterMenu'

import ProductSortSelect from './components/ProductSortSelect'
import ProductPerPageSelect from './components/ProductPerPageSelect'
import SearchField from './components/SearchField'
import SearchByProductIdsField from './components/SearchByProductIdsField'
import ShoppingBasketButton from './components/ShoppingBasketButton'
import ProductList from './containers/ProductList'

import { useQuery } from 'react-query'

const useStyles = makeStyles((theme) => ({
    sidebarTitle: {
        fontSize: "16px"
    },
    searchByProductIds: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }             
    }
}))

function App() {
    const classes = useStyles()

    const [redosled, setRedosled] = useState('Naziv')
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(15)
    const [category, setCategory] = useState('')
    const [filter, setFilter] = useState('svi')
    const [ids, setIds] = useState([])
    const [search, setSearch] = useState('')

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

    const handleFilterChange = (event, value) => {
        setFilter(value)
    }

    const handleIdsChange = (value) => {
        setIds(value.replaceAll(',', '').split("\n"))
    }

    const handleChangeSearch = (value) => {
        setSearch(value)
    }

    const fetchProducts = (page = 1, size = 15) => fetch(
        process.env.REACT_APP_API_ROOT
        + "/products?size=" + size
        + "&page=" + page
        + "&filter=" + filter
        + "&ids=" + encodeURIComponent(JSON.stringify(ids))
        + "&search=" + encodeURIComponent(search)
        + "&category=" + category
        + "&order=" + redosled
    ).then((res) => res.json())

    const { isLoading, data: products, error, isSuccess }
        = useQuery(["productsData", size, page, category, filter, ids, search, redosled], () =>
            fetchProducts(page, size), { keepPreviousData: true })

    if (error) return "An error has occurred: " + error.message

    return (
        <div className="App">
            <Container>
                <Box component="span" m={5}>
                    <Grid container spacing={2} >

                        <Grid sm={12} md={2} item>
                            <Accordion defaultExpanded={true} elevation={3}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} >                      
                                    <Typography className={classes.sidebarTitle} >Kategorije</Typography>   
                                </AccordionSummary>
                                <AccordionDetails>
                                    <CategoryMenu onCategoryChange={handleCategoryChange} />
                                </AccordionDetails>                                           
                            </Accordion>

                            <Accordion defaultExpanded={true} elevation={3}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} >                      
                                    <Typography className={classes.sidebarTitle} >Filteri</Typography>   
                                </AccordionSummary>
                                <AccordionDetails>
                                <FilterMenu onFilterChange={handleFilterChange} filter={filter} />
                                </AccordionDetails>                                           
                            </Accordion>

                            <Accordion defaultExpanded={true} elevation={3} className={classes.searchByProductIds}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} >                      
                                    <Typography className={classes.sidebarTitle} >Pretraga</Typography>   
                                </AccordionSummary>
                                <AccordionDetails>
                                    <SearchByProductIdsField onIdsChange={handleIdsChange} />
                                </AccordionDetails>                                           
                            </Accordion>
                        </Grid>

                        <Grid md={10} item>
                            <Grid container justify="space-between">
                                <Grid md={2} item>
                                    <ProductSortSelect onChange={handleChangeRedosled} value={redosled} />
                                </Grid>
                                <Grid md={7} item>
                                    <SearchField  onChange={handleChangeSearch} value={search} />
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

                        <Grid sm={false} md={2} item>

                        </Grid>

                        <Grid sm={12} md={10} item>
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
