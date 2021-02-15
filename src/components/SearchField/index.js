import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },   
    searchField: {
        width: "95%"
    }
}))

export default function SearchField(props) {
    const classes = useStyles()

    return (
        <Box mb={3} >
            <form noValidate autoComplete="off" className={classes.root}>
                <TextField  className={classes.searchField} label="Pretraga" variant="outlined" />
            </form>
        </Box>
    )
}
