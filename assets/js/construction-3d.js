import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const mount = document.querySelector('[data-construction-3d]');
if (!mount) throw new Error('3D construction mount not found');

const canvas = document.createElement('canvas');
canvas.className = 'construction-canvas';
mount.appendChild(canvas);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xf4f1ea, 18, 42);

const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
camera.position.set(8.8, 6.3, 10.5);

const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

scene.add(new THREE.HemisphereLight(0xffffff, 0x777777, 2.2));
const key = new THREE.DirectionalLight(0xffffff, 3.2);
key.position.set(7,12,8);
key.castShadow = true;
key.shadow.mapSize.set(1024,1024);
key.shadow.camera.left=-12; key.shadow.camera.right=12; key.shadow.camera.top=12; key.shadow.camera.bottom=-12;
scene.add(key);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(34,34),
  new THREE.MeshStandardMaterial({color:0xd9d4ca, roughness:.9})
);
ground.rotation.x=-Math.PI/2;
ground.position.y=-.04;
ground.receiveShadow=true;
scene.add(ground);

const model = new THREE.Group();
scene.add(model);

const materials = {
  concrete:new THREE.MeshStandardMaterial({color:0xb9b6b0,roughness:.92}),
  wall:new THREE.MeshStandardMaterial({color:0xe8e3da,roughness:.8}),
  dark:new THREE.MeshStandardMaterial({color:0x252a31,roughness:.38,metalness:.15}),
  glass:new THREE.MeshPhysicalMaterial({color:0x9eb4c5,roughness:.08,metalness:.05,transmission:.15,transparent:true,opacity:.78}),
  wood:new THREE.MeshStandardMaterial({color:0x765d49,roughness:.65}),
  red:new THREE.MeshStandardMaterial({color:0x8b0d28,roughness:.48}),
  worker:new THREE.MeshStandardMaterial({color:0xf2b632,roughness:.72}),
  skin:new THREE.MeshStandardMaterial({color:0x7b4b31,roughness:.85}),
  white:new THREE.MeshStandardMaterial({color:0xf7f7f4,roughness:.6})
};

const parts = [];
function box(name,size,pos,mat,stage,opts={}) {
  const m=new THREE.Mesh(new THREE.BoxGeometry(...size),mat);
  m.name=name; m.position.set(...pos); m.castShadow=true; m.receiveShadow=true;
  m.userData.stage=stage; m.userData.baseY=pos[1]; m.userData.delay=opts.delay||0;
  model.add(m); parts.push(m); return m;
}
function cylinder(name,r,h,pos,mat,stage,opts={}) {
  const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,24),mat);
  m.name=name; m.position.set(...pos); m.castShadow=true; m.receiveShadow=true;
  m.userData.stage=stage; m.userData.baseY=pos[1]; m.userData.delay=opts.delay||0;
  model.add(m); parts.push(m); return m;
}

// Site / foundations
box('foundation',(7.8,.35,5.8),(0,.15,0),materials.concrete,0);
box('slab',(7.35,.18,5.35),(0,.42,0),materials.concrete,0);

// Main house shell
box('left-wall',(0.28,3.5,5.2),(-3.45,2.15,0),materials.wall,1);
box('right-wall',(0.28,3.5,5.2),(3.45,2.15,0),materials.wall,1);
box('rear-wall',(7.0,3.5,.28),(0,2.15,2.45),materials.wall,1);
box('front-wall',(7.0,3.5,.28),(0,2.15,-2.45),materials.wall,1);

// Internal upper mass
box('upper-mass',(4.8,1.7,4.5),(0,4.75,.15),materials.wall,2);

// Windows / doors
[[-2.1,2.05,-2.61],[0,2.05,-2.61],[2.1,2.05,-2.61]].forEach((p,i)=>box('window'+i,(1.35,1.55,.08),p,materials.glass,3));
box('entry-door',(1.05,2.1,.1),(0,1.45,-2.63),materials.wood,3);
box('upper-window',(2.5,.95,.08),(0,4.7,-2.29),materials.glass,3);

// Roof planes
const roof1=box('roof-left',(4.2,.22,5.55),(-1.9,5.85,0),materials.dark,2);
roof1.rotation.z=-0.12;
const roof2=box('roof-right',(4.2,.22,5.55),(1.9,5.85,0),materials.dark,2);
roof2.rotation.z=0.12;
box('roof-edge',(7.7,.18,.22),(0,5.95,-2.55),materials.red,2);

// Finishes / terrace
box('terrace',(3.2,.16,1.65),(4.9,.5,-1.65),materials.concrete,3);
box('terrace-glass',(3.1,1.15,.08),(4.9,1.05,-2.45),materials.glass,3);
box('sign',(1.9,.55,.08),(0,3.0,-2.65),materials.red,3);

// Construction materials
for(let i=0;i<7;i++) box('block'+i,(.55,.35,.35),[5.4+i%3*.62,.7+Math.floor(i/3)*.42,-.2+(i%2)*.55],materials.concrete,0,{delay:.15+i*.02});

