#pragma strict

private var speed:float = 2.5;
private var idleTime:float = 0.5;
private var lungeProximity:float = 5.0;
private var lungeTime:float = 0.5;


private var player:GameObject;
private var origScale:float;

private var lastPlayerPos:Vector3;

enum AIState
{
	STALK,
	IDLE,
	LUNGE,
	LUNGING,
}

private var state:AIState;

function Start () {
	//cache player object
	player = GameObject.Find("Player");

	state = AIState.STALK;

	//store x scale so we can invert to face proper direction
	origScale = gameObject.transform.localScale.x;
	updateAI();
}

function Update()
{
	updateAI();
}

function updateAI()
{
	//switch states each call
	Debug.Log("StalkBear AIState = "+state);

	//do standard stalking
	if(state == AIState.STALK)
	{
		//get distance between enemy and player
		var delta:Vector3 =  player.transform.position - gameObject.transform.position;
		//do not change y value of enemy nor use it in calculations
		delta.y = 0;

		//stop stalking if we're close enough and lunge! well, idle first :)
		if(delta.magnitude < lungeProximity)
		{
			//set position to lunge to
			lastPlayerPos = player.transform.position;
			state = AIState.IDLE;
		}

		//get normalized directional vector
		delta.Normalize();
		delta *= speed * Time.deltaTime;


		//move character
		gameObject.transform.position += delta;

		//rigidbody.MovePosition(rigidbody.position + delta);

		//face direction
		if(delta.x < 0)
			gameObject.transform.localScale.x = -origScale;

		if(delta.x > 0)
			gameObject.transform.localScale.x = origScale;

		//check to see if we're close enough to lunge
	}

	//idle
	if(state == AIState.IDLE)
	{
		//pause for a moment
		yield WaitForSeconds(idleTime);
		state = AIState.LUNGE;
	}

	//lunge after player

	//make sure we have an reference for player
	if(state == AIState.LUNGE)
	{
		if(player)
		{
			//tween enemy to player
			iTween.MoveTo(gameObject,{'x': lastPlayerPos.x,'z': lastPlayerPos.z,'time': lungeTime,'oncomplete':'finishedLunging'});
			state = AIState.LUNGING;
		}
	}
}

function finishedLunging()
{
	yield WaitForSeconds(idleTime);
	state = AIState.STALK;
}