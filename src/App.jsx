import Home from './Components/Home';
import Game1 from './Components/Game1';
import Game2 from './Components/Game2';
import Stats from './Components/Stats';
import Options from './Components/Options';
import {Routes, Route} from 'react-router-dom';

export default function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/options' element={<Options />}></Route>
				<Route path='/game1' element={<Game1 />}></Route>
				<Route path='/game2' element={<Game2 />}></Route>
				<Route path='/stats' element={<Stats />}></Route>
			</Routes>
		</>
	);
}
