import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery, useMutation } from 'react-query'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Divider from '@material-ui/core/Divider'

import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove'
import { ContactSupportOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    listItemSlika: {
        margin: theme.spacing(1),
        width: "120px",
    },
    listItemNaziv: {
        margin: theme.spacing(1),
        minWidth: "190px",
        width: "190px",
    },
    listItemCena: {
        margin: theme.spacing(1),
        minWidth: "85px",
        textAlign: "right"
    },
    listItemKolicina: {
        margin: theme.spacing(1),
        minWidth: "120px",
        textAlign: "center",
        marginTop: "-4px"
    },
    listItemIznos: {
        margin: theme.spacing(1),
        width: "85px",
        textAlign: "right",
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }        
    },
}))

export default function Cart(props) {

    const classes = useStyles()

    const fetchCart = () => fetch(process.env.REACT_APP_API_ROOT + "/cart/" + props.sessionId)
        .then((res) => res.json())

    const { data: products, isSuccess } = useQuery(["cartData", props.sessionId], () => fetchCart())

    let productsLen = 0
    if (isSuccess) {
        productsLen = products.length
    }

    const onRemoveProduct = () => {
        console.log('test on Remove')
    }

    return (
        <List className={classes.root}>
            {isSuccess && Array.isArray(products) &&
                products.map((product, i) => (
                    <div key={product.productId}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar className={classes.listItemSlika}>
                                <img src={process.env.REACT_APP_API_ROOT + "/slike/proizvodi/manje/" + product.productId + ".jpg"} width="110px" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={product.name}
                                secondary={<>
                                    {"Šifra: " + product.productId}
                                </>}
                                className={classes.listItemNaziv}
                            />
                            <ListItemText
                                primary={<>
                                    {product.price} din
                                </>}
                                className={classes.listItemCena}
                            />
                            <ListItemText
                                primary={<>
                                    <IconButton color="primary" onClick={onRemoveProduct}>
                                        <RemoveIcon />
                                    </IconButton>
                                    {product.qty}
                                    <IconButton color="primary">
                                        <AddIcon />
                                    </IconButton>
                                </>}
                                className={classes.listItemKolicina}
                            />
                            <ListItemText
                                primary={<>
                                    {product.subTotal}
                                </>}
                                className={classes.listItemIznos}
                            />
                        </ListItem>
                        {productsLen !== i + 1 &&
                            <Divider />
                        }
                    </div>
                ))
            }
        </List>
    )
}