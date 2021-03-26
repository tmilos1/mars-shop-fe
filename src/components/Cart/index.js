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
import DeleteIcon from '@material-ui/icons/Delete';

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
    listItemCenaNaslov: {
        margin: theme.spacing(1),
        minWidth: "85px",
        textAlign: "center"
    },
    listItemKolicina: {
        margin: theme.spacing(1),
        minWidth: "120px",
        textAlign: "center",
        marginTop: "-4px"
    },
    listItemKolicinaNaslov: {
        margin: theme.spacing(1),
        minWidth: "120px",
        textAlign: "center",
    },
    listItemIznos: {
        margin: theme.spacing(1),
        width: "95px",
        textAlign: "right",
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }        
    },
    listItemIznosNaslov: {
        margin: theme.spacing(1),
        width: "95px",
        textAlign: "center",
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }        
    },
    listItemDelete: {
        margin: theme.spacing(1),
        minWidth: "60px",
        textAlign: "right",
        marginTop: "-4px"
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
        return axios.put('/cartItem', { productId, qty: 1, sessionId: props.sessionId })
        },{
            onSuccess: () => {
              queryClient.invalidateQueries('cartData')
            }
        })

    const removeProductMutation = useMutation(productId => {
        return axios.put('/cartItem', { productId, qty: -1, sessionId: props.sessionId })
        },{
            onSuccess: () => {
              queryClient.invalidateQueries('cartData')
            }
        })

    const deleteProductMutation = useMutation(productId => {
        return axios.delete('/cartItem', {data: { productId, sessionId: props.sessionId }})
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

    const handleDeleteProduct = (productId) => {
        deleteProductMutation.mutate(productId)
    }

    return (
        <List className={classes.root}>
            <ListItem alignItems="flex-start">
                            <div className={classes.listItemSlika}>
                            </div>
                            <ListItemText
                                primary="Naziv"
                                className={classes.listItemNaziv}
                            />
                            <ListItemText
                                primary="Cena"
                                className={classes.listItemCenaNaslov}
                            />
                            <ListItemText
                                primary="Kolicina"
                                className={classes.listItemKolicinaNaslov}
                            />
                            <ListItemText
                                primary="Iznos"
                                className={classes.listItemIznosNaslov}
                            />
                            <ListItemText
                                className={classes.listItemDelete}
                            />
            </ListItem >
            <Divider />

        
            {isSuccess && Array.isArray(products) && products.length > 0 &&
                products.map((product, i) => (
                    <div key={product.productId}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar className={classes.listItemSlika}>
                                <img src={process.env.REACT_APP_API_ROOT + "/slike/proizvodi/manje/" + product.productId + ".jpg"} width="110px" alt={"Product " + product.productId} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={product.name}
                                secondary={<>
                                    {"Šifra: " + product.productId}
                                </>}
                                className={classes.listItemNaziv}
                            />
                            <ListItemText
                                primary={<>{product.price} din</>}
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
                                        <>{product.subTotal} din</>
                                    }
                                </>}
                                className={classes.listItemIznos}
                            />
                            <ListItemText
                                primary={<>
                                    { 
                                        <IconButton color="primary" onClick={() => handleDeleteProduct(product.productId)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                </>}
                                className={classes.listItemDelete}
                            />
                        </ListItem>
                        {productsLen !== i + 1 &&
                            <Divider />
                        }
                    </div>
                ))
            }
            {isSuccess && Array.isArray(products) && products.length === 0 &&
                <div style={{margin: '20px'}}>
                    Korpa je prazna !
                </div>
            }
        </List>
    )
}
