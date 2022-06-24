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
            
        </div>
            <form onSubmit={hantar} style={{
            }}>
                <input type='text' onChange={(e) => setNama(e.target.value)}></input>
                <input type='submit' value='Hantar'></input>
            </form>
        </>
    )
}