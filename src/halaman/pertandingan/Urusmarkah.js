import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import fetchLifecycle from "../../util/fetchLifecycle";

export default function Urusmarkah () {

    const { pertandingan: _idp } = useParams();
    const peserta = useFetchProtected(`http://localhost:5000/api/v1/pertandingan/${_idp}/peserta`, {});

    const [ markah, setMarkah ] = useState([]);
    const [ nilai, setNilai ] = useState([]);

    const [ hantar, setHantar ] = useState(false);

    const nav = useNavigate();

    const prahantar = (e) => {
        e.preventDefault();
        setHantar(true);
    }

    useEffect(() => {

        if (!hantar) return;

        const urusm = {
            markah,
            nilai
        }

        const kemaskiniMarkah = async () => {

            const kemaskini = await fetchLifecycle(nav, `http://localhost:5000/api/v1/urusmarkah/${_idp}`, {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(urusm)
            });

            if (kemaskini.status) {
                peserta.map((p, i) => {
                    p.jumlah = kemaskini[i].jumlah;
                    return p.jumlah;
                })
            }

            setHantar(false)
        }

        kemaskiniMarkah();
    }, [_idp, hantar, markah, nav, nilai, peserta])

    return (
        <>
        <form onSubmit={prahantar}>
            {peserta && peserta.map((p, i) => {
                const { peserta, _id, jumlah } = p;
                return (
                    <>
                        {i+1}. <br />
                        <label>{peserta.namaPenuh}</label>
                        <br />
                        {peserta.namaAkaun}
                        <br />{jumlah}
                        <input type='number' onChange={(e) => {
                            console.log(nilai)
                            console.log(markah)
                            const index = markah.findIndex((m) => m === _id);

                            if (e.target.value) {
                                if (index !== -1) {
                                    // Mengubah nilai markah sedia ada
                                    const nilaiBaharu = [...nilai];
                                    nilaiBaharu[index] = e.target.value;
                                    setNilai(nilaiBaharu);
                                    return;
                                }
                                else {
                                    // Cipta markah dan nilai
                                    const markahBaharu = [...markah, _id]
                                    const nilaiBaharu = [...nilai, e.target.value ]
                                    setMarkah(markahBaharu);
                                    setNilai(nilaiBaharu);
                                    return;
                                }
                            }
                            else {
                                if (index !== -1) {
                                    // Menghapuskan markah
                                    const markahBaharu = markah.filter((m) => m !== _id)
                                    const nilaiBaharu = nilai.filter((n, i) => i !== index);
                                    setMarkah(markahBaharu);
                                    setNilai(nilaiBaharu);
                                    return;
                                }
                                return;
                            }
                        }} />
                        <br />
                    </>
                )
            })}
            <input type='submit' value='Urusmarkah' />
            </form>
        </>
    )
}