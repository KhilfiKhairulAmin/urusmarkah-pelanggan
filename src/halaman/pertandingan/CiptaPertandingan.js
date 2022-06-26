import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchLifecycle from "../../util/fetchLifecycle";

export default function CiptaPertandingan () {

    const [nama, setNama] = useState();

    const [sudahHantar, setSudahHantar] = useState(false);

    const nav = useNavigate();
    
    const hantar = (e) => {
        e.preventDefault();
        setSudahHantar(true);
    }

    useEffect(() => {

        const ciptaPertandingan = async () => {
            if (!sudahHantar) return;

            const pertandingan = {
                nama
            };
    
            const maklumat = await fetchLifecycle(nav, 'http://localhost:5000/api/v1/pertandingan/cipta', {
                method: 'POST',
                body: JSON.stringify(pertandingan),
                headers: {
                    'Content-Type':'application/json'
                }
            });

            if (!maklumat.status) {
                setSudahHantar(false)
                return
            }
            
            nav(`../${maklumat.pertandingan}`)
        }

        ciptaPertandingan();
    }, [nama, nav, sudahHantar]);

    return (
        <>
        <div>
        <form className="w3-text-deep-orange w3-margin w3-xlarge w3-serif" onSubmit={hantar} style={{
            }}>
                <h1 style={{
                    fontWeight: 'bold'
                }} className="w3-serif">Cipta Pertandingan</h1>
                <input className="w3-input w3-text-deep-orange" placeholder="Nama Pertandingan" type='text' onChange={(e) => setNama(e.target.value)}></input>
                <input className="w3-round w3-button w3-deep-orange w3-hover-green w3-serif w3-margin-top" type='submit' value='Cipta'></input>
            </form>
        </div>
        </>
    )
}