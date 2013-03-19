#pragma strict

var player:GameObject;

function Start () {
	player = GameObject.Find("Player");
}

function Update () {

	if(player)
	{
		var playerPos = player.transform.position;
		playerPos.y = transform.position.y;
		transform.position = playerPos;
	}

}