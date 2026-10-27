'use strict';
const nav=document.querySelector('#nav');const menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));
const sections=[...document.querySelectorAll('main section')];const links=[...nav.querySelectorAll('a')];const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))}})},{rootMargin:'-20% 0px -65% 0px'});sections.forEach(s=>observer.observe(s));const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>revealObserver.observe(e));

const reveal = document.querySelector('.character-reveal');

const characters = [
  { name: 'LAFFGIRL', image: 'laffgirl.png', type: 'girl' },
  { name: 'LAFFGIRL', image: 'laffgirl-jump.png', type: 'girl' },
  { name: 'LAFFGIRL', image: 'laffgirl-niya.png', type: 'girl' },
  { name: 'LAFFBOY', image: 'laffboy.png', type: 'boy' },
  { name: 'LAFFBOY', image: 'laffboy-bikkuri.png', type: 'boy' },
  { name: 'LAFFBOY', image: 'laffboy-suwaru.png', type: 'boy' }
];


document.querySelectorAll('.shape').forEach(shape => {
  
shape.addEventListener(
  window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ? 'pointerenter'
    : 'click',
  () => {

    const existing = reveal.querySelectorAll('.hero-character');

    // 最大6人。6人になったら誰かがリアクション！
    if (existing.length >= 6) {
      const chosen = existing[Math.floor(Math.random() * existing.length)];
      chosen.classList.remove('reacting');
      void chosen.offsetWidth;
      chosen.classList.add('reacting');
      return;
    }

    // どちらが出るかはランダム
    
const usedImages = [...existing].map(img => img.getAttribute('src'));

const remaining = characters.filter(
    character => !usedImages.includes(character.image)
);

const character = remaining[
    Math.floor(Math.random() * remaining.length)
];

    const img = document.createElement('img');

    img.src = character.image;
    img.alt = character.name;
    img.className = `hero-character ${character.type}`;
img.dataset.pose = character.image.replace('.png', '');

   // 6か所の登場位置を用意

const positions = [
  { left: '3%', top: '20%' },
  { left: '32%', top: '0%' },
  { left: '75%', top: '25%' },
  { left: '12%', top: '65%' },
  { left: '43%', top: '48%' },
  { left: '78%', top: '72%' }
];


// まだ使われていない位置からランダムに選ぶ
const usedPositions = [...existing].map(el => el.dataset.position);
const available = positions
  .map((position, index) => ({ ...position, index }))
  .filter(position => !usedPositions.includes(String(position.index)));

const chosenPosition = available[Math.floor(Math.random() * available.length)];

img.style.left = chosenPosition.left;
img.style.top = chosenPosition.top;
img.dataset.position = String(chosenPosition.index);

    reveal.appendChild(img);
  });
});

