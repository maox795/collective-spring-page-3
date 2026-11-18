const previews = [
  'bury-my-soul-audio.mp3',
  'chunxi-audio.mp3',
  'forest-mixtape-audio.mp3'
];
const audio = new Audio();
const records = [...document.querySelectorAll('.vinyl')];
let selected = -1;
function pauseRecord(){audio.pause();records.forEach(r=>{r.classList.remove('playing');r.setAttribute('aria-pressed','false')})}
records.forEach((record,i)=>record.addEventListener('click',()=>{
  if(selected===i&&!audio.paused){pauseRecord();return}
  pauseRecord();selected=i;
  audio.src=previews[i];audio.volume=.65;
  audio.play().then(()=>{record.classList.add('playing');record.setAttribute('aria-pressed','true')}).catch(()=>{});
}));
audio.addEventListener('ended',pauseRecord);
const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('visible')}
  if(!entry.isIntersecting&&entry.target.contains(records[selected]))pauseRecord();
}),{threshold:.35});
document.querySelectorAll('.poem-section').forEach(section=>observer.observe(section));
document.querySelector('.one').classList.add('visible');
