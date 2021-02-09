import { useState } from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'

import AppMenu from './components/AppMenu'
import CategoryMenu from './components/CategoryMenu'

import ProductSortSelect from './components/ProductSortSelect'
import ProductList from './containers/ProductList'

function App() {

    const products = [
        {
            naslov: "KALUP ZA KOLAČE",
            sifra: "24523",
            manjaSlika: "/img/manje/15000.jpg",
            vecaSlika: "/img/vece/15000.jpg",
            cena: "24,99 RSD",
            opisPakovanja: "39,5x28x3,5cm",
            transportnoPakovanje: "40 kom",
            minPakovanje: "1 kom",        
        },
        {
            naslov: "KALUP ZA KOLAČE",
            sifra: "24523",
            manjaSlika: "/img/manje/15000.jpg",
            vecaSlika: "/img/vece/15000.jpg",
            cena: "24,99 RSD",
            opisPakovanja: "39,5x28x3,5cm",
            transportnoPakovanje: "40 kom",
            minPakovanje: "1 kom",        
        },
    ]
    const [redosled, setRedosled] = useState('Naziv')

    const handleChangeRedosled = (event) => {
        setRedosled(event.target.value);
    }    

    return (
        <div className="App">
            <Container>
                <Box component="span" m={5}>
                    <Grid container  spacing={2} >

                        <Grid xs={12} item>            
                            <AppMenu />
                        </Grid>       

                        <Grid sm={12} md={2} item>            
                            <CategoryMenu />
                        </Grid>

                        <Grid xs={10} item> 
                            <ProductSortSelect onChange={handleChangeRedosled} value={redosled} />

                            <ProductList products={products} />
                        </Grid>

                        <Grid xs={2} item>            
                            
                        </Grid>

                        <Grid xs={10} item>            
                            <Pagination count={10} />
                        </Grid>  

                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default App;
