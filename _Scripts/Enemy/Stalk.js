#pragma strict

var speed:float = 2.0;
private var player:GameObject;
private var origScale:float;

function Start () {
	//cache player object
	player = GameObject.Find("Player");
	origScale = gameObject.transform.localScale.x;
}

function Update () {

	if(player)
	{
		var delta:Vector3 =  player.transform.position  - gameObject.transform.position;

		//do not change y position of enemy
		delta.y = 0;

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
	}
}