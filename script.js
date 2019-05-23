const canvas  = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var wave = {
    y:canvas.height/2,
    frequency:-0.087,
    amplitude:canvas.height/6,
    velocity:0.303,
};
var strokeColor = {
    r:255 ,
    g:134,
    b:227
};
var animation = {
    cancelAnimation:false ,
    shadows:true 
}
var gui = new dat.GUI({ height:100});
var increament = 2 ;
var animationref = null ;


// canvas.width = innerWidth/2;
// canvas.height = innerHeight/2;

const waveFolder = gui.addFolder('WAVE');   
waveFolder.add(wave , 'y' ,0 ,canvas.height,0.08);
waveFolder.add(wave ,'frequency',-0.1,0.1 ,0.0001);
waveFolder.add(wave ,'amplitude' ,-300, 300 ,0.9);
waveFolder.add(wave ,'velocity' ,-2, 2 ,0.001);
waveFolder.open();
const strokeFolder = gui.addFolder('COLOR');
strokeFolder.add(strokeColor ,'r',0,255)
strokeFolder.add(strokeColor ,'g',0,255)
strokeFolder.add(strokeColor ,'b',0,255)
strokeFolder.open();
console.log(gui)

const animationFolder  = gui.addFolder('ANIMATION_CONTROL');
animationFolder.add(animation , 'cancelAnimation').onFinishChange(()=>{
    if(animation.cancelAnimation)
    cancelAnimationFrame(animationref);
    else
    animate();
});
animationFolder.open();
animationFolder.add(animation, 'shadows');


function animate(){
    animationref = requestAnimationFrame(animate) ;
    if(!animation.shadows)
        ctx.clearRect(0,0,canvas.width,canvas.height); 
    else{
       ctx.fillStyle = 'rgba(0,0,0,0.09)';
       ctx.fillRect(0,0,canvas.width,canvas.height);
     }
    ctx.moveTo(0,canvas.height/2);
    ctx.beginPath();
    for(let i = 0 ; i< canvas.width ; i+=1.5 ) {
    ctx.lineTo( i , wave.y + Math.sin(i*(wave.frequency) + increament)*(wave.amplitude)) ;
    ctx.strokeStyle = "rgb("+ strokeColor.r +"," + strokeColor.g + ","+strokeColor.b+") ";
    ctx.stroke();   
   
 }
    ctx.font = "20px Cinzel, serif";
    ctx.fillStyle = 'rgba(2255,255,255,0.09)';
    ctx.textAlign = "center";
    ctx.fillText("D_R CREATION", canvas.width/2, canvas.height-10); 
    increament+=Math.abs(Math.sin(wave.velocity/5));

  
}
animate();

