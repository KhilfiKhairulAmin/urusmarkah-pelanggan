import { useEffect, useState } from 'react'

export default function SenaraiAkaun () {

    const [ senaraiNama, setSenaraiNama ] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/pengguna/semua', {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => response.json())
        .then(
            (hasil) => {
                setSenaraiNama(hasil)
            }
        )
    }, [])

    return (
        <>
            <ul>
                {
                    senaraiNama.map(nama => (
                        <li key={nama._id}>
                            {nama.nama} ({nama.emel})
                        </li>
                    ))
                }
            </ul>
        </>
    )
}