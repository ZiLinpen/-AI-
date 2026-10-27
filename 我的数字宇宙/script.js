'use strict';
const canvas = document.querySelector('#stars');
const ctx = canvas.getContext('2d');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches, particles = [], frame = 0, pointer = {x: 0, y: 0}, width, height;
function resize() {
  width = innerWidth; height = innerHeight;
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = width * ratio; canvas.height = height * ratio;
  ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
  particles = Array.from({length: Math.min(180, Math.floor(width * height / 6500))}, () => ({x:Math.random()*width,y:Math.random()*height,r:Math.random()*1.1+.25,phase:Math.random()*Math.PI*2,speed:Math.random()*.5+.3}));
  draw(0);
}
function draw(time) {
  if (!ctx) return;
  ctx.clearRect(0,0,width,height);
  for (const star of particles) {
    const alpha = paused ? .5 : .25 + (Math.sin(time*.0006*star.speed+star.phase)+1)*.28;
    ctx.beginPath();ctx.fillStyle=`rgba(214,210,255,${alpha})`;
    ctx.arc(star.x+pointer.x*star.r*3,star.y+pointer.y*star.r*3,star.r,0,Math.PI*2);ctx.fill();
  }
}
function animate(time){draw(time);frame=requestAnimationFrame(animate)}
function syncMotion(){document.querySelector('#motion').textContent=paused?'开启星空 ◌':'暂停星空 ◌';document.querySelector('#motion').setAttribute('aria-pressed',String(paused));document.querySelector('#motion').setAttribute('aria-label',paused?'开启星空动画':'暂停星空动画');cancelAnimationFrame(frame);if(!paused)frame=requestAnimationFrame(animate);else draw(0)}
window.addEventListener('resize',resize);resize();syncMotion();
document.querySelector('#motion').addEventListener('click',()=>{paused=!paused;syncMotion()});
reducedMotion.addEventListener('change',e=>{paused=e.matches;syncMotion()});
document.addEventListener('pointermove',e=>{if(!paused&&e.pointerType==='mouse'){pointer={x:e.clientX/innerWidth-.5,y:e.clientY/innerHeight-.5}}});
const dialog=document.querySelector('#content-dialog'), body=document.querySelector('#dialog-body');
let opener;
const templates={
 about:`<span class="tag">PLANET 01 · THE EXPLORER</span><h2 id="dialog-title">你好，宇宙旅人。</h2><p>欢迎来到我的一小片宇宙。这里没有标准答案，只有对生活的好奇、对新事物的尝试，以及慢慢成为自己的过程。</p><p>我想收藏日常里的微小美好，也想把脑海里的想象，一点点变成真实。</p><div class="chips"><span>✧ 保持好奇</span><span>☾ 记录生活</span><span>↗ 探索未知</span></div>`,
 inspiration:`<span class="tag">PLANET 02 · LITTLE SPARKS</span><h2 id="dialog-title">让灵感，落在这里。</h2><p id="spark-text">如果把每一天都看作一颗星，平凡的日子也会连成自己的星座。</p><button class="action" id="new-spark">✧ 再拾起一束微光</button><p class="saved-note">一些写给日常的小小提示，送给正在探索的你。</p>`,
 wishes:`<span class="tag">PLANET 03 · SOMEWHERE, SOMEDAY</span><h2 id="dialog-title">寄给未来的自己</h2><form id="wish-form"><label for="wish">此刻的你，想实现什么小小的愿望？</label><textarea id="wish" maxlength="500" placeholder="希望未来的我……" required></textarea><button class="action" type="submit">把心愿存入星河 ↗</button><button class="action" id="clear-wish" type="button">清除</button></form><p class="saved-note" id="storage-note">仅保存在当前浏览器，不会发送到网络。清除浏览器数据后会消失。</p>`,
 secret:`<span class="tag">SECRET CONSTELLATION · 004</span><h2 id="dialog-title">你发现了一颗秘密星星。</h2><p>在无数种可能里，你来到了这里。<br>这件事本身，就像一场小小的宇宙奇遇。</p><p>愿你永远有抬头看星星的心情，也有走向远方的勇气。</p><div class="chips"><span>✦ 彩蛋已点亮</span><span>你也是宇宙的一部分</span></div>`
};
function openContent(type,trigger){opener=trigger;body.innerHTML=templates[type];dialog.showModal();if(type==='wishes'){try{document.querySelector('#wish').value=localStorage.getItem('universe-wish')||''}catch{document.querySelector('#storage-note').textContent='当前浏览器无法保存，心愿可在本次打开期间编辑。'}}}
for(const card of document.querySelectorAll('.card')){
 card.addEventListener('click',()=>openContent(card.dataset.dialog,card));
 card.addEventListener('pointermove',e=>{if(reducedMotion.matches||e.pointerType!=='mouse')return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.setProperty('--rx',`${(y-.5)*-5}deg`);card.style.setProperty('--ry',`${(x-.5)*5}deg`);card.style.setProperty('--mx',`${x*100}%`);card.style.setProperty('--my',`${y*100}%`)});
 card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')});
}
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close()});
dialog.addEventListener('close',()=>opener?.focus());
let toastTimer;function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3000)}
const sparks=['给今天拍一张照片，不为分享，只为记住。','试着去一条没走过的路，让熟悉的城市变成新的地图。','把一个「等以后」的小想法，变成今天的第一步。','不必成为最亮的星，按照自己的轨道发光就好。'];let sparkIndex=0;
body.addEventListener('click',e=>{if(e.target.id==='new-spark'){document.querySelector('#spark-text').textContent=sparks[sparkIndex++%sparks.length]}if(e.target.id==='clear-wish'){try{localStorage.removeItem('universe-wish');document.querySelector('#wish').value='';toast('已清除这封心愿信')}catch{toast('当前浏览器无法访问保存空间')}}});
body.addEventListener('submit',e=>{if(e.target.id!=='wish-form')return;e.preventDefault();const value=document.querySelector('#wish').value.trim();if(!value){toast('先写下一点点愿望吧');return}try{localStorage.setItem('universe-wish',value);toast('心愿已收藏，下一次来依然在这里 ✧')}catch{toast('浏览器未允许保存，请复制心愿留存')}});
document.querySelector('#secret').addEventListener('click',e=>{document.body.classList.add('secret-mode');openContent('secret',e.currentTarget)});
