import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SenaraiAkaun from './halaman/SenaraiAkaun';
import DaftarMasuk from './halaman/pengesahan/DaftarMasuk';
import LogMasuk from './halaman/pengesahan/LogMasuk';
import CiptaPertandingan from './halaman/pertandingan/CiptaPertandingan';
import PengepalaPengesahan from './halaman/pengesahan/PengepalaPengesahan';
import Utama from './halaman/Utama';
import PengepalaUtama from './halaman/pengelola/PengepalaUtamaPengelola';
import PengepalaPengelola from './halaman/pengelola/PengepalaPengelola';
import PapanPemuka from './halaman/pengelola/PapanPemuka';
import BorangKemaskini from './halaman/pengelola/BorangKemasKini';
import SenaraiPertandingan from './halaman/pertandingan/SenaraiPertandingan';
import PengepalaPertandingan from './halaman/pertandingan/PengepalaPertandingan';
import SenaraiPeserta from './halaman/pertandingan/SenaraiPeserta';
import Pertandingan from './halaman/pertandingan/Pertandingan';
import Tentang from './halaman/pertandingan/Tentang';
import LogKeluar from './halaman/pengelola/LogKeluar';
import DaftarPeserta from './halaman/pengesahan/DaftarPeserta';
import PengepalaUtamaPeserta from './halaman/peserta/PengepalaUtamaPeserta';
import SenaraiPertandinganTerkini from './halaman/peserta/SenaraiPertandinganTerkini';
import LogMasukPeserta from './halaman/pengesahan/LogMasukPeserta';
import SenaraiPertandinganPeserta from './halaman/peserta/SenaraiPertandinganPeserta';
import SertaiPertandingan from './halaman/peserta/SertaiPertandingan';
import PengepalaSenaraiPertandinganPeserta from './halaman/peserta/PengepalaSenaraiPertandinganPeserta';
import PapanPemukaPeserta from './halaman/peserta/PapanPemukaPeserta';
import PengepalaPeserta from './halaman/peserta/PengepalaPeserta';
import KemasKiniPeserta from './halaman/peserta/KemasKiniPeserta';
import LogKeluarPeserta from './halaman/peserta/LogKeluarPeserta';
import PesertaPertandingan from './halaman/pertandingan/PesertaPertandingan';
import PapanPeserta from './halaman/peserta/PapanPeserta';
import Urusmarkah from './halaman/pertandingan/Urusmarkah';

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
        <Route path='daftar_masuk_peserta' element={<DaftarPeserta />} />
        <Route path='log_masuk_peserta' element={<LogMasukPeserta />} />
      </Route>


      <Route path='/urusmarkah' element={<PengepalaUtama />}>
        <Route path='' element={<SenaraiPertandingan />} />
        <Route path='cipta' element={<CiptaPertandingan />} />
        <Route path=':pertandingan' element={<PengepalaPertandingan />}>
          <Route path='' element={<Pertandingan />} />
          <Route path='peserta' element={<SenaraiPeserta />} />
          <Route path='tentang' element={<Tentang />} />
          <Route path=':peserta' element={<PesertaPertandingan />} />
          <Route path='urusmarkah' element={<Urusmarkah />} />
      </Route>
      </Route>

      <Route path='/pengelola' element={<PengepalaPengelola />} >
          <Route path='' element={<PapanPemuka />} />
          <Route path='kemas_kini' element={<BorangKemaskini />} />
          <Route path='log_keluar' element={<LogKeluar />} />
      </Route>

      <Route path='/markah' element={<PengepalaUtamaPeserta />} >
        <Route path='' element={<PengepalaSenaraiPertandinganPeserta />} >
          <Route path='pertandingan' element={<SenaraiPertandinganPeserta />} />
          <Route path='terkini' element={<SenaraiPertandinganTerkini />} />
          <Route path=':pertandingan' element={<SertaiPertandingan />} />
          <Route path=':pertandingan/:peserta' element={<PapanPeserta />} />
        </Route>
      </Route>

      <Route path='/peserta' element={<PengepalaUtamaPeserta />} >
        <Route path='' element={<PengepalaPeserta />}>
          <Route path='papan_pemuka' element={<PapanPemukaPeserta />} />
          <Route path='kemas_kini' element={<KemasKiniPeserta />} />
          <Route path='log_keluar_peserta' element={<LogKeluarPeserta />} />
        </Route>
      </Route>

    </Routes>
  </BrowserRouter>
  )
}

export default App;
