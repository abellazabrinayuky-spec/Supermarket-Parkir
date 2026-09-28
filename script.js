/* =========================
   NAVIGASI TAB / HALAMAN
========================= */

function switchTab(halaman) {

    document
        .querySelectorAll('.tab-content')
        .forEach(c => c.classList.remove('active'));


    if (halaman === 'kasir') {

        document
            .getElementById('kasir-app')
            .classList.add('active');

    }

    else if (halaman === 'parkir') {

        document
            .getElementById('parkir-app')
            .classList.add('active');

    }

    else {

        document
            .getElementById('menu-utama')
            .classList.add('active');

    }

}


/* =========================
   LOGIKA ANTREAN MULTI-KASIR
========================= */

let antreanReguler = [];

let antreanPrioritas = [];

let counterReguler = 1;

let counterPrioritas = 1;

let tiketTerakhirSaya = "";


/* =========================
   AMBIL NOMOR ANTREAN
========================= */

function ambilNomorAntrean(jenis) {

    let nomor = "";


    if (jenis === 'Reguler') {

        nomor =
            "A-" +
            String(counterReguler).padStart(3, '0');

        counterReguler++;

        antreanReguler.push(nomor);

    }

    else {

        nomor =
            "P-" +
            String(counterPrioritas).padStart(3, '0');

        counterPrioritas++;

        antreanPrioritas.push(nomor);

    }


    tiketTerakhirSaya = nomor;


    document
        .getElementById("sNomorTerakhir")
        .innerText = nomor;


    renderDaftarAntrean();

}


/* =========================
   TAMPILKAN DAFTAR ANTREAN
========================= */

function renderDaftarAntrean() {

    let box =
        document.getElementById("boxDaftarAntrean");


    let gabungan = [];


    /* Prioritas ditampilkan di depan */

    antreanPrioritas.forEach(no => {

        gabungan.push({
            no: no,
            jenis: 'Prio'
        });

    });


    antreanReguler.forEach(no => {

        gabungan.push({
            no: no,
            jenis: 'Reg'
        });

    });


    /* Jika tidak ada antrean */

    if (gabungan.length === 0) {

        box.innerHTML =
            '<span style="color: #94a3b8; font-size: 13px; font-style: italic;">Belum ada antrean.</span>';


        document
            .getElementById("boxEstimasi")
            .classList.add("hidden");


        return;

    }


    /* Buat tampilan nomor */

    let html = "";


    gabungan.forEach(item => {

        let cls =
            item.jenis === 'Prio'
                ? 'tag-prioritas'
                : 'tag-reguler';


        html +=
            `<span class="tag-item ${cls}">${item.no}</span>`;

    });


    box.innerHTML = html;


    /* =========================
       HITUNG ESTIMASI
    ========================= */

    if (tiketTerakhirSaya !== "") {

        let indexDepan =
            gabungan.findIndex(
                item => item.no === tiketTerakhirSaya
            );


        if (indexDepan !== -1) {

            let orangDiDepan =
                indexDepan;


            /* 3 menit setiap transaksi */

            let estimasiMenit =
                orangDiDepan * 3;


            document
                .getElementById("sTiketSaya")
                .innerText =
                tiketTerakhirSaya;


            document
                .getElementById("sAntreanDepan")
                .innerText =
                orangDiDepan;


            document
                .getElementById("sEstWaktu")
                .innerText =
                estimasiMenit;


            document
                .getElementById("boxEstimasi")
                .classList.remove("hidden");

        }

        else {

            document
                .getElementById("boxEstimasi")
                .classList.add("hidden");

        }

    }

}


/* =========================
   PANGGIL KASIR
========================= */

