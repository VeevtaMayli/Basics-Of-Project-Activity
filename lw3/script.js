const SUN_SPEED = 0.2;

function Sun({
    startX,
    startY,
    radius,
    angle
}) {
    this.x = startX;
    this.y = startY;
    this.radius = radius;
    this.angle = angle;
}

function drawSky({ctx, width, height}) {
    ctx.fillStyle = 'rgb(60,120,216)';
    ctx.fillRect(0, 0, width, 0.75 * height);
}

function drawGrass({ctx, width, height}) {
    ctx.fillStyle = 'rgb(106,168,79)';
    ctx.fillRect(0, 0.75 * height, width, 0.25 * height);
}

function drawSkyObjects(ctx) {
    drawCloud(ctx, 130, 120);
    drawCloud(ctx, 400, 30);
    drawCloud(ctx, 700, 100);
}

function drawSun({ctx, sun}) {
    ctx.fillStyle = 'rgb(255,229,153)';
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.radius, 0, 2 * Math.PI);
    ctx.fill();
}

function moveSun({dT, sun, boxWidth, boxHeight}) {
    const deltaAngle = dT * SUN_SPEED;
    sun.angle = (sun.angle + deltaAngle) % (2 * Math.PI);
    sun.x = 400 * Math.sin(-sun.angle) + boxWidth / 2;
    sun.y = 300 * Math.cos(sun.angle) + 0.75 * boxHeight;
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

function redraw({ctx, width, height, sun}) {
    drawSky({ctx, width, height});
    drawSun({ctx, sun});
    drawSkyObjects(ctx);
    drawGrass({ctx, width, height});
    drawHouse(ctx);
}

function update({sun, dT, boxWidth, boxHeight}) {
    moveSun({dT, sun, boxWidth, boxHeight});
}

function main() {
    const canvasEl = document.getElementById('canvas');
    const width = canvasEl.offsetWidth;
	const height = canvasEl.offsetHeight;
    
    const ctx = canvasEl.getContext('2d');

    const SUN_RADIUS = 40;

    let sun = new Sun({
        startX: 0.15 * width,
        startY: 0.75 * height,
        radius: SUN_RADIUS,
        angle: 0.5 * Math.PI
    });

    redraw({ctx, width, height, sun});

    let lastTimestamp = Date.now();
    const animateFn = () => {
        const currentTimestamp = Date.now();
        const deltaTime = (currentTimestamp - lastTimestamp) * 0.001;
        lastTimestamp = currentTimestamp;
        update({sun, dT: deltaTime, boxWidth: width, boxHeight: height});
        redraw({ctx, width, height, sun});
        requestAnimationFrame(animateFn);
    };
    animateFn();
}

window.onload = function() {
    main();
};