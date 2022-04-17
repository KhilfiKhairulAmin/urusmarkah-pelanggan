import { Link } from "react-router-dom";

export default function Pengepala (props) {
    return (
        <span style={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <label>Urusmarkah</label>
            <label style={{ flexGrow: '1'}}></label>
            <Link to='/log_masuk'>
                <button>Log Masuk</button>
            </Link>
            <Link to='/daftar_masuk'>
                <button>Daftar Masuk</button>
            </Link>
        </span>
    )
}