import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useFetchProtected ( url, init ) {

    const [ maklumatFetch, setMaklumatFetch ] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        console.log('I ran')
        if (maklumatFetch) return;
        console.log('I ran 2')

        const fetchProtected = async () => {

            const reqInit = { ...init, headers: { authorization: `Bearer ${localStorage.getItem('token')}`}}

            const res = await fetch(url, reqInit);
            console.log(res.status)
            if (res.status >= 400) {
                console.log(localStorage.getItem('refreshToken'))
                const fetchToken = await fetch('http://localhost:5000/api/v1/pengguna/refresh_token', {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('refreshToken')}`
                    }
                });

                if (fetchToken.status >= 400) {
                    nav('/pengesahan/log_masuk');
                    return;
                }

                const { token, refreshToken } = await fetchToken.json();

                console.log(refreshToken)
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);

                reqInit.headers.authorization = `Bearer ${token}`;

                const res = await fetch(url, reqInit);

                const data = await res.json();

                setMaklumatFetch(data);

                return;
            }

            const data = await res.json();

            setMaklumatFetch(data);
        }

        fetchProtected();
    }, [init, maklumatFetch, nav, url]);

    return [maklumatFetch];
}