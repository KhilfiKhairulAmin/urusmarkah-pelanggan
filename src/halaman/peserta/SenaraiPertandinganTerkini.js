import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetchLifecycle from "../../util/fetchLifecycle";
import formatTarikh from "../../util/formatTarikh";
import statusPertandingan from "../../util/statusPertandingan";
import './Peserta.css'

export default function SenaraiPertandinganPeserta () {

    const [ pertandinganDimasuki, setPertandinganDimasuki ] = useState([]);
    const [ carianNama, setCarianNama ] = useState('');

    const nav = useNavigate();

    useEffect(() => {
        
        const dapatkanMaklumat = async () => {
            const pertandingan = await fetchLifecycle(nav, `http://localhost:5000/api/v1/peserta/pertandingan_terkini?nama=${carianNama}`, {});
            setPertandinganDimasuki(pertandingan);
        }

        dapatkanMaklumat()
    }, [carianNama, nav])

    return (
        <>
            <span style={{ display: 'flex', flexGrow: 1, flexDirection: 'row', justifyContent: 'left'}}>
            <div className="w3-margin" style={{
                width: '100%'
            }}>
                <span style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                <FontAwesomeIcon icon={faSearch} color='gray' size='xl' style={{
                    position: 'relative',
                    top: '8px'
                }} />
                <input type={'text'} placeholder='Carian Pertandingan' className="w3-border-dark-gray w3-round w3-animate-input w3-input w3-border w3-text-deep-orange" style={{
                width: '33.5%',
                position: 'relative',
                left: '12px'
            }} onChange={(e) => setCarianNama(e.target.value)} />
                </span>
            </div>
            <label />
            </span>
            {
                (Array.isArray(pertandinganDimasuki) && pertandinganDimasuki[0]) ? (pertandinganDimasuki.map((pertandingan, i) => {

                    const { tentang, _id, nama, status, pengelola } = pertandingan || 'Tidak Ditetapkan';
                    const { tarikhPelaksanaan } = tentang || 'Tiada';

                    if (!pertandingan) return (<div key={i}></div>)

                    return (
                        <Link style={{ textDecoration: 'none' }} key={i} to={`../${_id}`}>

                                <div className=" w3-padding-bottom w3-border-bottom w3-border-gray" key={i}>
                                <h2  style={{ fontFamily: 'BlackJack'}} className="w3-text-deep-orange">{nama}</h2>
                                    Pengelola: {pengelola.namaAkaun}
                                    <br />
                                    Tarikh Pelaksanaan: {formatTarikh(tarikhPelaksanaan) || 'Tidak Ditetapkan'}
                                    <br />
                                    Status: {statusPertandingan(status) || 'Status tidak sah'}
                                </div>

                        </Link>
                    )
                }))
                :
                (<><br /><div className="defaultPeserta">Tiada pertandingan buat masa sekarang</div></>)
            }
        </>
    )
}