function panggilKasir(nomorKasir) {

    let dipanggil = "";

    let teksSuara = "";


    /* =========================
       KASIR 1 PRIORITAS
    ========================= */

    if (nomorKasir === 1) {

        if (antreanPrioritas.length > 0) {

            dipanggil =
                antreanPrioritas.shift();

        }

        else if (antreanReguler.length > 0) {

            dipanggil =
                antreanReguler.shift();

        }

        else {

            alert(
                "Tidak ada antrean untuk Kasir 1!"
            );

            return;

        }


        document
            .getElementById("sKasir1")
            .innerText =
            dipanggil;


        teksSuara =
            `Nomor antrean ${dipanggil.replace('-', ' ')}, silakan menuju ke Kasir 1 Prioritas`;

    }


    /* =========================
       KASIR 2 REGULER
    ========================= */

    else if (nomorKasir === 2) {

        if (antreanReguler.length > 0) {

            dipanggil =
                antreanReguler.shift();

        }

        else if (antreanPrioritas.length > 0) {

            dipanggil =
                antreanPrioritas.shift();

        }

        else {

            alert(
                "Tidak ada antrean untuk Kasir 2!"
            );

            return;

        }


        document
            .getElementById("sKasir2")
            .innerText =
            dipanggil;


        teksSuara =
            `Nomor antrean ${dipanggil.replace('-', ' ')}, silakan menuju ke Kasir 2 Reguler`;

    }


    renderDaftarAntrean();


    /* =========================
       SUARA OTOMATIS
    ========================= */

    if ('speechSynthesis' in window) {

        let ucapan =
            new SpeechSynthesisUtterance(
                teksSuara
            );


        ucapan.lang = 'id-ID';


        window
            .speechSynthesis
            .speak(ucapan);

    }

}


/* =========================
   LOGIKA PARKIRKU
========================= */

let totalBayar = 0;

let durasi = 0;


/* =========================
   TANGGAL
========================= */

let sekarang = new Date();


document
    .getElementById("tanggal")
    .innerHTML =
    sekarang.toLocaleDateString(
        "id-ID",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );


/* =========================
   NOMOR TRANSAKSI
========================= */

function buatNomorTransaksi() {

    let sekarang = new Date();


    let tahun =
        sekarang.getFullYear();


    let bulan =
        String(
            sekarang.getMonth() + 1
        ).padStart(2, "0");


    let tanggal =
        String(
            sekarang.getDate()
        ).padStart(2, "0");


    let jam =
        String(
            sekarang.getHours()
        ).padStart(2, "0");


    let menit =
        String(
            sekarang.getMinutes()
        ).padStart(2, "0");


    let detik =
        String(
            sekarang.getSeconds()
        ).padStart(2, "0");


    return (
        tahun +
        bulan +
        tanggal +
        jam +
        menit +
        detik
    );

}


/* =========================
   HITUNG TARIF
========================= */

function hitung() {

    let kendaraan =
        document
            .getElementById("kendaraan")
            .value;


    let nomor =
        document
            .getElementById("nomorKendaraan")
            .value
            .trim();


    let masuk =
        document
            .getElementById("masuk")
            .value;


    let keluar =
        document
            .getElementById("keluar")
            .value;


    /* Validasi */

    if (
        kendaraan == "" ||
        nomor == "" ||
        masuk == "" ||
        keluar == ""
    ) {

        alert(
            "Lengkapi jenis kendaraan, nomor kendaraan, jam masuk, dan jam keluar!"
        );

        return;

    }


    /* Hitung waktu */

    let waktuMasuk =
        new Date(
            "2000-01-01T" + masuk
        );


    let waktuKeluar =
        new Date(
            "2000-01-01T" + keluar
        );


    let selisih =
        (waktuKeluar - waktuMasuk)
        / 1000
        / 60;


    /* Jika melewati tengah malam */

    if (selisih < 0) {

        selisih += 24 * 60;

    }


    /* Minimal 1 jam */

    durasi =
        Math.max(
            1,
            Math.ceil(selisih / 60)
        );


    /* =========================
       TARIF MOBIL
    ========================= */

    if (kendaraan == "Mobil") {

        totalBayar =
            5000 +
            (durasi - 1) * 3000;


        /* Diskon jika > 5 jam */

        if (durasi > 5) {

            totalBayar -= 2000;

        }

    }


    /* =========================
       TARIF MOTOR
    ========================= */

    else {

        totalBayar =
            3000 +
            (durasi - 1) * 2000;

    }


    /* Tampilkan hasil */

    document
        .getElementById("durasi")
        .innerHTML =
        durasi + " jam";


    document
        .getElementById("total")
        .innerHTML =
        rupiah(totalBayar);


    document
        .getElementById("hasil")
        .classList
        .remove("hidden");

}


/* =========================
   FORMAT RUPIAH
========================= */

function rupiah(angka) {

    return (
        "Rp" +
        angka.toLocaleString("id-ID")
    );

}


/* =========================
   PILIH PEMBAYARAN
========================= */

