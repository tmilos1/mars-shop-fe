import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear';
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
    const [showClear, setShowClear] = useState(false)

    const keyPress = (event) => {
        if (event.keyCode === 13) {
            props.onSearchInput()

            event.preventDefault()
        }

        if (props.value.length > 0) {
            setShowClear(true)
        } else {
            setShowClear(false)
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
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {props.onSearchClear(); setShowClear(false)} }
                                    edge="end"
                                >
                                    {showClear ? <ClearIcon /> : null}
                                </IconButton>
                            </InputAdornment>
                    }}
                />
                <IconButton className={classes.searchIcon} onClick={props.onSearchInput} >
                    <SearchIcon />
                </IconButton>
            </form>
        </Box>
    )
}
