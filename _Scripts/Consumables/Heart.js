#pragma strict

enum ConsumableType {
	HEART1,
	HEART2,
	COIN1
}

private var consumeType:ConsumableType;

function Start() {
	var texture: Texture2D;
	var random = Random.Range(0,3);

	switch(random) {
	case 0:
		texture = Resources.Load("Consumables/heart-green", Texture2D);
		consumeType = ConsumableType.HEART1;
		break;

	case 1:
		texture = Resources.Load("Consumables/heart-peach", Texture2D);
		consumeType = ConsumableType.HEART2;
		break;

	case 2:
		texture = Resources.Load("Consumables/coin_1", Texture2D);
		consumeType = ConsumableType.COIN1;
		break;
	}

	gameObject.renderer.material.mainTexture = texture;

}

function OnTriggerEnter(coll: Collider) {
	if(coll.tag == "Player") {
		var playerStats: PlayerStats = coll.gameObject.GetComponent("PlayerStats");
		var health: Health = coll.gameObject.GetComponent("Health");
		

		//1 heart
		if(consumeType == ConsumableType.HEART1)
		{
			//only pick up heart if we are missing heart
			if(health.health < health.maxHealth)
			{
				health.health +=1;
				Destroy(gameObject);
			}
		}

		//2 hearts
		else if(consumeType == ConsumableType.HEART2)
		{
			//only pick up heart if we are missing heart
			if(health.health < health.maxHealth)
			{
				health.health +=1;
				Destroy(gameObject);
			}
		}

		//coin 1
		else if(consumeType == ConsumableType.COIN1)
		{
			playerStats.coins += 1;
			Destroy(gameObject);
		}
	}

}