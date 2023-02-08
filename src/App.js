import Home from './Components/Home';
import Game from './Components/Game';
import Stats from './Components/Stats';
import {Routes, Route} from 'react-router-dom';

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/game' element={<Game/>}></Route>
            <Route path="/stats" element={<Stats/>}></Route>
        </Routes>
    );
}
