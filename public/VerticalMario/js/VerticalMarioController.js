
	document.getElementById("rightBtn").addEventListener("touchstart", function(){
		movingRight = true;
	});
	document.getElementById("rightBtn").addEventListener("touchend", function(){
		movingRight = false;
	});
	document.getElementById("leftBtn").addEventListener("touchstart", function(){
		movingLeft = true;
	});
	document.getElementById("leftBtn").addEventListener("touchend", function(){
		movingLeft = false;
	});

	document.getElementById("shootBtn").addEventListener("touchstart", function(){
		playerJump = true;
		console.log("jump");
	});
	document.getElementById("shootBtn").addEventListener("touchend", function(){
		playerJump = false;
	});

	//pause button
	document.getElementById("startBtn").addEventListener("touchstart", function(){
		startGame = true;
		//console.log(player);
		var btn = document.getElementById("startText");
		if(pause == false){
			pause = true;
			btn.innerHTML = "Start";
		}else if(pause == true){
			pause = false;
		}
	});
	document.getElementById("startBtn").addEventListener("touchend", function(){
		startGame = false;
	});
	document.getElementById("startText").innerHTML = "Start";

	function restartPauseText(){
		console.log("change button text");
		document.getElementById("startText").innerHTML = "Start";
	}
