'use strict';
const menuButton=document.querySelector('.menu-button'),navigation=document.querySelector('#navigation');
function closeNavigation(restoreFocus=false){navigation?.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');if(menuButton)menuButton.textContent='Menu';if(restoreFocus)menuButton?.focus()}
menuButton?.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'Close':'Menu'});
navigation?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeNavigation()));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation?.classList.contains('open'))closeNavigation(true)});
document.addEventListener('click',e=>{if(navigation?.classList.contains('open')&&!navigation.contains(e.target)&&!menuButton.contains(e.target))closeNavigation()});
matchMedia('(min-width:801px)').addEventListener('change',()=>closeNavigation());
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
const form=document.querySelector('#project-brief');
form?.addEventListener('submit',event=>{
 const status=form.querySelector('.form-status');
 for(const input of form.querySelectorAll('input[required]:not([type=checkbox]),textarea[required]')){
  input.value=input.value.trim();
  input.setCustomValidity(input.value?'':'Please complete this field.');
 }
 if(!form.reportValidity()){event.preventDefault();status.textContent='Please complete the required fields and check your email address.';return}
 status.textContent='Continuing to the secure submission page… Complete the security check to send your enquiry.';
});
form?.addEventListener('input',event=>{event.target.setCustomValidity?.('');form.querySelector('.form-status').textContent=''});
// Logo continents: local vector sprites on a continuously rotating sphere.
const canvas=document.querySelector('#meridian');
if(canvas){
 const ctx=canvas.getContext('2d'),stage=canvas.parentElement,pause=stage.querySelector('.motion-control'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
 if(ctx){
 const TAU=Math.PI*2,rad=Math.PI/180;
 // Simplified geographic coastlines, in longitude/latitude coordinates.
 const lands=[
 [[-168,70],[-145,72],[-125,60],[-110,72],[-80,73],[-53,52],[-65,45],[-80,25],[-98,15],[-105,23],[-117,32],[-128,52],[-160,60]],
 [[-82,12],[-70,11],[-59,5],[-49,-1],[-35,-7],[-40,-22],[-54,-35],[-67,-56],[-75,-43],[-79,-15],[-81,0]],
 [[-52,60],[-43,60],[-20,76],[-30,83],[-57,82],[-66,72]],
 [[-17,35],[0,37],[12,32],[32,31],[35,17],[51,11],[44,-1],[39,-15],[28,-35],[18,-34],[11,-18],[8,4],[-7,5],[-16,16]],
 [[-10,36],[-10,44],[-1,49],[-5,58],[10,60],[18,71],[30,70],[28,59],[48,68],[80,73],[110,72],[140,70],[179,64],[168,52],[145,48],[139,36],[129,33],[122,20],[109,20],[107,10],[120,-6],[111,-8],[99,5],[95,22],[80,7],[69,24],[52,25],[43,12],[35,29],[26,40],[15,45],[5,43]],
 [[113,-22],[123,-13],[136,-12],[143,-10],[153,-25],[150,-37],[137,-39],[128,-32],[115,-34]],
 [[47,-13],[50,-16],[47,-25],[44,-25]],[[130,32],[135,35],[141,42],[145,45],[142,35]],
 [[166,-35],[178,-38],[172,-47],[166,-45]], [[-8,50],[-2,50],[0,59],[-5,59]],
 [[95,5],[103,1],[106,-6],[100,-3]],[[108,7],[119,5],[118,-4],[110,-4]]
 ];
 function inside(x,y,p){let yes=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const a=p[i],b=p[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])yes=!yes}return yes}
 const names=['React','Figma','HTML','CSS','JavaScript','TypeScript','Git','VS Code','Vercel','npm'];
 function sprite(kind){const c=document.createElement('canvas');c.width=c.height=80;const g=c.getContext('2d');g.translate(40,40);g.lineWidth=4;g.lineJoin='round';g.lineCap='round';
 const path=(p,fill)=>{g.beginPath();p.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();if(fill)g.fill();else g.stroke()};
 const dot=(x,y,r,color)=>{g.fillStyle=color;g.beginPath();g.arc(x,y,r,0,TAU);g.fill()};
 if(kind===0){g.strokeStyle='#61dafb';for(let a=0;a<3;a++){g.save();g.rotate(a*Math.PI/3);g.beginPath();g.ellipse(0,0,30,11,0,0,TAU);g.stroke();g.restore()}dot(0,0,5,'#61dafb')}
 else if(kind===1){for(const [x,y,color] of [[-10,-20,'#f24e1e'],[10,-20,'#ff7262'],[-10,0,'#a259ff'],[10,0,'#1abcfe'],[-10,20,'#0acf83']])dot(x,y,10,color)}
 else if(kind===2||kind===3){g.fillStyle=kind===2?'#e8552d':'#287ac0';path([[-27,-30],[27,-30],[22,25],[0,33],[-22,25]],true);g.fillStyle='#fff';g.font='bold 44px Arial';g.textAlign='center';g.fillText(kind===2?'5':'3',0,18)}
 else if(kind===4||kind===5){g.fillStyle=kind===4?'#e2bd20':'#3178c6';g.fillRect(-29,-29,58,58);g.fillStyle=kind===4?'#242820':'#fff';g.font='bold 30px Arial';g.textAlign='center';g.fillText(kind===4?'JS':'TS',0,18)}
 else if(kind===6){g.fillStyle='#e8552d';path([[0,-34],[34,0],[0,34],[-34,0]],true);g.strokeStyle='#fff';g.beginPath();g.moveTo(-13,-15);g.lineTo(9,7);g.moveTo(-5,-7);g.lineTo(-5,17);g.stroke();for(const [x,y]of[[-13,-15],[9,7],[-5,17]])dot(x,y,4,'#fff')}
 else if(kind===7){g.fillStyle='#248fcb';path([[-29,-13],[-20,-20],[8,-1],[25,-31],[35,-26],[35,26],[25,31],[8,1],[-20,20],[-29,13],[-10,0]],true)}
 else if(kind===8){g.fillStyle='#e5eddf';path([[0,-29],[32,27],[-32,27]],true)}
 else {g.fillStyle='#c44438';g.fillRect(-34,-21,68,42);g.fillStyle='#fff';g.font='bold 27px monospace';g.textAlign='center';g.fillText('npm',0,9)}return c;
 }
 const sprites=names.map((_,i)=>sprite(i)),points=[];
 for(let lat=-56;lat<=80;lat+=6){const step=6/Math.max(.3,Math.cos(lat*rad));for(let lon=-180;lon<180;lon+=step){if(lands.some(p=>inside(lon,lat,p))){const a=lon*rad,b=lat*rad;points.push({x:Math.cos(b)*Math.sin(a),y:-Math.sin(b),z:Math.cos(b)*Math.cos(a),logo:points.length%names.length,lift:0})}}}
 let width=1,height=1,angle=-.35,tilt=.12,speed=.32,frame=0,last=null,visible=true,userPaused=false;
 const pointer={active:false,x:0,y:0,nx:0,ny:0};
 function project(p){const ca=Math.cos(angle),sa=Math.sin(angle),ct=Math.cos(tilt),st=Math.sin(tilt),x=p.x*ca+p.z*sa,z=p.z*ca-p.x*sa;return{x,y:p.y*ct-z*st,z:p.y*st+z*ct}}
 function draw(dt=0){
  ctx.clearRect(0,0,width,height);const radius=Math.min(width*.41,height*.39),cx=width*.52,cy=height*.46;
  const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,radius*1.15);glow.addColorStop(0,'rgba(255,134,94,.10)');glow.addColorStop(1,'rgba(232,85,45,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
  // Quiet wireframe keeps oceans open and the globe legible from every side.
  ctx.lineWidth=.65;ctx.strokeStyle='rgba(173,202,153,.23)';
  for(let line=0;line<15;line++){ctx.beginPath();let pen=false;for(let i=0;i<=100;i++){const a=i/100*TAU,b=(line<9?(line*20-80)*rad:(line-9)*30*rad);const p=line<9?{x:Math.cos(b)*Math.sin(a),y:-Math.sin(b),z:Math.cos(b)*Math.cos(a)}:{x:Math.sin(b)*Math.cos(a),y:Math.sin(a),z:Math.cos(b)*Math.cos(a)};const q=project(p);if(q.z<0){pen=false;continue}const x=cx+q.x*radius,y=cy+q.y*radius;pen?ctx.lineTo(x,y):ctx.moveTo(x,y);pen=true}ctx.stroke()}
  const projected=points.map(p=>({p,...project(p)})).sort((a,b)=>a.z-b.z);
  for(const q of projected){const x=cx+q.x*radius,y=cy+q.y*radius,dx=x-pointer.x,dy=y-pointer.y,d=Math.hypot(dx,dy);const influence=pointer.active&&q.z>.05?Math.pow(Math.max(0,1-d/110),2):0;
   q.p.lift+=(influence-q.p.lift)*(dt?1-Math.exp(-dt*12):1);const lift=q.p.lift;
   const size=radius*.078*(.7+.3*Math.max(0,q.z))*(1+lift*1.5),push=lift*27;
   ctx.globalAlpha=q.z<0?.055:Math.min(1,.38+q.z*.62+lift*.3);
   ctx.drawImage(sprites[q.p.logo],x+(d?dx/d:0)*push-size/2,y+(d?dy/d:0)*push-size/2,size,size);
  }ctx.globalAlpha=1;
 }
 function active(){return visible&&!userPaused&&!reduce.matches&&!document.hidden}
 function tick(time){frame=0;if(!active()){last=null;return}const dt=last===null?0:Math.min((time-last)/1000,.05);last=time;
  const target=pointer.active?1.05+pointer.nx*.65:.32;speed+=(target-speed)*(1-Math.exp(-dt*4));angle=(angle+speed*dt)%TAU;tilt+=((pointer.active?pointer.ny*.65:.12)-tilt)*(1-Math.exp(-dt*5));draw(dt);frame=requestAnimationFrame(tick);
 }
 function sync(){cancelAnimationFrame(frame);last=null;frame=0;pause.hidden=reduce.matches;pause.textContent=userPaused?'Play motion':'Pause motion';pause.setAttribute('aria-pressed',String(userPaused));if(active())frame=requestAnimationFrame(tick);else draw()}
 function resize(){const r=stage.getBoundingClientRect();width=Math.max(1,r.width);height=Math.max(1,r.height);const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw()}
 stage.addEventListener('pointermove',e=>{if(reduce.matches||userPaused||e.pointerType==='touch')return;const r=stage.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;pointer.nx=Math.max(-1,Math.min(1,(pointer.x/r.width-.5)*2));pointer.ny=Math.max(-1,Math.min(1,(pointer.y/r.height-.5)*2));pointer.active=true});
 stage.addEventListener('pointerleave',()=>{pointer.active=false});stage.addEventListener('pointercancel',()=>{pointer.active=false});
 pause.addEventListener('click',()=>{userPaused=!userPaused;pointer.active=false;sync()});reduce.addEventListener('change',()=>{pointer.active=false;sync()});document.addEventListener('visibilitychange',sync);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()}).observe(stage);new ResizeObserver(resize).observe(stage);resize();stage.classList.add('rendered');sync();
 }
}
