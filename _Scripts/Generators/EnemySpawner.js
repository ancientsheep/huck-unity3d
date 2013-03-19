#pragma strict

var enemyType1:GameObject;
var enemyType2:GameObject;
var enemyType3:GameObject;

private var currTimer:int;
var spawnRate:float = 3.0;
var spawnDistance = 10;
private var numEnemyTypes:int = 3;

private var player:GameObject;

function Start () {
	currTimer = spawnRate;
	player = GameObject.Find("Player");
}

function Update () {

	currTimer -= Time.deltaTime;

	//make sure player exists, otherwise don't spawn new enemies
	if(player)
	{
		//fire timer
		if(currTimer <= 0.0)
		{
			currTimer = spawnRate;
			//intantiate enemy
			var multiplier = Random.Range(-1,1);

			var frontBackSpawn = spawnDistance;

			//randomize whether they start from in front of player or behind
			if(Random.Range(0,100) >= 50)
				frontBackSpawn = -frontBackSpawn;

			//randomize enemy type
			var enemyType = Random.Range(0,numEnemyTypes);

			//just for debugging
			//enemyType = 2;

			//monkey
			if(enemyType==0)
				Instantiate(enemyType1,Vector3(player.transform.position.x+frontBackSpawn,-4,Random.Range(-3,3)),Quaternion.identity);

			else if(enemyType==1)
				Instantiate(enemyType3,Vector3(player.transform.position.x+frontBackSpawn,-3,Random.Range(-3,3)),transform.rotation);
			else
				Instantiate(enemyType2,Vector3(player.transform.position.x+frontBackSpawn,-4,Random.Range(-3,3)),transform.rotation);
		}
	}
}