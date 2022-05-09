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

        const daftar = async (maklumat) => {
            const data = await fetch('http://localhost:5000/pengesahan/daftar', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(maklumat)
            })

            if (data.status !== 201) {
                setSudahHantar(false);
                return;
            }

            const penggunaBaharu = await data.json();

            console.log(penggunaBaharu);
            localStorage.setItem('token', penggunaBaharu.token);
            localStorage.setItem('refreshToken', penggunaBaharu.refreshToken);

            navigate(`/pertandingan`);
        }
        if (sudahHantar) {
            const maklumat = {
                emel: emel,
                nama: nama,
                kata_laluan: kataLaluan
            };

            daftar(maklumat);
        }
    }, [emel, kataLaluan, nama, sudahHantar, navigate])

    return (
        <>
            <form onSubmit={hantar}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '1rem',
                    marginRight: '70%'
                }}>
                    <h3 style={{ alignSelf: 'center'}}>Daftar Akaun Baharu</h3>
                    Emel <input type='email' value={emel} onChange={(event) => setEmel(event.target.value)}></input><br />
                    Nama <input type='text' value={nama} onChange={(event) => setNama(event.target.value)}></input><br />
                    Kata laluan <input type='password' value={kataLaluan} onChange={(event) => setKataLaluan(event.target.value)}></input><br />
                    <input type='submit' value='Submit' style={{
                        alignSelf: 'flex-end'
                    }}/>
                </div>
            </form>
        </>
    )
}