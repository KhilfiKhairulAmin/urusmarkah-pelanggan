import { createContext } from "react";
import { Link, Outlet } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import Logo from "../../komponen/identiti/Logo";

export const KonteksPengguna = createContext();

export default function PengepalaPengguna () {

    const pengguna = useFetchProtected('http://localhost:5000/api/v1/pengguna', {});

    return (
        <>
        <KonteksPengguna.Provider value={pengguna} >
            <span style={{ display: 'flex', borderBottom: 'solid 1px' }}>
                <Logo to='/urusmarkah' />   
            </span>
            <span style={{ display: 'flex', flexDirection: 'column'}}>
                <Link to='/urusmarkah/pengguna/kemas_kini'><label>Kemaskini Profil</label></Link>
            </span>
            <Outlet />
        </KonteksPengguna.Provider>
        </>
    )
}