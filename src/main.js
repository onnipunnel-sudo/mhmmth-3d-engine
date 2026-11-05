import * as THREE from 'three';
import { createWorld } from './world.js';
import { Player } from './player.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87b7d5);
scene.fog = new THREE.Fog(0x87b7d5, 65, 220);
const camera = new THREE.PerspectiveCamera(65, innerWidth/innerHeight, 0.1, 500);
const renderer = new THREE.WebGLRenderer({antialias:false, powerPreference:'low-power'});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.0));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = false;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const hemi = new THREE.HemisphereLight(0xd9efff, 0x58604a, 2.0); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff0d2, 2.1); sun.position.set(-35,60,25); scene.add(sun);
const world = createWorld(scene);
const player = new Player(scene);
let cameraYaw = 0, cameraPitch = 0.28, moveX=0, moveY=0, lookX=0, lookY=0;
let lastLookX=0,lastLookY=0, lookActive=false;
const cameraTarget = new THREE.Vector3();
const clock = new THREE.Clock();

function updateCamera(dt){
  cameraYaw -= lookX * 0.004;
  cameraPitch = THREE.MathUtils.clamp(cameraPitch + lookY*0.003, -0.05, 0.8);
  lookX=0; lookY=0;
  const target = player.position.clone().add(new THREE.Vector3(0,1.5,0));
  const distance=6.5;
  const offset=new THREE.Vector3(Math.sin(cameraYaw)*distance, 2.2+cameraPitch*3, Math.cos(cameraYaw)*distance);
  camera.position.lerp(target.clone().add(offset), 1-Math.pow(0.001,dt));
  camera.lookAt(target);
}
function animate(){
  requestAnimationFrame(animate);
  const dt=Math.min(clock.getDelta(),0.04);
  player.update(dt,moveX,moveY,cameraYaw,world.colliders);
  updateCamera(dt);
  renderer.render(scene,camera);
  document.querySelector('#stats').textContent=`Objects: ${scene.children.length} • Position: ${player.position.x.toFixed(1)}, ${player.position.z.toFixed(1)} • ${Math.round(1/dt)} FPS`;
}
animate();

const stick=document.querySelector('#stick'), knob=document.querySelector('#knob');
let stickId=null;
function stickMove(e){
 const r=stick.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2;
 let dx=e.clientX-cx, dy=e.clientY-cy, len=Math.hypot(dx,dy), max=42;
 if(len>max){dx=dx/len*max;dy=dy/len*max}
 knob.style.transform=`translate(${dx}px,${dy}px)`;
 moveX=dx/max; moveY=-dy/max;
}
stick.addEventListener('pointerdown',e=>{stickId=e.pointerId;stick.setPointerCapture(stickId);stickMove(e)});
stick.addEventListener('pointermove',e=>{if(e.pointerId===stickId)stickMove(e)});
function stopStick(){stickId=null;moveX=moveY=0;knob.style.transform='translate(0,0)'}
stick.addEventListener('pointerup',stopStick);stick.addEventListener('pointercancel',stopStick);

const look=document.querySelector('#lookZone');
look.addEventListener('pointerdown',e=>{lookActive=true;lastLookX=e.clientX;lastLookY=e.clientY;look.setPointerCapture(e.pointerId)});
look.addEventListener('pointermove',e=>{if(!lookActive)return;lookX+=e.clientX-lastLookX;lookY+=e.clientY-lastLookY;lastLookX=e.clientX;lastLookY=e.clientY});
look.addEventListener('pointerup',()=>lookActive=false);look.addEventListener('pointercancel',()=>lookActive=false);

function addBuilding(){
 const x=Math.round((player.position.x+Math.sin(cameraYaw)*12)/4)*4;
 const z=Math.round((player.position.z+Math.cos(cameraYaw)*12)/4)*4;
 world.addBuilding(x,z);
}
document.querySelector('#build').onclick=addBuilding;
document.querySelector('#reset').onclick=()=>location.reload();
document.querySelector('#toggleHelp').onclick=()=>{const h=document.querySelector('#help');h.style.display=h.style.display==='block'?'none':'block'};
document.querySelector('#save').onclick=()=>{
 const data={engine:'MHMMTH 3D Engine',version:1,buildings:world.buildings.map(b=>({x:b.position.x,z:b.position.z,scale:{x:b.scale.x,y:b.scale.y,z:b.scale.z}}))};
 const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='mhmmth-world.json';a.click();URL.revokeObjectURL(a.href);
};
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
