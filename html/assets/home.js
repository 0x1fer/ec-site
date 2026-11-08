(function(){
'use strict';
const pages=window.EC_PAGES,S=window.BZStore;
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let total=0,done=0;
function count(p){return p.units.filter(id=>S.get('done:'+(p.group==='konu'?'konu':p.out)+':'+id,false)).length}
for(const p of pages){const n=count(p),pct=p.units.length?Math.round(n/p.units.length*100):0;
if(p.scope==='core'){total+=p.units.length;done+=n}
const el=document.createElement('div');el.className='card'+(p.out==='konu-tumu'?' wide':'');el.style.setProperty('--hue',p.hue);
el.innerHTML='<div class="card-top"><span class="badge">'+esc(p.no||(p.out==='soru-analizi'?'%':p.out==='vize-cozumleri'?'S':'↗'))+'</span><a class="pdf" href="pdf/'+esc(p.src)+'.pdf" target="_blank" rel="noopener">PDF ↗</a></div><h3><a href="html/'+esc(p.out)+'.html">'+esc(p.label)+'</a></h3><p>'+esc(p.desc)+'</p><div class="meta"><span>'+p.h2+' bölüm</span>'+(p.gfx?'<span>'+p.gfx+' şema</span>':'')+(p.soru?'<span>'+p.soru+' soru kutusu</span>':'')+'</div><div class="prog"><i style="--p:'+pct+'"><b></b></i><span>'+n+'/'+p.units.length+'</span></div>';
document.getElementById(p.scope==='supplement'?'gEk':p.group==='konu'?'gKonu':'gSinav').append(el)}
const pct=total?Math.round(done/total*100):0;
document.getElementById('ovRing').style.setProperty('--p',pct);document.getElementById('ovPct').textContent='%'+pct;document.getElementById('ovTxt').textContent=done?done+' / '+total+' konu başlığı çalışıldı':'Henüz başlamadın';
document.getElementById('heroSearch').onclick=()=>document.getElementById('searchBtn').click();
const last=S.get('last',null),resume=document.getElementById('resume');
if(last&&pages.some(p=>p.out===last.p)){resume.hidden=false;resume.href='html/'+last.p+'.html'+(last.id?'#'+last.id:'');resume.querySelector('b').textContent=last.l;resume.querySelector('em').textContent=last.t||'Okumaya devam et';}
document.getElementById('resetBtn').onclick=()=>{if(confirm('Bu sitenin çalışma ilerlemesini sıfırlamak istiyor musun?')){Object.keys(localStorage).filter(k=>k.startsWith('ecircuits:done:')||k==='ecircuits:last').forEach(k=>localStorage.removeItem(k));location.reload()}};
})();
