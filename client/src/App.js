import './App.css';
import Header from './components/Header/Header';
import Login from './components/login/Login';

function App() {
    return (
        <div className='App'>
            <Header />
            <main>
                <Login />
            </main>
        </div>
    );
}

export default App;
