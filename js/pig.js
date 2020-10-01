function Pig(x, y) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.drawPig = (ctx) => {
        this.image.src = "img/goalIdle.gif"
        ctx.drawImage(this.image, this.x, this.y,40,40);
    }
}
