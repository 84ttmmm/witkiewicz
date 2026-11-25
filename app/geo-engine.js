(function(root){
 const distance=(a,b)=>{const r=Math.PI/180,p=(b[0]-a[0])*r,l=(b[1]-a[1])*r;const h=Math.sin(p/2)**2+Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(l/2)**2;return 6371000*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h))};
 class ProximityGuide{
  constructor(points,{radius=60,maxAccuracy=60,dwellMs=3000}={}){this.points=points;this.radius=radius;this.maxAccuracy=maxAccuracy;this.dwellMs=dwellMs;this.visited=new Set();this.candidate=null}
  update({lat,lng,accuracy,timestamp},now=Date.now()){
   if(![lat,lng,accuracy,timestamp].every(Number.isFinite)||Math.abs(lat)>90||Math.abs(lng)>180||accuracy<0||accuracy>this.maxAccuracy||now-timestamp>15000||timestamp>now+5000){this.candidate=null;return{ready:null,reason:'accuracy'}}
   const nearby=this.points.map(p=>({...p,distance:distance([lat,lng],p.coords)})).sort((a,b)=>a.distance-b.distance),nearest=nearby[0];
   if(!nearest||nearest.distance>this.radius||this.visited.has(nearest.id)){this.candidate=null;return{ready:null,nearest,reason:'outside'}}
   if(this.candidate?.id!==nearest.id)this.candidate={id:nearest.id,since:now};
   return{nearest,ready:now-this.candidate.since>=this.dwellMs?nearest:null,reason:'near'}
  }
  markPlayed(id){this.visited.add(id);this.candidate=null}
 }
 root.TurnieGeo={distance,ProximityGuide};
})(typeof window!=='undefined'?window:globalThis);
