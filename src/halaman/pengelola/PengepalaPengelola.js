import { createContext } from "react";
import { faPersonThroughWindow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useMatch } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";
import Logo from "../../komponen/identiti/Logo";

export const KonteksPengelola = createContext();

export default function PengepalaPengguna () {

    const pengelola = useFetchProtected('http://localhost:5000/api/v1/pengelola', {});

    const url = '/pengelola'
    const profil = useMatch(url);
    const kemaskini = useMatch(url + '/kemas_kini');

    const butang = 'w3-margin-left w3-button w3-hover-khaki w3-round-xlarge'
    const butangCondition = 'w3-deep-orange w3-hover-deep-orange'

    return (
        <>
        <KonteksPengelola.Provider value={pengelola} >
            <span className="w3-margin" style={{ display: 'flex', borderBottom: 'solid 1px' }}>
                <Logo to='/urusmarkah' />   
            </span>
            <span className="w3-margin" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
                <Link to='/pengelola'><button className={((profil) ? butangCondition : '') + ` ${butang}`}>Profil</button></Link>
                <Link to='./kemas_kini'><button className={((kemaskini) ? butangCondition : '') + ` ${butang}`}>Kemaskini Profil</button></Link>
                <label />
                <Link to='./log_keluar'><button className='w3-btn w3-red w3-round-xlarge w3-hover-red'><FontAwesomeIcon icon={faPersonThroughWindow} /> Log Keluar</button></Link>
            </span>
            <Outlet />
        </KonteksPengelola.Provider>
        </>
    )
}