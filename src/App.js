import './stylesheets/App.css'
import {BlogList} from './components/BlogList';
import Filter from './components/Filter';
import Summary from './components/Summary';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
            <Route path='/home' element={<BlogList />}/>
            <Route path='/search/:keyword/' element={<Filter />}/>
            <Route path='/summary' element={<Summary />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;