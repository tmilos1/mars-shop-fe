import { useEffect, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from 'react-query'
import axios from 'axios'

import useSession from './util/useSession'

const useStyles = makeStyles((theme) => ({
}))

function Checkout() {
    const classes = useStyles()

    const sessionId = useSession()

    return (
        <div>Checkout</div>
    )
}

export default Checkout;
