(()=>{
 const params=new URLSearchParams(location.search),variant=['a','b','c'].includes(params.get('retning'))?params.get('retning'):'a';
 document.body.classList.add('direction-'+variant);
 document.querySelectorAll('[data-variant]').forEach(a=>a.setAttribute('aria-current',String(a.dataset.variant===variant)));
 const title=document.querySelector('h1[data-a]');if(title)title.innerHTML=title.dataset[variant];
 document.querySelectorAll('.next-project,.site-header nav a').forEach(a=>{if(/(husoy|horten)\.html$/.test(a.getAttribute('href')))a.href+='?retning='+variant});
 const main=document.querySelector('main'),intro=document.querySelector('.story-intro');
 if(variant==='b'&&intro)main.insertBefore(document.querySelector('.work'),intro);
 if(variant==='c'&&intro)main.insertBefore(document.querySelector('.process'),intro);
 const init=()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');let observer;
  const revealAll=()=>{observer?.disconnect();document.querySelectorAll('.reveal-pending').forEach(e=>e.classList.add('reveal-visible'))};
  if(!reduced.matches&&'IntersectionObserver' in window){
   observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(isIntersecting){target.classList.add('reveal-visible');observer.unobserve(target)}}),{threshold:0,rootMargin:'0px 0px -55px 0px'});
   document.querySelectorAll('.section h2,.chapter h3,.chapter p,.story-intro .prose p,.photo-heading,.photo-interlude figure,.detail figure,.detail .prose p,.process .prose p,.result .prose p,.contact-person,.project-card,.proposal').forEach(e=>{if(e.getBoundingClientRect().top>innerHeight-40){e.classList.add('reveal-pending');observer.observe(e)}});
   addEventListener('beforeprint',revealAll);reduced.addEventListener('change',()=>{if(reduced.matches)revealAll()});
  }
  const progress=document.querySelector('.reading-progress'),dock=document.querySelector('.chapter-dock'),photos=[...document.querySelectorAll('.image-frame')],sections=[...document.querySelectorAll('main>section[id]')];let scheduled=false;
  if(dock)dock.inert=true;
  sections.forEach(s=>s.querySelector('h2')?.classList.add('motion-title'));
  const update=()=>{
   const total=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.transform='scaleX('+Math.min(1,Math.max(0,total>0?scrollY/total:0))+')';
   if(!reduced.matches)photos.forEach(frame=>{const rect=frame.getBoundingClientRect();if(rect.bottom>0&&rect.top<innerHeight){const shift=Math.max(-22,Math.min(22,(innerHeight/2-(rect.top+rect.height/2))*.055));frame.style.setProperty('--photo-y',shift.toFixed(1)+'px')}});
   else photos.forEach(f=>f.style.removeProperty('--photo-y'));
   let current='';sections.forEach(s=>{const rect=s.getBoundingClientRect();if(rect.top<innerHeight*.48&&rect.bottom>100){current=s.id;s.classList.add('is-reading')}else s.classList.remove('is-reading')});
   if(dock){const contact=document.querySelector('#kontakt'),show=scrollY>600&&(!contact||contact.getBoundingClientRect().top>innerHeight*.5);dock.classList.toggle('is-shown',show);dock.inert=!show;dock.querySelectorAll('a').forEach(a=>a.setAttribute('aria-current',String(a.hash==='#'+current)))}scheduled=false;
  };
  const requestUpdate=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}};addEventListener('scroll',requestUpdate,{passive:true});addEventListener('resize',requestUpdate);reduced.addEventListener('change',requestUpdate);update();
  const share=document.querySelector('.share-button');share?.addEventListener('click',async()=>{const url=new URL(location.href);url.hash='';const status=document.querySelector('.share-status');try{await navigator.clipboard.writeText(url.href);share.textContent='Lenke kopiert ✓';if(status)status.textContent='Lenken er klar til å deles.';setTimeout(()=>{share.textContent='Kopier lenke ↗';if(status)status.textContent=''},3000)}catch{if(status)status.textContent='Kopier nettadressen fra adresselinjen.';share.textContent='Kopier fra adresselinjen'}});
  const viewer=document.querySelector('.image-viewer');let opener;
  document.querySelectorAll('.image-frame').forEach(button=>button.addEventListener('click',()=>{if(!viewer)return;opener=button;const image=button.querySelector('img');viewer.querySelector('img').src=image.src;viewer.querySelector('img').alt=image.alt;viewer.querySelector('p').textContent=button.closest('figure').querySelector('figcaption').textContent;viewer.showModal()}));
  viewer?.querySelector('.viewer-close').addEventListener('click',()=>viewer.close());viewer?.addEventListener('click',e=>{if(e.target===viewer){const b=viewer.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)viewer.close()}});viewer?.addEventListener('close',()=>opener?.focus());
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
