import { useEffect, useState } from "react";

export default function CiptaPertandingan () {

    const [namaPertandingan, setNamaPertandigan] = useState();
    const [deskripsi, setDeskripsi] = useState("");
    const [sudahHantar, setSudahHantar] = useState(false);
    
    const hantar = (e) => {
        e.preventDefault();
        setSudahHantar(true);
    }

    useEffect(() => {

        const hantarBorang = async () => {
            if (!sudahHantar) return;

            const pertandinganBaharu = {
                nama_pertandingan: namaPertandingan,
                deskripsi
            };
    
            const res = await fetch('http://localhost:5000/api/v1/pertandingan/cipta', {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.status === 201) {
                console.log("Cipta Berjaya");
            }

            setSudahHantar(false);
        }
    }, [deskripsi, namaPertandingan, sudahHantar]);

    return (
        <>
            <form onSubmit={hantar}>
                <input type='text' onChange={(e) => setNamaPertandigan(e.target.value)}></input>
                <input type='text' onChange={(e) => setDeskripsi(e.target.value)}></input>
                <input type='submit' value='Hantar'></input>
            </form>
        </>
    )
}