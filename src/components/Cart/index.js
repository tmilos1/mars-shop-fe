import { makeStyles } from '@material-ui/core/styles'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'

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
    const queryClient = useQueryClient()
    
    const fetchCart = async () => { const {data} = await axios('/cart/' + props.sessionId); return data }
    
    const { data: products, isSuccess } = useQuery(["cartData", props.sessionId], () => fetchCart())

    let productsLen = 0
    if (isSuccess) {
        productsLen = products.length
    }

    const addProductMutation = useMutation(productId => {
        return axios.put('/cart', { productId, qty: 1, sessionId: props.sessionId })
        },{
            onSuccess: () => {
              queryClient.invalidateQueries('cartData')
            }
        })

    const removeProductMutation = useMutation(productId => {
        return axios.put('/cart', { productId, qty: -1, sessionId: props.sessionId })
        },{
            onSuccess: () => {
              queryClient.invalidateQueries('cartData')
            }
        })

    const handleAddProduct = (productId) => {
        addProductMutation.mutate(productId)
    }

    const handleRemoveProduct = (productId) => {
        removeProductMutation.mutate(productId)
    }

    return (
        <List className={classes.root}>
            {isSuccess && Array.isArray(products) && products.length > 0 &&
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
                                    {addProductMutation.isLoading || removeProductMutation.isLoading ? 
                                        <CircularProgress />
                                        : 
                                        <>
                                            <IconButton color="primary" onClick={() => handleRemoveProduct(product.productId)}>
                                                <RemoveIcon />
                                            </IconButton>
                                            {product.qty}
                                            <IconButton color="primary" onClick={() => handleAddProduct(product.productId)}>
                                                <AddIcon />
                                            </IconButton>
                                        </>
                                    }
                                </>}
                                className={classes.listItemKolicina}
                            />
                            <ListItemText
                                primary={<>
                                    {addProductMutation.isLoading || removeProductMutation.isLoading ? 
                                        <CircularProgress />
                                        :                 
                                        <>                
                                            {product.subTotal}
                                        </>
                                    }
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
            {isSuccess && Array.isArray(products) && products.length == 0 &&
                <>
                    Korpa je prazna !
                </>
            }
        </List>
    )
}
