import './App.css';
import Header from './components/Header/Header';
import Auth from './components/Auth/Auth';

function App() {
    return (
        <div className='App'>
            <Header />
            <main>
                <Auth />
            </main>
        </div>
    );
}

export default App;
