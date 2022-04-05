import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Monitorias from "./Crud1";
import { collection } from "../firebase";
import {db} from "../firebase";



function App(){


return(
    <BrowserRouter>
    <Routes>
        <Route path="/crud1" element={<Monitorias />} />
    </Routes>
    </BrowserRouter>
)
}

export default App;
