const canvas  = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var wave = {
    y:canvas.height/2,
    frequency:0.01,
    amplitude:canvas.height/5,
    velocity:0.303,
};
var strokeColor = {
    r:255 ,
    g:36,
    b:22 
};
var animation = {
    cancelAnimation:false ,
    doClearRect:false 
}
var gui = new dat.GUI();
var increament = 2 ;
var animationref = null ;


canvas.width = innerWidth/1.2;
canvas.height = innerHeight/2;

const waveFolder = gui.addFolder('WAVE');   
waveFolder.add(wave , 'y' ,0 ,canvas.height,0.1);
waveFolder.add(wave ,'frequency',-0.1,0.1 ,0.0001);
waveFolder.add(wave ,'amplitude' ,-300, 300 ,0.9);
waveFolder.add(wave ,'velocity' ,-2, 2 ,0.001);
waveFolder.open();
const strokeFolder = gui.addFolder('COLOR');
strokeFolder.add(strokeColor ,'r',0,255)
strokeFolder.add(strokeColor ,'g',0,255)
strokeFolder.add(strokeColor ,'b',0,255)
strokeFolder.open();

const animationFolder  = gui.addFolder('ANIMATION_CONTROL');
animationFolder.add(animation , 'cancelAnimation').onFinishChange(()=>{
    if(animation.cancelAnimation)
    cancelAnimationFrame(animationref);
    else
    animate();
});
animationFolder.open();
animationFolder.add(animation, 'doClearRect');


function animate(){
    animationref = requestAnimationFrame(animate) ;
    if(animation.doClearRect)
        ctx.clearRect(0,0,canvas.width,canvas.height); 
   else{
       ctx.fillStyle = 'rgba(0,0,0,0.01)';
       ctx.fillRect(0,0,canvas.width,canvas.height);
     }
  ctx.moveTo(0,canvas.height/2);
  ctx.beginPath();
  for(let i = 0 ; i< canvas.width ; i++ ) {
  ctx.lineTo( i , wave.y + Math.sin(i*(wave.frequency) + increament)*(wave.amplitude)) ;

  ctx.strokeStyle = "rgb("+ strokeColor.r +"," + strokeColor.g + ","+strokeColor.b+") ";
  ctx.stroke();
 }
 increament+=Math.abs(Math.sin(wave.velocity/5));
  
}
animate();

