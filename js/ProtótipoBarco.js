class Barco {

    constructor(x, y) {
        this.diametro = 170;
        this.body = Bodies.circle(x, y, this.diametro/2 - 5);
        this.imagem = loadImage("./assets/boat.png");
        World.add(world, this.body);
    }

    exibir() {
        var angle = this.body.angle;
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.imagem, 0, 0, this.diametro, this.diametro)
        pop();
    }
}