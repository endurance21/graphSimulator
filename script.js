var wave = {
    y:innerHeight/2,
    frequency:0.01,
    amplitude:200,
    phase:3.14,
    doClearRect:false
};
const canvas  = document.querySelector('canvas');
canvas.width = innerWidth ;
canvas.height = innerHeight;
const ctx = canvas.getContext('2d');


var gui = new dat.GUI();
gui.add(wave , 'y' ,0 ,innerHeight,0.1);
gui.add(wave ,'frequency',-0.1,0.1 ,0.0001);
gui.add(wave ,'amplitude' ,-300, 300 ,0.9);
gui.add(wave ,'phase' ,-3.14 , 100 )
gui.add(wave , 'doClearRect');
function animate(){
    window.requestAnimationFrame(animate) ;
    if(wave.doClearRect){
    ctx.clearRect(0,0,innerWidth,innerHeight); 
    }
    ctx.moveTo(0,innerHeight/2) ;
    ctx.beginPath();
    for(let i = 0 ; i< canvas.width ; i++ ) {
    ctx.lineTo( i , wave.y + Math.sin(i*wave.frequency + wave.phase)*wave.amplitude ) ;
    ctx.stroke();
   }
}
animate();

