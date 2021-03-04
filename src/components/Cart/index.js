import { makeStyles } from '@material-ui/core/styles'

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
        minWidth: "120px",
    },
    listItemNaziv: {
        margin: theme.spacing(1),
        minWidth: "200px",
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
        minWidth: "80px",
        textAlign: "right"
    },
}))



const korpa = [
    {
        productId: '',
        naziv: '',
        cena: '',
        kolicina: '',
    }
]
// {process.env.REACT_APP_API_ROOT + "/slike/proizvodi/vece/" + props.product.productId + ".jpg"}

export default function Cart(props) {

    const classes = useStyles()

    return (
        <List className={classes.root}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar className={classes.listItemSlika}>
                    <img src={process.env.REACT_APP_API_ROOT + "/slike/proizvodi/manje/26163.jpg"} width="110px" />
                </ListItemAvatar>
                <ListItemText
                    primary={<>
                        <p>POSUDA ZA ŠEĆER</p>
                        <p>34323</p>
                    </>}
                    className={classes.listItemNaziv}
                />
                <ListItemText
                    primary={<>
                        <p>200 din</p>
                    </>}
                    className={classes.listItemCena}
                />
                <ListItemText
                    primary={<>
                        <IconButton color="primary">
                            <RemoveIcon />
                        </IconButton>
                    3
                    <IconButton color="primary">
                            <AddIcon />
                        </IconButton>
                    </>}
                    className={classes.listItemKolicina}
                />
                <ListItemText
                    primary={<>
                        <p>200 din</p>
                    </>}
                    className={classes.listItemIznos}
                />
            </ListItem>
            <Divider />
        </List>
    )
}
