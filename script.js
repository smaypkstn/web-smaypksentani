// Simple interactions: mobile menu + contact form demo
document.addEventListener('DOMContentLoaded', function(){
  // year in footer
  const year = new Date().getFullYear();
  document.getElementById('year').textContent = year;

  // mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  menuBtn.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    if(!expanded) nav.style.display = 'flex';
    else nav.style.display = '';
  });

  // contact form demo (non-sending)
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah diterima (demo).');
    form.reset();
  });
});
