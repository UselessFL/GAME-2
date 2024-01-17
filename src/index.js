import * as PIXI from "pixi.js";
import ToysFirst from '../spritesTWO/ToysFirst.json'

    const app = new PIXI.Application({background: 'blue', width:1024, height:640});
    document.body.appendChild(app.view);
   
   
    const container = new PIXI.Container();
    container.position = {x: 651, y: 377}
    
    // Move container to the center
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;
    app.stage.addChild(container);
   
   /*  const backgroundContainer = new PIXI.Container();
    backgroundContainer.anchor.set(0.5) */

    const textu = PIXI.Texture.from('./SpritesTWO/2_01.png')  
   
    const backk = new PIXI.Sprite(textu)
    backk.anchor.set(0.5)
    container.addChild(backk)

    const toysContainer = new PIXI.Container();
    toysContainer.pivot.set(560, 320)
    container.addChild(toysContainer);
   let poryadok = [];
   function rand(i){
    while (poryadok.length < i){
        let a = Math.floor(Math.random()*i)+1;
        if(!poryadok.includes(a)){
            poryadok.push(a);
        }
    }
    console.log(poryadok)
   }
   let toys = []
   let frameNames = Object.keys(ToysFirst.frames);
   console.log(frameNames)
   function RandomNumberOfToys(i){
    for(let x = 0; x <i;){
        let a = Math.floor(Math.random()*frameNames.length);
        if(!toys.includes(a)){
            toys.push(a);
            x++;
        }
    }
   console.log(`Numbers of toys is: ${toys}`)
   }
   let scene = 1;
   function Game(){
    
    if (scene == 1){
        poryadok.splice(poryadok.length)
        rand(5)
        RandomNumberOfToys(3)
        for (let i =0; i<3; i++){
            /* toys[i] = RandomThree() */
            let place = [];
            console.log(poryadok[i])
            switch(poryadok[i]){
                case 1: place[0]= 430 + 50*poryadok[i]; 
                        place[1] = 242
                break;
                case 2: place[0]= 430 + 50*poryadok[i]; 
                        place[1] = 242
                break;
                case 3: place[0]= 430 + 50*poryadok[i]; 
                        place[1] = 242
                break;
                case 4: place[0]= 430 + 50*poryadok[i]; 
                        place[1] = 242
                break;
                case 5: place[0]= 430 + 50*poryadok[i]; 
                        place[1] = 242
                break;
            }
            drowToys(toys[i], 0.60,place, toysContainer)
        }
        drowButton('Запомнили?', 0xff0000, container, {x: container.width/2, y:200} )
    }
    if(scene == 2){
        console.log('scene 2')
    }
   }

   async function drowToys(spriteNumber, scale, place, father){
    PIXI.Assets.load('../spritesTWO/ToysFirst.json').then(()=>{
        const val = /* `2_${spriteNumber}.png` */ frameNames[spriteNumber]
        const texture = PIXI.Texture.from(val) 
        const bunny = new PIXI.Sprite(texture);
        bunny.anchor.set(0.5)
        
        /* bunny.position.set(place[0], place[1]) */
        bunny.x = place[0];
        bunny.y = place [1]
       
        bunny.scale.set(scale)
        father.addChild(bunny);
    })
    
   }
   
   
   const containerOneForButton = new PIXI.Container();
   function drowButton(TextToPut, color, parent, pos){
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE)
    bg.width = 200;
    bg.height = 100;
    bg.tint = color;
    bg.anchor.set(0.5)
    const text = new PIXI.Text(TextToPut, {fill: "#ffffff"});
    text.anchor.set(0.5);
     containerOneForButton.x = pos.x
    containerOneForButton.y = pos.y
    containerOneForButton.addChild(bg, text)
    containerOneForButton.eventMode = 'static';
    containerOneForButton.cursor = 'pointer';
    containerOneForButton.on('pointerdown', onButtonDownHide)
    containerOneForButton.on('pointerover', onButtonOver)
    containerOneForButton.on('pointerout', onButtonOut);
    parent.addChild(containerOneForButton)
   }
    function onButtonDownHide(){
        toysContainer.visible=false;
        scene = 2;
        Game()
    }
    function onButtonOver(){
        containerOneForButton.scale.set(0.97)
    }
    function onButtonOut(){
        containerOneForButton.scale.set(1)
    }
   Game();
    app.ticker.add((delta)=>{
    });


