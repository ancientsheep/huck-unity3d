#pragma strict

var idleTime:float = 1.0;
var lungeDistance:float = 2.0;
var lungeTime:float = 0.5;


private var player:GameObject;
private var origScale:float;
private var lastPlayerPosition:Vector3;

enum AIStateSpider
{
	IDLE,
	LUNGE
}

private var state:AIStateSpider;

function Start () {
	//cache player object
	player = GameObject.Find("Player");

	//store x scale so we can invert to face proper direction
	origScale = gameObject.transform.localScale.x;

	updateAI();
}

function updateAI()
{
	//switch states each call
	Debug.Log("AIState = "+state);

	//idle
	if(state == AIStateSpider.IDLE)
	{

		//get player position to lunge to during idle
		lastPlayerPosition = player.transform.position;

		//pause for a moment
		yield WaitForSeconds(idleTime);
		state = AIStateSpider.LUNGE;
	}

	//lunge after player

	//make sure we have an reference for player
	if(player)
	{
		//get distance between enemy and player
		var delta:Vector3 =  lastPlayerPosition - gameObject.transform.position;
		//do not change y value of enemy nor use it in calculations
		delta.y = 0;

		//if distance between enemy and player is greater than lunge distance, then normalize and * by lunge distance
		if(delta.magnitude > lungeDistance)
		{
			delta.Normalize();
			delta *= lungeDistance;
		}

		//create move to position based on enemy position and delta
		var moveTo = transform.position + delta;

		//tween enemy to player
		iTween.MoveTo(gameObject,{'x': moveTo.x,'z': moveTo.z,'time': lungeTime,'easeType':'linear','oncomplete':'updateAI'});
		state = AIStateSpider.IDLE;
	}
}