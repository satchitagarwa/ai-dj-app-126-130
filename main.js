song="";
song1="";
scorel=0;
scorer=0;
statusS1="";
statusS2="";
function preload()
{
    song= loadSound('music.mp3');
    song1= loadSound('music2.mp3');
}

lwx=0;
lwy=0;
rwx=0;
rwy=0;

function setup()
{
    canvas=createCanvas(500,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
 
function modelLoaded()
{
    console.log('Posenet Is Initialized')
}
function draw()
{
    image(video,0,0,500,500);
    statusS1=song.isPlaying();
    statusS2=song1.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scorel>0.2)
    {
        circle(lwx,lwy,20);
        song1.stop();
        if(song==false)
        {
          song.play();
          document.getElementById("name").innerHTML="Song Name = Harry potter theme song";

        }
     

    }



    if(scorer>0.2)
    {
        circle(rwx,rwy,20);
        song.stop();
        if(song1==false)
        {
          song1.play();
          document.getElementById("name").innerHTML="Song Name = peter pan theme song";

        }
     

    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);  



}
 function gotPoses(results)
 {
    if(results.length>0)
    {
        console.log(results);
        scoreR=results[0].pose.keypoints[10].score
        scoreleft=results[0].pose.keypoints[9].score
        console.log("scoreleftWrist ="+scoreleft+"scorerightWrist = " +scoreR);

        console.log(results);
        lwx=results[0].pose.leftWrist.x;
        lwy=results[0].pose.leftWrist.y;
        console.log("leftWristX ="+lwx+"leftWristY = " +lwy);

        rwx=results[0].pose.rightWrist.x;
        rwy=results[0].pose.rightWrist.y;
        console.log("rightWristX ="+rwx+"rightWristY = " +rwy);
    }
 }