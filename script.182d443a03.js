(()=>{
 const params=new URLSearchParams(location.search),variant=['a','b','c'].includes(params.get('retning'))?params.get('retning'):'a';
 document.body.classList.remove('direction-a','direction-b','direction-c');document.body.classList.add('direction-'+variant);
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
   document.querySelectorAll('.section:not(.contact) h2,.chapter h3,.photo-heading,.photo-interlude figure,.detail figure,.project-card,.proposal').forEach(e=>{if(e.getBoundingClientRect().top>innerHeight-40){e.classList.add('reveal-pending');observer.observe(e)}});
   addEventListener('beforeprint',revealAll);reduced.addEventListener('change',()=>{if(reduced.matches)revealAll()});
  }
  const hero=document.querySelector('.immersive-hero');
  if(hero&&'IntersectionObserver' in window){const heroObserver=new IntersectionObserver(([entry])=>document.body.classList.toggle('hero-in-view',entry.isIntersecting),{rootMargin:'-140px 0px 0px 0px'});heroObserver.observe(hero)}
  document.querySelectorAll('.project-menu a').forEach(a=>a.addEventListener('click',()=>a.closest('details').open=false));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){const menu=document.querySelector('.project-menu[open]');if(menu){menu.open=false;menu.querySelector('summary').focus()}}});
  const projectMenu=document.querySelector('.project-menu');
  document.addEventListener('pointerdown',e=>{if(projectMenu?.open&&!projectMenu.contains(e.target))projectMenu.open=false});
  document.addEventListener('focusin',e=>{if(projectMenu?.open&&!projectMenu.contains(e.target))projectMenu.open=false});
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
  const share=document.querySelector('.share-button');share?.addEventListener('click',async()=>{const url=new URL(location.origin+location.pathname);if(params.has('retning'))url.searchParams.set('retning',variant);const status=document.querySelector('.share-status');try{await navigator.clipboard.writeText(url.href);share.textContent='Lenke kopiert ✓';if(status)status.textContent='Lenken er klar til å deles.';setTimeout(()=>{share.textContent='Kopier lenke ↗';if(status)status.textContent=''},3000)}catch{if(status)status.textContent='Kopier nettadressen fra adresselinjen.';share.textContent='Kopier fra adresselinjen'}});
  const form=document.querySelector('.project-form');
  if(form){
   const status=form.querySelector('.form-status');
   const draft=()=>{const d=new FormData(form);return {subject:'Forespørsel: '+d.get('project'),body:['Hei Henrik!','',String(d.get('message')).trim(),'','Navn: '+String(d.get('name')).trim(),'Telefon: '+String(d.get('phone')).trim(),'E-post: '+String(d.get('email')).trim(),'Type prosjekt: '+d.get('project'),'','Prosjektside: '+location.origin+location.pathname].join('\n')}};
   form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const d=draft();status.textContent='E-postprogrammet åpnes. Forespørselen er ikke sendt ennå – send den derfra. Hvis ingenting åpnes, velg «Kopier forespørselen i stedet».';location.href='mailto:post@eiken-bygg.no?subject='+encodeURIComponent(d.subject)+'&body='+encodeURIComponent(d.body)});
   form.querySelector('.form-copy').addEventListener('click',async()=>{if(!form.reportValidity())return;const d=draft(),text=d.subject+'\n\n'+d.body;try{await navigator.clipboard.writeText(text);status.textContent='Forespørselen er kopiert. Lim den inn i en e-post til post@eiken-bygg.no. Ingenting er sendt.'}catch{const fallback=form.querySelector('.copy-fallback');fallback.hidden=false;const field=fallback.querySelector('textarea');field.value=text;field.focus();field.select();status.textContent='Kopier den markerte teksten. Ingenting er sendt.'}});
   form.querySelector('.form-fields').disabled=false;
   const editState=()=>document.body.classList.toggle('editing-form',form.contains(document.activeElement));
   form.addEventListener('focusin',editState);form.addEventListener('focusout',()=>requestAnimationFrame(editState));
  }
  document.querySelectorAll('a[href="#henrik"]').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#henrik')?.focus({preventScroll:true})}));
  const viewer=document.querySelector('.image-viewer'),buttons=[...document.querySelectorAll('.image-frame')],gallery=buttons.filter((button,index)=>buttons.findIndex(b=>b.querySelector('img').src===button.querySelector('img').src)===index);let opener,index=0;
  const showPhoto=n=>{index=(n+gallery.length)%gallery.length;const button=gallery[index],image=button.querySelector('img');viewer.querySelector('img').src=image.src;viewer.querySelector('img').alt=image.alt;viewer.querySelector('p').textContent=button.closest('figure').querySelector('figcaption').textContent;const count=viewer.querySelector('.gallery-count');if(count)count.textContent=(index+1)+' / '+gallery.length};
  buttons.forEach(button=>button.addEventListener('click',()=>{if(!viewer)return;opener=button;showPhoto(gallery.findIndex(b=>b.querySelector('img').src===button.querySelector('img').src));viewer.showModal();document.body.classList.add('gallery-open')}));
  viewer?.querySelector('.gallery-prev')?.addEventListener('click',()=>showPhoto(index-1));viewer?.querySelector('.gallery-next')?.addEventListener('click',()=>showPhoto(index+1));
  viewer?.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();showPhoto(index+(e.key==='ArrowRight'?1:-1))}});
  viewer?.querySelector('.viewer-close').addEventListener('click',()=>viewer.close());viewer?.addEventListener('click',e=>{if(e.target===viewer){const b=viewer.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)viewer.close()}});viewer?.addEventListener('close',()=>{document.body.classList.remove('gallery-open');opener?.focus({preventScroll:true})});

 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
