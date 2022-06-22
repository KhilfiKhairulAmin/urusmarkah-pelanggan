import { Link } from "react-router-dom"
import '../../halaman/Utama.css'

export default function Logo ({ to = '/', jenis }) {
    return (
        <div style={{
            'paddingBottom':'4px',
            'fontFamily':'BlackJack',
            'fontSize':'33px',
            'fontWeight':'bolder'
        }}>
        <Link style={{
                        'textDecoration':'none',
        }} className="w3-text-deep-orange w3-margin" to={to}>
            <label>Urusmarkah</label>
        </Link>
        <label className="w3-text-deep-orange" style={{
            position: 'relative',
            top: '-20px',
            fontSize: '19px'
            }}>{jenis || ""}</label>
        </div>
    )
}