import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import ToysFirst from '../spritesTWO/ToysFirst.json'
import { Assets, Sprite } from 'pixi.js';
    const app = new PIXI.Application({background: 'blue', width:632, height:478});
    document.body.appendChild(app.view);
   
   
    const container = new PIXI.Container();
    /* container.position = {x: 651, y: 377} */
    
    // Move container to the center
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;
    container.scale.set(1)
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
    placee[1] = 500
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
       
        
        drowButton('Запомнили?', 0xff0000, container, {x: container.width/150, y:200} )
    }
    if(scene == 2){
        
        containerOneForButton.visible= false;
       const toyToRemove = Math.floor(Math.random()*3)
       console.log(toyToRemove,toys,toys[toyToRemove] )
        toysContainer.removeChildAt(toyToRemove) ; 
       
       
       for (let i =0; i < 2; i++){ drowToys(toys[i]+1, 0.80, poryadokAfterButton(i), ToyButtonContainer, true)}
       drowToys(toys[toyToRemove], 0.80, poryadokAfterButton(2), ToyButtonContainer,true, true)
      /*  ToyButtonContainer.children[i].interactive= true;
       ToyButtonContainer.children[i].on('mouseover', ()=>{
        ToyButtonContainer.children[i].rotation += 0.5;
       }) */
      
    }
   }

async function onToyClickedTrue(){

drowUtility(12, true)
}
async function onToyClickedFalse(){
    drowUtility(19, false)
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

    function interactiveToys(bunny, win){
       
        function rotationOnHower(){
            gsap.to(bunny, {rotation: 1, duration: 0.25, ease: 'none'})
        }
        
        function stopRotationOnHover() {
            gsap.to(bunny, {rotation: 0, duration: 0.25, ease: 'none'})
        }
         bunny.eventMode = 'static'  
         bunny.cursor = 'pointer'  
         win? bunny.on('pointerdown', onToyClickedTrue) : bunny.on('pointerdown', onToyClickedFalse);
         bunny.on('pointerover', rotationOnHower)
         bunny.on('pointerout', stopRotationOnHover)
    }
   await PIXI.Assets.load('../spritesTWO/ToysFirst.json')
   
   async function drowToys(spriteNumber, scale, place, father, interactive, win){
   
        const val =  frameNames[spriteNumber]
        const texture = PIXI.Texture.from(val) 
        const bunny = new PIXI.Sprite(texture);
        bunny.anchor.set(0.5)
        
       
        bunny.x = place[0];
        bunny.y = place [1]
        
        
        bunny.scale.set(scale)
        
        father.addChild(bunny);
        interactive? interactiveToys(bunny, win) : ''
    }

    await PIXI.Assets.load('../spritesTWO/ButtonsAndMore.json')

    async function drowUtility(spriteNumber, win){
    const val = `3_${spriteNumber}.png`
    const texture = PIXI.Texture.from(val) 
    const bunny = new PIXI.Sprite(texture);
    bunny.anchor.set(0.5)
    /* bunny.x = container.width/14;
    bunny.y = container.height/2; */
    bunny.x = app.screen.width/2 - 300
    bunny.y = app.screen.height/2 - 300
    console.log(bunny.x, bunny.y)
    container.addChild(bunny)

    win?
    
    gsap.to(bunny, {height:bunny.height+15,width:bunny.width+15 , duration: 0.25, repeat: 4, yoyo:true, onComplete(){bunny.visible = false}})
    :
    gsap.to(bunny, {rotation: 0.3, duration: 0.3, repeat: 3,ease: 'circ.inOut',yoyo:true,onComplete(){bunny.visible = false}})
    /* if(win){

    } *//* else{
         
        for(let x=1; x<4; x++){
            
            x/2 == 0 ? gsap.to(bunny, {rotation: 0.3, duration: 0.3,yoyo:true})  : gsap.to(bunny, {rotation: -0.3, duration: 0.3,yoyo:true}) 
        }
        
    } */
    /* else {
        async function animateBunny() {
            for(let x = 1; x < 4; x++) {
                await new Promise(resolve => {
                    const rotation = x / 2 === 0 ? 0.3 : -0.3;
                    gsap.to(bunny, {
                        rotation: rotation,
                        duration: 0.3,
                        yoyo: true,
                        onComplete: resolve
                    });
                });
            }
        }
    
        animateBunny();
    } */
   
    }
    const BackOnTheLeft = Sprite.from(await Assets.load('../spritesTWO/backkdifferent.png'))
        BackOnTheLeft.anchor.set(1, 0.5);
        BackOnTheLeft.scale.set(0.5);
        BackOnTheLeft.x = -BackOnTheLeft.width/2 -21
        container.addChild(BackOnTheLeft);
        console.log(BackOnTheLeft.width, BackOnTheLeft.height);

    async function animationOnEnteringTheScene(){
        /* container.x += BackOnTheLeft.width-315 */
        container.x += 700
        
        setTimeout(() => {
            gsap.to(container,{x: 315, duration: 3, ease: "power2.out"})
        }, 1000);
        
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
   animationOnEnteringTheScene();
    


