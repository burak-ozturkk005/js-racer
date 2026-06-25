
const canvas =document.getElementById('game');
const ctx = canvas.getContext('2d');
//Oyuncunun durumu 
const player = {
    x: 145,
    y: 410,
    w: 30,
    h:50
};
function draw()
{
    //1. arkaplanı boya
    ctx.fillStyle = '#2c2c2a';
    ctx.fillRect(0,0,320,480);
    //2. arabayı çiz
    ctx.fillStyle = '#378ADD';
    ctx.fillRect(player.x,player.y,player.w,player.h);
}
function loop()
{
    draw();
    requestAnimationFrame(loop);
}
loop();
