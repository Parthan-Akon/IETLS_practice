import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './components/admin';
import Dashboard from './components/dashboard';
import Home from './components/home';
import Reading from './components/reading';
import ReadingList from './components/readingList';
import WritingList from './components/writinglist';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>

            <Route path='' element={<Dashboard />} />
            <Route path='admin' element={<Admin />} />
            <Route path='writinglist' element={<WritingList />} />
            <Route path='test' element={<Home/>} />
            <Route path='reading' element={<Reading />} />
            <Route path='readinglist' element={<ReadingList />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
