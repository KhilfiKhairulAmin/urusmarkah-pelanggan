import { useNavigate } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";

export default function LogKeluar () {
    const logKeluar = useFetchProtected('http://localhost:5000/api/v1/pengelola/log_keluar', {
        method: 'PUT'
    });

    localStorage.clear();

    const nav = useNavigate();

    if (logKeluar) {
        nav('/pengesahan/log_masuk');
    }
}