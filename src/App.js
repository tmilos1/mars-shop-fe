import './App.css';
import ProductCard from './components/ProductCard'

function App() {
    return (
        <div className="App">
            <ProductCard
                naslov="KALUP ZA KOLAČE"
                sifra="24523"
                slika="/img/24523.jpeg"
                cena="24,99 RSD"
                opisPakovanja="39,5x28x3,5cm"
                transportnoPakovanje="40 kom"
                minPakovanje="1 kom"
            />
        </div>
    );
}

export default App;
