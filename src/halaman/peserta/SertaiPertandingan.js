import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import fetchLifecycle from "../../util/fetchLifecycle";
import statusPertandingan from "../../util/statusPertandingan";
import { KonteksPeserta } from "./PengepalaUtamaPeserta";

export default function SertaiPertandingan () {

    const { pertandingan: _idp } = useParams();
    const nav = useNavigate();

    const pertandingan = useFetchProtected(`http://localhost:5000/api/v1/peserta/${_idp}`, {});
    const peserta = useFetchProtected(`http://localhost:5000/api/v1/peserta/${_idp}/peserta`, {})

    const [ aksi, setAksi ] = useState(0);

    const { cipta, laksana, tamat } = pertandingan.tarikhMasa || '';
    const { nama, _id, status, bilPeserta, sudahSertai } = pertandingan || '';
    const { deskripsi, tarikhPelaksanaan, syarat, sumber } = pertandingan.tentang || '';

    useEffect(() => {

        const kendaliAksi = async () => {
            switch (aksi) {
                case 2: {
                    const keluar = await fetchLifecycle(nav, `http://localhost:5000/api/v1/peserta/${_id}/keluar`, {
                        method: 'POST'
                    });
                    
                    pertandingan.sudahSertai = false;
                    pertandingan.bilPeserta -= 1;
                    setAksi(0)
                    break
                }
                case 1: {
                    const serta = await fetchLifecycle(nav, `http://localhost:5000/api/v1/peserta/${_id}/sertai`, {
                        method: 'POST'
                    })

                    pertandingan.sudahSertai = true;
                    pertandingan.bilPeserta += 1;
                    setAksi(0); 
                    break;
                }
                default: {
                    return;
                }
            }
        }

        kendaliAksi();
    }, [_id, aksi, nav, pertandingan])

    let butang = sudahSertai ? (<><button onClick={() => setAksi(2)}>Keluar</button></>) : (<><button onClick={() => setAksi(1)}>Sertai</button></>)

    return (
        <>
            <h2>{nama || 'Loading'}</h2>
            <h6>#{_id}</h6>
            Tarikh Dibuat: {cipta || 'Loading'}
            <br />
            Bil. Peserta: {(bilPeserta >= 0) ? bilPeserta : 'Loading'}
            <br />
            Status: {statusPertandingan(status) || 'Loading'}
            <br />
            { laksana ? `Dilaksanakan Pada: ${laksana}` : ''}
            <br />
            { tamat ? `Tamat Pada: ${tamat}` : ''}
            <br />< hr />
            Deskripsi: {deskripsi || 'Tiada'}
            <br />
            Tarikh Pelaksanaan: {tarikhPelaksanaan || 'Tidak Ditetapkan'}
            <br />
            Syarat:
            { syarat && syarat.map((s, i) => <><br />{i + 1}. <label id={i}>{s}</label> </>)}
            <br />
            Sumber:
            <br />
            { sumber && sumber.map((s, i) => <>
            {i+1}. 
            <br />
            Nama: <label key={'n'+i}>{s.nama}</label>
            <br />
            URL: <a key={'u'+i} href={s.url}>{s.url}</a><br /></>)}
            <br />
            {butang}
            <br />
            {peserta && peserta.map((p, i) => {
                const { peserta } = p;
                return (
                    <>
                        {i+1}. <br />
                        <Link to={`./${peserta._id}`}>{peserta.namaPenuh}</Link>
                        <br />
                        {peserta.namaAkaun}
                        <br />
                    </>
                )
            })}
        </>
    )
}