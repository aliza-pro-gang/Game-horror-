const coinsEl=document.getElementById('coins');
const energyEl=document.getElementById('energy');
const baseBar=document.getElementById('baseBar');
const monsterHp=document.getElementById('monsterHp');
const damageText=document.getElementById('damageText');
const toast=document.getElementById('toast');
const pause=document.getElementById('paused');

let coins=250, energy=100, base=76, monster=72, wave=1, paused=false;

function toastMsg(msg){
  toast.textContent=msg; toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),1200);
}
function update(){
  coinsEl.textContent=coins; energyEl.textContent=energy;
  baseBar.style.width=base+'%'; monsterHp.style.width=Math.max(0,monster)+'%';
}
function hit(){
  if(paused) return;
  monster-=Math.floor(Math.random()*5)+2;
  damageText.textContent='-'+(Math.floor(Math.random()*8)+4);
  damageText.classList.remove('show'); void damageText.offsetWidth; damageText.classList.add('show');
  if(monster<=0){
    monster=100; wave++; coins+=50;
    document.getElementById('wave').textContent=wave;
    toastMsg('Wave cleared! +50 coins');
  }
  update();
}
setInterval(hit,1100);

document.querySelectorAll('.action').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const cost=Number(btn.dataset.cost);
    if(coins<cost){toastMsg('Not enough coins');return;}
    coins-=cost;
    const action=btn.dataset.action;
    if(action==='shield'){base=Math.min(100,base+12);toastMsg('Shield activated');}
    else if(action==='heal'){base=Math.min(100,base+20);toastMsg('Dorm repaired');}
    else if(action==='upgrade'){energy=Math.min(100,energy+20);toastMsg('Defense upgraded');}
    else {energy=Math.min(100,energy+10);toastMsg('Turret deployed');}
    update();
  });
});

document.getElementById('pauseBtn').onclick=()=>{
  paused=true; pause.classList.remove('hidden');
};
document.getElementById('resumeBtn').onclick=()=>{
  paused=false; pause.classList.add('hidden');
};
update();
