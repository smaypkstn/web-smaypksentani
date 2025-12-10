// teachers.js — load teachers.json and render list or profile
document.addEventListener('DOMContentLoaded', async () => {
  // footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // load teacher data
  let resp;
  try {
    resp = await fetch('teachers.json');
    if (!resp.ok) throw new Error('teachers.json not found');
  } catch (err) {
    console.error(err);
    return;
  }

  const teachers = await resp.json();

  // helper: create teacher card
  function createCard(t) {
    const a = document.createElement('a');
    a.href = `profile.html?id=${encodeURIComponent(t.id)}`;
    a.className = 'teacher-card';
    a.style.display = 'block';
    a.style.textDecoration = 'none';
    a.style.color = 'inherit';

    const img = document.createElement('img');
    img.src = t.photo || 'img/placeholder.svg';
    img.alt = t.name;
    img.style.width = '100%';
    img.style.height = '180px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '8px';
    img.loading = 'lazy';

    const h3 = document.createElement('h3');
    h3.textContent = t.name;

    const p = document.createElement('p');
    p.textContent = `${t.role} — ${t.subject}`;
    p.style.color = 'var(--muted)';

    a.appendChild(img);
    a.appendChild(h3);
    a.appendChild(p);

    return a;
  }

  // If on teachers.html → render list
  const grid = document.getElementById('teachersGrid');
  if (grid) {
    grid.innerHTML = "";
    teachers.forEach(t => {
      const wrap = document.createElement('div');
      wrap.appendChild(createCard(t));
      grid.appendChild(wrap);
    });
    return;
  }

  // If on profile.html → render single profile
  const profileArea = document.getElementById('profileArea');
  if (profileArea) {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const t = teachers.find(x => x.id === id);

    if (!t) {
      profileArea.innerHTML = `<p>Profil tidak ditemukan. <a href="teachers.html">Kembali</a></p>`;
      return;
    }

    profileArea.innerHTML = `
      <div class="grid-2">
        <div>
          <img src="${t.photo}" alt="${t.name}" style="width:100%;max-width:420px;border-radius:8px">
        </div>
        <div>
          <h1>${t.name}</h1>
          <h3>${t.role} — ${t.subject}</h3>
          <p>Deskripsi lengkap belum ditambahkan. Silakan hubungi pihak sekolah untuk informasi lebih lanjut.</p>
          <p><a class="btn" href="index.html#contact">Kontak Sekolah</a></p>
        </div>
      </div>
    `;
  }
});
