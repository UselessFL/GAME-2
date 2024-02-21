import * as PIXI from "pixi.js";
/* import {Loader} from 'pixi.js' */
import { gsap } from "gsap";
import ToysFirst from '../spritesTWO/ToysFirst.json'
import BallsImport from '../spritesTWO/balls/Balls.json'
import FishImport from '../spritesTWO/Fish/Fish.json'
import ButtonAndMoreImport from '../spritesTWO/ButtonsAndMore.json'
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
   let points = 0;
   let TruesInARow = 0 ;
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
   const containerOneForButton = new PIXI.Container();
   
   drawButton('запомнил', 0xFFFF00, container, {x: container.width/150, y:200} )

   let removableToy;
   
   function Game(){
    if (scene == 1){
        poryadok.length=0
        toys.length=0
        
        for(let x =0; x<3; x++){
            while(toysContainer.children[x]){toysContainer.removeChild(toysContainer.children[x])}}
    
        for(let x =0; x<3; x++){
            while(ToyButtonContainer.children[x]){ToyButtonContainer.removeChild(ToyButtonContainer.children[x])}}
    
        rand(5)
        RandomNumberOfToys(6)
        for (let i =0; i < 3; i++){ drawToys(toys[i], 0.60,poryadokOfTheToysOnTheShelf(poryadok[i]), toysContainer)}
        /* 
        containerOneForButton.visible= true; */
        drawBooks()
        
    }
    if(scene == 2){
        
        containerOneForButton.visible= false;
        let toyToRemove = Math.floor(Math.random()*3)
        console.log(toyToRemove,toys,toys[toyToRemove] )
 /*        toysContainer.removeChildAt(toyToRemove) ;  */
        toysContainer.getChildAt(toyToRemove).visible=false ; 
        removableToy = toyToRemove;
       let randomOfthree = Math.floor(Math.random()*3)
       console.log(`random number of the toy is ${randomOfthree}`)
       for (let i =0; i < 3; i++){ 
        if (i== randomOfthree){continue}
        drawToys(toys[i+3], 1.00, poryadokAfterButton(i), ToyButtonContainer, true)
    }
       drawToys(toys[toyToRemove], 1.00, poryadokAfterButton(randomOfthree), ToyButtonContainer,true, true)
   
    }
    if(scene ==3){
        let  TextToPutOnTheEndScreen = `Congratulations!\nYour score is:${points}`
        const EndScreen = new PIXI.Container();
        // Move EndScreen to the center
        EndScreen.x = app.screen.width / 2;
        EndScreen.y = app.screen.height / 2;
        EndScreen.scale.set(0.8)
        app.stage.addChild(EndScreen)
        container.visible = false
    const EndBg = new PIXI.Sprite(PIXI.Texture.WHITE)
    EndBg.width = container.width
    EndBg.height = container.height + 100
    EndBg.x = 0
    EndBg.y = 0;
    EndBg.tint = 0x24b8d4;
    EndBg.anchor.set(0.5)
    const textOnEndScreen = new PIXI.Text(TextToPutOnTheEndScreen, {fill: 0x00000, alpha: 0.5});
    textOnEndScreen.anchor.set(0.5);
     textOnEndScreen.x = EndScreen.width/2
    textOnEndScreen.y = EndScreen.height/2
    EndScreen.addChild(EndBg,textOnEndScreen)
    drawButton('Еще раз?', 0xFFFFFF,EndScreen,{x: EndScreen.width/150, y:200}, true)
    }
   }

