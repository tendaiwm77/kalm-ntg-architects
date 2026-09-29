const SITE_CONFIG = {
  facebookUrl: 'https://www.facebook.com/profile.php?id=61594772277377',
  formEndpoint: '',
  email: 'kalmntgarch@gmail.com',
  phones: ['073 152 4714', '076 317 9459', '+263 78 966 6475']
};

const navItems = [
  ['index.html','Home'], ['about.html','About'], ['services.html','Services'],
  ['projects.html','Projects'], ['locations.html','Locations'], ['contact.html','Contact']
];

function renderShell(){
  const page=document.body.dataset.page||'home';
  const nav=navItems.map(([href,label])=>`<a class="${page===label.toLowerCase()?'active':''}" href="${href}">${label}</a>`).join('');
  document.querySelector('#site-header').innerHTML=`
    <header class="site-header"><div class="container nav">
      <a class="brand" href="index.html" aria-label="KALM-NTG ARCHITECTS home"><img src="assets/images/kalm-ntg-logo.png" alt="KALM-NTG ARCHITECTS logo"></a>
      <button class="menu-btn" aria-label="Open menu" aria-expanded="false">☰</button>
      <nav class="nav-links">${nav}<a class="nav-cta" href="contact.html">Request a Quote</a></nav>
    </div></header>`;

  document.querySelector('#site-footer').innerHTML=`
    <footer class="footer"><div class="container">
      <div class="footer-grid">
        <div><img class="footer-brand" src="assets/images/kalm-ntg-logo.png" alt="KALM-NTG ARCHITECTS"><p style="margin-top:18px">Multidisciplinary architectural design, construction, documentation and project supervision across South Africa, Botswana and Zimbabwe.</p>
          <div class="icon-row"><a class="social-icon" href="${SITE_CONFIG.facebookUrl}" target="_blank" rel="noopener" aria-label="Facebook">f</a><a class="social-icon" href="https://wa.me/27763179459" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a></div>
        </div>
        <div><h4>Explore</h4><div class="footer-links">${navItems.map(([h,l])=>`<a href="${h}">${l}</a>`).join('')}</div></div>
        <div><h4>Our offices</h4><p><strong>Johannesburg</strong><br>39 Meyer Street, Triomf 2092<br><a href="tel:+27731524714">073 152 4714</a></p><p><strong>Mahikeng</strong><br>25 Churchill Street, Golfview, Mafikeng 2745<br><a href="tel:+27763179459">076 317 9459</a></p><p><strong>Botswana</strong><br>Plot 2687 Botshabelo Ward, Kumakalane, Gaborone</p><p><strong>Zimbabwe</strong><br>231B Manson Street, Carrick Creagh, Borrowdale, Harare<br><a href="tel:+263789666475">+263 78 966 6475</a></p></div>
        <div><h4>Start a project</h4><p><a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a></p><p>Reg No: 2012/175002/07<br>VAT No: 4500294139</p><a class="btn btn-primary" href="contact.html">Request a quotation →</a></div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} KALM-NTG ARCHITECTS. All rights reserved.</span><span>KALM.Ntg Architects (Pty) Ltd</span></div>
    </div></footer>`;

  const menuBtn=document.querySelector('.menu-btn'),links=document.querySelector('.nav-links');
  menuBtn?.addEventListener('click',()=>{links.classList.toggle('open');menuBtn.setAttribute('aria-expanded',links.classList.contains('open'))});
  links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.setProperty('--reveal-delay',`${Math.min(i*60,360)}ms`);observer.observe(el)});
  document.querySelectorAll('.stagger').forEach(group=>{[...group.children].forEach((el,i)=>el.style.setProperty('--i',i));staggerObserver.observe(group)});
  document.querySelectorAll('[data-facebook]').forEach(a=>a.href=SITE_CONFIG.facebookUrl);

  document.querySelectorAll('main section:not(.hero) .media-card,main section:not(.hero) .project,main section:not(.hero) .location,main section:not(.hero) .info-card,main section:not(.hero) .btn').forEach((el,i)=>{
    if(!el.classList.contains('reveal')&&!el.parentElement?.classList.contains('stagger')){el.classList.add('motion-in');el.style.setProperty('--motion-delay',`${Math.min((i%6)*70,350)}ms`);motionObserver.observe(el)}
  });

  const form=document.querySelector('#contact-form');
  if(form){
    if(SITE_CONFIG.formEndpoint){form.action=SITE_CONFIG.formEndpoint;}
    form.addEventListener('submit',e=>{
      if(!SITE_CONFIG.formEndpoint){
        e.preventDefault();
        const subject=encodeURIComponent('KALM-NTG website enquiry — '+(form.service?.value||'Project enquiry'));
        const body=encodeURIComponent('Name: '+(form.name?.value||'')+'\nEmail: '+(form.email?.value||'')+'\nPhone: '+(form.phone?.value||'')+'\nProject location: '+(form.project_location?.value||'')+'\nService: '+(form.service?.value||'')+'\nBudget / stage: '+(form.budget?.value||'')+'\n\nProject details:\n'+(form.message?.value||''));
        window.location.href=`mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
        showToast('Opening your email app with the enquiry ready to send.');
      }
    });
  }
}nst SITE_CONFIG = {
  facebookUrl: 'https://www.facebook.com/profile.php?id=61594772277377',
  formEndpoint: '',
  email: 'kalmntgarch@gmail.com',
  phones: ['073 152 4714', '076 317 9459', '+263 78 966 6475']
};

const navItems = [
  ['index.html','Home'], ['about.html','About'], ['services.html','Services'],
  ['projects.html','Projects'], ['locations.html','Locations'], ['contact.html','Contact']
];

function renderShell(){
  const page = document.body.dataset.page || 'home';
  const nav = navItems.map(([href,label])=>`<a class="${page===label.toLowerCase()?'active':''}" href="${href}">${label}</a>`).join('');
  document.querySelector('#site-header').innerHTML = `
    <div class="topbar"><div class="container"><span>Architecture • Construction • Documentation • Project Supervision</span><span><a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a></span></div></div>
    <header class="site-header"><div class="container nav">
      <a class="brand" href="index.html" aria-label="KALM-NTG ARCHITECTS home"><img src="assets/images/kalm-ntg-logo.png" alt="Kalm. Ntg Architects logo"></a>
      <button class="menu-btn" aria-label="Open menu" aria-expanded="false">☰</button>
      <nav class="nav-links">${nav}<a class="nav-cta" href="contact.html">Request a Quote</a></nav>
    </div></header>`;

  document.querySelector('#site-footer').innerHTML = `
    <footer class="footer"><div class="container">
      <div class="footer-grid">
        <div><img src="assets/images/kalm-ntg-logo.png" alt="Kalm. Ntg Architects" style="width:220px;background:#fff;border-radius:10px;padding:8px"><p style="margin-top:18px">Multidisciplinary architectural design, documentation, construction and project supervision across South Africa, Botswana and Zimbabwe.</p><a href="${SITE_CONFIG.facebookUrl}" target="_blank" rel="noopener">Facebook →</a></div>
        <div><h4>Explore</h4><div class="footer-links">${navItems.map(([h,l])=>`<a href="${h}">${l}</a>`).join('')}</div></div>
        <div><h4>Our offices</h4><p>Johannesburg<br>39 Meyer Street, Triomf 2092<br>073 152 4714</p><p>Mahikeng<br>25 Churchill Street, Golfview<br>076 317 9459</p><p>Botswana<br>Plot 2687 Botshabelo Ward, Kumakalane, Gaborone</p><p>Zimbabwe<br>231B Manson Street, Carrick Creagh, Borrowdale, Harare<br>+263 78 966 6475</p></div>
        <div><h4>Company information</h4><p><a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a></p><p>Reg No: 2012/175002/07<br>VAT No: 4500294139</p><a class="btn btn-primary" href="contact.html">Start a Project</a></div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} KALM-NTG ARCHITECTS. All rights reserved.</span><span>KALM.Ntg Architects (Pty) Ltd</span></div>
    </div></footer>`;

  const menuBtn=document.querySelector('.menu-btn'), links=document.querySelector('.nav-links');
  menuBtn?.addEventListener('click',()=>{links.classList.toggle('open');menuBtn.setAttribute('aria-expanded',links.classList.contains('open'))});

  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.setProperty('--reveal-delay',`${Math.min(i*60,360)}ms`);observer.observe(el)});
  document.querySelectorAll('.stagger').forEach(group=>{[...group.children].forEach((el,i)=>el.style.setProperty('--i',i));staggerObserver.observe(group)});
  document.querySelectorAll('[data-facebook]').forEach(a=>a.href=SITE_CONFIG.facebookUrl);

  // Give image-heavy and interactive content a smooth reveal throughout every page.
  document.querySelectorAll('main section:not(.hero) .media-card, main section:not(.hero) .project, main section:not(.hero) .location, main section:not(.hero) .info-card, main section:not(.hero) .btn').forEach((el,i)=>{
    if(!el.classList.contains('reveal') && !el.parentElement?.classList.contains('stagger')){
      el.classList.add('motion-in');
      el.style.setProperty('--motion-delay',`${Math.min((i%6)*70,350)}ms`);
      motionObserver.observe(el);
    }
  });

  const form=document.querySelector('#contact-form');
  if(form){
    form.action=SITE_CONFIG.formEndpoint;
    form.addEventListener('submit',e=>{
      if(SITE_CONFIG.formEndpoint.includes('YOUR_FORM_ID')){
        e.preventDefault();
        const name=encodeURIComponent(form.name.value||'Website enquiry');
        const message=encodeURIComponent(form.message.value||'Please contact me regarding your services.');
        window.location.href=`mailto:${SITE_CONFIG.email}?subject=${name}&body=${message}`;
        showToast('Your email app will open to send the enquiry.');
      }
    });
  }
}

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
const staggerObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');staggerObserver.unobserve(e.target)}}),{threshold:.12});
const motionObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('motion-visible');motionObserver.unobserve(e.target)}}),{threshold:.08});

function updateScrollEffects(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const progress=max>0?window.scrollY/max:0;
  document.querySelector('.scroll-progress')?.style.setProperty('transform',`scaleX(${progress})`);
  const hero=document.querySelector('.hero');
  if(hero){const y=Math.min(window.scrollY*.16,90);hero.style.backgroundPosition=`center calc(50% + ${y}px)`;}
  const cinematic=document.querySelector('.cinematic');
  if(cinematic){
    const rect=cinematic.getBoundingClientRect();
    const range=Math.max(cinematic.offsetHeight-window.innerHeight,1);
    const p=Math.min(Math.max(-rect.top/range,0),1);
    const image=cinematic.querySelector('.cinematic-image img');
    const content=cinematic.querySelector('.cinematic-content');
    if(image){image.style.transform=`scale(${1.1-p*.08}) translateY(${p*-28}px)`;image.style.filter=`brightness(${.78+p*.15}) saturate(${.82+p*.18})`;}
    if(content){content.style.transform=`translateY(${(1-p)*22}px)`;content.style.opacity=Math.min(1,p*3+.15);}
  }
}
let ticking=false;
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{updateScrollEffects();ticking=false});ticking=true}},{passive:true});
document.addEventListener('DOMContentLoaded',()=>{renderShell();updateScrollEffects()});
function showToast(t){const x=document.querySelector('.toast');if(!x)return;x.textContent=t;x.classList.add('show');setTimeout(()=>x.classList.remove('show'),3500)}
