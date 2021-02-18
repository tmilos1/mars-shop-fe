import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
    searchField: {
        width: "100%",
        [theme.breakpoints.down('sm')]: {
            width: "90%"
        }           
    },
    label: {
        marginBottom: theme.spacing(2),
    },
    labelText: {
        fontFamily: 'Roboto, sans-serif',
        background: theme.palette.action.selected,
    },
    button: {
        marginTop: theme.spacing(2)
    }
}))

export default function SearchByProductIdsField(props) {
    const classes = useStyles()

    return (
        <form noValidate autoComplete="off">
            <Tooltip title="U svakom redu unesite po jednu šifru proizvoda i kliknite dugme 'Pretraga'">
                <div className={classes.label}><span className={classes.labelText}>Unesite šifre za pretragu:</span></div>
            </Tooltip>
            <TextField
                className={classes.searchField}
                label="Šifre proizvoda"
                variant="outlined"
                multiline
                rows={10}
                value={props.value}
                onChange={props.onIdsChange}
            />
            <Button variant="outlined" className={classes.button} onClick={props.onPretragaClick} startIcon={<SearchIcon />} >
            Pretraga
            </Button>                
        </form>
    )
}