async function onToyClickedTrue(){
drawUtility(12, true)
toysContainer.getChildAt(removableToy).visible=true ;
points += 100;
TruesInARow+=1;
setTimeout(() => {
    
AnimationOnButtonDown(scene)

}, 1200);
setTimeout(() => {
    endOfthegame(end)
    scene = 1;
    Game()
    
}, 1200);

}
let OshibkiVIgre = 0
async function onToyClickedFalse(){
    drawUtility(19, false)
    OshibkiVIgre+=1;
    TruesInARow =0;
    setTimeout(() => {
    
        AnimationOnButtonDown(scene)
        
        }, 1200)
        
setTimeout(() => {
    endOfthegame(end)
scene = 1;
Game()
}, 1200);

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
        drawNumbers()
        AnimationOnButtonDown('',2400)
        setTimeout(() => {
            gsap.to(container,{x: 315, duration: 3, ease: "power2.out"/* , onComplete:Game */})
            containerOneForButton.visible = true;
        }, 3900);
        
    }
   
   function drawButton(TextToPut, color, parent, pos, endbutton){
    containerOneForButton.removeChildren();
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE)
    bg.width = 180;
    bg.height = 47;
    endbutton? bg.tint = color : bg.tint = 0xf0e47c;
    bg.anchor.set(0.5)
    const text = new PIXI.Text(TextToPut, {fill: 0x244bb5, alpha: 0.5});
    text.anchor.set(0.5);
     containerOneForButton.x = pos.x
    containerOneForButton.y = pos.y
    containerOneForButton.addChild(bg, text)
    containerOneForButton.eventMode = 'static';
    containerOneForButton.cursor = 'pointer';
    if(endbutton){
        containerOneForButton.on('pointerdown', OnEndButton)
    }else{
        containerOneForButton.on('pointerdown', onButtonDownHide)
        containerOneForButton.on('pointerover', onButtonOver)
        containerOneForButton.on('pointerout', onButtonOut)
    
    }
    parent.addChild(containerOneForButton)
    if(endbutton){

    }else{
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
    
   }
    function onButtonDownHide(){
        /* toysContainer.visible=false; */
        
        scene = 2;
        Game()
        AnimationOnButtonDown()
    }
    function OnEndButton(){
        location.reload();
    }
    function onButtonOver(){
       /*  containerOneForButton.scale.set(0.97) */
    }
    function onButtonOut(){
        containerOneForButton.scale.set(1)
    }
    
    
    const containerForBoks = new PIXI.Container();
    containerForBoks.x = container.x-315;
    containerForBoks.y = container.y-238;
    containerForBoks.width = container.width
    containerForBoks.height = container.height
    containerForBoks.anchor = 0.5
    console.log(containerForBoks.width)
    /* 
    containerForBoks.scale.set(0.8)
    containerForBoks.visible = true */
    container.addChild(containerForBoks);
   
    async function drawBooks(){
        containerForBoks.removeChildren(0)
        const val1 = "2_14.png"
        const val2 = "2_35.png"
        const val3 = "2_38.png"
        const val4 = "2_83.png"
        poryadok.length = poryadok.length-2
        
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
                
                const texture = PIXI.Texture.from(val) 
                const bunny = new PIXI.Sprite(texture);   
                bunny.anchor.set(0.5)
                
                if( i == 3){
                    continue
                }else{
                    bunny.x = columns[j-1]-540
                    bunny.y = rows[i-1]-340
                    bunny.scale.set(0.7)
                    bunny.tint = 0xFF55FF
                    
                    containerForBoks.addChild(bunny)
                    
                }
                
            }
        }
    }
    function AnimationOnButtonDown(scene, time){
        backk.tint = 0x999999
        BackOnTheLeft.tint = 0x999999
        toysContainer.visible = false
        ToyButtonContainer.visible = false
        
        containerOneForButton.visible= false;
        
        setTimeout(() => {
            backk.tint = 0xFFFFFF
            BackOnTheLeft.tint = 0xFFFFFF
        toysContainer.visible = true
        ToyButtonContainer.visible = true
        
        scene?containerOneForButton.visible= true:''
        
        
        }, time?1500 + time: 1200);
    }
    const ContainerForBackgroundStuff = new PIXI.Container();
    ContainerForBackgroundStuff.x = app.screen.width / 2;
    ContainerForBackgroundStuff.y = app.screen.height / 2;
    container.addChild(ContainerForBackgroundStuff);

    
    
    /* class Draw{
        constructor(names, container, ){
            this.frames = names    
            this.container = container
        }
        setFrames(){
            let framesNames = Object.keys(this.frames.frames)
            let cards = []
            for (let x =0; x<framesNames.length; x++){
                cards.push(PIXI.Texture.from(framesNames[x]))
            }
        }
    } */
    await PIXI.Assets.load('../spritesTWO/balls/Balls.json')
    async function drawBalls(){    
    const containerForBalls = new PIXI.Container();
    containerForBalls.anchor = (0.5)   
    container.addChild(containerForBalls)  
    let frameNames = Object.keys(BallsImport.frames);
    let cadrs = []
    for(let x = 0; x < frameNames.length;x++){
        cadrs.push(PIXI.Texture.from(frameNames[x]))
    }   
    const anim = new PIXI.AnimatedSprite(cadrs)
    anim.animationSpeed = 0.1
    anim.play();
    anim.x = 110
    anim.y = -260
    containerForBalls.addChild(anim) 
    }

    drawBalls();    

    await PIXI.Assets.load('../spritesTWO/Fish/Fish.json')
