import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchLifecycle from "../../util/fetchLifecycle";
import { KonteksPertandingan } from "./PengepalaPertandingan";

export default function Tentang () {

    const pertandingan = useContext(KonteksPertandingan);

    const [ nama, setNama ] = useState(pertandingan.nama);
    const [ deskripsi, setDeskripsi ] = useState('');
    const [ tarikhPelaksanaan, setTarikhPelaksanaan ] = useState('');
    const [ syarat, setSyarat ] = useState('');
    const [ namaSumber, setNamaSumber ] = useState([]);
    const [ urlSumber, setURLSumber ] = useState([])

    const [ load, setLoad ] = useState(false)
    const [ hantar, setHantar ] = useState(false);

    const nav = useNavigate();
    const { pertandingan: _id } = useParams();

    const kemaskini = (e) => {
        e.preventDefault();
        setHantar(true);
    }

    useEffect(() => {

        if (!nama) {
            if (load) return;
            const { sumber } = pertandingan.tentang || {};
            const namaS = sumber && sumber.map((s) => s.nama);
            const urlS = sumber && sumber.map((s) => s.url);
            const { deskripsi: d } = pertandingan.tentang || '';
            const { syarat: s } = pertandingan.tentang || [];
            setNama(pertandingan.nama);
            setDeskripsi(deskripsi || d)
            // setTarikhPelaksanaan(tarikhPelaksanaan || tP)
            setSyarat(syarat || s)
            setNamaSumber(namaS || [])
            setURLSumber(urlS || [])

            if (pertandingan.nama) {
                setLoad(true)
            }
        }

        if (!hantar) return

        const hantarBorang = async () => {

            const sumber = namaSumber.map((n, i) => {
                return {
                    nama: n,
                    url: urlSumber[i]
                }
            });

            const kemasKini = {
                nama,
                deskripsi,
                syarat,
                tarikhPelaksanaan,
                sumber
            }

            console.log(kemasKini)

            const maklumat = await fetchLifecycle(nav, `http://localhost:5000/api/v1/pertandingan/${_id}/kemas_kini`, {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(kemasKini)
            });

            setHantar(false)

            console.log(maklumat)

            if (!maklumat.status) {
                return
            }

            nav('../')
        };

        hantarBorang();
    }, [_id, deskripsi, hantar, load, nama, namaSumber, nav, pertandingan, pertandingan.deskripsi, pertandingan.hadPeserta, pertandingan.nama, pertandingan.sumber, pertandingan.syarat, pertandingan.tarikhPelaksanaan, syarat, tarikhPelaksanaan, urlSumber])

    return (
        <>
            <form onSubmit={kemaskini} className='w3-margin w3-container w3-text-deep-orange w3-serif w3-large'>
                Nama: <input className="w3-input w3-light-gray" type={'text'} value={nama} onChange={(e) => setNama(e.target.value)} />
                <br />
                Deskripsi<br />
                <textarea style={{
                    height: '200px'
                }} className="w3-input w3-light-gray" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                <br />
                Tarikh Pelaksanaan: <input className="w3-input w3-light-gray" type={'date'} value={tarikhPelaksanaan} onChange={(e) => setTarikhPelaksanaan(e.target.value)} />
                <br />
              
                Syarat:
                { syarat && syarat.map((s, i) =>
                <><br /> {i + 1}. <input className="w3-input w3-light-gray" type={'text'} value={s} onChange={(e) => setSyarat(syarat.map((s, j) => {
                    if (i === j) {
                        s = e.target.value
                    }
                    return s;
                }))} /></>)}
                <br />
                <input className="w3-small w3-btn w3-deep-orange w3-round-large w3-margin-bottom w3-margin-right" type='button' value={'+'} onClick={() => {
                    setSyarat([...syarat, ''])
                }} />
                <input className="w3-small w3-btn w3-deep-orange w3-round-large w3-margin-bottom w3-margin-right" type={'button'} value='-' onClick={() => {
                    const tolak = (syarat.length - 1) ? 1 : 0;
                    setSyarat([...syarat].splice(0, syarat.length - tolak));
                }} />
                <br />
           
                Sumber: 
                <br />
                { namaSumber && namaSumber.map((s, i) => {
                    return (<>{i + 1}. <br />
                    Nama: <input className="w3-input w3-light-gray" type='text' value={s} onChange={(e) => setNamaSumber(namaSumber.map((s, j) => {
                        if (i === j) {
                            s = e.target.value;
                        }
                        return s;
                    }))} />
                    <br />
                    URL: <input className="w3-input w3-light-gray" type='text' value={urlSumber[i]} onChange={(e) => setURLSumber(urlSumber.map((s, j) => {
                        if (i === j) {
                            s = e.target.value;
                        }
                        return s;
                    }))} />
                    <br />
                    </>)
                })}
                <input className="w3-small w3-btn w3-deep-orange w3-round-large w3-margin-bottom w3-margin-right" type={'button'} value='+' onClick={() => {
                    setNamaSumber([...namaSumber, '']);
                    setURLSumber([...urlSumber, '']);
                }} />
                <input className="w3-small w3-btn w3-deep-orange w3-round-large w3-margin-bottom w3-margin-right" type={'button'} value='-' onClick={() => {
                    const tolak = (namaSumber.length - 1) ? 1 : 0;
                    setNamaSumber([...namaSumber].splice(0, namaSumber.length - tolak));
                    setURLSumber([...urlSumber].splice(0, urlSumber.length - tolak));
                }} />
                <br />
                <br />
                <button type="submit" className="w3-button w3-hover-blue w3-deep-orange w3-round-large w3-margin-bottom w3-margin-right"><FontAwesomeIcon icon={faGear} /> Simpan</button>
                
            </form>
        </>
    )
}