import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    searchField: {
        width: "87%"
    },
    searchIcon: {
        width: "8%"

    }
}))

export default function SearchField(props) {
    const classes = useStyles()

    const keyPress = (event) => {
        if (event.keyCode === 13) {
            props.onSearchInput()

            event.preventDefault()
        }
    }

    return (
        <Box mb={3} >
            <form noValidate autoComplete="off" className={classes.root}>
                <TextField
                    className={classes.searchField}
                    label="Pretraga"
                    variant="outlined"
                    onKeyDown={keyPress}
                    value={props.value}
                    onChange={props.onSearchChange}
                />
                <IconButton className={classes.searchIcon} onClick={props.onSearchInput} >
                    <SearchIcon />
                </IconButton>
            </form>
        </Box>
    )
}
