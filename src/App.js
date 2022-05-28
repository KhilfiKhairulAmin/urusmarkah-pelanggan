import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SenaraiAkaun from './halaman/SenaraiAkaun';
import DaftarMasuk from './halaman/pengesahan/DaftarMasuk';
import LogMasuk from './halaman/pengesahan/LogMasuk';
import CiptaPertandingan from './halaman/pertandingan/cipta_pertandingan';
import PengepalaPengesahan from './halaman/pengesahan/PengepalaPengesahan';
import Utama from './halaman/Utama';
import PengepalaPertandingan from './halaman/pertandingan/PengepalaPertandingan';
import PengepalaPengguna from './halaman/pengguna/PengepalaPengguna';
import PapanPemuka from './halaman/pengguna/PapanPemuka';
import BorangKemaskini from './halaman/pengguna/BorangKemasKini';

function App() {
  return (
  <BrowserRouter>
    <Routes>
    
      <Route path='/' element={<Utama />}>
        <Route path='senarai' element={<SenaraiAkaun />} />
      </Route>

      <Route path='/pengesahan' element={<PengepalaPengesahan />}>
        <Route path='daftar_masuk' element={<DaftarMasuk />} />
        <Route path='log_masuk' element={<LogMasuk /> } />
      </Route>

      <Route path='/urusmarkah' element={<PengepalaPertandingan />}>
        <Route path='pengguna' element={<PengepalaPengguna />} >
          <Route path='' element={<PapanPemuka />} />
          <Route path='kemas_kini' element={<BorangKemaskini />} />
        </Route>
      </Route>

      <Route path='/pertandingan/cipta' element={<CiptaPertandingan />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
