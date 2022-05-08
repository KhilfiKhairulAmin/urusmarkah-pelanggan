import { useEffect } from "react";

export default function PapanMaklumat () {
    useEffect(() => {
        const dapatkanMaklumatPengguna = async () => {
            const res = await fetch(`http://localhost:5000/api/v1/pengguna/semua`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });

            const maklumatPengguna = await res.json();

            console.log(maklumatPengguna);
        }

        dapatkanMaklumatPengguna();
    }, [])

    return (
        <>
            Check log F12
        </>
    )
}