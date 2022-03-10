import { BrowserRouter } from 'react-router-dom';
// import { NewRoom } from './pages/NewRoom';
import { Routes } from './components/Routes';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</div>
	);
}

export default App;
