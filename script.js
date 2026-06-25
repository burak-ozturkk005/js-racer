
const canvas =document.getElementById('game');
const ctx = canvas.getContext('2d');
let speed = 5;
const enemy = {
    x: 100,
    y: -50,
    w: 30,
    h: 50,
    speed: 3
};
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
    //Engeli aşağı doğru yürüt
    enemy.y += enemy.speed;
    if(enemy.y > 400) {
        enemy.y = -50; // Tekrar yukarı ışınla
        //Rastgele bir şerit seç (100 sol şerit, 190 sağ şerit)
        enemy.x = Math.random() > 0.5 ? 100 : 190;
    }
    //klavye girdisi 
    if(keys.left) player.x -= speed;
    if(keys.right) player.x += speed;
    //Sınırlar
    if(player.x < 0) player.x = 0;
    if(player.x + player.w > 320) player.x = 320 - player.w;
    //4. yolun akma hızı
    roadOffset += speed;
    //5. çarpışma kontrolü
    if (player.x < enemy.x + enemy.w &&
        player.x + player.w > enemy.x &&
        player.y < enemy.y + enemy.h &&
        player.y + player.h > enemy.y) {
        
        // Çarpışma olduysa oyuncuyu uyar
        alert("Güm! Kaza yaptın.");
        
        // Oyunu sıfırla (Arabayı ortaya al, engeli yukarı ışınla)
        player.x = 145;
        enemy.y = -50;
    }

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
    //3. engeli çiz
    ctx.fillStyle = '#FF4444';
    ctx.fillRect(enemy.x, enemy.y,enemy.w,enemy.h);
    for(let y = -40 + (roadOffset % 40); y < 480; y += 40)
    {
        ctx.fillRect(100,y,4,20);
        ctx.fillRect(220,y,4,20);
    }
}
function loop()
{
    update();
    draw();
    requestAnimationFrame(loop);
}
loop();
