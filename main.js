song="";
function preload(){
    song=loadSound("music.mp3");
}
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
leftWrists=0;
rightWrists=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    y=ml5.poseNet(video,modelLoaded);
    y.on('pose',afn);

}

function modelLoaded(){
    console.log("Posenet is initialized")
}

function afn(result){
    if (result.length >0){
        console.log(result);
        leftWristx=result[0].pose.leftWrist.x;
        leftWristy=result[0].pose.leftWrist.y;
        rightWristx=result[0].pose.rightWrist.x;
        rightWristy=result[0].pose.rightWrist.y;
        leftWrists=result[0].pose.keypoints[9].score;
        rightWrists=result[0].pose.keypoints[10].score;
        console.log("Left wrist x is",leftWristx);
        console.log("Left wrist y is",leftWristy);
        console.log("Right wrist x is",rightWristx);
        console.log("Right wrist y is",rightWristy);
        console.log("Left wrist score is",leftWrists);
        console.log("Right wrist score is",rightWrists);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw(){
    image(video,0,0,600,500);
    fill("green");
    stroke("black");
    if(rightWrists>0.2){
circle(rightWristx,rightWristy,20);
if(rightWristy>0 && rightWristy<=100){
song.rate(0.5);
document.getElementById("text1").innerHTML="Speed = 0.5x";
}
else if(rightWristy>100 && rightWristy<=200){
    song.rate(1);
    document.getElementById("text1").innerHTML="Speed = 1x";
    }
    else if(rightWristy>200 && rightWristy<=300){
        song.rate(1.5);
        document.getElementById("text1").innerHTML="Speed = 1.5x";
        }
        else if(rightWristy>300 && rightWristy<=400){
            song.rate(2);
            document.getElementById("text1").innerHTML="Speed = 2x";
            }
            else if(rightWristy>400){
                song.rate(2.5);
                document.getElementById("text1").innerHTML="Speed = 2.5x";
                }
    }
    if(leftWrists>0.2){
        circle(leftWristx,leftWristy,20);
        anoyc=Number(leftWristy);
        x=Math.floor(anoyc);
        z=x/500;
        document.getElementById("text2").innerHTML="Volume = "+ z;
        song.volume(z);
    }
}