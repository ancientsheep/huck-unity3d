#pragma strict

var damage:float = 8;

static var velocity:Vector3;


function Start () {
	//velocity = Vector3(0,0,0);
}

//input should be  a normalized vector with direction only
function Fire(direction:Vector3)
{
	Debug.Log("Fire - "+direction);
	velocity = direction;
}

function OnTriggerEnter(coll:Collider)
{
	Debug.Log("Projectile collision");

	if(coll.gameObject.tag == "Enemy")
	{
		// do damage
		var healthScript:Health = coll.gameObject.GetComponent("Health");
		if(healthScript)
			healthScript.doDamage(damage);
	}

	// destroy projectile
	Destroy(gameObject);
}