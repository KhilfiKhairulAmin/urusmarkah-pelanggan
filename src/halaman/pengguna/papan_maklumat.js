import { useEffect, useState } from "react";

export default function PapanMaklumat () {
    const [maklumat, setMaklumat] = useState({});
    
    useEffect(() => {
        // Mendapatkan maklumat nama dan emel
        const dapatkanMaklumatPengguna = async () => {
            const res = await fetch(`http://localhost:5000/api/v1/pengguna/maklumat_pengguna`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });

            const maklumatPengguna = await res.json();

            setMaklumat(maklumatPengguna);
        }

        dapatkanMaklumatPengguna();
    }, [])

    return (
        <>
            Nama: {maklumat.nama}
            <br />
            Emel: {maklumat.emel}
        </>
    )
}