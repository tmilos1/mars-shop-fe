import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
    appMenu: {
        flexGrow: 1,
    },    
    zaglavlje: {
        // border: "1px solid yellow",
        height: "100px",
        padding: "10px",
        fontFamily: "Helvetica",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },       
}))


export default function AppMenu(props) {
    const classes = useStyles()

    return (
        <div className={classes.appMenu}>
            <Box className={classes.zaglavlje}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        E-commerce
                    </Typography>
                    <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>    
    )
}