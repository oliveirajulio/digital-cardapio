import Home from "./pages/Home";
import List from "./pages/List";
import Item from "./pages/Item"


import {BrowserRouter, Routes, Route} from 'react-router-dom'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/mn-transparency" element={<Home />} />
                <Route path="/list" element={<List />} />
                <Route path="/item" element={<Item />} />
            </Routes>    
        </BrowserRouter>

    )
}

export default Router;