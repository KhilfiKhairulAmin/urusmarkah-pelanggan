import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SenaraiAkaun from './halaman/SenaraiAkaun';
import DaftarMasuk from './halaman/pengesahan/DaftarMasuk';
import LogMasuk from './halaman/pengesahan/LogMasuk';
import PapanMaklumat from './halaman/pengguna/papan_maklumat';
import SenaraiPertandingan from './halaman/pertandingan/senarai_pertandingan';
import CiptaPertandingan from './halaman/pertandingan/cipta_pertandingan';
import Pengesahan from './halaman/pengesahan/Pengesahan';
import Utama from './halaman/Utama';

function App() {
  return (
  <BrowserRouter>
    <Routes>

      <Route path='/' element={<Utama />}>
        <Route path='senarai' element={<SenaraiAkaun />} />
      </Route>

      <Route path='/pengesahan' element={<Pengesahan />}>
        <Route path='daftar_masuk' element={<DaftarMasuk />} />
        <Route path='log_masuk' element={<LogMasuk /> } />
      </Route>

      <Route path='/pengguna' element={<PapanMaklumat />} />

      <Route path='/pertandingan' element={<SenaraiPertandingan />} />

      <Route path='/pertandingan/cipta' element={<CiptaPertandingan />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
