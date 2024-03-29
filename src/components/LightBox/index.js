import React, { useState, useCallback, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

import ProductAddedNotification from '../ProductAddedNotification'

const useStyles = makeStyles((theme) => ({
    modalStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    close: {
        cursor: 'pointer',
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 10,
    },
    topBar: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: 80,
        width: '100%',
        background: 'white',
        color: 'black',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: 'normal',
        lineHeight: 'initial',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexFlow: 'column',
            height: 140,
        }
    },
    naziv: {
        fontSize: '24px'
    },
    detaljiProizvoda: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
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
        [theme.breakpoints.down('xs')]: {
            width: '120%',
            height: 'auto',
        }
    },
    dl: {
        fontSize: '14px',
        display: 'flex',
        flexFlow: 'row wrap',
        margin: '0',
        fontWeight: 'normal'
    },
    dt: {
        padding: '2px 4px',
        flexBasis: '45%',
        textAlign: 'right',
        fontWeight: 'normal'
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
    const queryClient = useQueryClient()
    const [notificationVisible, setNotificationVisible] = useState(false)

    const onClose = props.onClose

    const escFunction = useCallback((event) => {
        if(event.keyCode === 27) {
            onClose()
        }
      }, [onClose])

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false)
    
        return () => {
          document.removeEventListener("keydown", escFunction, false)
        };
      }, [escFunction])

    const addProductMutation = useMutation(productId => {
        return axios.put('/cartItem', { productId, qty: 1, sessionId: props.sessionId })
        },{
            onSuccess: () => {
                queryClient.invalidateQueries('cartData')
                setNotificationVisible(true)              
            }
        })        

    const handleAddToCart = (productId) => {
        addProductMutation.mutate(productId)
    }

    return (
        <>
        <Modal
            className={classes.modalStyle}
            open={props.open}
            onClose={onClose}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            closeAfterTransition
        >
            <Fade in={props.open}>

                <React.Fragment>
                    <CancelPresentationIcon className={classes.close} onClick={onClose} />

                    <header className={classes.topBar}>

                        <section className={classes.naziv}>
                            {props.product.name}
                        </section>

                        <section className={classes.detaljiProizvoda}>
                            <dl className={classes.dl}>
                                <dt className={classes.dt}>Opis pakovanja:</dt>
                                <dd className={classes.dd}>{props.product.dimension}</dd>

                                <dt className={classes.dt}>Trans. pakovanje:</dt>
                                <dd className={classes.dd}>{props.product.transportnoPakovanje}</dd>

                                <dt className={classes.dt}>Min. pakovanje:</dt>
                                <dd className={classes.dd}>{props.product.minPacking}</dd>
                            </dl>
                        </section>

                        <section className={classes.cena}>
                            {props.product.price}
                        </section>

                        <section>
                            <Button
                                variant="contained"
                                className={classes.button}
                                startIcon={<ShoppingCartIcon />}
                                onClick={() => handleAddToCart(props.product.productId)}
                            >
                                Dodaj u korpu
                            </Button>
                        </section>

                    </header>

                    <img src={process.env.REACT_APP_API_ROOT + "/slike/proizvodi/vece/" + props.product.productId + ".jpg"}
                        className={classes.imageStyle}
                        alt="product"
                    />
                </React.Fragment>

            </Fade>
        </Modal>
        <ProductAddedNotification open={notificationVisible} setNotificationVisible={setNotificationVisible} />
        </>
    )
}
