export const STYLES=['ghost','eyes','circle','pixel'];
export const SCENES={mist:{dark:'#112e2b',mid:'#446553',light:'#d6edbd',accent:'#e7b883'},blood:{dark:'#351b25',mid:'#8b393e',light:'#f1c29e',accent:'#ed8158'},violet:{dark:'#242039',mid:'#5a557e',light:'#e2dcf4',accent:'#b4cda3'}};
export const initialConfig=()=>({format:'poster',ratio:'4:5',scene:'mist',style:'ghost',title:'今夜，无人知晓',subtitle:'每一张面孔，都有未被说出的秘密。'});
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function dimensions(config,image){if(config.format==='original')return{w:image.width,h:image.height};const [a,b]=config.ratio.split(':').map(Number);return{w:1200,h:Math.round(1200*b/a)};}
export function layout(config,image){const{w,h}=dimensions(config,image);const box=config.format==='original'?{x:0,y:0,w,h}:{x:w*.07,y:h*.065,w:w*.86,h:h*.70};const scale=Math.min(box.w/image.width,box.h/image.height);return{w,h,box,photo:{x:box.x+(box.w-image.width*scale)/2,y:box.y+(box.h-image.height*scale)/2,w:image.width*scale,h:image.height*scale}};}
export function sourcePoint(p,photo){return{x:(p.x-photo.x)/photo.w,y:(p.y-photo.y)/photo.h};}
export function hitMask(p,masks){for(let i=masks.length-1;i>=0;i--){const m=masks[i],rx=m.rx*m.scale*1.15,ry=m.ry*m.scale*1.15;if(((p.x-m.x)/rx)**2+((p.y-m.y)/ry)**2<=1)return i;}return -1;}
export function fromLandmarks(landmarks){if(!landmarks?.length)return null;let minX=1,minY=1,maxX=0,maxY=0;for(const p of landmarks){if(!Number.isFinite(p.x)||!Number.isFinite(p.y))continue;minX=Math.min(minX,p.x);maxX=Math.max(maxX,p.x);minY=Math.min(minY,p.y);maxY=Math.max(maxY,p.y);}if(maxX<=minX||maxY<=minY)return null;return{x:clamp((minX+maxX)/2,0,1),y:clamp((minY+maxY)/2,0,1),rx:clamp((maxX-minX)*.59,.01,.5),ry:clamp((maxY-minY)*.59,.01,.5),scale:1};}
export function validateProject(raw){
 if(!raw||raw.kind!=='veil-studio'||raw.version!==1)throw new Error('这不是幽面编辑文件，或版本暂不支持。');
 if(typeof raw.image!=='string'||!/^data:image\/(png|jpeg|webp);base64,/.test(raw.image)||raw.image.length>33000000)throw new Error('编辑文件的图片格式或大小不符合要求。');
 const c=raw.config;if(!c||!['poster','original'].includes(c.format)||!['4:5','9:16','1:1'].includes(c.ratio)||!SCENES[c.scene]||!STYLES.includes(c.style))throw new Error('编辑文件设置不完整。');
 if(!Array.isArray(raw.masks)||raw.masks.length>100)throw new Error('遮罩数量不符合要求。');
 const masks=raw.masks.map(m=>{if(!m||!['x','y','rx','ry','scale'].every(k=>typeof m[k]==='number'&&Number.isFinite(m[k])))throw new Error('遮罩位置数据损坏。');return{x:clamp(m.x,0,1),y:clamp(m.y,0,1),rx:clamp(m.rx,.005,.6),ry:clamp(m.ry,.005,.6),scale:clamp(m.scale,.55,1.8),style:STYLES.includes(m.style)?m.style:c.style};});
 return{kind:'veil-studio',version:1,image:raw.image,name:typeof raw.name==='string'?raw.name.slice(0,100):'veil',config:{format:c.format,ratio:c.ratio,scene:c.scene,style:c.style,title:String(c.title??'').slice(0,18),subtitle:String(c.subtitle??'').slice(0,50)},masks,demo:raw.demo===true};
}
