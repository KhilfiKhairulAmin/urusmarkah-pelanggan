import { createContext } from "react";
import { Link, Outlet } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";

export const KonteksPeserta = createContext();

export default function PengepalaUtamaPeserta (props) {
    
    const peserta = useFetchProtected('http://localhost:5000/api/v1/peserta', {});

    return (
        <>
        <KonteksPeserta.Provider value={peserta}>
        <Link to='/markah/pertandingan'>Markah</Link>
        <Link to='/peserta/papan_pemuka'><button>{peserta.namaAkaun}</button></Link>
        <hr />
        {props.children}
        <Outlet />
        </KonteksPeserta.Provider>
        </>
    )
}