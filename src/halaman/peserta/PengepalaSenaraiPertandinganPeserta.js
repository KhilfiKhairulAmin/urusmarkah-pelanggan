import { Link, Outlet, useMatch } from "react-router-dom";

export default function PengepalaSenaraiPertandinganPeserta () {

    const url = '/markah'

    const pertandingan = useMatch(url + '/pertandingan')
    const terkini = useMatch(url + '/terkini')

    const butang = 'w3-margin-left w3-button w3-hover-khaki w3-round-xlarge'
    const butangCondition = 'w3-deep-orange w3-hover-deep-orange'

    return (
        <>
        <div className="w3-margin">
        <Link to='/markah/pertandingan'><button className={((pertandingan) ? butangCondition : '') + ` ${butang}`}>Pertandingan Anda</button></Link> 
            <Link to='/markah/terkini'><button className={((terkini) ? butangCondition : '') + ` ${butang}`}>Sertai</button></Link>
            <Outlet />
        </div>
        </>
    )
}