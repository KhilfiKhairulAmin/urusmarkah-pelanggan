import { createContext } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";

export const KonteksPertandingan = createContext();

export default function PengepalaPertandingan () {

    const { pertandingan: _id } = useParams();

    const pertandingan = useFetchProtected(`http://localhost:5000/api/v1/pertandingan/${_id}`);

    return (
        <>
        <br />
        <KonteksPertandingan.Provider value={pertandingan} >

            <Link to={''}><label>Papan Pemuka</label></Link> |
            <Link to={'peserta'}><label>Peserta</label></Link> |
            <Link to={'tentang'}><label>Tentang</label></Link> |
            <Link to={'urusmarkah'}><label>Urusmarkah</label></Link> |

            <hr />
            <Outlet />
        </KonteksPertandingan.Provider>
        </>
    )
}