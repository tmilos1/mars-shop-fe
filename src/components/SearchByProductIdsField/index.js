import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }        
    },   
    searchField: {
        width: "100%"
    },
    label: {
        marginBottom: theme.spacing(2),
        fontFamily: 'Roboto, sans-serif',
    },
    button: {
        marginTop: theme.spacing(2)
    }
}))

export default function SearchByProductIdsField(props) {
    const classes = useStyles()

    return (
        <Box mb={3} >
            <form noValidate autoComplete="off" className={classes.root}>
                <Tooltip title="U svakom redu unesite po jednu šifru proizvoda i kliknite dugme 'Pretraga'">
                    <div className={classes.label}>Unesite šifre za pretragu:</div>
                </Tooltip>
                <TextField
                    className={classes.searchField}
                    label="Šifre proizvoda"
                    variant="outlined"
                    multiline
                    rows={10}
                />
                <Button variant="outlined" color="primary" className={classes.button}>
                Pretraga
                </Button>                
            </form>
        </Box>
    )
}
