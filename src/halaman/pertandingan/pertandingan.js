import { faHourglassEnd, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchLifecycle from "../../util/fetchLifecycle";
import formatTarikh from "../../util/formatTarikh";
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

    let penghapusan = (aksi === 2) ? (<form onSubmit={hapuskan}><input style={{
        width: '20%'
    }} className="w3-border-red w3-input w3-text-red" placeholder="Nama Pertandingan" type='text' value={pengesahan} onChange={(e) => setPengesahan(e.target.value)} /><input className="w3-red w3-button w3-hover-amber w3-round-large" type='submit' value='Sah' /></form>) : (<></>)

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

                    if (laksana.status) nav('./urusmarkah');

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
                case 3: {
                    const tamat = await fetchLifecycle(nav, `http://localhost:5000/api/v1/urusmarkah/tamat/${_idp}`, {
                        method: 'DELETE'
                    });

                    if (tamat.status) nav('./keputusan');

                    break
                }
                default: {
                    return
                }
            }
        }

        kendaliAksi();
    }, [_idp, aksi, hantar, nav, pengesahan])

    let butang;

    switch (status) {
        case 0: {
            butang = (<button className="w3-btn w3-green w3-round-large w3-margin-right" onClick={() => {
                setAksi(1);
            }}><FontAwesomeIcon icon={faPlay} /> Laksana</button>)
            break
        }
        case 1: {
            butang = <button className="w3-btn w3-yellow w3-round-large w3-margin-right" onClick={() => {
                setAksi(3);
            }}><FontAwesomeIcon icon={faHourglassEnd} /> Tamat</button>
            break
        }
        case 2: {
            butang = (<></>)
            break
        }
        default: {
            butang = (<></>)
        }
    }

    return (
        <>
            <div className='header-pertandingan w3-serif w3-text-white w3-large'>
                <div className='w3-margin-left w3-margin-top'>
                    <h2 className='w3-serif w3-xxlarge'>{nama || 'Loading'}</h2>
                    <h6>#{_id}</h6>
                    Tarikh Dibuat: {formatTarikh(cipta) || 'Loading'}
                    <br />
                    Bil. Peserta: {(bilPeserta >= 0) ? bilPeserta : 'Loading'}
                    <br />
                    Status: {statusPertandingan(status) || 'Loading'}
                    <br />
                    { laksana ? `Dilaksanakan Pada: ${formatTarikh(laksana)}` : ''}
                    <br />
                    { tamat ? `Tamat Pada: ${formatTarikh(tamat)}` : ''}
                    <br />
                    <div style={{
                        position: 'relative',
                        top: '-10px'
                    }}>
                        {butang}
                    <button className="w3-btn w3-red w3-round-large" onClick={() => {
                        setAksi(2); 
                    }}><FontAwesomeIcon icon={faTrash} /> Hapus</button>{penghapusan}
                    </div>
                </div>
            </div>

            <div className='w3-serif w3-margin-left w3-large'>
            <h3>Deskripsi</h3><div className="w3-justify">{deskripsi || 'Tiada deskripsi'}</div>
            <br />
            <h3>Tarikh Pelaksanaan</h3>{formatTarikh(tarikhPelaksanaan) || 'Tidak Ditetapkan'}
            <br />
            <h3>Syarat</h3>
            { syarat && syarat.map((s, i) => <>{i + 1}. <label className="w3-justify" id={i}>{s}</label><br /></>)}
            <br />
            <h3>Pautan</h3>
            <ul>
            { sumber && sumber.map((s, i) => <>
            <li><a target={'_blank'} href={s.url} rel="noreferrer">{s.nama}</a></li></>)}
            </ul>
            </div>

            <div className='w3-margin-left'>
            </div>
        </>
    )

}