import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchLifecycle from "../../util/fetchLifecycle";

export default function Urusmarkah () {

    const { pertandingan: _idp } = useParams();
    const [ peserta, setPeserta ] = useState();
    const [ sudahSenarai, setSudahSenarai ] = useState(false)

    const [ markah, setMarkah ] = useState([]);
    const [ nilai, setNilai ] = useState([]);

    const [ hantar, setHantar ] = useState(false);

    const nav = useNavigate();

    // const resetBorang = () => {
    //     const elem = document.getElementById('reset').reset()
    // }

    const prahantar = (e) => {
        e.preventDefault();
        setHantar(true);
        e.target.reset()
    }

    useEffect(() => {

        const senaraikan = async () => {

            const maklumat = await fetchLifecycle(nav, `http://localhost:5000/api/v1/urusmarkah/${_idp}`, {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    markah: [],
                    nilai: []
                })
            });


            setPeserta(maklumat)
        }

        if (!sudahSenarai) {
            setSudahSenarai(true);
            senaraikan();
        }

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

            setHantar(false);
            setPeserta(kemaskini);
            setMarkah([]);
            setNilai([]);
        }

        kemaskiniMarkah();
    }, [_idp, hantar, markah, nav, nilai, peserta, sudahSenarai])

    return (
        <>
        <div className="bg-urusmarkah">
        <form name='markah' onSubmit={prahantar} id='reset' className="w3-margin">
            <table className="w3-table w3-striped w3-hoverable w3-border w3-border-light-gray w3">
                <tr className="w3-deep-orange">
                    <th style={{
                        width: '7%'
                    }}>Kedudukan</th>
                    <th className="">Peserta</th>
                    <th className="w3-center" style={{
                        width: '2%'
                    }}>Markah</th>
                    <th className="w3-center" style={{
                        width: '25%'
                    }}>Tambah</th>
                </tr>
            {peserta && peserta.map((p, i) => {
                const { peserta, _id, jumlah } = p;
                return (
                    <>
                    <tr>
                        <td className="w3-border-bottom w3-border-light-gray w3-center">{(i + 1 <= 3) ? <FontAwesomeIcon style={{
                            position: 'relative',
                            top: '10px'
                        }} icon={faMedal} size='2x' color={
                            (i + 1 === 1) ? '#FFD700' : (i + 1 === 2) ? '#C0C0C0' : '#CD7F32'
                        } /> : i + 1}</td>
                        <td className="w3-border-bottom w3-border-light-gray">
                        <label className="w3-large">{peserta.namaPenuh}</label>
                        <br />
                        <label className="w3-medium">{peserta.namaAkaun}</label>
                        </td>
                        <td className="w3-border-bottom w3-border-light-gray"><label className="w3-large">{jumlah.toFixed(0)}</label></td>
                        <td className="w3-center w3-border-bottom w3-border-light-gray">
                        <input style={{
                            width: '20%',
                        }} className="w3-round-large w3-light-gray w3-border-0 w3-serif w3-large" type='number' step='any' onChange={(e) => {

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
                        </td>             
                    </tr>
                    </>
                )
            })}
            </table>
            <input style={{
                marginTop: '10px'
            }} className="w3-deep-orange w3-btn w3-round-large" type='submit' value='Urusmarkah' />
            </form>
        </div>
        </>
    )
}