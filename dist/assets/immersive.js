'use strict';
// Original Meridius ribbon sculpture. No external rendering library or media required.
(()=>{
 const canvas=document.querySelector('#ambient-stage');if(!canvas)return;
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const control=document.querySelector('.ambient-toggle'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let width=1,height=1,dpr=1,time=0,last=null,raf=0,paused=false,scroll=0,desiredScroll=0,px=0,py=0,tx=0,ty=0;
 const vertices=[],faces=[],TAU=Math.PI*2;
 for(let petal=0;petal<9;petal++){
  const offset=vertices.length;
  for(let row=0;row<=44;row++)for(let col=0;col<=5;col++)vertices.push({petal,u:row/44,v:col/5-.5});
  for(let row=0;row<44;row++)for(let col=0;col<5;col++){const a=offset+row*6+col;faces.push([a,a+1,a+7,a+6])}
 }
 function shape(p){
  const u=p.u,v=p.v,phase=p.petal/9*TAU;
  const breath=Math.sin(time*.65+phase)*.055;
  const radius=.19+1.05*Math.pow(Math.sin(u*Math.PI),.85)+breath;
  const theta=phase+u*2.8+Math.sin(time*.22+u*3)*.13;
  const spread=v*(.15+.9*Math.sin(u*Math.PI));
  let x=Math.cos(theta)*radius-Math.sin(theta)*spread,y=(u-.5)*2.8+Math.sin(u*TAU+phase+time*.45)*.08,z=Math.sin(theta)*radius+Math.cos(theta)*spread;
  const ay=time*.12+px*.28+scroll*.3,ax=-.23+py*.18+Math.sin(scroll)*.12;
  const xx=x*Math.cos(ay)+z*Math.sin(ay),zz=z*Math.cos(ay)-x*Math.sin(ay);
  return{x:xx,y:y*Math.cos(ax)-zz*Math.sin(ax),z:y*Math.sin(ax)+zz*Math.cos(ax)};
 }
 function composition(){
  const mobile=width<801,phase=scroll;
  const x=mobile?.56:.64+Math.sin(phase*1.32)*.21;
  return {cx:width*x,cy:height*(mobile?.32:.45),scale:Math.min(width*(mobile?.33:.30),height*.28),opacity:phase>2.45&&phase<4.1?.35:1};
 }
 function render(){
  ctx.clearRect(0,0,width,height);const c=composition();
  const halo=ctx.createRadialGradient(c.cx,c.cy,0,c.cx,c.cy,c.scale*2.5);halo.addColorStop(0,'rgba(64,125,126,.12)');halo.addColorStop(1,'rgba(5,11,16,0)');ctx.fillStyle=halo;ctx.fillRect(0,0,width,height);
  const points=vertices.map(shape),projected=points.map(p=>{const perspective=5/(5-p.z);return{x:c.cx+p.x*c.scale*perspective,y:c.cy+p.y*c.scale*perspective,z:p.z}});
  const sorted=faces.map(f=>({f,z:f.reduce((s,i)=>s+points[i].z,0)/4})).sort((a,b)=>a.z-b.z);
  ctx.globalAlpha=c.opacity;
  for(const {f,z} of sorted){const p=vertices[f[0]],light=(z+1.6)/3.2,amber=(p.petal%3===0),hue=amber?27:166+(p.petal%3)*12;ctx.beginPath();f.forEach((id,i)=>{const q=projected[id];i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y)});ctx.closePath();ctx.fillStyle=`hsla(${hue},${amber?62:37}%,${26+light*37}%,${.065+light*.12})`;ctx.fill();ctx.strokeStyle=`hsla(${hue},${amber?68:43}%,${50+light*25}%,${.04+light*.10})`;ctx.lineWidth=.6;ctx.stroke()}
  // Continuous luminous edges give the sculpture its woven, organic surface.
  for(let p=0;p<9;p++)for(const side of [0,5]){ctx.beginPath();for(let row=0;row<=44;row++){const q=projected[p*270+row*6+side];row?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y)}ctx.strokeStyle=p%3===0?'rgba(241,177,134,.45)':'rgba(132,214,201,.31)';ctx.lineWidth=.9;ctx.stroke()}
  ctx.globalAlpha=1;
 }
 function tick(now){raf=0;if(paused||reduced.matches||document.hidden){last=null;return}const dt=last===null?0:Math.min((now-last)/1000,.05);last=now;time+=dt;const ease=1-Math.exp(-dt*3);px+=(tx-px)*ease;py+=(ty-py)*ease;scroll+=(desiredScroll-scroll)*ease;render();raf=requestAnimationFrame(tick)}
 function resize(){width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio||1,1.6);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);desiredScroll=window.scrollY/height;scroll=desiredScroll;render()}
 function sync(){cancelAnimationFrame(raf);last=null;control.hidden=reduced.matches;control.textContent=paused?'Play motion':'Pause motion';control.setAttribute('aria-pressed',String(paused));if(!paused&&!reduced.matches&&!document.hidden)raf=requestAnimationFrame(tick);else render()}
 window.addEventListener('pointermove',e=>{if(e.pointerType==='touch'||paused||reduced.matches)return;tx=(e.clientX/width-.5)*2;ty=(e.clientY/height-.5)*2},{passive:true});document.addEventListener('pointerleave',()=>{tx=ty=0});
 window.addEventListener('scroll',()=>{desiredScroll=window.scrollY/height;if(reduced.matches||paused){scroll=desiredScroll;render()}},{passive:true});
 window.addEventListener('resize',resize);control.addEventListener('click',()=>{paused=!paused;sync()});reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);resize();sync();
})();
(()=>{
 const tabs=[...document.querySelectorAll('[data-concept]')],preview=document.querySelector('#site-preview');if(!preview)return;
 const data=[
 ['restaurant','Juniper & Rye','Restaurants & cafés','Warm, cinematic, and made for a lingering visit.'],
 ['salon','Morrow Studio','Salons & spas','Soft edges. Bold character. A different kind of first impression.'],
 ['dental','Harbour Dental','Dental practices','A calm introduction to a practice built around care.'],
 ['fitness','Form Athletics','Gyms & fitness','Unmistakable energy, from the first glance to the first session.'],
 ['home-services','Northline Home Co.','Home services','Straightforward design with the confidence of a job well done.'],
 ['tutoring','Brightpath Learning','Tutoring & coaching','An encouraging space for learners and the people cheering them on.'],
 ['retail','Olive & Thread','Independent retail','A considered collection, with the room it deserves.'],
 ['real-estate','Field & Form','Real estate','Space, light, and a different perspective on finding home.']];
 function select(i,focus=false){const [slug,name,niche,description]=data[i];tabs.forEach((tab,n)=>{tab.setAttribute('aria-selected',String(n===i));tab.tabIndex=n===i?0:-1});document.querySelector('#concept-panel').setAttribute('aria-labelledby',tabs[i].id);document.querySelector('#concept-name').textContent=name;document.querySelector('#concept-niche').textContent=niche;document.querySelector('#concept-description').textContent=description;const url='/samples/'+slug+'/';preview.src=url;preview.title=name+' website preview';document.querySelector('#concept-open').href=url;const hit=document.querySelector('#preview-hit');hit.href=url;hit.setAttribute('aria-label','Explore '+name+' website');if(focus)tabs[i].focus()}
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(i));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%tabs.length;if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();select(next,true)}})});
 const box=document.querySelector('.preview-window');function fit(){const width=box.getBoundingClientRect().width;const scale=width/1440;preview.style.setProperty('--preview-scale',scale);preview.style.height=(box.getBoundingClientRect().height/scale)+'px'}new ResizeObserver(fit).observe(box);fit();
})();
