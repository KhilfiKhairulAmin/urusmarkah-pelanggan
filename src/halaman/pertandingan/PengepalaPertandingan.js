import { Outlet,  } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import Logo from "../../komponen/identiti/Logo";
import ButangNav from "../../komponen/navigasi/butang/ButangNav";

export default function PengepalaPertandingan () {

    const maklumatFetch = useFetchProtected('http://localhost:5000/api/v1/pengelola', {});

    return (<>
        <span style={{ display: 'flex', flexDirection: 'row', borderBottom: 'solid 1px'}}>
            <Logo to='/urusmarkah' />
            <label style={{ flexGrow: 1}} />
            <ButangNav to='/pengguna' buttonText={maklumatFetch.nama ?? 'Loading...'} />
        </span>
        <Outlet />
    </>)
}