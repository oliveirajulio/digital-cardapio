import Home from "./pages/Home";
import List from "./pages/List";
import Item from "./pages/Item"


import {HashRouter, Routes, Route} from 'react-router-dom'

function Router() {
    return (
        <HashRouter basename="/mn-transparency">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list" element={<List />} />
                <Route path="/item/:id" element={<Item />} />
            </Routes>    
        </HashRouter>

    )
}

export default Router;