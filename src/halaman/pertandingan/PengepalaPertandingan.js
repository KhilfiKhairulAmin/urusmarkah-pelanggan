import { createContext, useContext } from "react";
import { Outlet,  } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import Logo from "../../komponen/identiti/Logo";
import ButangNav from "../../komponen/navigasi/butang/ButangNav";
import { KonteksPengelola } from "../pengguna/PengepalaPengelola";

export default function PengepalaPertandingan () {
    const pertandingan = useFetchProtected('http://localhost:5000/api/v1/pertandingan', {});
    const KonteksPertandingan = createContext()
    //const pengelola = useFetchProtected('http://localhost:5000/api/v1/pengelola', {});
    const Pengelola = useContext(KonteksPengelola);

    return (
        <>
        <Pengelola>
            <KonteksPertandingan.Provider value={pertandingan}>
            <span>
                <Logo to='/urusmarkah' />
                <label style={{ flexGrow: 1}} />
                <ButangNav to='/pengguna' buttonText={pertandingan.nama ?? 'Loading...'} />
            </span>
            </KonteksPertandingan.Provider>
            <Outlet />
        </Pengelola>
        </>
    )
}