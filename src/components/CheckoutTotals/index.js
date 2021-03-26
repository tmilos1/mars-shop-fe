import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    body: {
        width: '100%',
        padding: '30px'
    },
    totalsLabel: {
        width: '10em'
    },
    totalsValue: {
        width: '5em',
        textAlign: 'right'
    }
}))

function CheckoutTotals(props) {
    const classes = useStyles()

    return (
        <>
            <Typography variant="h5">Ukupno</Typography>
            <br />
            <Typography variant="body1">
                <table>
                    <tr>
                        <td className={classes.totalsLabel}>Iznos:</td>
                        <td className={classes.totalsValue}>{props.totals.subTotal}</td>
                    </tr>
                    <tr>
                        <td>PDV 20%:</td>
                        <td className={classes.totalsValue}>{props.totals.tax}</td>
                    </tr>
                    <tr>
                        <td><Box fontWeight={500}>Za uplatu:</Box></td>
                        <td className={classes.totalsValue}><Box fontWeight={500}>{props.totals.total}</Box></td>
                    </tr>
                </table>
                <p> Ukoliko je iznos narudžbenice manji od 3.000 dinara, troškove dostave snosi kupac.</p>
            </Typography>
        </>
    )
}

export default CheckoutTotals
