import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(5)
    },
    paper: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: "90%"
        }
    },
    menuItem: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}))

export default function FilterMenu(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <MenuList>
                    <MenuItem className={classes.menuItem}>Novi proizvodi</MenuItem>
                    <MenuItem className={classes.menuItem}>Akcija</MenuItem>
                </MenuList>
            </Paper>
        </div>
    )
}
