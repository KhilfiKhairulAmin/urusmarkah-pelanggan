import { Link } from "react-router-dom"
import '../../halaman/Utama.css'

export default function Logo ({ to = '/' }) {
    return (
        <div style={{
            'paddingBottom':'4px',
        }}>
        <Link style={{
                'fontFamily':'BlackJack',
                'fontSize':'33px',
                'textDecoration':'none',
                'fontWeight':'bolder'
        }} className="w3-text-deep-orange w3-margin" to={to}><label>Urusmarkah</label></Link>
        </div>
    )
}