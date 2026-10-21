'use strict';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const levels = [
  {value:20,color:'#bfd6a4',copy:'People arrive, take in the room, and find their place. The first conversations and movements begin.'},
  {value:40,color:'#d6db72',copy:'Heads start nodding. People move closer. The music is opening the room up.'},
  {value:65,color:'#e9bc55',copy:'The dance floor connects. Artists and guests trade reactions. The energy reaches beyond the front row.'},
  {value:85,color:'#ff7047',copy:'The room moves as one. Big reactions, effortless handoffs, and a shared rhythm that holds.'},
  {value:99,color:'#fae4ac',copy:'A rare collective moment. Every part of the experience connects, and the feeling lasts beyond a single song. Reserved for exceptional nights.'}
];
$$('[data-level]').forEach((button) => button.addEventListener('click', () => {
  const level = levels[Number(button.dataset.level)];
  $$('[data-level]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  $('.heat-console').style.setProperty('--heat',level.color);
  $('#temp-number').textContent=String(level.value).padStart(3,'0');
  $('#temp-copy').textContent=level.copy;
  $('#stick-fill').style.height=`${level.value}%`;
  $('#thermal-marker').style.left=`${level.value}%`;
}));
const zones = {
  dj:{label:'01 / DJ position',title:'No distant booth.',copy:'A compact, protected setup at the center of the action. The audience surrounds the music, with clear space for equipment, cables, and artist handoffs.'},
  crowd:{label:'02 / The people',title:'The floor is shared.',copy:'People gather around the DJ with space to dance and move. Accessible circulation, clear exits, and a respectful environment are part of the experience.'},
  camera:{label:'03 / Broadcast',title:'An invitation into the room.',copy:'A wide view establishes the room, with closer angles for the DJ, artist moments, and the people. A technical lead manages the feed so Boogz can connect with the audience.'},
  artist:{label:'04 / Artist access',title:'Walk in. Connect. Keep it moving.',copy:'A clear access route and a prepared microphone make short performances feel like part of the DJ set. Rehearsed handoffs preserve the flow of the night.'}
};
$$('[data-zone]').forEach((button) => button.addEventListener('click',()=>{
  const zone=zones[button.dataset.zone];
  $$('[data-zone]').forEach((item)=>item.setAttribute('aria-pressed',String(item===button)));
  $('#zone-label').textContent=zone.label;$('#zone-title').textContent=zone.title;$('#zone-copy').textContent=zone.copy;
}));
// Deterministic decorative crowd positions. These are not attendance data.
for(let i=0;i<32;i++){
  const angle=(i/32)*Math.PI*2;
  const dot=document.createElement('i');
  const radius=i%2===0?32:24;
  dot.style.left=`${50+Math.cos(angle)*radius}%`;
  dot.style.top=`${47+Math.sin(angle)*radius}%`;
  $('.crowd-dots').append(dot);
}
[8,16,10,19,12,7,15,20,11,17,8,14].forEach((height)=>{const bar=document.createElement('i');bar.style.height=`${height}px`;$('.sound-bars').append(bar);});
const beats=[
  {time:'30 minutes / Arrival',title:'Give the room space to settle.',copy:'Warm-up selections, outfit portraits, introductions, and a welcome into the room. Build anticipation while people arrive and connect.'},
  {time:'45 minutes / Build',title:'Find a shared rhythm.',copy:'Fresco brings the dance floor together. The first artist performs two songs after the room has found its pulse, followed by a clean handoff into the DJ set.'},
  {time:'60 minutes / Peak stretch',title:'Let the room take over.',copy:'Long DJ runs with two short artist appearances woven between them. Capture the people, the movement, and the moments that happen naturally.'},
  {time:'35 minutes / Final stretch',title:'Keep everyone in the feeling.',copy:'Let the dancing lead. Collect the final award nominations and prepare a brief closing recognition without interrupting the musical momentum.'},
  {time:'10 minutes / Recognition',title:'Give the room its flowers.',copy:'Announce the four awards, acknowledge the people and partners who made the night, and finish together with one last song. Share the next edition when confirmed.'}
];
$$('[data-beat]').forEach((button)=>button.addEventListener('click',()=>{
  const beat=beats[Number(button.dataset.beat)];
  $$('[data-beat]').forEach((item)=>item.setAttribute('aria-pressed',String(item===button)));
  $('#beat-time').textContent=beat.time;$('#beat-title').textContent=beat.title;$('#beat-copy').textContent=beat.copy;
}));
const partners=[
  {category:'Clothing / accessories / independent designers',title:'Dress the moment.',gives:'Styling, prizes, a small product activation, or an edition-specific collaboration.',gets:'Outfit portraits, editorial features, award presentation, and agreed content that connects the brand to genuine personal style.'},
  {category:'Artists / labels / music collectives',title:'Let the music meet its people.',gives:'Curated performances, release moments, audience participation, and collaborative promotion.',gets:'A place inside the DJ set, direct crowd connection, and agreed performance footage with clearly defined usage rights.'},
  {category:'DJ / sound / lighting / camera equipment',title:'Power the feeling.',gives:'Equipment, technical expertise, production support, or funding for a stronger broadcast.',gets:'Equipment in a real event environment, credited production features, and agreed demonstrations or editorial content.'},
  {category:'Soft drinks / alcohol / food / hospitality',title:'Be a good host.',gives:'Hospitality, product sampling, prizes, or financial support coordinated with the venue.',gets:'Relevant in-room activations, guest experience moments, and approved content. Age, venue, platform, and category conditions are agreed before launch.'},
  {category:'Bars / restaurants / lounges',title:'Make your room the destination.',gives:'A suitable space, hospitality infrastructure, venue staffing, and a workable commercial agreement.',gets:'A curated ticketed experience, potential food and beverage sales, venue storytelling, and a format designed to encourage return visits.'},
  {category:'Influencers / creators / local businesses',title:'Bring your people.',gives:'Community connections, hosting, collaborative promotion, services, or local knowledge.',gets:'Co-created coverage, participation in the event, and measurable referral opportunities with agreed responsibilities and deliverables.'}
];
$$('[data-partner]').forEach((button)=>button.addEventListener('click',()=>{
  const partner=partners[Number(button.dataset.partner)];
  $$('[data-partner]').forEach((item)=>item.setAttribute('aria-pressed',String(item===button)));
  $('#partner-category').textContent=partner.category;$('#partner-title').textContent=partner.title;$('#partner-gives').textContent=partner.gives;$('#partner-gets').textContent=partner.gets;
}));
function calculate(){
  const budgetFields=$$('.budget-item');
  const budgetInvalid=budgetFields.some((input)=>input.value===''||!input.validity.valid);
  const fixedCents=budgetFields.reduce((sum,input)=>sum+Math.round(Number(input.value)*100),0);
  const currency=(cents)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:0,maximumFractionDigits:2}).format(cents/100);
  $('#cost').value=budgetInvalid?'':(fixedCents/100).toFixed(2);
  $('#budget-total').textContent=budgetInvalid?'—':currency(fixedCents);
  const ids=['sponsor','price','fees','attendance','capacity','comps'];
  const fields=ids.map((id)=>$('#'+id));
  const invalid=budgetInvalid||fields.some((input)=>input.value===''||!input.validity.valid);
  const [sponsor,price,fees,attendance,capacity,comps]=fields.map((input)=>Number(input.value));
  const message=$('#calc-message');
  const results=$('.calc-results');
  message.classList.remove('warning');results.classList.remove('is-loss');
  if(invalid || comps>capacity || attendance>capacity-comps){
    ['break-even','sellout-profit','gross-door','total-revenue','all-costs','projected-profit','profit-margin'].forEach((id)=>{$('#'+id).textContent='—';});
    $('#capacity-note').textContent='Check the planning inputs.';
    message.textContent=invalid?'Enter valid, nonnegative amounts and whole-number guest counts.':comps>capacity?'Complimentary places cannot exceed guest capacity.':'Expected paying guests exceed capacity after complimentary places. Adjust attendance, capacity, or complimentary places.';
    message.classList.add('warning');return;
  }
  const priceCents=Math.round(price*100),feeCents=Math.round(fees*100),supportCents=Math.round(sponsor*100);
  const netCents=priceCents-feeCents,remainingCents=Math.max(0,fixedCents-supportCents),paidCapacity=capacity-comps;
  const breakEven=remainingCents===0?0:netCents>0?Math.ceil(remainingCents/netCents):null;
  const doorCents=attendance*priceCents,revenueCents=doorCents+supportCents;
  const expenseCents=fixedCents+attendance*feeCents,profitCents=revenueCents-expenseCents;
  const selloutCents=paidCapacity*netCents+supportCents-fixedCents;
  $('#break-even').textContent=breakEven===null?'Not reachable':breakEven.toLocaleString('en-US');
  $('#capacity-note').textContent=`${attendance.toLocaleString('en-US')} expected paying guests / ${paidCapacity.toLocaleString('en-US')} available paid places`;
  $('#projected-profit').textContent=currency(profitCents);
  $('#sellout-profit').textContent=currency(selloutCents);
  $('#gross-door').textContent=currency(doorCents);
  $('#total-revenue').textContent=currency(revenueCents);
  $('#all-costs').textContent=currency(expenseCents);
  $('#profit-margin').textContent=revenueCents>0?`${(profitCents/revenueCents*100).toFixed(1)}%`:'— (no revenue)';
  results.classList.toggle('is-loss',profitCents<0);
  if(netCents<=0){message.textContent=remainingCents>0?'Door revenue cannot cover the gap at this price and deduction level.':'Modeled cash support covers fixed costs, but paid entries add no positive contribution.';message.classList.add('warning');}
  else if(breakEven>paidCapacity){message.textContent='Break-even exceeds paid-entry capacity. Adjust costs, cash support, or net admission revenue.';message.classList.add('warning');}
  else if(profitCents<0){message.textContent=`The current attendance leaves a ${currency(-profitCents)} shortfall. Break-even requires ${breakEven} paid entries.`;message.classList.add('warning');}
  else if(remainingCents===0){message.textContent='Modeled cash support covers the entered fixed costs.';}
  else{message.textContent='Expected paid attendance covers the entered costs.';}
}
$$('.calc-inputs input, .budget-item').forEach((input)=>input.addEventListener('input',calculate));
$('#reset-budget').addEventListener('click',()=>{$$('.calc-inputs input:not([readonly]), .budget-item').forEach((input)=>{input.value=input.defaultValue;});calculate();});
calculate();
const chapters=$$('.chapter');let activeChapter=0;const menu=$('#chapter-menu');
chapters.forEach((chapter,index)=>{
  const link=document.createElement('a');link.href='#'+chapter.id;
  const number=document.createElement('span');number.textContent=String(index+1).padStart(2,'0');link.append(number,document.createTextNode(chapter.dataset.title));
  link.addEventListener('click',()=>{menu.close();document.body.style.overflow='';});
  $('#chapter-links').append(link);
});
$('#menu-open').addEventListener('click',()=>{menu.showModal();document.body.style.overflow='hidden';});
$('#menu-close').addEventListener('click',()=>menu.close());
menu.addEventListener('close',()=>{document.body.style.overflow='';$('#menu-open').focus({preventScroll:true});});
menu.addEventListener('click',(event)=>{if(event.target===menu){const rect=menu.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)menu.close();}});
$('.dialog-top .wordmark').addEventListener('click',()=>menu.close());
function updateChapter(){
  const boundary=window.innerHeight*.3;
  let index=0;chapters.forEach((chapter,i)=>{if(chapter.getBoundingClientRect().top<=boundary)index=i;});
  activeChapter=index;$('#chapter-current').textContent=String(index+1).padStart(2,'0');$('#chapter-name').textContent=chapters[index].dataset.title;
  $('#previous').disabled=index===0;$('#next').disabled=index===chapters.length-1;
}
let scrollQueued=false;
window.addEventListener('scroll',()=>{if(!scrollQueued){requestAnimationFrame(()=>{updateChapter();scrollQueued=false;});scrollQueued=true;}},{passive:true});
window.addEventListener('resize',updateChapter);updateChapter();
function goChapter(index){const chapter=chapters[Math.max(0,Math.min(chapters.length-1,index))];location.hash=chapter.id;}
$('#previous').addEventListener('click',()=>goChapter(activeChapter-1));$('#next').addEventListener('click',()=>goChapter(activeChapter+1));
document.addEventListener('keydown',(event)=>{
  if(menu.open||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||event.target.closest('input,textarea,select,button,summary,a,[contenteditable]'))return;
  if(event.key==='ArrowRight'){event.preventDefault();goChapter(activeChapter+1);}
  if(event.key==='ArrowLeft'){event.preventDefault();goChapter(activeChapter-1);}
});
let printStates=[];
window.addEventListener('beforeprint',()=>{printStates=$$('details').map((item)=>item.open);$$('details').forEach((item)=>{item.open=true;});});
window.addEventListener('afterprint',()=>{$$('details').forEach((item,index)=>{item.open=printStates[index]??item.open;});});
$('#print-deck').addEventListener('click',()=>window.print());
