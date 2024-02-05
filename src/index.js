import * as PIXI from "pixi.js";
/* import {Loader} from 'pixi.js' */
import { gsap } from "gsap";
import ToysFirst from '../spritesTWO/ToysFirst.json'
import BallsImport from '../spritesTWO/balls/Balls.json'
import { Assets, Sprite } from 'pixi.js';
import {DropShadowFilter} from '@pixi/filter-drop-shadow';

    await PIXI.Assets.load('../spritesTWO/ToysFirst.json')
    await PIXI.Assets.load('../spritesTWO/ButtonsAndMore.json')
    await PIXI.Assets.load('../spritesTWO/Books.json')
    /* const balls = await PIXI.Assets.load('../spritesTWO/balls/Balls.json') */

    const app = new PIXI.Application({background: 'blue', width:632, height:478, view: document.getElementById('MyCanvas')});
    /* document.body.appendChild(app.view); */
    const container = new PIXI.Container();
    // Move container to the center
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;
    container.scale.set(0.8)
    app.stage.addChild(container);
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
   console.log(`asd ${frameNames}`)

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
        rand(5)
        RandomNumberOfToys(6)
        for (let i =0; i < 3; i++){ drawToys(toys[i], 0.60,poryadokOfTheToysOnTheShelf(poryadok[i]), toysContainer)}
        drawBooks()
        
        drawButton('запомнил', 0xFFFF00, container, {x: container.width/150, y:200} )
    }
    if(scene == 2){
        
        containerOneForButton.visible= false;
        const toyToRemove = Math.floor(Math.random()*3)
        console.log(toyToRemove,toys,toys[toyToRemove] )
        toysContainer.removeChildAt(toyToRemove) ; 
       
       const randomOfthree = Math.floor(Math.random()*3)
       console.log(`random number of the toy is ${randomOfthree}`)
       for (let i =0; i < 3; i++){ 
        if (i== randomOfthree){continue}
        drawToys(toys[i+3], 1.00, poryadokAfterButton(i), ToyButtonContainer, true)
    }
       drawToys(toys[toyToRemove], 1.00, poryadokAfterButton(randomOfthree), ToyButtonContainer,true, true)
   
    }
   }

