'use strict';
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
const menuButton = document.querySelector('.menu-toggle');
const menu = menuButton?.parentElement.querySelector('nav');
function closeMenu(){ if(!menuButton || !menu) return; menu.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation'); }
menuButton?.addEventListener('click',()=>{const open=menu.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();}});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
if(!motion.matches && window.matchMedia('(pointer:fine)').matches){
 let frame; window.addEventListener('pointermove',e=>{if(frame)cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{document.documentElement.style.setProperty('--mx',`${e.clientX-window.innerWidth/2}px`);document.documentElement.style.setProperty('--my',`${e.clientY-window.innerHeight/2}px`);});},{passive:true});
}
// Small, non-blocking reveal: content remains visible if JavaScript is unavailable.
if(!motion.matches && 'IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.animate([{opacity:.55,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'ease-out'});observer.unobserve(entry.target);}});},{threshold:.12});
 document.querySelectorAll('.section-heading,.steps article,.work-card,.sample-story>div,.offer').forEach(el=>observer.observe(el));
}
const projectForm=document.getElementById('project-form');
if(projectForm){
 const params=new URLSearchParams(location.search);const chosen=params.get('service');if(['website','redesign','custom'].includes(chosen))projectForm.elements.service.value=chosen;
 const inspiration=params.get('inspiration');const valid=['restaurant','salon','dental','fitness','home-services','tutoring','retail','real-estate'];if(valid.includes(inspiration))projectForm.elements.message.value=`I liked the ${inspiration.replaceAll('-',' ')} concept. My project is `;
 projectForm.addEventListener('submit',e=>{
  e.preventDefault();if(!projectForm.reportValidity())return;if(projectForm.elements.company_url.value)return;
  const values=Object.fromEntries(new FormData(projectForm));
  const service=projectForm.elements.service.selectedOptions[0].textContent;
  const brief=`Hello Meridius,\n\nI'd like to discuss a project.\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\nBusiness: ${values.business.trim()}\nWebsite: ${values.website.trim()||'Not yet'}\nService: ${service}\n\nProject:\n${values.message.trim()}\n\nPlease send the next steps and a proposal. I understand scope and payment terms will be agreed before an invoice is issued.`;
  const url=`mailto:meridiusai.agency@gmail.com?subject=${encodeURIComponent('Website enquiry — '+values.business.trim())}&body=${encodeURIComponent(brief)}`;
  const status=document.getElementById('form-status');status.replaceChildren();
  const p=document.createElement('p');p.textContent='Your brief is ready. Open your email app and press Send to deliver it. If no app opens, copy the brief and email meridiusai.agency@gmail.com. This site has not sent your enquiry.';status.append(p);
  const link=document.createElement('a');link.href=url;link.textContent='Open email app ↗';status.append(link);
  const copy=document.createElement('button');copy.type='button';copy.textContent='Copy brief';copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(brief);copy.textContent='Copied ✓';}catch{const box=document.createElement('textarea');box.value=brief;box.readOnly=true;box.setAttribute('aria-label','Your enquiry brief');status.append(box);box.select();copy.textContent='Select and copy below';}});status.append(copy);
  const download=document.createElement('a');download.textContent='Download brief';download.download='meridius-project-brief.txt';download.href=URL.createObjectURL(new Blob([brief],{type:'text/plain'}));status.append(download);
  status.scrollIntoView({behavior:motion.matches?'auto':'smooth',block:'nearest'});
 });
}
document.querySelectorAll('.demo-form').forEach(form=>{
 const date=form.querySelector('input[type=date]');if(date){const today=new Date();date.min=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');}
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;form.querySelector('.demo-status').textContent='That’s the experience. In a live site, your request would now reach the business. This is a concept demo: nothing was sent, saved, booked, or charged.';});
});
