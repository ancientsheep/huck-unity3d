#pragma strict

function Start () {

}

function OnTriggerEnter(coll:Collider)
{
	if(coll.gameObject.tag=="Player")
	{
		Debug.Log("End level!");

		//save game stats
		var health:Health = coll.gameObject.GetComponent("Health");
		if(health)
			health.save();

		//save player stats
		var playerStats:PlayerStats = coll.gameObject.GetComponent("PlayerStats");
		if(playerStats)
			playerStats.save();

		Application.LoadLevel("Next Level");
	}
}