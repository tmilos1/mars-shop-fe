import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

import Typography from '@material-ui/core/Typography'

import Cart from './containers/Cart'
import AddressForm from './containers/AddressForm'
import CheckoutTotals from './components/CheckoutTotals'
import CheckoutCartPrices from './components/CheckoutCartPrices'

import useSession from './util/useSession'

const useStyles = makeStyles((theme) => ({
  body: {
    width: '100%',
    padding: '30px'
  },
  totalsLabel: {
    width: '10em'
  },
  totalsValue: {
    width: '5em',
    textAlign: 'right'
  }
}))

function Checkout() {
  const classes = useStyles()
  let [totals, setTotals] = useState({subTotal: 0, tax: 0, total: 0})

  const sessionId = useSession()

  const handleSetTotals = (totals) => {
    setTotals({subTotal: totals.subTotal, tax: totals.tax, total: totals.total})
  }

  return (
    <Container>
      <Box component="span" m={5}>

        <Paper className={classes.body} >
          <Typography variant="h4">Narudžbenica</Typography>
          <Grid container spacing={2} >
            <Grid sm={12} md={12} item >
              <Cart sessionId={sessionId} onSetTotals={handleSetTotals} />
            </Grid>
            <Grid sm={12} md={12} item >
              <CheckoutCartPrices sessionId={sessionId} />
            </Grid>
            <Grid sm={12} md={12} item >
              <CheckoutTotals totals={totals} />
            </Grid>
            <Grid sm={12} md={12} item >
              <AddressForm />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  )
}

export default Checkout;
