import { useEffect, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useForm, Controller } from "react-hook-form"

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import SaveIcon from '@material-ui/icons/Save'

import useSession from './util/useSession'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
}))

// https://react-hook-form.com/get-started#IntegratingwithUIlibraries

function Checkout() {
    const classes = useStyles()

    const sessionId = useSession()

    return (
        <Container>
            <Box component="span" m={5}>
                <Grid container spacing={2} >
                    <Grid sm={12} md={2} item>
                        <form className={classes.root} noValidate autoComplete="off">
                            <div>
                                <TextField id="standard-basic" label="Ime" />
                                <TextField id="standard-basic" label="Prezime" />
                            </div>
                            <div>
                                <TextField id="standard-basic" label="Telefon" />
                                <TextField id="standard-basic" label="Email" />
                            </div>
                            <div>
                                <TextField id="standard-basic" label="Adresa" />
                            </div>
                            <div>
                                <TextField id="standard-basic" label="Grad/Mesto" />
                                <TextField id="standard-basic" label="Poštanski broj" />
                            </div>
                            <div>
                                <TextField id="standard-basic" label="Napomena" />
                            </div>                            
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                >
                                    Zaključivanje narudžbenice
                                </Button>
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Checkout;