const works=[{title:'LINEスタンプ',category:'stamps',tag:'LINEスタンプ',icon:'💬',description:'日常のやり取りが楽しくなるスタンプの制作例。',slides:['💬','✨','☺']},{title:'キャラクターイラスト',category:'illustration',tag:'イラスト',icon:'✎',description:'キャラクターやSNS向けイラストの制作例。',slides:['✎','🎨']},
{
  title: 'LAFFMAKER LP',
  category: 'web',
  tag: 'Webサイト',
  icon: '🎨',
  description: 'LAFFMAKERのサービスや制作への想いを紹介するために制作したランディングページ。',
  slides: ['🎨', '💻']
}
,{title:'採寸RPG',category:'tool',tag:'Webツール',icon:'📏',description:'内見の採寸をゲーム感覚で記録するWebツール。',slides:['📏','🏠','📋']}];const grid=document.querySelector('#work-grid');const modal=document.querySelector('#work-modal');const modalContent=document.querySelector('#modal-content');function renderWorks(filter='all'){grid.replaceChildren();works.filter(w=>filter==='all'||w.category===filter).forEach(w=>{const b=document.createElement('button');b.className='work-card';
b.innerHTML = `
  <div class="work-thumb">
   ${w.category === 'stamps'
  ? '<img src="works-line-stamps.png" alt="LINEスタンプ制作例">'
  : w.category === 'illustration'
    ? '<img src="powaton.jpg" alt="キャラクターイラスト制作例">'
   : w.title === 'LAFFMAKER LP'
  ? '<img src="laffmaker-lp.jpg" alt="LAFFMAKER LP制作例">'
  : w.category === 'tool'
    ? '<div class="rpg-images"><img src="rpg.jpg" alt="採寸RPGトップ画面"><img src="game_clear.png" alt="クエストクリア画面"></div>'
    : w.icon}
  </div>
  <div class="work-info">
    <small>${w.tag}</small>
    <strong>${w.title}</strong>
  </div>
`;
b.addEventListener('click',()=>openWork(w));grid.append(b)})}function openWork(w) {
  let index = 0;

  modalContent.innerHTML = `
    <h2></h2>
    <p></p>
    <div class="modal-slide"></div>
    <div class="modal-controls">
      <button type="button" class="prev">← 前へ</button>
      <span class="counter"></span>
      <button type="button" class="next">次へ →</button>
    </div>
    <p class="tiny">※ 現在は仮表示です。作品画像はあとから追加します。</p>
  `;

  modalContent.querySelector('h2').textContent = w.title;
  modalContent.querySelector('p').textContent = w.description;

  const slide = modalContent.querySelector('.modal-slide');
  const controls = modalContent.querySelector('.modal-controls');
  const note = modalContent.querySelector('.tiny');

const stampExamples = [
  {
    model: 'peace.png',
    stamp: 'stamp-1.png',
    name: 'peace'
  },
  {
    model: 'usa-1.png',
    stamp: 'usa-2.png',
    name: 'うさぎ'
  }
];

const update = () => {
  if (w.category === 'stamps') {
    const example = stampExamples[index];

    slide.innerHTML = `
      <div class="stamp-before-after">
        <figure>
          <img src="${example.model}" alt="${example.name}のモデル写真">
          <figcaption>モデル写真</figcaption>
        </figure>
        <figure>
          <img src="${example.stamp}" alt="${example.name}のLINEスタンプ">
          <figcaption>LINEスタンプ</figcaption>
        </figure>
      </div>
    `;

    modalContent.querySelector('.counter').textContent =
      `${index + 1} / ${stampExamples.length}`;

    controls.hidden = false;
    note.hidden = true;

  } else {
    slide.textContent = w.slides[index];

    modalContent.querySelector('.counter').textContent =
      `${index + 1} / ${w.slides.length}`;

    controls.hidden = false;
    note.hidden = false;
  }
};

  modalContent.querySelector('.prev').onclick = () => {
  const total = w.category === 'stamps' ? stampExamples.length : w.slides.length;
index = (index - 1 + total) % total;
    update();
  };

  modalContent.querySelector('.next').onclick = () => {
    const total = w.category === 'stamps' ? stampExamples.length : w.slides.length;
index = (index + 1) % total;
    update();
  };

  update();
  modal.showModal();
}document.querySelector('#modal-close').addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderWorks(b.dataset.filter)}));renderWorks();
const recipes=[{key:'heart+sparkle',icon:'💖',name:'キラキラハート'},{key:'bolt+cloud',icon:'⛈️',name:'嵐'},{key:'cloud+sparkle',icon:'🌈',name:'虹'},{key:'bolt+heart',icon:'💘',name:'恋の稲妻'},{key:'bolt+sparkle',icon:'🎆',name:'花火'},{key:'cloud+heart',icon:'🥰',name:'ふわふわハート'}];const storageKey='laffmaker-lab-discoveries-v1';let found=[];try{const saved=JSON.parse(localStorage.getItem(storageKey)||'[]');if(Array.isArray(saved))found=saved.filter(k=>recipes.some(r=>r.key===k))}catch{}const collectionGrid=document.querySelector('#collection-grid');const labMessage=document.querySelector('#lab-message');function drawCollection(){collectionGrid.replaceChildren();recipes.forEach(r=>{const el=document.createElement('div');el.className='collection-item';const yes=found.includes(r.key);el.innerHTML=`<b>${yes?r.icon:'?'}</b>${yes?r.name:'？？？'}`;collectionGrid.append(el)});document.querySelector('#collection-count').textContent=`${found.length} / ${recipes.length}`}function combine(a,b){if(a===b)return;const key=[a,b].sort().join('+');const result=recipes.find(r=>r.key===key);if(!result)return;if(!found.includes(key)){found.push(key);try{localStorage.setItem(storageKey,JSON.stringify(found))}catch{}labMessage.textContent=`${result.icon} 新発見！「${result.name}」が図鑑に登録された！`}else labMessage.textContent=`${result.icon} 「${result.name}」は発見済み！`;drawCollection()}drawCollection();document.querySelector('#reset-collection').addEventListener('click',()=>{if(!confirm('発見図鑑をリセットしますか？'))return;found=[];try{localStorage.removeItem(storageKey)}catch{}drawCollection();labMessage.textContent='図鑑をリセットしたよ！'});
const stage=document.querySelector('#lab-stage');let selected=null;const materials=[...document.querySelectorAll('.lab-material')];materials.forEach(el=>{let startX=0,startY=0,startLeft=0,startTop=0,moved=false;el.addEventListener('pointerdown',e=>{if(e.button!==0)return;startX=e.clientX;startY=e.clientY;startLeft=el.offsetLeft;startTop=el.offsetTop;moved=false;el.setPointerCapture(e.pointerId);el.style.zIndex=5});el.addEventListener('pointermove',e=>{if(!el.hasPointerCapture(e.pointerId))return;const dx=e.clientX-startX,dy=e.clientY-startY;if(Math.abs(dx)+Math.abs(dy)>8)moved=true;if(moved){el.style.left=Math.max(0,Math.min(stage.clientWidth-el.offsetWidth,startLeft+dx))+'px';el.style.top=Math.max(0,Math.min(stage.clientHeight-el.offsetHeight,startTop+dy))+'px'}});el.addEventListener('pointerup',e=>{el.style.zIndex=2;if(moved){const r=el.getBoundingClientRect();const cx=r.left+r.width/2,cy=r.top+r.height/2;const target=materials.find(other=>{if(other===el)return false;const o=other.getBoundingClientRect();return cx>=o.left&&cx<=o.right&&cy>=o.top&&cy<=o.bottom});if(target)combine(el.dataset.material,target.dataset.material)}else{if(selected&&selected!==el){combine(selected.dataset.material,el.dataset.material);selected.classList.remove('selected');selected=null}else{if(selected)selected.classList.remove('selected');selected=selected===el?null:el;if(selected)selected.classList.add('selected')}}});el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.dispatchEvent(new PointerEvent('pointerup'))}})});
const form=document.querySelector('#contact-form');const fields=document.querySelector('#form-fields');const review=document.querySelector('#form-review');form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const dl=document.querySelector('#review-list');dl.replaceChildren();[['お名前','name'],['メールアドレス','email'],['お問い合わせの種類','category'],['お問い合わせ内容','message']].forEach(([label,key])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=String(data.get(key)||'');dl.append(dt,dd)});fields.hidden=true;review.hidden=false;review.scrollIntoView({behavior:'smooth',block:'center'})});document.querySelector('#edit-form').addEventListener('click',()=>{fields.hidden=false;review.hidden=true;form.scrollIntoView({behavior:'smooth',block:'center'})});
const reactions=['ふたりで大笑い！ あははは！','GIRLがつつく → BOYがびっくり！','BOYが転ぶ → GIRLが呆れ笑い！','ふたりでハイタッチ！ ✨'];document.querySelectorAll('.footer-character').forEach(b=>b.addEventListener('click',()=>{document.querySelector('#footer-reaction').textContent=reactions[Math.floor(Math.random()*reactions.length)]}));


/* =========================
   キャラのランダムリアクション
========================= */

setInterval(() => {
    const characters = [
        ...document.querySelectorAll('.hero-character')
    ];

    if (characters.length === 0) return;

    // 画面にHOMEが見えているときだけ動く
    const home = document.querySelector('#home');
    const rect = home.getBoundingClientRect();

    if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        return;
    }

    // 1人をランダムに選んでリアクション
    const character = characters[
        Math.floor(Math.random() * characters.length)
    ];

    character.classList.remove('reacting');
    void character.offsetWidth;
    character.classList.add('reacting');

}, 5000);
