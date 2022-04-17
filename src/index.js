import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ButangNav from './navigasi/butang/butang';
import SenaraiAkaun from './halaman/senarai_akaun';

const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='senarai' element={<SenaraiAkaun />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

