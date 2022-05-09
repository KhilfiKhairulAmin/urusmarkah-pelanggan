import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pertandingan from "./pertandingan";

export default function SenaraiPertandingan () {

    const navigasi = useNavigate();

    const [ senaraiPertandingan, setSenaraiPertandingan ] = useState([]);

    useEffect (() => {
        const dapatkanPertandingan = async () => {
            if (senaraiPertandingan.length !== 0) {
                return;
            }

            const res = await fetch('http://localhost:5000/api/v1/pertandingan', {
                method: 'GET',
                headers: {
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (res.status === 401) {
                const getRefToken = await fetch('http://localhost:5000/pengesahan/token', {
                    method: 'GET',
                    headers: {
                        'Authorization':`Bearer ${localStorage.getItem('refreshToken')}`
                    }
                });

                if (getRefToken.status === 403) {
                    navigasi('/log_masuk');
                    return;
                }

                const { token, refreshToken } = await getRefToken.json();

                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                setSenaraiPertandingan([]);
            }
    
            if (res.status !== 200) {
                return;
            }

            const pertandingan = await res.json();
            setSenaraiPertandingan(pertandingan);
        }

        dapatkanPertandingan();
    }, [navigasi, senaraiPertandingan]);

    const senarai = senaraiPertandingan.map((pertandingan) =>
        <div key={pertandingan._id}>
            <Pertandingan nama_pertandingan={pertandingan.nama_pertandingan} tarikh_dibuat={pertandingan.metadata.tarikh_dibuat} />
            <br />
        </div>
    )

    return (
        <>
            {senarai}
        </>
    )
}