async function onToyClickedTrue(){
drawUtility(12, true)
}
async function onToyClickedFalse(){
    drawUtility(19, false)
}


   let rows=[]
   rows[0]= 150;
   let columns=[]
   columns[0] = 430
    for(let i = 1; i<5;i++){
        for(let j = 1; j <6; j++){
            columns[i]=columns[i-1]+55
            rows[j]=rows[j-1]+53
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
   
   async function drawToys(spriteNumber, scale, place, father, interactive, win){
   
        const val =  frameNames[spriteNumber]
        const texture = PIXI.Texture.from(val) 
        const bunny = new PIXI.Sprite(texture);
        bunny.anchor.set(0.5)
        
       
        bunny.x = place[0]+20;
        bunny.y = place [1]-18
        
        
        bunny.scale.set(scale)
        
        father.addChild(bunny);
        interactive? interactiveToys(bunny, win) : ''
        interactive? bunny.filters = [new DropShadowFilter()] : ''
    }
    
    

    async function drawUtility(spriteNumber, win){
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

    gsap.to(bunny, {rotation: -0.1, duration: 0.1,ease: 'circ.inOut', onComplete(){
        gsap.to(bunny, {rotation: 0.2, duration: 0.1, repeat: 5,ease: 'circ.inOut',yoyo:true,onComplete(){bunny.visible = false}})
    }})
   
    }
    const BackOnTheLeft = Sprite.from(await Assets.load('../spritesTWO/backkdifferent.png'))
        BackOnTheLeft.anchor.set(1, 0.5);
        BackOnTheLeft.scale.set(0.5);
        BackOnTheLeft.x = -BackOnTheLeft.width/2 -21
        container.addChild(BackOnTheLeft);
        console.log(BackOnTheLeft.width, BackOnTheLeft.height);

    async function animationOnEnteringTheScene(){
        /* container.x += BackOnTheLeft.width-315 */
        container.x += 500
        
        setTimeout(() => {
            gsap.to(container,{x: 315, duration: 3, ease: "power2.out"/* , onComplete:Game */})
        }, 1000);
        
    }
   const containerOneForButton = new PIXI.Container();
   function drawButton(TextToPut, color, parent, pos){
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE)
    bg.width = 180;
    bg.height = 47;
    bg.tint = 0xf0e47c;
    bg.anchor.set(0.5)
    const text = new PIXI.Text(TextToPut, {fill: 0x244bb5, alpha: 0.5});
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

    const textu = PIXI.Texture.from('./Sprites/2_78.png')  

    const bubilda = new PIXI.Sprite(textu)
   
    const bubildaRight = new PIXI.Sprite(textu)
    
   /*  bubilda.tint = 0xf0d554 */
    bubilda.anchor.set(0.5)
    bubildaRight.anchor.set(0.5)

    bubildaRight.angle=180

    bubilda.x = bg.x-bg.width/2 -3
    bubilda.y = bg.y
    
    bubildaRight.x = bg.x+bg.width/2 +3
    bubildaRight.y = bg.y
    containerOneForButton.addChild(bubilda)
    containerOneForButton.addChild(bubildaRight)
   }
    function onButtonDownHide(){
        /* toysContainer.visible=false; */
        
        scene = 2;
        Game()
        AnimationOnButtonDown()
    }
    function onButtonOver(){
       /*  containerOneForButton.scale.set(0.97) */
    }
    function onButtonOut(){
        containerOneForButton.scale.set(1)
    }
    
    async function drawBooks(){
        const val1 = "2_14.png"
        const val2 = "2_35.png"
        const val3 = "2_38.png"
        const val4 = "2_83.png"
        poryadok.length = poryadok.length-2
        console.log(`poryadok after trim ${poryadok}`)
        
        let val
        for (let i =1; i<7;i++){
            
            for(let j = 1; j<6; j++){
                const random = Math.floor(Math.random()*4)
                
                switch (random) {
                    case 0:
                        val=val1
                        break;
                    case 1:
                        val=val2
                        break;
                    case 2:
                        val=val3
                        break;
                    case 3:
                        val=val4
                        break;
                    default:
                        val = val1
                        break;
                }
                /* random == 0  ? val = val1: val=val2 */
                const texture = PIXI.Texture.from(val) 
                const bunny = new PIXI.Sprite(texture);   
                bunny.anchor.set(0.5)
                
                if(/* poryadok.includes(j) & */ i == 3){
                    continue
                }else{
                    bunny.x = columns[j-1]-540
                    bunny.y = rows[i-1]-340
                    bunny.scale.set(0.7)
                    bunny.tint = 0xFF55FF
                    
                    container.addChild(bunny)
                }
                
            }
        }
    }
    function AnimationOnButtonDown(){
        backk.tint = 0x999999
        BackOnTheLeft.tint = 0x999999
        toysContainer.visible = false
        ToyButtonContainer.visible = false
        setTimeout(() => {
            backk.tint = 0xFFFFFF
            BackOnTheLeft.tint = 0xFFFFFF
        toysContainer.visible = true
        ToyButtonContainer.visible = true
        }, 1500);
    }
    const ContainerForBackgroundStuff = new PIXI.Container();
    ContainerForBackgroundStuff.x = app.screen.width / 2;
    ContainerForBackgroundStuff.y = app.screen.height / 2;
    container.addChild(ContainerForBackgroundStuff);
/*     function drawBalls(){
        img = new PIXI.AnimatedSprite(balls.animation['image_se'])
        img.anchor(0.5)
        img.x = 0
        img.y = 0
        ContainerForBackgroundStuff.addChild(img)

        img.play()
        app.ticker.add(animate)
    } */
    /* const loader = PIXI.Loader.shared; */
    /* loader.add('') */
   /*  PIXI.loader.add('') */
   await  PIXI.Assets.load('../spritesTWO/balls/Balls.json')
   async function drawBalls(){
       
        
        let frames = Object.keys(BallsImport.frames);
        
        const anim = new PIXI.AnimatedSprite(frames);
        anim.x = 0
        anim.y = 0
        anim.anchor.set(0.5);
        anim.animationSpeed = 0.5;
        anim.play();
        ContainerForBackgroundStuff.addChild(anim);
}
const containerForNumbers = new PIXI.Container();
    containerForNumbers.x = container.width / 2;
    containerForNumbers.y = container.height / 2;
    container.addChild(containerForNumbers);
async function drawNumbers(){

    

    const number1 = new PIXI.Sprite(PIXI.Texture.from('3_25.png'))
    const number2 = new PIXI.Sprite(PIXI.Texture.from('3_26.png'))
    const number3 = new PIXI.Sprite(PIXI.Texture.from('3_23.png'))
    const mas = [number1,number2,number3]

for(let x = 0; x<3;x++)
{
    
    setTimeout(() => {
        let a = mas[x]
    a.x = 0+x*100
    a.y = 0
        container.addChild(a)
    }, 5000*x);
    setTimeout(() => {
       
        container.removeChild(mas[x]);
    }, 10000*x+1);
}

setTimeout(() => {
    
}, 3000);

}
   
   Game();
   animationOnEnteringTheScene();
   /* drawBalls(); */
   drawNumbers()
   
   


