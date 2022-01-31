import Header from '../components/Header';
import "../App.css"
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Write from '../components/Write';
import MarketPlace from '../components/MarketPlace';
import Collections from '../components/Collections';
import SinglePage from '../components/SinglePage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/MarketPlace" element={<MarketPlace />}></Route>
        <Route path="/myCollections" element={<Collections />}></Route>
        <Route exact path="/write" element={<Write />}></Route>
        <Route exact path="/singlePage" element={<SinglePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
