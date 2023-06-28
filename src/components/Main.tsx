import React from 'react';
import { RootState } from './App';
import { useSelector } from 'react-redux';

import EntityList from './EntityList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import EntityDetail from './EntityDetail';
import PopularList from './PopularList';

const Main: React.FC = () => {
    const entities = useSelector((state: RootState) => state.entities);

    return (
        <div className="App">
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/people" element={<EntityList />} />
                    <Route path="/people/:id" element={<EntityDetail />} />
                    <Route path="/films" element={<EntityList />} />
                    <Route path="/films/:id" element={<EntityDetail />} />
                    <Route path="/starships" element={<EntityList />} />
                    <Route path="/starships/:id" element={<EntityDetail />} />
                    <Route path="/vehicles" element={<EntityList />} />
                    <Route path="/vehicles/:id" element={<EntityDetail />} />
                    <Route path="/species" element={<EntityList />} />
                    <Route path="/species/:id" element={<EntityDetail />} />
                    <Route path="/planets" element={<EntityList />} />
                    <Route path="/planets/:id" element={<EntityDetail />} />
                    <Route path="/popular" element={<PopularList />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Main;