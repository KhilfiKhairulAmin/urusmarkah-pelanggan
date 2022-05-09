import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SenaraiAkaun from './halaman/senarai_akaun';
import DaftarMasuk from './halaman/daftar_masuk';
import LogMasuk from './halaman/log_masuk';
import Pengguna from './halaman/pengguna';
import PapanMaklumat from './halaman/pengguna/papan_maklumat';
import SenaraiPertandingan from './halaman/pertandingan/senarai_pertandingan';

const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='senarai' element={<SenaraiAkaun />} />
      </Route>
      <Route path='/daftar_masuk' element={<DaftarMasuk />} />
      <Route path='/log_masuk' element={<LogMasuk /> } />
      <Route path='/pengguna' element={<PapanMaklumat />} />
      <Route path='/pertandingan' element={<SenaraiPertandingan />} />
    </Routes>
  </BrowserRouter>
)

