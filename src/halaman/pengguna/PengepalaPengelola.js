import { createContext } from "react";
import { Link, Outlet } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import Logo from "../../komponen/identiti/Logo";

export const KonteksPengelola = createContext();

export default function PengepalaPengguna () {

    const pengelola = useFetchProtected('http://localhost:5000/api/v1/pengelola', {});

    return (
        <>
        <title>Pertandingan</title>
        <KonteksPengelola.Provider value={pengelola} >
            <span style={{ display: 'flex', borderBottom: 'solid 1px' }}>
                <Logo to='/urusmarkah' />   
            </span>
            <span style={{ display: 'flex', flexDirection: 'column'}}>
                <Link to='./kemas_kini'><label>Kemaskini Profil</label></Link>
            </span>
            <Outlet />
        </KonteksPengelola.Provider>
        </>
    )
}