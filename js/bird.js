function Bird (x, y) {
    this.x = x;
    this.y = y;
    this.drawBird = (ctx) => {
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(x, y, 20, 20);
        ctx.stroke();
    }
    this.move = () => {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.setSpeedX = (speedX) => {
        this.speedX = speedX;
    }
    this.setSpeedY = (speedY) => {
        this.speedY = speedY;
    }
}
