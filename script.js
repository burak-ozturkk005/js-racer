
const canvas =document.getElementById('game');
const ctx = canvas.getContext('2d');
//Oyuncunun koordinatları ilk iki sol üst köşenin konumu, son iki sayi dikdörtgenin boyutu 
const player = {
    x: 145,
    y: 410,
    w: 30,
    h:50
};
let roadOffset = 0;
const keys = {left:false,right:false};
window.addEventListener('keydown',e => {
    if(e.code === 'ArrowLeft') keys.left = true;
    if(e.code === 'ArrowRight') keys.right = true;
});
window.addEventListener('keyup',e => {
    if(e.code === 'ArrowLeft') keys.left = false;
    if(e.code === 'ArrowRight') keys.right = false;
});

function update()
{
    //klavye girdisi 
    if(keys.left) player.x -= 4;
    if(keys.right) player.x += 4;
    //Sınırlar
    if(player.x < 0) player.x = 0;
    if(player.x + player.w > 320) player.x = 320 - player.w;
    roadOffset += 2;
}
function draw()
{
    //1. arkaplanı boya
    ctx.fillStyle = '#2c2c2a';
    ctx.fillRect(0,0,320,480);
    //2. arabayı çiz
    ctx.fillStyle = '#378ADD';
    ctx.fillRect(player.x,player.y,player.w,player.h);
    ctx.fillStyle = '#f5f5f5';
    for(let y = -40 + (roadOffset % 40); y < 480; y += 40)
    {
        ctx.fillRect(158,y,4,20);
    }
}
function loop()
{
    update();
    draw();
    requestAnimationFrame(loop);
}
loop();
