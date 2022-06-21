export default function statusPertandingan (status) {
    switch (status) {
        case 0: {
            return 'Belum Dimulakan'
        }
        case 1: {
            return 'Sedang Dijalankan'
        }
        case 2: {
            return 'Tamat'
        }
        default: {
            return ''
        }
    }
}