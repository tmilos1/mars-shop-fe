import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Shop from './Shop'
import Checkout from './Checkout'
import theme from './Theme'
import { ThemeProvider } from '@material-ui/core/styles'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import { ReactQueryDevtools } from 'react-query/devtools'

import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'


import { create } from 'jss'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'
import increaseSpecificity from 'jss-increase-specificity'

const jss = create({
    plugins: [...jssPreset().plugins, increaseSpecificity()],
})


axios.defaults.baseURL = process.env.REACT_APP_API_ROOT

const queryClient = new QueryClient()

const target = document.getElementById('erw-root')

if (target) {
    ReactDOM.render(
        <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools />
                    <Router>
                        <Switch>
                            <Route path="/checkout">
                                <Checkout />
                            </Route>
                            <Route path="/">
                                <Shop />
                            </Route>
                        </Switch>
                    </Router>
                </QueryClientProvider>
            </ThemeProvider>
        </StylesProvider>,
        target
    );
}
