import { Ball } from "./sprites/Ball";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { CanvasView } from "./view/CanvasView";

import PADDLE_IMAGE from "./images/paddle.png"
import BALL_IMAGE from "./images/ball.png"
import { BALL_SIZE, BALL_SPEED, BALL_STARTX, BALL_STARTY, PADDLE_HEIGHT, PADDLE_SPEED, PADDLE_STARTX, PADDLE_WIDTH } from "./setup";

import {createBricks} from "./helper"
import { Collision } from "./Collision";
let gameOver=false;
let score = 0;

function setGameOver(view:CanvasView){
    view.drawInfo("Game Over!")
    gameOver=false;
}

function setGameWin(view:CanvasView){
    view.drawInfo("Game Won!")
    gameOver=false;
}

function gameLoop(
    view:CanvasView,
    bricks: Brick[],
    paddle: Paddle,
    ball:Ball,
    collision:Collision
){
    console.log("draw!!")
    view.clear()
    view.drawBricks(bricks)
    view.drawSprite(paddle)
    view.drawSprite(ball)
    ball.moveBall()
    if(
        (paddle.isMovingLeft && paddle.pos.x >0 )
        ||
        (paddle.isMovingRigth && paddle.pos.x < view.canvas.width - paddle.width)
    ){
        paddle.movePaddle()
    }
    collision.checkBallCollision(ball,paddle,view)

    const collidingBrick = collision.isCollidingBricks(ball,bricks)

    if(collidingBrick){
        score += 1;
        view.drawScore(score)
    }

    if(ball.pos.y>view.canvas.height) gameOver = true;
    if(bricks.length === 0) return setGameWin(view);
    if(gameOver) return setGameOver(view); 

    requestAnimationFrame(()=>gameLoop(view,bricks, paddle, ball,collision))
}

function startGame(view: CanvasView){
    score = 0;
    view.drawInfo("");
    view.drawScore(0)
    const bricks = createBricks()

    const collision = new Collision()

    const ball = new Ball(
        BALL_SPEED,
        BALL_SIZE,
        {
            x:BALL_STARTX,
            y:BALL_STARTY
        },
        BALL_IMAGE

    )
    const paddle = new Paddle(
        PADDLE_SPEED,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        {
            x:PADDLE_STARTX,
            y:view.canvas.height - PADDLE_HEIGHT - 5
        },
        PADDLE_IMAGE
    )
    gameLoop(view, bricks, paddle, ball, collision)
}

const view = new CanvasView("#playField")

view.initStartButton(startGame)