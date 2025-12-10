document.addEventListener('DOMContentLoaded', async () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  let resp;
  try { resp = await fetch('teachers.json'); if (!resp.ok) throw 0; }
  catch (e) { console.warn('teachers.json not found'); return; }
  const teachers = await resp.json();

  function createCard(t){
    const a = document.createElement('a');
    a.href = `profile.html?id=${encodeURIComponent(t.id)}`;
    a.className = 'teacher-card';
    a.style.display='block';
    a.innerHTML = `
      <img src="${t.photo}" alt="${t.name}" />
      <h3>${t.name}</h3>
      <p class="lead">${t.role} — ${t.subject}</p>
    `;
    return a;
  }

  const grid = document.getElementById('teachersGrid');
  if (grid){
    grid.innerHTML = '';
    teachers.forEach(t => {
      const wrapper = document.createElement('div');
      wrapper.appendChild(createCard(t));
      grid.appendChild(wrapper);
    });
    return;
  }

  const profileArea = document.getElementById('profileArea');
  if (profileArea){
    const id = new URLSearchParams(location.search).get('id');
    const t = teachers.find(x=>x.id===id);
    if (!t) { profileArea.innerHTML = '<p>Profil tidak ditemukan. <a href="teachers.html">Kembali</a></p>'; return; }
    profileArea.innerHTML = `
      <div class="grid-2">
        <div><img src="${t.photo}" alt="${t.name}" style="width:100%;max-width:420px;border-radius:8px"></div>
        <div>
          <h1>${t.name}</h1>
          <h3>${t.role} — ${t.subject}</h3>
          <p>Informasi detail (pendidikan, pengalaman) tersedia di admin sekolah.</p>
        </div>
      </div>
    `;
  }
});
