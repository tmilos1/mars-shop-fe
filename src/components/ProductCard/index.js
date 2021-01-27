import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import LightBox from '../LightBox'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
    price: {
        fontSize: '20px',
        lineHeight: '20px',
        letterSpacing: '1px',
        fontWeight: 'normal',
        color: theme.palette.error.main
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
    }
}))

export default function ProductCard(props) {
    const classes = useStyles()

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const sifraArtiklaText = `Šifra: ${props.sifra}`

    return (
        <Card className={classes.root}>
            <CardHeader
                title={props.naslov}
                subheader={sifraArtiklaText}
            />
            
            <CardMedia
                className={classes.media}
                image={props.slika}
                onClick={handleOpen}
                style={{cursor: 'pointer'}}
            />        

            <CardContent>
                <dl className={classes.dl}>
                    <dt className={classes.dt}>Cena:</dt>
                    <dd className={classes.dd} style={{marginBottom: '10px'}}><span class={classes.price}>{props.cena}</span></dd>

                    <dt className={classes.dt}>Opis pakovanja:</dt>
                    <dd className={classes.dd}>{props.opisPakovanja}</dd>

                    <dt className={classes.dt}>Trans. pakovanje:</dt>
                    <dd className={classes.dd}>{props.transportnoPakovanje}</dd>

                    <dt className={classes.dt}>Min. pakovanje:</dt>
                    <dd className={classes.dd}>{props.minPakovanje}</dd>
                </dl>       
            </CardContent>

            <CardActions className={classes.buttons}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                >
                    Dodaj u korpu
                </Button>
            </CardActions>

            <LightBox
                open={open}
                onClose={handleClose}
            />
        </Card>
    )
}
