import * as PIXI from "pixi.js";
import { gsap } from "gsap";
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
   function poryadokOfTheToysOnTheShelf(i){     
        let place = [];
        place[0] = columns[i-1]
        place[1] = rows[2]
    return place;
   }
   function poryadokAfterButton(i){
    let placee = [];
    placee[0]= i*100 + 450
    placee[1] = 550
    return placee
   }
   const ToyButtonContainer = new PIXI.Container();
   ToyButtonContainer.pivot.set(560, 320)
   container.addChild(ToyButtonContainer);
   function Game(){
    if (scene == 1){
        /* poryadok.splice(poryadok.length) */
        rand(5)
        RandomNumberOfToys(3)
        for (let i =0; i < 3; i++){ drowToys(toys[i], 0.60,poryadokOfTheToysOnTheShelf(poryadok[i]), toysContainer)}
       
        
        drowButton('Запомнили?', 0xff0000, container, {x: container.width/2, y:200} )
    }
    if(scene == 2){
        
        containerOneForButton.visible= false;
       const toyToRemove = Math.floor(Math.random()*3)
       console.log(toyToRemove,toys,toys[toyToRemove] )
        toysContainer.removeChildAt(toyToRemove) ; 
       
       
       for (let i =0; i < 2; i++){ drowToys(toys[i]+1, 0.80, poryadokAfterButton(i), ToyButtonContainer, true)}
       drowToys(toys[toyToRemove+1], 0.80, poryadokAfterButton(2), ToyButtonContainer,true, true)
      /*  ToyButtonContainer.children[i].interactive= true;
       ToyButtonContainer.children[i].on('mouseover', ()=>{
        ToyButtonContainer.children[i].rotation += 0.5;
       }) */
      
    }
   }

async function onToyClickedTrue(){
console.log('vin')
}
async function onToyClickedFalse(){
console.log('loose')
}


   let rows=[]
   rows[0]= 150;
   let columns=[]
   columns[0] = 430
   /* position[1[1]] =  */
    for(let i = 1; i<5;i++){
        for(let j = 1; j <6; j++){
            columns[i]=columns[i-1]+50
            rows[j]=rows[j-1]+50
        }
    }
   console.log(rows, columns)

    function interactiveToys(bunny, vin){
       /*  function rotationOnHower(){
            let i = 0 
            app.ticker.add((delta)=>{
                
                
                if (bunny.angle < 40){
                    
                    app.ticker.stop();
                   bunny.angle += 1 * delta
                   
                }else{
                    this.app.ticker.delete();
                }
            });
           
        } */
        function rotationOnHower(){
            gsap.to(bunny, {rotation: -1, duration: 0.25, ease: 'none'})
        }
        
        function stopRotationOnHover() {
            gsap.to(bunny, {rotation: 0, duration: 0.25, ease: 'none'})
        }
         bunny.eventMode = 'static'  
         bunny.cursor = 'pointer'  
         vin? bunny.on('pointerdown', onToyClickedTrue) : bunny.on('pointerdown', onToyClickedFalse);
         bunny.on('pointerover', rotationOnHower)
         bunny.on('pointerout', stopRotationOnHover)
    }

   async function drowToys(spriteNumber, scale, place, father, interactive, vin){
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
        interactive? interactiveToys(bunny, vin) : ''
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
        /* toysContainer.visible=false; */
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
    


