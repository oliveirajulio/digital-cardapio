import Home from "./pages/Home";
import List from "./pages/List"


import {BrowserRouter, Routes, Route} from 'react-router-dom'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/mn-transparency" element={<Home />} />
            <Route path="/mn-transparency/list" element={<List />} />
            </Routes>    
        </BrowserRouter>

    )
}

export default Router;