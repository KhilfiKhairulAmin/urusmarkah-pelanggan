import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchLifecycle from "../../util/fetchLifecycle";
import statusPertandingan from "../../util/statusPertandingan";
import { KonteksPertandingan } from "./PengepalaPertandingan";

export default function Pertandingan () {
    const pertandingan = useContext(KonteksPertandingan);

    const { cipta, laksana, tamat } = pertandingan.tarikhMasa || '';
    const { nama, _id, status, bilPeserta } = pertandingan;
    const { deskripsi, tarikhPelaksanaan, syarat, sumber } = pertandingan.tentang || '';

    const [ aksi, setAksi ] = useState(0);
    const [ pengesahan, setPengesahan ] = useState('')
    const [ hantar, setHantar ] = useState(false);
    const nav = useNavigate();
    const { pertandingan: _idp } = useParams();

    const hapuskan = (e) => {
        e.preventDefault();
        setHantar(true)
    }

    let penghapusan = (aksi === 2) ? (<form onSubmit={hapuskan}><input type='text' value={pengesahan} onChange={(e) => setPengesahan(e.target.value)} /><input type='submit' value='Hapus' /></form>) : (<></>)

    useEffect(() => {

        const kendaliAksi = async () => {
            switch (aksi) {
                case 0: {
                    return;
                }
                case 1: {
                    const laksana = await fetchLifecycle(nav, `http://localhost:5000/api/v1/urusmarkah/laksana/${_idp}`, {
                        method: 'PUT'
                    });

                    if (laksana.status) nav('./urus');

                    break
                }
                case 2: {
                    if (!hantar) return;
                    console.log(pengesahan)
                    console.log(JSON.stringify({ nama: pengesahan }))
                    const hapus = await fetchLifecycle(nav, `http://localhost:5000/api/v1/pertandingan/${_idp}/hapus`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({ nama: pengesahan })
                    });

                    if (hapus.status) nav('../../');
                    setHantar(false)
                    break;
                }
                default: {
                    return
                }
            }
        }

        kendaliAksi();
    }, [_idp, aksi, hantar, nav, pengesahan])

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
            <button onClick={() => {
                setAksi(1);
            }}>Laksana</button>
                        <button onClick={() => {
                 setAksi(2);
                
            }}>Hapus</button>{penghapusan}
        </>
    )

}