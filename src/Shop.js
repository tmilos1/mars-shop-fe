import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import queryString from 'query-string'

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

function Shop() {
    const classes = useStyles()
    
    const params = queryString.parse(window.location.search)

    const defaultIdsSerializedArray = params.ids ? JSON.parse(params.ids) : []
    const defaultIds = params.ids ? defaultIdsSerializedArray.join(', ') : ''

    const [sessionId, setSessionId] = useState(localStorage.getItem('sessionId') || '')
    const [order, setOrder] = useState(params.order ? params.order : "Naziv")
    const [page, setPage] = useState(params.page ? parseInt(params.page) : 1)
    const [size, setSize] = useState(params.size ? parseInt(params.size) : 15)
    const [category, setCategory] = useState(params.category ? params.category : '')
    const [filter, setFilter] = useState(params.filter ? params.filter : 'svi')
    const [ids, setIds] = useState(defaultIds)
    const [idsSerializedArray, setIdsSerializedArray] = useState(defaultIdsSerializedArray)
    const [search, setSearch] = useState(params.search ? params.search : '')
    const [searchInput, setSearchInput] = useState(params.search ? params.search : '')

    useEffect(() => {
        async function postCartLocal() {
            let response = await fetch(
                process.env.REACT_APP_API_ROOT + "/cart/",
                { method: 'POST' }
            )
            response = await response.json()

            setSessionId(response.sessionId)
            localStorage.setItem('sessionId', response.sessionId)
        }

        async function checkSession(sessionId) {
            let response = await fetch(
                process.env.REACT_APP_API_ROOT + "/cart/" + sessionId
            )

            if (response.status !== 200) {
                await postCartLocal()
            }
        }

        if (!sessionId) {
            postCartLocal()
        } else {
            checkSession(sessionId)
        }

        // handle wrong sessionId
    }, [sessionId])

    const handleChangeRedosled = (event) => {
        setOrder(event.target.value)
        setPage(1)
        pushToWindowHistory({order: event.target.value, page: 1})
    }

    const handleChangeSize = (event) => {
        setSize(event.target.value)
        setPage(1)
        pushToWindowHistory({size: event.target.value, page: 1})
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
        pushToWindowHistory({page: newPage})

        window.scrollTo(0, 0)
    }

    const handleCategoryChange = (event, value) => {
        setCategory(value)
        setPage(1)
        setFilter('svi')
        setIds("")
        setIdsSerializedArray("")        
        pushToWindowHistory({category: value, ids: "", filter: 'svi', page: 1})

        window.scrollTo(0, 0)
    }

    const handleFilterChange = (event, value) => {
        setFilter(value)
        setPage(1)
        setIds("")
        setIdsSerializedArray("")
        setSearch("")
        setCategory("")
        pushToWindowHistory({filter: value, ids: "", search: "", category: "", page: 1})

        window.scrollTo(0, 0)
    }

    const handleIdsChange = (event) => {
        setIds(event.target.value)
        pushToWindowHistory({ids: getNormalizedIds(event.target.value)})        
    }
    
    const handlePretragaClick = () => {
        setIdsSerializedArray(getNormalizedIds(ids))
        setPage(1)
        setFilter('svi')
        pushToWindowHistory({filter: 'svi', page: 1})
        window.scrollTo(0, 0)
    }

    const getNormalizedIds = (value) => {
        return encodeURIComponent(JSON.stringify( 
            value.replaceAll(',', '').split("\n")
        ))
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    /**
     * var search - current search value, don't trigger api fetch on each value change
     * var searchInput - pressed search button or pressed enter - trigger api fetch
     */
    const handleSearchInput = () => {
        setSearchInput(search)
        setFilter('svi')
        pushToWindowHistory({searchInput: search})
    }

    const pushToWindowHistory = (params = {}) => {
        window.history.pushState(buildHistoryObject(), "", "/products?" + buildQueryParams(params))
    }

    const buildQueryParams = (params = {}) => {
        return "size=" + (!!params.size ? params.size : size)
        + "&page=" + (!!params.page ? params.page : page)
        + "&filter=" + (!!params.filter ? params.filter : filter)
        + "&ids=" + idsSerializedArray
        + "&search=" + encodeURIComponent(searchInput)
        + "&category=" + (!!params.category ? params.category : category)
        + "&order=" + (!!params.order ? params.order : order)
    }

    const buildHistoryObject = () => {
        return {
            size: size,
            page: page,
            filter: filter,
            ids: idsSerializedArray,
            search: encodeURIComponent(searchInput),
            category: category,
            order: order,
        }
    }
    
    const fetchProducts = () => fetch(
        process.env.REACT_APP_API_ROOT + "/products?" + buildQueryParams()
    ).then((res) => res.json())

    const { isLoading, data: products, error, isSuccess }
        = useQuery(["productsData", size, page, category, filter, idsSerializedArray, searchInput, order], () =>
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
                                    <CategoryMenu onCategoryChange={handleCategoryChange} category={category} />
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
                                    <SearchByProductIdsField onIdsChange={handleIdsChange} value={ids} onPretragaClick={handlePretragaClick}/>
                                </AccordionDetails>                                           
                            </Accordion>
                        </Grid>

                        <Grid md={10} item>
                            <Grid container justify="space-between">
                                <Grid md={2} item>
                                    <ProductSortSelect onChange={handleChangeRedosled} value={order} />
                                </Grid>
                                <Grid md={7} item>
                                    <SearchField  onSearchInput={handleSearchInput} onSearchChange={handleSearchChange} value={search} />
                                </Grid>
                                <Grid md={2} item>
                                    <ProductPerPageSelect onChange={handleChangeSize} value={size} />
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

export default Shop;