//oop suck
   /*  class Draw {
        constructor( ContainerName,FrameNames){
            this.Container = ContainerName
            this.FF = FrameNames
        }
        CreateContainer(){
            this.Container = new PIXI.Container()
            this.Container.anchor = 0.5
            container.addChild(this.Container)
        }
        CreateAnimatedTextures(animationSpeed, X,Y){
            let frames =  Object.keys(this.FF.frames);
            let cadrs = []
            for(let x = 0; x<frames.length;x++){
                cadrs.push(PIXI.Texture.from(this.FF[x]))
            }
            const anim = new PIXI.AnimatedSprite(cadrs)
            anim.animationSpeed = animationSpeed
            anim.play();
            anim.x = X
            anim.y = Y
            this.Container.addChild(anim) 
        }
    } */
    /* const containerForFish = new PIXI.Container();
    let fish = new Draw(containerForFish,FishImport)
    fish.CreateContainer();
    fish.CreateAnimatedTextures(0.05,100, -155) */
    async function drawFish(){    
    const containerForFish = new PIXI.Container();
    containerForFish.anchor = (0.5)   
    container.addChild(containerForFish)  
    let frameNames = Object.keys(FishImport.frames);
    let cadrs = []
    for(let x = 0; x < frameNames.length;x++){
        cadrs.push(PIXI.Texture.from(frameNames[x]))
    }   
    const anim = new PIXI.AnimatedSprite(cadrs)
    anim.animationSpeed = 0.03
    anim.play();
    console.log(anim.totalFrames)
    anim.x = 235
    anim.y = -155
    containerForFish.addChild(anim)
    /* anim.onFrameChange(()=>{console.log(anim.currentFrame)}) */
    anim.onFrameChange = (()=>{
      /*   if(anim.currentFrame==6){
        anim.stop()
        gsap.to(anim, {x: 247,duration: 1,onComplete(){anim.play()}})
    }
    if(anim.currentFrame ==12){
        gsap.to(anim, {x: 242, duration: 1, y: -165,onComplete(){gsap.to(anim, {x: 235, duration: 1, y: -155})}})
    }
        if(anim.currentFrame==18){
        anim.stop()
        gsap.to(anim, {x: 247,duration: 1,onComplete(){anim.play()}})
    }
    if(anim.currentFrame ==24){
        gsap.to(anim, {x: 242, duration: 1, y: -165,onComplete(){gsap.to(anim, {x: 235, duration: 1, y: -155})}})
    } */
    //заменить текстуры на фрейм с в право, влево, плоски и прыжок 
    })
    
    }
    drawFish();
//gsap.to(bunny, {height:bunny.height+15,width:bunny.width+15 , duration: 0.25, repeat: 4, yoyo:true, onComplete(){bunny.visible = false}})
    async function drawNumbers(){
    const number1 = new PIXI.Sprite(PIXI.Texture.from('3_23.png'))
    const number2 = new PIXI.Sprite(PIXI.Texture.from('3_17.png'))
    const number3 = new PIXI.Sprite(PIXI.Texture.from('3_18.png'))
    const mas = [number1,number2,number3]

for(let x = 0; x<3;x++)
{
    
    setTimeout(() => {
        let a = mas[x]
    a.x = 0-BackOnTheLeft.width
    a.y = 0
    a.scale.set(2)
        container.addChild(a)
        
    }, 1300*x);
    setTimeout(() => {
       
        container.removeChild(mas[x]);
    }, 1300*x+1300);
}


}
const UIcontainer = new PIXI.Container();
   /*  UIcontainer.pivot.set(560, 320) */
   UIcontainer.anchor = 0.5
   UIcontainer.zIndex = -1
    container.addChild(UIcontainer);
