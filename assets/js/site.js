const SITE_CONFIG = {
  facebookUrl: 'https://www.facebook.com/YOUR_PAGE',
  formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
  email: 'kalmntgarch@gmail.com',
  phones: ['073 152 4714', '076 317 9459']
};

const navItems = [
  ['index.html','Home'], ['about.html','About'], ['services.html','Services'],
  ['projects.html','Projects'], ['locations.html','Locations'], ['contact.html','Contact']
];

function renderShell(){
  const page = document.body.dataset.page || 'home';
  const nav = navItems.map(([href,label])=>`<a class="${page===label.toLowerCase()?'active':''}" href="${href}">${label}</a>`).join('');
  document.querySelector('#site-header').innerHTML = `
    <div class="topbar"><div class="container"><span>Architecture • Construction • Renovations • Project Supervision</span><span><a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a></span></div></div>
    <header class="site-header"><div class="container nav">
      <a class="brand" href="index.html" aria-label="KALM-NTG ARCHITECTS home"><img src="assets/images/kalm-ntg-logo.png" alt="Kalm. Ntg Architects logo"></a>
      <button class="menu-btn" aria-label="Open menu" aria-expanded="false">☰</button>
      <nav class="nav-links">${nav}<a class="nav-cta" href="contact.html">Request a Quote</a></nav>
    </div></header>`;

  document.querySelector('#site-footer').innerHTML = `
    <footer class="footer"><div class="container">
      <div class="footer-grid">
        <div><img src="assets/images/kalm-ntg-logo.png" alt="Kalm. Ntg Architects" style="width:220px;background:#fff;border-radius:10px;padding:8px"><p style="margin-top:18px">From concept to completion — architectural design, construction, renovations and project supervision.</p><a href="${SITE_CONFIG.facebookUrl}" target="_blank" rel="noopener">Facebook →</a></div>
        <div><h4>Explore</h4><div class="footer-links">${navItems.map(([h,l])=>`<a href="${h}">${l}</a>`).join('')}</div></div>
        <div><h4>Johannesburg</h4><p>39 Meyer Street, Triomf 2092<br>073 152 4714</p><h4>Mahikeng</h4><p>25 Churchill Street<br>Golfview, Mafikeng 2745<br>076 317 9459</p></div>
        <div><h4>Contact</h4><p><a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a></p><a class="btn btn-primary" href="contact.html">Start a Project</a></div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} KALM-NTG ARCHITECTS. All rights reserved.</span><span>KALM.Ntg Architects (Pty) Ltd • Reg No: 2012/175002/07 • VAT No: 4500294139</span></div>
    </div></footer>`;

  const menuBtn=document.querySelector('.menu-btn'), links=document.querySelector('.nav-links');
  menuBtn?.addEventListener('click',()=>{links.classList.toggle('open');menuBtn.setAttribute('aria-expanded',links.classList.contains('open'))});

  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  document.querySelectorAll('[data-facebook]').forEach(a=>a.href=SITE_CONFIG.facebookUrl);
  const form=document.querySelector('#contact-form');
  if(form){
    form.action=SITE_CONFIG.formEndpoint;
    form.addEventListener('submit',e=>{
      if(SITE_CONFIG.formEndpoint.includes('YOUR_FORM_ID')){
        e.preventDefault();
        const email=encodeURIComponent(SITE_CONFIG.email);
        const name=encodeURIComponent(form.name.value||'Website enquiry');
        const message=encodeURIComponent(form.message.value||'Please contact me regarding your services.');
        window.location.href=`mailto:${SITE_CONFIG.email}?subject=${name}&body=${message}`;
        showToast('Your email app will open to send the enquiry.');
      }
    });
  }
}

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
function showToast(t){const x=document.querySelector('.toast');if(!x)return;x.textContent=t;x.classList.add('show');setTimeout(()=>x.classList.remove('show'),3500)}
document.addEventListener('DOMContentLoaded',renderShell);
