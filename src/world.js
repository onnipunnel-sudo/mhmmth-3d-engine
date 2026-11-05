import * as THREE from 'three';
export function createWorld(scene){
 const ground=new THREE.Mesh(new THREE.PlaneGeometry(260,260,1,1),new THREE.MeshStandardMaterial({color:0x557b45,roughness:1}));
 ground.rotation.x=-Math.PI/2;ground.position.y=-0.08;scene.add(ground);
 const roadMat=new THREE.MeshStandardMaterial({color:0x343a3d,roughness:1});
 const road=new THREE.Mesh(new THREE.PlaneGeometry(260,12),roadMat);road.rotation.x=-Math.PI/2;road.position.y=0;scene.add(road);
 const lineMat=new THREE.MeshBasicMaterial({color:0xe4d9a2});
 for(let z=-120;z<=120;z+=12){const line=new THREE.Mesh(new THREE.PlaneGeometry(4,0.18),lineMat);line.rotation.x=-Math.PI/2;line.position.set(0,0.02,z);scene.add(line)}
 const colliders=[],buildings=[];
 const treeMat=new THREE.MeshStandardMaterial({color:0x285b35}), trunkMat=new THREE.MeshStandardMaterial({color:0x65452b});
 for(let i=0;i<75;i++){
   const x=(Math.random()-.5)*220,z=(Math.random()-.5)*220;
   if(Math.abs(x)<12)continue;
   const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.18,.25,1.5,5),trunkMat);trunk.position.set(x,.75,z);scene.add(trunk);
   const crown=new THREE.Mesh(new THREE.ConeGeometry(1.1,2.8,6),treeMat);crown.position.set(x,2.5,z);scene.add(crown);
 }
 function addBuilding(x,z){
   const h=3+Math.random()*5,w=3+Math.random()*2,d=3+Math.random()*2;
   const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color:new THREE.Color().setHSL(.08+Math.random()*.08,.22,.38+Math.random()*.18)}));
   mesh.position.set(x,h/2,z);mesh.castShadow=false;mesh.receiveShadow=false;mesh.userData.size={x:w,z:d};scene.add(mesh);buildings.push(mesh);
   colliders.push({x,z,r:Math.max(w,d)*.55});
   return mesh;
 }
 for(let x=-35;x<=35;x+=12){if(Math.abs(x)<10)continue;addBuilding(x,-18);addBuilding(x,18)}
 return {colliders,buildings,addBuilding};
}
