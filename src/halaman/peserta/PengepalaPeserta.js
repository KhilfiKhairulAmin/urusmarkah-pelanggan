import { Link, Outlet, useMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonThroughWindow } from "@fortawesome/free-solid-svg-icons";

export default function PengepalaPeserta () {

    const url = '/peserta'
    const profil = useMatch(url + '/papan_pemuka');
    const kemaskini = useMatch(url + '/kemas_kini');

    const butang = 'w3-margin-left w3-button w3-hover-khaki w3-round-xlarge'
    const butangCondition = 'w3-deep-orange w3-hover-deep-orange'

    return (
        <>
            <span className="w3-margin" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
                <Link to='/peserta/papan_pemuka'><button className={((profil) ? butangCondition : '') + ` ${butang}`}>Profil</button></Link>
                <Link to='/peserta/kemas_kini'><button className={((kemaskini) ? butangCondition : '') + ` ${butang}`}>Kemaskini Profil</button></Link>
                <label />
                <Link to='/peserta/log_keluar_peserta'><button className='w3-btn w3-red w3-round-xlarge w3-hover-red'><FontAwesomeIcon icon={faPersonThroughWindow} /> Log Keluar</button></Link>
            </span>
            <Outlet />
        </>
    )
}