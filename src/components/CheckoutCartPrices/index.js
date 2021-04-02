import { useEffect, useState } from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'
import { useQueryClient } from 'react-query'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(() => ({
    table: {
        marginTop: '2em',
        marginBottom: '2em',
    },
    sifraCol: {
        width: '5em',
        textAlign: 'left'
    },
    nazivCol: {
        width: '15em',
        textAlign: 'left'
    },
    staraCenaCol: {
        width: '10em',
        textAlign: 'right'
    },
    novaCenaCol: {
        width: '10em',
        textAlign: 'right'
    }
}))

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

function CheckoutCartPrices(props) {
    const classes = useStyles()
    const queryClient = useQueryClient()
    const [changedProducts, setChangedProducts] = useState([])
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        async function postCheckPrices() {
            try {
                const response = await axios.post('/checkCartPrices', { sessionId: props.sessionId })

                if (Array.isArray(response.data) && response.data.length > 0) {
                    queryClient.invalidateQueries('cartData')
                    setChangedProducts(response.data)
                    setVisible(true)
                }
            } catch(e) {
                console.log(e)
            }
        }

        postCheckPrices()
    }, [props.sessionId, queryClient])

    if (!visible) {
        return null
    }

    return (
        <>
            <Alert severity="warning">Od trenutka dodavanja u korpu, došlo je do promene cena na pojedinim artiklima!</Alert>
            <Typography component={'div'} variant="body1">
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th className={classes.sifraCol}>Šifra</th>
                            <th className={classes.nazivCol}>Naziv</th>
                            <th className={classes.staraCenaCol}>Stara cena</th>
                            <th className={classes.novaCenaCol}>Nova cena</th>
                        </tr>                        
                    </thead>
                    <tbody>
                        {changedProducts.map(product => {
                            return (
                                <tr key={product.productId}>
                                    <td className={classes.sifraCol}>{product.productId}</td>
                                    <td className={classes.nazivCol}>{product.name}</td>
                                    <td className={classes.staraCenaCol}>{product.oldPrice}</td>
                                    <td className={classes.novaCenaCol}>{product.newPrice}</td>
                                </tr>                            
                            )
                        })}
                    </tbody>
                </table>
            </Typography>
        </>
    )
}

export default CheckoutCartPrices
