#pragma strict

var damage:float = 2.0;

function OnTriggerEnter(coll:Collider)
{
	if(coll.gameObject.tag == "Player")
	{
		Debug.Log("Collision with player");

		//health component
		var healthScript:Health = coll.gameObject.GetComponent("Health");

		//deal damage
		if(healthScript)
		{
			healthScript.doDamage(damage);
		}
		
		//missing health script. not cool.
		else
		{
			Debug.Log("Cannot damage player as player has no health script");
		}
	}
}