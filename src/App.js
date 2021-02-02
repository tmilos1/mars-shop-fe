import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Pagination from '@material-ui/lab/Pagination'

// Levi meni
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'

// Privremeno Glavni app meni
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

// Products top
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import ProductCard from './components/ProductCard'

const useStyles = makeStyles((theme) => ({    
    appMenu: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },    
    meniKategorija: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },    
    formControl: {
        margin: theme.spacing(1),
        minWidth: 130,
    },    
    zaglavlje: {
        // border: "1px solid yellow",
        height: "100px",
        padding: "10px",
        fontFamily: "Helvetica",
    },

    leviMeni: {
        // border: "1px solid yellow",
        // height: "1000px",
        padding: "10px",
        fontFamily: "Helvetica",
    }
}))

function App() {
    const classes = useStyles()

    const product = {
        naslov: "KALUP ZA KOLAČE",
        sifra: "24523",
        manjaSlika: "/img/manje/15000.jpg",
        vecaSlika: "/img/vece/15000.jpg",
        cena: "24,99 RSD",
        opisPakovanja: "39,5x28x3,5cm",
        transportnoPakovanje: "40 kom",
        minPakovanje: "1 kom",        
    }

    const [redosled, setRedosled] = useState('Naziv')

    const handleChangeRedosled = (event) => {
        setRedosled(event.target.value);
    }    

    return (
        <div className="App">
            <Container>
                <Box component="span" m={5}>
                    <Grid container  spacing={2} >

                        <Grid xs={12} item className={classes.appMenu}>            
                            <Box className={classes.zaglavlje}>
                                <AppBar position="static">
                                    <Toolbar>
                                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="h6" className={classes.title}>
                                        E-commerce
                                    </Typography>
                                    <Button color="inherit">Login</Button>
                                    </Toolbar>
                                </AppBar>
                            </Box>
                        </Grid>       



                        <Grid sm={12} md={2} item>            
                            <Box className={classes.leviMeni}>

                            <TreeView
                                className={classes.meniKategorija}
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                                >
                                <TreeItem nodeId="1" label="Applications">
                                    <TreeItem nodeId="2" label="Calendar" />
                                    <TreeItem nodeId="3" label="Chrome" />
                                    <TreeItem nodeId="4" label="Webstorm" />
                                </TreeItem>
                                <TreeItem nodeId="5" label="Documents">
                                    <TreeItem nodeId="10" label="OSS" />
                                    <TreeItem nodeId="6" label="Material-UI">
                                    <TreeItem nodeId="7" label="src">
                                        <TreeItem nodeId="8" label="index.js" />
                                        <TreeItem nodeId="9" label="tree-view.js" />
                                    </TreeItem>
                                    </TreeItem>
                                </TreeItem>
                                </TreeView>                                
                            </Box>
                        </Grid>

                        <Grid xs={10} item> 
                            <Box mb={3} >

                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Redosled</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={redosled}
                                    onChange={handleChangeRedosled}
                                    label="Redosled"
                                    >
                                        <MenuItem value="Naziv">Naziv</MenuItem>
                                        <MenuItem value="Cena">Cena</MenuItem>
                                        <MenuItem value="Najnovije">Najnovije</MenuItem>
                                    </Select>
                                </FormControl>                                

                            </Box>                 

                            <Grid container spacing={3} >
                                <Grid xs={12} sm={6} md={6} lg={4} item>            
                                    <ProductCard product={product} />
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={4} item>            
                                    <ProductCard product={product} />
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={4} item>            
                                    <ProductCard product={product} />
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={4} item>            
                                    <ProductCard product={product} />
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={4} item>            
                                    <ProductCard product={product} />
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={4} item>            
                                    <ProductCard product={product} />
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={4} item>            
                                    <ProductCard product={product} />
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={4} item>            
                                    <ProductCard product={product} />
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={4} item>            
                                    <ProductCard product={product} />
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={4} item>            
                                    <ProductCard product={product} />
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={4} item>            
                                    <ProductCard product={product} />
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={4} item>            
                                    <ProductCard product={product} />
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={4} item>            
                                    <ProductCard product={product} />
                                </Grid>
                                <Grid xs={12} sm={6} md={6} lg={4} item>            
                                    <ProductCard product={product} />
                                </Grid>

                            </Grid>
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
