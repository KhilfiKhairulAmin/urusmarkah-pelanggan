import { useNavigate } from "react-router-dom";
import useFetchProtected from "../../hooks/useFetchProtected";

export default function LogKeluarPeserta () {

    const logKeluar = useFetchProtected('http://localhost:5000/api/v1/peserta/log_keluar', {
        method: 'PUT'
    });

    localStorage.clear();

    const nav = useNavigate();

    if (logKeluar) {
        nav('/pengesahan/log_masuk_peserta');
    }
}