function drawUI(TextToPut,XX,width,gap, CrossNede, circleNeed){
    const UI = new PIXI.Sprite(PIXI.Texture.WHITE)
    UI.width=width;
    UI.height=30;
    UI.tint = 0xc9ccd1;
    UI.alpha=0.5
    UI.x = 600-(width+XX)-gap;
    UI.y = -270
    const text = new PIXI.Text(TextToPut, {fill: 0xf5f7fa, alpha: 0.5, align: "left",fontSize:16, fontFamily:'roboto'});
    UI.anchor.set(1)
    UIcontainer.addChild(UI,text)
    text.anchor.set(0.5)
    text.x = UI.x-UI.width/2;
    text.y = UI.y-UI.height/2;
    if(TextToPut =='1-10'|| TextToPut=='2-10'){
       text.x =  UI.x-UI.width/2-40
        
    }
   
    if(CrossNede){
        for(let x=0; x<OshibkiVIgre&& x<3; x++){
            const Redcross = new PIXI.Sprite(PIXI.Texture.from('./Crosses/RedCross.png') )
        Redcross.angle = 45
            Redcross.width = 25
            Redcross.height = 25
            Redcross.x = UI.x-UI.width/2 -25 + 25*x;
            Redcross.y = UI.y-UI.height/2 -17;
            UIcontainer.addChild(Redcross)
        }
        for(let x=0; x<3-OshibkiVIgre; x++){
            const cross = new PIXI.Sprite(PIXI.Texture.from('./Crosses/WhiteCross.png') )
            cross.angle = 45
            cross.width = 25
            cross.height = 25
            cross.x = UI.x-UI.width/2 +25 - 25*x;
            cross.y = UI.y-UI.height/2-17;
            UIcontainer.addChild(cross)
        }
        
    }
    if(circleNeed){
        for(let x=0; x<TruesInARow && x<3; x++){
            const YellowCircle = new PIXI.Sprite(PIXI.Texture.from('./Circles/WhiteCircle.png') )
            YellowCircle.width = 20
            YellowCircle.height = 20
            YellowCircle.x = UI.x-UI.width/2 -10 + 25*x;
            YellowCircle.y = UI.y-UI.height/2 -10;
            UIcontainer.addChild(YellowCircle)
        }
        for(let x=0; x<3-TruesInARow; x++){
            const WhiteCircle = new PIXI.Sprite(PIXI.Texture.from('./Circles/YellowCircle.png') )
            WhiteCircle.width = 20
            WhiteCircle.height = 20
            WhiteCircle.x = UI.x-UI.width/2 +40 - 25*x;
            WhiteCircle.y = UI.y-UI.height/2-10;
            UIcontainer.addChild(WhiteCircle)
        }
        
    }

    
}  

let end = false;
setTimeout(() => {
    
/* app.ticker.add(()=>{
    let NewNow = new Date();
    
    drawUI(points,100, 70,40);
    drawUI('',170, 70,43);
    drawUI('1-10',240, 70,46);
    drawUI(`0:${Math.floor(60+(now.getSeconds()-NewNow.getSeconds()))}`,310, 70,49);

}) */
/* uiDrwaer().then(UiDestroer()) */
uiDrwaer()


}, 1);
let timeValue = 60;
/* const Redcross = document.getElementById('redCross').textContent
const cross = document.getElementById('Cross').textContent */
/* let Redcross = '\u2A2F';
Redcross.fontcolor = 'red'; */

/* function modernFontColor(str, color) {
    return '<span style="color: ' + color + '">' + str + '</span>';
} */
    
const cross = '\u2A2F'
let crossMas = []


async function uiDrwaer(){


    let timeInterval = setInterval(() => {
        timeValue--
        /* crossMas.length=0 */
        /* for (let x =0; x<OshibkiVIgre;x++){
            crossMas.push()
        }
        for (let x =0; x<3-OshibkiVIgre;x++){
            crossMas.push(cross)
        } */
        if(timeValue==-1){
            clearInterval(timeInterval)
            /* drawUI(`Time Out!`,310, 70,49)   */  
            end = true;
        }
        else{
            UIcontainer.removeChildren(0)
       
        drawUI(points,100, 70,40);
        drawUI('',170, 70,43, true);
        drawUI('1-10',170,140,46, false,true);
        drawUI(`0:${timeValue}`,380, 70,49);}
        
        
    }, 1000);
}


//useless ->

function endOfthegame(end){
    OshibkiVIgre ==4? scene=3:''
    end?scene=3:console.log(end)
    Game()
}
 
   Game();
   
   /* animationOnEnteringTheScene(); */
   
   
   UIcontainer.children.forEach((children)=>{console.log(`childrens ${children}`)})
   