function cekTunai() {

    let metode =
        document
            .getElementById("metode")
            .value;


    if (metode == "Tunai") {

        document
            .getElementById("tunai")
            .classList
            .remove("hidden");

    }

    else {

        document
            .getElementById("tunai")
            .classList
            .add("hidden");

    }

}


/* =========================
   HITUNG KEMBALIAN
========================= */

function kembalian() {

    let uang =
        Number(
            document
                .getElementById("uang")
                .value
        );


    let kembali =
        uang - totalBayar;


    if (uang == 0) {

        document
            .getElementById("kembali")
            .innerHTML =
            "Rp0";

    }

    else if (kembali < 0) {

        document
            .getElementById("kembali")
            .innerHTML =
            "Uang kurang";

    }

    else {

        document
            .getElementById("kembali")
            .innerHTML =
            rupiah(kembali);

    }

}


/* =========================
   BAYAR
========================= */

function bayar() {

    let metode =
        document
            .getElementById("metode")
            .value;


    /* Validasi metode */

    if (metode == "") {

        alert(
            "Pilih metode pembayaran!"
        );

        return;

    }


    let uang = 0;

    let kembali = 0;


    /* =========================
       TUNAI
    ========================= */

    if (metode == "Tunai") {

        uang =
            Number(
                document
                    .getElementById("uang")
                    .value
            );


        if (
            uang == 0 ||
            uang < totalBayar
        ) {

            alert(
                "Uang yang diterima tidak cukup!"
            );

            return;

        }


        kembali =
            uang - totalBayar;

    }


    /* =========================
       WAKTU TRANSAKSI
    ========================= */

    let waktuTransaksi =
        new Date();


    let jamTransaksi =
        waktuTransaksi.toLocaleTimeString(
            "id-ID",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );


    let tanggalTransaksi =
        waktuTransaksi.toLocaleDateString(
            "id-ID",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );


    /* =========================
       MASUKKAN DATA KE STRUK
    ========================= */

    document
        .getElementById("sTransaksi")
        .innerHTML =
        buatNomorTransaksi();


    document
        .getElementById("sTanggal")
        .innerHTML =
        tanggalTransaksi;


    document
        .getElementById("sWaktu")
        .innerHTML =
        jamTransaksi;


    document
        .getElementById("sKendaraan")
        .innerHTML =
        document
            .getElementById("kendaraan")
            .value;


    document
        .getElementById("sNomor")
        .innerHTML =
        document
            .getElementById("nomorKendaraan")
            .value
            .toUpperCase();


    document
        .getElementById("sMasuk")
        .innerHTML =
        document
            .getElementById("masuk")
            .value;


    document
        .getElementById("sKeluar")
        .innerHTML =
        document
            .getElementById("keluar")
            .value;


    document
        .getElementById("sDurasi")
        .innerHTML =
        durasi + " jam";


    document
        .getElementById("sMetode")
        .innerHTML =
        metode;


    document
        .getElementById("sTotal")
        .innerHTML =
        rupiah(totalBayar);


    /* =========================
       STRUK TUNAI
    ========================= */

    if (metode == "Tunai") {

        document
            .getElementById("strukTunai")
            .classList
            .remove("hidden");


        document
            .getElementById("sUang")
            .innerHTML =
            rupiah(uang);


        document
            .getElementById("sKembalian")
            .innerHTML =
            rupiah(kembali);

    }

    else {

        document
            .getElementById("strukTunai")
            .classList
            .add("hidden");

    }


    /* =========================
       TAMPILKAN STRUK
    ========================= */

    document
        .getElementById("struk")
        .classList
        .remove("hidden");


    document
        .getElementById("struk")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   CETAK STRUK
========================= */

function cetakStruk() {

    window.print();

}


/* =========================
   TRANSAKSI BARU
========================= */

function baru() {

    /* Reset Form Input */

    document
        .getElementById("kendaraan")
        .value = "";


    document
        .getElementById("nomorKendaraan")
        .value = "";


    document
        .getElementById("masuk")
        .value = "";


    document
        .getElementById("keluar")
        .value = "";


    document
        .getElementById("metode")
        .value = "";


    document
        .getElementById("uang")
        .value = "";


    document
        .getElementById("kembali")
        .innerText =
        "Rp0";


    /* Sembunyikan hasil */

    document
        .getElementById("hasil")
        .classList
        .add("hidden");


    document
        .getElementById("tunai")
        .classList
        .add("hidden");


    document
        .getElementById("struk")
        .classList
        .add("hidden");


    /* Kembali ke atas */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}