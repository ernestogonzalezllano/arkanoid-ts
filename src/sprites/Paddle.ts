import { Vector} from "../types"

export class Paddle{
    private paddleImage: HTMLImageElement = new Image()
    private moveLeft:boolean;
    private moveRight:boolean;

    constructor(
        private speed:number,
        private paddleWidth: number,
        private paddleHeight: number,
        private position: Vector,
        image:string
    ){
        this.speed = speed;
        this.paddleWidth = paddleWidth;
        this.paddleHeight = paddleHeight;
        this.position = position;
        this.moveLeft = false;
        this.moveRight = false;
        this.paddleImage.src = image

        document.addEventListener("keydown",this.handleKeyDown);
        document.addEventListener("keyup",this.handleKeyUp);
        document.getElementById("left")?.addEventListener("touchstart",this.handleLeftDown)
        document.getElementById("left")?.addEventListener("touchend",this.handleLeftUp)
        document.getElementById("right")?.addEventListener("touchstart",this.handleRightDown)
        document.getElementById("right")?.addEventListener("touchend",this.handleRightUp)

    }

    get width():number{
        return this.paddleWidth
    }

    get height():number{
        return this.paddleHeight;
    }

    get pos():Vector{
        return this.position;
    }

    get image():HTMLImageElement{
        return this.paddleImage;
    }

    get isMovingLeft():boolean{
        return this.moveLeft
    }

    get isMovingRigth():boolean{
        return this.moveRight
    }

    movePaddle():void{               
        if(this.moveLeft){
            this.position.x -= this.speed
        } 
        if(this.moveRight){
            this.position.x += this.speed           
        } 
    }

    handleKeyUp = (e:KeyboardEvent):void =>{
        if(e.code ==="ArrowLeft" || e.key === "ArrowLeft")this.moveLeft = false;
        if(e.code ==="ArrowRight" || e.key === "ArrowRight")this.moveRight = false;
    }

    handleKeyDown = (e:KeyboardEvent):void =>{        
        if(e.code ==="ArrowLeft" || e.key === "ArrowLeft")this.moveLeft = true;
        if(e.code ==="ArrowRight" || e.key === "ArrowRight")this.moveRight = true;
    }

    handleLeftDown = ():void =>{
        this.moveLeft=true
    }
    handleLeftUp = ():void =>{
        this.moveLeft = false
    }
    handleRightDown = ():void =>{
        this.moveRight=true
    }
    handleRightUp = ():void =>{
        this.moveRight = false
    }
}