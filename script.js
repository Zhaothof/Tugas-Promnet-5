const inputTask = document.getElementById('inputTask');
const listContainer = document.getElementById('listContainer');
const tombol = document.getElementById('tombol');
const totalTugas = document.getElementById('totalTugas');
const tugasSelesai = document.getElementById('tugasSelesai');
const tugasBelum = document.getElementById('tugasBelum');

// Membuat satu item tugas (checkbox + teks + tombol hapus)
function buatItem(teks, selesai) {
    const li = document.createElement('li');

    const cek = document.createElement('input');
    cek.type = 'checkbox';
    cek.checked = selesai;

    const label = document.createElement('span');
    label.className = 'teks';
    label.textContent = teks;

    const hapus = document.createElement('button');
    hapus.className = 'hapus';
    hapus.textContent = 'Hapus';

    if (selesai) {
        li.classList.add('completed');
    }

    // Tandai selesai lewat checkbox
    cek.addEventListener('change', function () {
        li.classList.toggle('completed', cek.checked);
        updateStats();
        saveData();
    });

    // Klik teks juga bisa menandai selesai
    label.addEventListener('click', function () {
        cek.checked = !cek.checked;
        cek.dispatchEvent(new Event('change'));
    });

    // Hapus tugas dengan remove()
    hapus.addEventListener('click', function () {
        li.remove();
        updateStats();
        saveData();
    });

    li.append(cek, label, hapus);
    return li;
}

// Tambah tugas baru (dengan validasi)
function tambahTugas() {
    const teks = inputTask.value.trim();

    if (teks === '') {
        alert('Tugas tidak boleh kosong! Silakan ketik tugas terlebih dahulu.');
        return;
    }

    listContainer.append(buatItem(teks, false));
    inputTask.value = '';
    inputTask.focus();

    updateStats();
    saveData();
}

tombol.addEventListener('click', tambahTugas);

inputTask.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        tambahTugas();
    }
});

// Rekap statistik
function updateStats() {
    const total = listContainer.querySelectorAll('li').length;
    const selesai = listContainer.querySelectorAll('li.completed').length;

    totalTugas.textContent = total;
    tugasSelesai.textContent = selesai;
    tugasBelum.textContent = total - selesai;
}

// Simpan & muat data dari localStorage
function saveData() {
    const data = [];
    listContainer.querySelectorAll('li').forEach(function (li) {
        data.push({
            teks: li.querySelector('.teks').textContent,
            selesai: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tugasBaru', JSON.stringify(data));
}

function muatData() {
    const data = JSON.parse(localStorage.getItem('tugasBaru')) || [];
    data.forEach(function (item) {
        listContainer.append(buatItem(item.teks, item.selesai));
    });
    updateStats();
}

muatData();
