import { useEffect, useReducer, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from 'react-query'
import axios from 'axios'

import useSession from './util/useSession'
import shopReducer from './util/shopReducer'

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

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

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

/*
 * var search - current search value, don't trigger api fetch on each value change
 * var searchInput - pressed search button or pressed enter - trigger api fetch
 */
const initialState = {
    order: "Naziv",
    page: 1,
    size: 15,
    category: '',
    filter: 'svi',
    ids: '',
    idsSerializedArray: '',
    search: '',
    searchInput: ''
}

function Shop() {
    const classes = useStyles()
    const [state, dispatch] = useReducer(shopReducer, initialState)

    const theme = useTheme()
    const mobile = useMediaQuery(theme.breakpoints.down('sm'))

    const sessionId = useSession()

    const buildQueryParams = useCallback(() => {
        return "size=" + state.size
            + "&page=" + state.page
            + "&filter=" + state.filter
            + "&ids=" + state.idsSerializedArray
            + "&search=" + encodeURIComponent(state.searchInput)
            + "&category=" + state.category
            + "&order=" + state.order
    }, [state.category, state.filter, state.idsSerializedArray, state.order, state.page, state.searchInput, state.size]) 

    useEffect(() => {
        const buildHistoryObject = () => {
            return {
                size: state.size,
                page: state.page,
                filter: state.filter,
                ids: state.idsSerializedArray,
                search: encodeURIComponent(state.searchInput),
                category: state.category,
                order: state.order,
            }
        }

        window.history.pushState(buildHistoryObject(), "", "/products?" + buildQueryParams())
    }, [state.order, state.size, state.page, state.category, state.filter, state.idsSerializedArray,
    state.searchInput, buildQueryParams]) 

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [state.page, state.category, state.filter, state.idsSerializedArray, state.searchInput])

    const fetchProducts = async () => { const { data } = await axios('/products?' + buildQueryParams()); return data }

    const { isLoading, data: products, error, isSuccess }
        = useQuery(["productsData", state.size, state.page, state.category, state.filter,
            state.idsSerializedArray, state.searchInput, state.order],
            () => fetchProducts(state.page, state.size), { keepPreviousData: true })

    if (error) return "An error has occurred: " + error.message

    return (
        <div className="App">
            <Container maxWidth="xl" disableGutters={mobile}>
                <Box component="span" m={5}>
                    <Grid container spacing={2} >

                        <Grid sm={12} md={2} item>
                            <Accordion defaultExpanded={true} elevation={3}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                                    <Typography className={classes.sidebarTitle} >Kategorije</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <CategoryMenu
                                        onCategoryChange={(e, category) => dispatch({ type: 'CHANGE_CATEGORY', data: { category } })}
                                        category={state.category}
                                    />
                                </AccordionDetails>
                            </Accordion>

                            <Accordion defaultExpanded={true} elevation={3}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                                    <Typography className={classes.sidebarTitle} >Filteri</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FilterMenu onFilterChange={(e, filter) => dispatch({ type: 'CHANGE_FILTER', data: { filter } })}
                                        filter={state.filter}
                                    />
                                </AccordionDetails>
                            </Accordion>

                            <Accordion defaultExpanded={true} elevation={3} className={classes.searchByProductIds}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                                    <Typography className={classes.sidebarTitle} >Pretraga</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <SearchByProductIdsField
                                        onIdsChange={(e) => dispatch({ type: 'CHANGE_IDS', data: { ids: e.target.value } })}
                                        onPretragaClick={() => dispatch({ type: 'CLICK_PRETRAGA' })}
                                        value={state.ids}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>

                        <Grid md={10} item>
                            <Grid container justify="space-between">
                                <Grid md={2} item>
                                    <ProductSortSelect onChange={(e) => dispatch({ type: 'CHANGE_ORDER', data: { order: e.target.value } })}
                                                       value={state.order}
                                    />
                                </Grid>
                                <Grid md={7} item>
                                    <SearchField
                                        onSearchChange={(e) => dispatch({ type: 'CHANGE_SEARCH', data: { search: e.target.value } })}
                                        onSearchInput={() => dispatch({ type: 'SEARCH_INPUT' })} 
                                        value={state.search} 
                                    />
                                </Grid>
                                <Grid md={2} item>
                                    <ProductPerPageSelect onChange={(e) => dispatch({ type: 'CHANGE_SIZE', data: { size: e.target.value } })}
                                        value={state.size} 
                                    />
                                </Grid>
                                <Grid md={1} item>
                                    <ShoppingBasketButton sessionId={sessionId} />
                                </Grid>
                            </Grid>

                            <ProductList products={products} isLoading={isLoading} sessionId={sessionId} />
                        </Grid>

                        <Grid sm={false} md={2} item>

                        </Grid>

                        <Grid sm={12} md={10} item>
                            {isSuccess &&
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Pagination
                                        count={products.pageSection.totalPages}
                                        page={state.page}
                                        onChange={(e, page) => dispatch({ type: 'CHANGE_PAGE', data: { page: page } })}
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
    )
}

export default Shop;
