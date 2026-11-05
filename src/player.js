import * as THREE from 'three';
export class Player{
 constructor(scene){
  this.group=new THREE.Group();
  const body=new THREE.Mesh(new THREE.CapsuleGeometry(.42,.85,3,6),new THREE.MeshStandardMaterial({color:0x263f79}));
  body.position.y=1.05;this.group.add(body);
  const head=new THREE.Mesh(new THREE.SphereGeometry(.28,8,6),new THREE.MeshStandardMaterial({color:0xc99570}));
  head.position.y=1.9;this.group.add(head);
  this.group.position.set(0,0,4);scene.add(this.group);this.position=this.group.position;
 }
 update(dt,mx,my,yaw,colliders){
  const input=new THREE.Vector3(mx,0,-my);
  if(input.lengthSq()>1)input.normalize();
  const forward=new THREE.Vector3(-Math.sin(yaw),0,-Math.cos(yaw));
  const right=new THREE.Vector3(forward.z,0,-forward.x);
  const dir=right.multiplyScalar(input.x).add(forward.multiplyScalar(input.z));
  if(dir.lengthSq()>.001){
   this.position.addScaledVector(dir,5*dt);
   this.group.rotation.y=Math.atan2(dir.x,dir.z);
  }
  for(const c of colliders){const dx=this.position.x-c.x,dz=this.position.z-c.z,d=Math.hypot(dx,dz),min=c.r+.45;if(d<min&&d>0){this.position.x=c.x+dx/d*min;this.position.z=c.z+dz/d*min}}
 }
}
