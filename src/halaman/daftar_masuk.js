import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function DaftarMasuk () {

    const [ emel, setEmel ] = useState('');
    const [ nama, setNama ] = useState('');
    const [ kataLaluan, setKataLaluan ] = useState('');
    const [ sudahHantar, setSudahHantar ] = useState(false);
    const navigate = useNavigate();

    const hantar = (e) => {
        e.preventDefault();
        setSudahHantar(true);
    }

    useEffect(() => {
        if (sudahHantar) {
            const maklumat = {
                emel: emel,
                nama: nama,
                kata_laluan: kataLaluan
            };

            fetch('http://localhost:5000/api/v1/pengguna/baharu', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(maklumat)
            })
            .then((response) => {
                console.log(`Status Penghantaran Borang: ${response.status}`);
                navigate('/senarai');
            });
        }
    }, [emel, kataLaluan, nama, sudahHantar, navigate])

    return (
        <>
            <form onSubmit={hantar}>
                Emel: <input type='email' value={emel} onChange={(event) => setEmel(event.target.value)}></input><br />
                Nama: <input type='text' value={nama} onChange={(event) => setNama(event.target.value)}></input><br />
                Kata laluan: <input type='password' value={kataLaluan} onChange={(event) => setKataLaluan(event.target.value)}></input><br />
                <input type='submit' value='Submit' />
            </form>
        </>
    )
}