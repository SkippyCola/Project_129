Yellow = "";
Scientist = "";
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;
scoreLeftWrist = 0;
Status = 0;
scoreRightWrist = 0;

function preload()
{
    Scientist = loadSound("a.mp3");
    Yellow = loadSound("b.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("The model has Loaded");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("The left wrist confidence is = "+ scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("The right wrist confidence is = "+ scoreRightWrist);
        console.log(results);
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log("The x position of the Left Wrist is = " + left_wrist_x + ", and The y position of the Left Wrist is = " + left_wrist_y);
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("The x position of the Right Wrist is = " + right_wrist_x + ", and The y position of the Right Wrist is = " + right_wrist_y);


    }
}

function draw()
{
    image(video,0,0,600,500);

    Yellow = "b.mp3";
    Scientist = "a.mp3";
    
    fill('#FF0000');
    stroke('#FF0000');

    if(scoreLeftWrist > 0.2)
    {
        circle(left_wrist_x, left_wrist_y, 20);
        Yellow.stop();

        if(Scientist = false)
        {
            Scientist.isPlaying();
            document.getElementById("scientistid").innerHTML = "Scientist is playing";
        }

    }
    
    if(scoreRightWrist > 0.2)
    {
        circle(left_wrist_x, left_wrist_y, 20);
        Scientist.stop();

        if(Yellow = false)
        {
            Yellow.isPlaying();
            document.getElementById("yellowid").innerHTML = "Yellow is playing";
        }

    }


}