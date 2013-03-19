#pragma strict

var speed:float = 3.0;
var damage:float = 2.5;

var explosion:GameObject;

static var velocity:Vector3;


function Start () {
	//velocity = Vector3(0,0,0);
}

//input should be  a normalized vector with direction only
function Fire(direction:Vector3)
{
	Debug.Log("Fire - "+direction);
	velocity = direction;

	if(direction.x < 0)
		gameObject.transform.localScale.x = -1.0;

	rigidbody.AddForce(velocity*speed);
}

function OnTriggerEnter(coll:Collider)
{
	Debug.Log("Projectile collision");

	if(coll.gameObject.tag == "Enemy")
	{
		Debug.Log("Damage enemy");

		// do damage
		var healthScript:Health = coll.gameObject.GetComponent("Health");
		if(healthScript)
			healthScript.doDamage(damage);


		var exp = Instantiate(explosion,gameObject.transform.position,Quaternion.identity);

	}

	// destroy projectile
	Destroy(gameObject);
}