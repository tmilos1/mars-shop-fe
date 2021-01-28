import './App.css';
import ProductCard from './components/ProductCard'

function App() {

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

    return (
        <div className="App">
            <ProductCard
                product={product}
            />
        </div>
    );
}

export default App;
