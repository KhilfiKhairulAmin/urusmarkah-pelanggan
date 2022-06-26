import { faArrowTurnDown, faCheckCircle, faCircleXmark, faDoorOpen, faLightbulb, faMedal, faPersonWalkingArrowRight, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import fetchLifecycle from "../../util/fetchLifecycle";
import formatTarikh from "../../util/formatTarikh";
import statusPertandingan from "../../util/statusPertandingan";
import { KonteksPeserta } from "./PengepalaUtamaPeserta";

export default function SertaiPertandingan () {

    const { pertandingan: _idp } = useParams();
    const nav = useNavigate();

    const pertandingan = useFetchProtected(`http://localhost:5000/api/v1/peserta/${_idp}`, {});
    const peserta = useFetchProtected(`http://localhost:5000/api/v1/peserta/${_idp}/peserta`, {})

    const [ aksi, setAksi ] = useState(0);

    const { cipta, laksana, tamat } = pertandingan.tarikhMasa || '';
    const { nama, _id, status, bilPeserta, sudahSertai, pengelola } = pertandingan || '';
    const { namaAkaun, _id: _id_pengelola } = pengelola || '';
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

    let butang = sudahSertai ? (<><button style={{
        position: 'relative',
        top: '-10px',
        left: '10px'
    }} className="w3-margin-top w3-red w3-btn w3-round-large" onClick={() => setAksi(2)}><FontAwesomeIcon icon={faCircleXmark} /> Keluar</button></>) : (<><button style={{
        position: 'relative',
        top: '-10px',
        left: '10px'
    }} className="w3-margin-top w3-green w3-btn w3-round-large" onClick={() => setAksi(1)}><FontAwesomeIcon icon={faArrowTurnDown} /> Sertai</button></>)

    return (
        <>
        <div className='header-pertandingan w3-serif w3-text-white w3-large'>
            <div className="w3-margin">
            <h2 className='w3-serif w3-xxlarge'>{nama || 'Loading'}</h2>
            <h6>#{_id}</h6>
            Pengelola: {namaAkaun} <br/>
            Tarikh Dibuat: {formatTarikh(cipta) || 'Loading'}
            <br />
            Bil. Peserta: {(bilPeserta >= 0) ? bilPeserta : 'Loading'}
            <br />
            Status: {statusPertandingan(status) || 'Loading'}
            <br />
            { laksana ? `Dilaksanakan Pada: ${laksana}` : ''}
            <br />
            { tamat ? `Tamat Pada: ${tamat}` : ''}
            <br />
            </div>
        </div>
        {butang}

        <div className='w3-serif w3-margin-left w3-large'>
        <h3>Deskripsi</h3>{deskripsi || 'Tiada'}
        <br />
        <h3>Tarikh Pelaksanaan</h3>{formatTarikh(tarikhPelaksanaan) || 'Tidak Ditetapkan'}
        <br />
        <h3>Syarat</h3>
        { syarat && syarat.map((s, i) => <>{i + 1}. <label id={i}>{s}</label><br /></>)}
        <h3>Sumber</h3>
        <ul>
        { sumber && sumber.map((s, i) => <>
            <li><a target={'_blank'} href={s.url} rel="noreferrer">{s.nama}</a></li></>)}
        </ul>
        <br />

        <div className="w3-margin">
        <table className="w3-table w3-striped w3-hoverable w3-border w3-border-light-gray w3">
                <tr className="w3-deep-orange">
                    <th style={{
                        width: '7%'
                    }}>Kedudukan</th>
                    <th className="">Peserta</th>
                    <th className="w3-center" style={{
                        width: '2%'
                    }}>Markah</th>
                </tr>
            {peserta && peserta.map((p, i) => {
                const { peserta, jumlah } = p;
                return (
                    <>
                    <tr>
                        <td className="w3-border-bottom w3-border-light-gray w3-center">{(i + 1 <= 3) ? <FontAwesomeIcon style={{
                            position: 'relative',
                            top: '10px'
                        }} icon={faMedal} size='2x' color={
                            (i + 1 === 1) ? '#FFD700' : (i + 1 === 2) ? '#C0C0C0' : '#CD7F32'
                        } /> : i + 1}</td>
                        <td className="w3-border-bottom w3-border-light-gray">
                        <label className="w3-large">{peserta.namaPenuh}</label>
                        <br />
                        <label className="w3-medium">{peserta.namaAkaun}</label>
                        </td>
                        <td className="w3-border-bottom w3-border-light-gray"><label className="w3-large">{jumlah.toFixed(0)}</label></td>         
                    </tr>
                    </>
                )
            })}
            </table>
        </div>
        </div>
        </>
    )
}