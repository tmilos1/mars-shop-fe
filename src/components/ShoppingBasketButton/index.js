import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

import Cart from '../../containers/Cart'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        [theme.breakpoints.down('sm')]: {
            position: 'static',
        }
    }
}))

export default function ShoppingBasketButton(props) {
    const classes = useStyles()

    const [open, setOpen] = React.useState(false)
    const [scroll, setScroll] = React.useState('paper')

    const handleClickOpen = () => () => {
        setOpen(true)
        setScroll('paper')
    }

    const handleClose = () => {
        setOpen(false)
    }

    const descriptionElementRef = React.useRef(null)
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef
            if (descriptionElement !== null) {
                descriptionElement.focus()
            }
        }
    }, [open])

    return (
        <Box className={classes.root} >
            <Paper>
                <Button
                    variant="outlined"
                    className={classes.button}
                    startIcon={<ShoppingBasketIcon />}
                    onClick={handleClickOpen()}
                >Korpa
                </ Button>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    maxWidth="lg"
                >
                    <DialogTitle id="scroll-dialog-title">Korpa</DialogTitle>
                    <DialogContent dividers={true}>

                        <Cart sessionId={props.sessionId} />
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Zatvori
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Box>
    )
}
