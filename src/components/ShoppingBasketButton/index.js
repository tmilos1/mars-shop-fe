import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },   
    searchField: {
        width: "100%"
    }
}))

export default function ShoppingBasketButton(props) {
    const classes = useStyles()

    return (
        <Box>
            <Button
                variant="outlined"
                className={classes.button}
                startIcon={<ShoppingBasketIcon />}
            >Korpa
            </ Button>
        </Box>
    )
}
