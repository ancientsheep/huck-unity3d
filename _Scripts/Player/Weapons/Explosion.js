#pragma strict

var damage:float = 2.5;



function Awake () {
	//velocity = Vector3(0,0,0);

	// destroy explosion
	DestroyOnDelay(.6);
}


function OnTriggerEnter(coll:Collider)
{
	Debug.Log("Projectile EXPLOSION collision");

	if(coll.gameObject.tag == "Enemy")
	{
		// do damage
		var healthScript:Health = coll.gameObject.GetComponent("Health");
		if(healthScript)
			healthScript.doDamage(damage);
	}

	
}

function DestroyOnDelay(delay)
{
	Debug.Log("Destroy explosion");
	yield WaitForSeconds(delay);
	Destroy(gameObject);
}