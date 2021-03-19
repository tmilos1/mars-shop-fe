import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from 'react-query'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Divider from '@material-ui/core/Divider'

import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove'

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
        minWidth: "200px",
        width: "200px",
    },
    listItemCena: {
        margin: theme.spacing(1),
        minWidth: "80px",
        textAlign: "right"
    },
    listItemKolicina: {
        margin: theme.spacing(1),
        minWidth: "120px",
        textAlign: "center"
    },
    listItemIznos: {
        margin: theme.spacing(1),
        width: "80px",
        textAlign: "right",
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }        
    },
}))

export default function Cart(props) {

    const classes = useStyles()

    const fetchCart = () => fetch(
        process.env.REACT_APP_API_ROOT + "/cart/" + 1234567890
    ).then((res) => res.json())

    const { data: products, isSuccess } = useQuery(["cartData"], () => fetchCart())

    let productsLen = 0
    if (isSuccess) {
        productsLen = products.length
    }

    return (
        <List className={classes.root}>
            {isSuccess &&
                products.map((product, i) => (
                    <>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar className={classes.listItemSlika}>
                                <img src={process.env.REACT_APP_API_ROOT + "/slike/proizvodi/manje/" + product.productId + ".jpg"} width="110px" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={product.name}
                                secondary={<>
                                    <p>{"Šifra: " + product.productId}</p>
                                </>}
                                className={classes.listItemNaziv}
                            />
                            <ListItemText
                                primary={<>
                                    <p>{product.price} din</p>
                                </>}
                                className={classes.listItemCena}
                            />
                            <ListItemText
                                primary={<>
                                    <IconButton color="primary">
                                        <RemoveIcon />
                                    </IconButton>
                                {product.kolicina}
                                <IconButton color="primary">
                                        <AddIcon />
                                    </IconButton>
                                </>}
                                className={classes.listItemKolicina}
                            />
                            <ListItemText
                                primary={<>
                                    <p>{product.iznos} din</p>
                                </>}
                                className={classes.listItemIznos}
                            />
                        </ListItem>
                        {productsLen !== i + 1 &&
                            <Divider />
                        }
                    </>
                ))
            }
        </List>
    )
}
