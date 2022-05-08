import { useEffect, useState } from "react"

export default function Pengguna () {
    const [ maklumatPengguna, setMaklumatPengguna ] = useState({ nama: ''});
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/pengguna/maklumat_pengguna`, {
            method: 'get',
            headers: {
              'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => res.json()).then((data) => {setMaklumatPengguna(data)});
    }, [])

    return (
        <>
            { maklumatPengguna.nama }
        </>
    )
}