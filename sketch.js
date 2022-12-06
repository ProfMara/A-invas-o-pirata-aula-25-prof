const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world, cenario;
var canvas, angle, torreIMG, torre, solo, canhao;

//criar a matriz de balas
var balas = [];

var barco;
var barcos = [];


function preload() {
    cenario = loadImage("./assets/background.gif");
    torreIMG = loadImage("./assets/tower.png");
}

function setup() {
    canvas = createCanvas(1200, 600);
    engine = Engine.create();
    world = engine.world;
    angleMode(DEGREES)
    angle = 15;


    var parado = { isStatic: true };

    solo = Bodies.rectangle(0, height - 1, width * 2, 1,parado);
    World.add(world, solo);

    torre = Bodies.rectangle(160, 350, 160, 310,parado);
    World.add(world, torre);

    canhao = new Canhao(180, 110, 130, 100, angle);
   
   
}


function draw() {
    background(189);
    image(cenario, 0, 0, width, height);
    Engine.update(engine);
    

    rect(solo.position.x, solo.position.y, width * 2, 1);

    push();
    imageMode(CENTER);
    image(torreIMG, torre.position.x, torre.position.y, 160, 310);
    pop();
    
    //percorre toda a matriz e exibe todas as balas
    for (var i = 0; i < balas.length; i++) {
        if (balas[i]) {
            balas[i].display();
        }
        
    }

    canhao.display();
    mostrarBarcos()

}

function keyPressed() {
    if (keyCode === 32) {
        //esse comando cria um novo objeto da classe BalaCanhao
        var bala = new BalaCanhao(canhao.x, canhao.y);
        bala.trajectory = [];
        Matter.Body.setAngle(bala.body, canhao.angle);
        bala.atirar();
        //esse código adiciona na matriz
        balas.push(bala);
    }
}

function mostrarBarcos(){
    //verifica se a quantidade de barcos é maior que 0
    if(barcos.length > 0){
        //verifica se a posição do último barco é menor que 800
        //ou seja, se ultrapassou o limite
        if(barcos[barcos.length-1].body.position.x < 800){
            //cria um novo barco
            var barco = new Barco(1200, 500);
            //adiciona o barco na matriz
            barcos.push(barco);
        }
        //repete os comandos pela quantidade de barcos que há
        for(var i = 0; i < barcos.length; i++){
            //exibe os barcos
            barcos[i].exibir()
            //define a velocidade
            Body.setVelocity(barcos[i].body, {x:-1, y:0})
        }
           
    //se não houver barcos
    }else{
        //esse comando cria um novo objeto barco da classe Barco
        var barco = new Barco(1100,500);
        //esse código o novo barco na matriz barcos
        barcos.push(barco);
        
    }
    
}