status = "";
objects = [];
alarm = "";
baby = "";

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting...";
} 

function draw()
{
    image(video,0,0,380,380);

    if(status != "")
      {   
        for (i = 0; i < objects.length; i++) 
        {
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
          noFill();
          stroke("#333");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         
          if(objects[i].label == "person")
          {
            document.getElementById("baby").innerHTML = "Baby Is Seen by the Monitor";
            alarm.stop();
          }
          else
          {
            document.getElementById("baby").innerHTML = "Baby Is Not Seen by the Monitor";
            alarm.play();
          }
         }
    }
}

function preload()
{
    alarm = loadSound('alarm_beep_3.mp3');
}

function modelLoaded()
{
    console.log("Model is Model");
    status = true;
    objectDetector.detect(video,gotResult);
}

function gotResult(error,results)
{
    if (error)
    {
        console.log(error);
        document.getElementById("error_btn").innerHTML="An Error Occurred :/";
    }

    else 
    {
        console.log(results);
        objects = results;
    }
}