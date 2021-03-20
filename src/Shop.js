import { useState, useEffect, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import queryString from 'query-string'
import { useQuery } from 'react-query'
import axios from 'axios'

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

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_ORDER':
            return {
                ...state,
                order: action.data.order,
                page: 1
            }
        case 'CHANGE_SIZE':
            return {
                ...state,
                size: action.data.size,
                page: 1
            }
        case 'CHANGE_PAGE':
            return {
                ...state,
                page: action.data.page
            }
        case 'CHANGE_CATEGORY':
            return {
                ...state,
                category: action.data.category,
                page: 1,
                filter: 'svi',
                ids: '',
                idsSerializedArray: ''
            }
        case 'CHANGE_FILTER':
            return {
                ...state,
                filter: action.data.filter,
                page: 1,
                ids: '',
                idsSerializedArray: '',
                search: '',
                category: ''
            }
        case 'CHANGE_IDS':
            console.log(action.data.ids)
            return {
                ...state,
                ids: action.data.ids,
            }
        case 'CLICK_PRETRAGA':
            return {
                ...state,
                idsSerializedArray: getNormalizedIds(state.ids),
                page: 1,
                filter: 'svi',
            }
        case 'CHANGE_SEARCH':
            return {
                ...state,
                search: action.data.search,
            }
        case 'SEARCH_INPUT':
            return {
                ...state,
                searchInput: action.data.search,
                filter: 'svi',
            }
        default:
            throw new Error();
    }
}

const getNormalizedIds = (value) => {
    return encodeURIComponent(JSON.stringify(
        value.replaceAll(',', '').split("\n")
    ))
}

function Shop() {
    const classes = useStyles()
    const [state, dispatch] = useReducer(reducer, initialState)

    const params = queryString.parse(window.location.search)

    const [sessionId, setSessionId] = useState(localStorage.getItem('sessionId') || '')

    const [search, setSearch] = useState(params.search ? params.search : '')
    const [searchInput, setSearchInput] = useState(params.search ? params.search : '')

    useEffect(() => {
        async function postCartLocal() {
            let response = await axios.post('/cart')

            setSessionId(response.data.sessionId)
            localStorage.setItem('sessionId', response.data.sessionId)
        }

        async function checkSession(sessionId) {
            let response = await axios('/cart/' + sessionId)

            if (response.status !== 200) {
                await postCartLocal()
            }
        }

        if (sessionId) {
            checkSession(sessionId)
        } else {
            postCartLocal()
        }
    }, [sessionId])

    const buildQueryParams = (params = {}) => {
        return "size=" + state.size
            + "&page=" + state.page
            + "&filter=" + state.filter
            + "&ids=" + state.idsSerializedArray
            + "&search=" + encodeURIComponent(searchInput)
            + "&category=" + state.category
            + "&order=" + state.order
    }

    const buildHistoryObject = () => {
        return {
            size: state.size,
            page: state.page,
            filter: state.filter,
            ids: state.idsSerializedArray,
            search: encodeURIComponent(searchInput),
            category: state.category,
            order: state.order,
        }
    }

    useEffect(() => {
        window.history.pushState(buildHistoryObject(), "", "/products?" + buildQueryParams(params))
    }, [state.order, state.size, state.page, state.category, state.filter, state.idsSerializedArray,
        buildHistoryObject, buildQueryParams])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [state.page, state.category, state.filter, state.idsSerializedArray])

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    /**
     * var search - current search value, don't trigger api fetch on each value change
     * var searchInput - pressed search button or pressed enter - trigger api fetch
     */
    const handleSearchInput = () => {
        setSearchInput(search)
        // setFilter('svi')
        pushToWindowHistory({ searchInput: search })
    }

    const pushToWindowHistory = (params = {}) => {
        window.history.pushState(buildHistoryObject(), "", "/products?" + buildQueryParams(params))
    }

    const fetchProducts = async () => { const { data } = await axios('/products?' + buildQueryParams()); return data }

    const { isLoading, data: products, error, isSuccess }
        = useQuery(["productsData", state.size, state.page, state.category, state.filter, state.idsSerializedArray, searchInput, state.order], 
            () => fetchProducts(state.page, state.size), { keepPreviousData: true })

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
                                        onIdsChange={(e) => dispatch({ type: 'CHANGE_IDS', data: {ids: e.target.value } })} 
                                        onPretragaClick={() => dispatch({ type: 'CLICK_PRETRAGA'})}
                                        value={state.ids} 
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>

                        <Grid md={10} item>
                            <Grid container justify="space-between">
                                <Grid md={2} item>
                                    <ProductSortSelect onChange={(e) => dispatch({ type: 'CHANGE_ORDER', data: { order: e.target.value } })} value={state.order} />
                                </Grid>
                                <Grid md={7} item>
                                    <SearchField onSearchInput={handleSearchInput} onSearchChange={handleSearchChange} value={search} />
                                </Grid>
                                <Grid md={2} item>
                                    <ProductPerPageSelect onChange={(e) => dispatch({ type: 'CHANGE_SIZE', data: { size: e.target.value } })} value={state.size} />
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
    );
}

export default Shop;
