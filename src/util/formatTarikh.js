export default function formatTarikh (tarikh) {
    if (!tarikh) return

    const t = tarikh.split('T')[0];

    const parsedT = t.split('-');

    let bulan;

    switch (parseInt(parsedT[1])) {
        case 1: {
            bulan = 'Januari';
            break;
        }
        case 2: {
            bulan = 'Februari';
            break;
        }
        case 3: {
            bulan = 'Mac';
            break;
        }
        case 4: {
            bulan = 'April';
            break;
        }
        case 5: {
            bulan = 'Mei';
            break;
        }
        case 6: {
            bulan = 'Jun';
            break;
        }
        case 7: {
            bulan = 'Julai';
            break;
        }
        case 8: {
            bulan = 'Ogos';
            break;
        }
        case 9: {
            bulan = 'September';
            break;
        }
        case 10: {
            bulan = 'Oktober';
            break;
        }
        case 11: {
            bulan = 'November';
            break;
        }
        case 12: {
            bulan = 'Disember';
            break;
        }
        default: {
            bulan = 'ERR'
        }
    }

    return `${parsedT[2]} ${bulan} ${parsedT[0]}`
}