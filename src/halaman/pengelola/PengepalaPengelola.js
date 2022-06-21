import { createContext } from "react";
import { Link, Outlet } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import Logo from "../../komponen/identiti/Logo";

export const KonteksPengelola = createContext();

export default function PengepalaPengguna () {

    const pengelola = useFetchProtected('http://localhost:5000/api/v1/pengelola', {});

    return (
        <>
        <KonteksPengelola.Provider value={pengelola} >
            <span style={{ display: 'flex', borderBottom: 'solid 1px' }}>
                <Logo to='/urusmarkah' />   
            </span>
            <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
                <Link to='/pengelola'>Profil</Link><div> | </div>
                <Link to='./kemas_kini'>Kemaskini Profil</Link>
                <Link to='./log_keluar'>Log Keluar</Link>
            </span>
            <Outlet />
        </KonteksPengelola.Provider>
        </>
    )
}