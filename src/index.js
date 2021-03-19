import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Shop from './Shop'
import theme from './Theme'
import { ThemeProvider } from '@material-ui/core/styles'

import { ReactQueryDevtools } from 'react-query/devtools'

import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                <Shop />
        </QueryClientProvider>
    </ThemeProvider>,
    document.getElementById('root')
);
