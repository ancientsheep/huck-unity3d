#pragma strict

var speed:int = 0;
var damage:int = 0;
var firerate:int = 0;
var maxhearts:int = 0;

function Start () {
	//randomize the powerup
	var texture:Texture2D;
	var rnd = Random.Range(0,4);

	Debug.Log("Random powerup - "+rnd);

	//rnd = 2;

	switch(rnd)
	{
		//speed up
		case 0:
			texture = Resources.Load("test/speedup1",Texture2D);
			speed = 3;
			break;

		//damage up
		case 1:
			texture = Resources.Load("test/damageup1",Texture2D);
			damage = 1;
			break;

		//speed up
		case 2:
			texture = Resources.Load("test/firerateup1",Texture2D);
			firerate = 3;
			break;

		//speed up
		case 3:
			texture = Resources.Load("test/maxheartsup1",Texture2D);
			maxhearts = 1;
			break;
	}

	gameObject.renderer.material.mainTexture = texture;
}

function OnTriggerEnter(coll:Collider)
{
	//make sure player touched it
	if(coll.tag == "Player")
	{
		var playerStats:PlayerStats = coll.gameObject.GetComponent("PlayerStats");

		//add / subtract hearts
		if(maxhearts!=0)
		{
			var health:Health = coll.gameObject.GetComponent("Health");
			health.incMaxHealth(maxhearts);
		}

		if(speed!=0)
		{
			playerStats.extraSpeed += speed;
		}

		if(firerate!=0)
		{
			playerStats.extraFirerate += firerate;
		}

		//Destroy powerup
		Destroy(gameObject);
	}
}