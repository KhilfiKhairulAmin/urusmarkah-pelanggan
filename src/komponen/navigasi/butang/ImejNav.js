import { Link } from "react-router-dom";

export default function ImejNav ({ ImejHTML, to }) {
    return (
        <Link to={to}>
            <ImejHTML />
        </Link>
    )
}