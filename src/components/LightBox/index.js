import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const useStyles = makeStyles((theme) => ({
    modalStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBar: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: 80,
        width: '100%',
        background: 'white',
        fontFamily: 'Roboto, sans-serif',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    naslov: {
        fontSize: '24px'
    },
    cena: {
        fontSize: '20px',
        lineHeight: '20px',
        letterSpacing: '1px',
        fontWeight: 'normal',
        color: theme.palette.error.main
    },    
    imageStyle: {
        width: 800,
        height: 600,
        background: 'white',
    },
    dl: {
        fontSize: '14px',
        display: 'flex',
        flexFlow: 'row wrap'
    },
    dt: {
        padding: '2px 4px',
        flexBasis: '45%',
        textAlign: 'right',
    },
    dd: {
        flexBasis: '40%',
        flexGrow: 1,
        margin: 0,
        padding: '2px 4px',
        fontWeight: 'bold',
        fontFamily: 'Roboto, sans-serif'
    },
}))

export default function LightBox(props) {
    const classes = useStyles()

    return (

        <Modal
            className={classes.modalStyle}
            open={props.open}
            onClose={props.onClose}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            closeAfterTransition
        >
            <Fade in={props.open}>

                <React.Fragment>
                    <header className={classes.topBar}>

                        <section className={classes.naslov}>
                            {props.naslov}
                        </section>

                        <section>
                            <dl className={classes.dl}>
                                <dt className={classes.dt}>Opis pakovanja:</dt>
                                <dd className={classes.dd}>{props.opisPakovanja}</dd>

                                <dt className={classes.dt}>Trans. pakovanje:</dt>
                                <dd className={classes.dd}>{props.transportnoPakovanje}</dd>

                                <dt className={classes.dt}>Min. pakovanje:</dt>
                                <dd className={classes.dd}>{props.minPakovanje}</dd>
                            </dl>
                        </section>

                        <section className={classes.cena}>
                            {props.cena}
                        </section>

                        <section>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<ShoppingCartIcon />}
                            >
                                Dodaj u korpu
                            </Button>
                        </section>

                    </header>

                    <img src="/img/vece/15000.jpg" className={classes.imageStyle} />
                </React.Fragment>

            </Fade>
        </Modal>
    )
}
