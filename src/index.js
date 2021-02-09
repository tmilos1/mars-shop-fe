import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { ReactQueryDevtools } from 'react-query/devtools'

import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <App />
    </QueryClientProvider>,
    document.getElementById('root')
);
