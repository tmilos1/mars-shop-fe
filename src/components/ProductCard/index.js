import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Slide from '@material-ui/core/Slide'

import LightBox from '../LightBox'

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: '18px'
    },
    header: {
        height: "60px"
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
        fontFamily: 'Roboto, sans-serif'
    },
    dd: {
        flexBasis: '40%',
        flexGrow: 1,
        margin: 0,
        padding: '2px 4px',
        fontWeight: 'bold',
        fontFamily: 'Roboto, sans-serif'
    },
    cena: {
        fontSize: '20px',
        lineHeight: '20px',
        letterSpacing: '1px',
        fontWeight: 'normal',
        color: theme.palette.error.main
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
    }
}))

export default function ProductCard(props) {
    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const [elevation, setElevation] = useState(3)

    const handleOpen = () => {
        setOpen(true)
        setElevation(3)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const sifraArtiklaText = `Šifra: ${props.product.productId}`

    return (
        <Slide direction="up" in={true} timeout={200}>
            <Card 
                className={classes.root}
                elevation={elevation}
                onMouseEnter={() => setElevation(6)}
                onMouseLeave={() => setElevation(3)}
            >
                <CardHeader
                    title={props.product.name}
                    subheader={sifraArtiklaText}
                    className={classes.header}
                    classes={{title: classes.title}}
                />
                
                <CardMedia
                    className={classes.media}
                    image={process.env.REACT_APP_API_ROOT + "/slike/proizvodi/vece/" + props.product.productId + ".jpg"}
                    onClick={handleOpen}
                    style={{cursor: 'pointer'}}
                />        

                <CardContent>
                    <dl className={classes.dl}>
                        <dt className={classes.dt}>Cena:</dt>
                        <dd className={classes.dd} style={{marginBottom: '10px'}}><span className={classes.cena}>{props.product.price}</span></dd>

                        <dt className={classes.dt}>Opis pakovanja:</dt>
                        <dd className={classes.dd}>{props.product.dimension}</dd>

                        <dt className={classes.dt}>Trans. pakovanje:</dt>
                        <dd className={classes.dd}>{props.product.packing}</dd>

                        <dt className={classes.dt}>Min. pakovanje:</dt>
                        <dd className={classes.dd}>{props.product.minPacking}</dd>
                    </dl>       
                </CardContent>

                <CardActions className={classes.buttons}>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ShoppingCartIcon />}
                    >
                        Dodaj u korpu
                    </Button>
                </CardActions>

                <LightBox
                    open={open}
                    onClose={handleClose}
                    product={props.product}
                />
            </Card>
        </Slide>
    )
}
