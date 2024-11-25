import Home from "./pages/Home";
import List from "./pages/List"


import {BrowserRouter, Routes, Route} from 'react-router-dom'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            </Routes>    
        </BrowserRouter>

    )
}

export default Router;