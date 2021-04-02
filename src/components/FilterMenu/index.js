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
        <MenuList>
            <MenuItem onClick={(event) => props.onFilterChange(event, 'svi')} selected={'svi' === props.filter} className={classes.menuItem}>
                Svi
            </MenuItem>
            <MenuItem onClick={(event) => props.onFilterChange(event, 'novi_proizvodi')} selected={'novi_proizvodi' === props.filter} className={classes.menuItem}>
                Novi proizvodi
            </MenuItem>
            <MenuItem onClick={(event) => props.onFilterChange(event, 'akcija')} selected={'akcija' === props.filter} className={classes.menuItem}>
                Akcija
            </MenuItem>
        </MenuList>
    )
}
