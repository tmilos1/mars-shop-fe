import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({    
    formControl: {
        margin: theme.spacing(1),
        minWidth: 130,
    },    
}))

export default function ProductPerPageSelect(props) {
    const classes = useStyles()

    return (
        <Box mb={3} >

            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Prikaz po strani</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.value}
                    onChange={props.onChange}
                    label="Prikaz po strani"
                >
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="20">20</MenuItem>
                    <MenuItem value="50">50</MenuItem>
                </Select>
            </FormControl>

        </Box>
    )
}
