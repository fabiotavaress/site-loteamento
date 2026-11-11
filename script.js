const LOTS = Array.from({length:14},(_,i)=>i+1).map(n=>({id:String(n).padStart(2,'0'),available:[1,2,3,4,5,6,7,8,14].includes(n),area:'20.000 m²',price:'A partir de R$ 280.000'}));
const WA='https://wa.me/5531971267200';
function wa(text){return WA+'?text='+encodeURIComponent(text)}
function renderLots(){
 const grid=document.getElementById('lotGrid'); if(!grid)return;
 grid.innerHTML=LOTS.map(l=>`<a class="lot-card ${l.available?'':'is-sold'}" href="chacara.html?id=${l.id}" aria-label="Ver chácara ${l.id}, ${l.available?'disponível':'vendida'}"><strong>${l.id}</strong><span>${l.area}</span><span class="lot-state">${l.available?'Disponível':'Vendida'}</span></a>`).join('');
}
function renderDetail(){
 const root=document.getElementById('lotDetail'); if(!root)return;
 const id=new URLSearchParams(location.search).get('id')||'01';
 const lot=LOTS.find(x=>x.id===id)||LOTS[0];
 const state=lot.available?'Disponível':'Vendida';
 document.title=`Chácara ${lot.id} | Recanto da Lagoa`;
 root.innerHTML=`<div class="detail-hero">
 <img class="detail-image" src="assets/vista-aerea-lotes.jpg" alt="Vista aérea ilustrativa do empreendimento">
 <div class="detail-info"><p class="eyebrow dark">CHÁCARAS RECANTO DA LAGOA</p><h1>Chácara ${lot.id}</h1><span class="detail-status ${lot.available?'':'sold'}">${state}</span>
 <p>Um espaço de natureza, privacidade e tranquilidade às margens da Lagoa Tiririca, em Pingo-d’Água, Minas Gerais.</p>
 <div class="detail-specs"><div><strong>20.000 m²</strong><span>Área da unidade · 2 hectares</span></div><div><strong>${lot.available?'A partir de R$ 280.000':'Unidade vendida'}</strong><span>Valor / disponibilidade</span></div><div><strong>Recanto da Lagoa</strong><span>Empreendimento</span></div><div><strong>Pingo-d’Água / MG</strong><span>Localização</span></div></div>
 ${lot.available?`<a class="button button-dark" href="${wa('Olá! Tenho interesse na Chácara '+lot.id+' do Recanto da Lagoa. Gostaria de receber mais informações.')} " target="_blank" rel="noopener">Consultar esta chácara <span>↗</span></a>`:`<p class="detail-note">Esta unidade consta como vendida. Consulte as outras chácaras disponíveis.</p><a class="button button-dark" href="index.html#chacaras">Ver unidades disponíveis <span>→</span></a>`}
 <p class="detail-note">Fotos específicas, posição georreferenciada e tour 360° desta unidade serão adicionados assim que o material técnico estiver disponível.</p><a class="detail-back" href="index.html#chacaras">← Voltar ao mapa das chácaras</a>
 </div></div>`;
}
document.addEventListener('DOMContentLoaded',()=>{
 renderLots();renderDetail();
 const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
 const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');
 if(toggle&&nav)toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
 document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
 const lightbox=document.getElementById('lightbox');
 if(lightbox){const image=lightbox.querySelector('img');document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{image.src=item.dataset.full;image.alt=item.querySelector('img').alt;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');}));lightbox.querySelector('.lightbox-close').addEventListener('click',()=>{lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');image.src='';});lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.querySelector('.lightbox-close').click();});}
});
