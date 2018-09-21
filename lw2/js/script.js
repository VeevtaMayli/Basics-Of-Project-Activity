function drawBackground(ctx) {
    ctx.fillStyle = 'rgb(60,120,216)';
    ctx.fillRect(0, 0, 1000, 400);

    ctx.fillStyle = 'rgb(106,168,79)';
    ctx.fillRect(0, 400, 1000, 200);
}

function drawSkyObjects(ctx) {
    //draw Sun
    ctx.fillStyle = 'rgb(255,229,153)';
    ctx.beginPath();
    ctx.ellipse(20, 20, 76, 60, 0, 0, 2 * Math.PI);
    ctx.fill();

    //draw clouds
    drawCloud(ctx, 130, 120);
    drawCloud(ctx, 400, 30);
    drawCloud(ctx, 700, 100);
}

function drawCloud(ctx, x, y) {
    ctx.fillStyle = 'rgb(207,226,243)';
    ctx.beginPath();
    ctx.ellipse(x + 60, y + 50, 60, 30, 0, 0, 2 * Math.PI);
    ctx.ellipse(x + 100, y + 30, 60, 30, 0, 0, 2 * Math.PI);
    ctx.ellipse(x + 150, y + 50, 60, 30, 0, 0, 2 * Math.PI);
    ctx.fill();
}

function drawHouse(ctx) {
    //draw chimney
    ctx.fillStyle = 'rgb(102,102,102)';
    ctx.fillRect(550, 160, 35, 100);

    //draw roof
    ctx.fillStyle = 'rgb(204,0,0)';
    ctx.beginPath();
    ctx.moveTo(375, 300);
    ctx.lineTo(500, 150);
    ctx.lineTo(625, 300);
    ctx.lineTo(375, 300);
    ctx.fill();

    //draw wall
    ctx.fillStyle = 'rgb(191,144,0)';
    ctx.fillRect(375, 300, 250, 180);

    // draw window
    ctx.fillStyle = 'rgb(255,217,102)';
    ctx.fillRect(455, 320, 90, 100);

    //draw window frame
    ctx.strokeStyle = 'rgb(93,92,89)';
    ctx.beginPath();
    ctx.moveTo(455, 370);
    ctx.lineTo(545, 370);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(500, 320);
    ctx.lineTo(500, 420);
    ctx.stroke();
}

function draw() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    
    drawBackground(ctx);
    drawSkyObjects(ctx);
    drawHouse(ctx);
}

window.onload = function() {
    draw();
};