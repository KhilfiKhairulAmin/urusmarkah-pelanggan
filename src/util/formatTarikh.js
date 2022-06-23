export default function formatTarikh (tarikh) {
    if (!tarikh) return

    return tarikh.split('T')[0];
}