// Workers: stylised low-poly figures that read well at distance
function worker(x,z,stage,scale=1,flip=1){
  const g=new THREE.Group();
  g.userData.stage=stage; g.userData.baseY=.55; g.position.set(x,.55,z); g.scale.setScalar(scale);
  const torso=new THREE.Mesh(new THREE.CapsuleGeometry(.18,.62,4,8),materials.worker); torso.position.y=.58; torso.castShadow=true; g.add(torso);
  const head=new THREE.Mesh(new THREE.SphereGeometry(.16,16,12),materials.skin); head.position.y=1.06; head.castShadow=true; g.add(head);
  const helmet=new THREE.Mesh(new THREE.SphereGeometry(.19,16,8,0,Math.PI*2,0,Math.PI/2),materials.white); helmet.position.y=1.17; helmet.castShadow=true; g.add(helmet);
  const arm=new THREE.Mesh(new THREE.CapsuleGeometry(.06,.42,3,6),materials.worker); arm.position.set(.28*flip,.62,.02); arm.rotation.z=-.5*flip; arm.castShadow=true; g.add(arm);
  model.add(g); parts.push(g); return g;
}
worker(-2.6,-3.35,1,.9,1);
worker(2.5,-3.3,1,.88,-1);
worker(3.8,.2,2,.82,1);
worker(-4.5,.8,1,.82,-1);
worker(4.5,-2.1,3,.78,-1);

// Trees / landscaping for completion stage
function tree(x,z){
  const g=new THREE.Group(); g.position.set(x,.5,z);
  const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.1,.13,.8,10),materials.wood); trunk.position.y=.4; trunk.castShadow=true; g.add(trunk);
  const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(.55,1),new THREE.MeshStandardMaterial({color:0x466b4c,roughness:.9})); crown.position.y=1.15; crown.castShadow=true; g.add(crown);
  g.userData.stage=3; g.userData.baseY=.5; model.add(g); parts.push(g);
}
tree(-5,-3.1); tree(5,2.9); tree(-5,2.8);

const labels=[
  ['01','FOUNDATION','Groundwork, setting out and structural base.'],
  ['02','STRUCTURE','Walls and primary structural elements take shape.'],
  ['03','ROOF & SHELL','Roof structure, openings and building envelope come together.'],
  ['04','COMPLETION','Finishes, glazing, landscaping and final presentation.']
];
const labelEl=document.querySelector('[data-construction-label]');
const descEl=document.querySelector('[data-construction-description]');
const stageEl=document.querySelector('[data-construction-stage]');

function setPartState(obj,p){
  const stage=obj.userData.stage ?? 0;
  const d=obj.userData.delay||0;
  const reveal=Math.min(Math.max((p-(stage-0.15+d))/.48,0),1);
  const eased=1-Math.pow(1-reveal,3);
  if(obj.isGroup && obj.userData.baseY!==undefined){
    obj.visible=eased>.01;
    obj.scale.y=Math.max(.001,eased);
    obj.position.y=obj.userData.baseY + (1-eased)*-.3;
  } else {
    obj.visible=eased>.01;
    obj.scale.y=Math.max(.001,eased);
    obj.position.y=obj.userData.baseY + (1-eased)*-1.2;
  }
}

function resize(){
  const w=mount.clientWidth||window.innerWidth;
  const h=mount.clientHeight||window.innerHeight;
  renderer.setSize(w,h,false);
  camera.aspect=w/h; camera.updateProjectionMatrix();
}
window.addEventListener('resize',resize,{passive:true}); resize();

let scrollProgress=0;
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function readProgress(){
  const section=mount.closest('.construction-journey');
  if(!section)return;
  const r=section.getBoundingClientRect();
  const range=Math.max(section.offsetHeight-window.innerHeight,1);
  scrollProgress=Math.min(Math.max(-r.top/range,0),1);
}
if(!reduceMotion) window.addEventListener('scroll',readProgress,{passive:true}); readProgress();

const clock=new THREE.Clock();
function animate(){
  requestAnimationFrame(animate);
  const p=scrollProgress;
  const stage=Math.min(p*4,3.999);
  parts.forEach(o=>setPartState(o,stage));
  model.rotation.y = -0.42 + p*Math.PI*1.72;
  model.rotation.x = .01 + Math.sin(p*Math.PI)*.035;
  const targetZ=10.5-p*.8;
  camera.position.z += (targetZ-camera.position.z)*.04;
  camera.lookAt(0,2.4,0);
  if(labelEl){
    const bar=document.querySelector('.construction-progress span');
    if(bar) bar.style.transform=`scaleX(${Math.max(.02,p)})`;
    const idx=Math.min(Math.floor(p*4),3);
    labelEl.textContent=labels[idx][1];
    descEl.textContent=labels[idx][2];
    stageEl.textContent=labels[idx][0];
  }
  renderer.render(scene,camera);
}
animate();
