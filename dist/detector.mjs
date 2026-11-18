import{fromLandmarks}from'./core.mjs';
let instance;
export async function detectFaces(image){
 if(!instance)instance=(async()=>{const{FaceLandmarker,FilesetResolver}=await import('./vendor/vision_bundle.mjs');const vision=await FilesetResolver.forVisionTasks(new URL('./vendor/wasm',import.meta.url).href);return FaceLandmarker.createFromOptions(vision,{baseOptions:{modelAssetPath:new URL('./vendor/face_landmarker.task',import.meta.url).href,delegate:'CPU'},runningMode:'IMAGE',numFaces:16,minFaceDetectionConfidence:.5,minFacePresenceConfidence:.5});})().catch(e=>{instance=null;throw e;});
 const detector=await instance,found=[];
 const scan=(x,y,w,h)=>{const c=document.createElement('canvas'),k=Math.min(1,1400/Math.max(w,h));c.width=Math.round(w*k);c.height=Math.round(h*k);c.getContext('2d').drawImage(image,x,y,w,h,0,0,c.width,c.height);const result=detector.detect(c);for(const lm of result.faceLandmarks){const local=fromLandmarks(lm);if(!local)continue;const m={x:(x+local.x*w)/image.width,y:(y+local.y*h)/image.height,rx:local.rx*w/image.width,ry:local.ry*h/image.height,scale:1};if(!found.some(f=>Math.hypot((f.x-m.x)*image.width,(f.y-m.y)*image.height)<Math.max(f.rx,m.rx)*image.width))found.push(m);}};
 scan(0,0,image.width,image.height);
 // Independently scan overlapping portrait panels, so small faces in reference
 // sheets are not lost when the full image is downscaled by the model.
 if(Math.max(image.width,image.height)>1000){const cw=image.width*.5,ch=image.height*.65;for(const y of [0,image.height-ch])for(const x of [0,image.width*.25,image.width-cw]){await new Promise(requestAnimationFrame);scan(x,y,cw,ch);}}
 return found;
}
