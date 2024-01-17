import * as PIXI from "pixi.js";
import ToysFirst from '../spritesTWO/ToysFirst.json'
/* 
PIXI.Assets.load('./spritesTWO/first.json').then(()=>{ */
    const app = new PIXI.Application({background: 'blue', width:1024, height:640});
    document.body.appendChild(app.view);
   
   
    const container = new PIXI.Container();
    /* container.anchor.set(-1) */
    app.stage.addChild(container);
   
    const textu = PIXI.Texture.from('./SpritesTWO/2_01.png')  
   
    const backk = new PIXI.Sprite(textu)
    backk.anchor.set(0.5)
    container.addChild(backk)

    const toysContainer = new PIXI.Container();
    toysContainer.pivot.set(560, 320)
    /* toysContainer.x= -300
    toysContainer.y= -300 */
    backk.addChild(toysContainer);
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
   /* let framesData = JSON.parse(ToysFirst) */
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
   function ToysOnTheShelf(){
    let point = 0;
    if (point < 3){
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
        
    }
    
   }

   async function drowToys(spriteNumber, scale, place, father){
    PIXI.Assets.load('../spritesTWO/ToysFirst.json').then(()=>{
        const val = /* `2_${spriteNumber}.png` */ frameNames[spriteNumber]
        const texture = PIXI.Texture.from(val) 
        const bunny = new PIXI.Sprite(texture);
        bunny.anchor.set(0.5)
        
        bunny.position.set(place[0], place[1])
       
        bunny.scale.set(scale)
        father.addChild(bunny);
    })
    
   }
   ToysOnTheShelf();

    
    container.x=app.screen.width/2;
    container.y=app.screen.height/2;
    
    container.pivot.x=container.width/2;
    container.pivot.y=container.height/2;
    
    app.ticker.add((delta)=>{
    /* container.rotation -= 0.01 *delta; */
    });
/* }) */

