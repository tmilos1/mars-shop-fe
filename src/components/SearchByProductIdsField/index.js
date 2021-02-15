import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }        
    },   
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
        <Box mt={10} mb={3} className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <Box p={2} >
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
                        />
                        <Button variant="outlined" className={classes.button}>
                        Pretraga
                        </Button>                
                    </form>
                </Box>
            </Paper>
        </Box>
    )
}
