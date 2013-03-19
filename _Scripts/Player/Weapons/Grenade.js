#pragma strict

var speed:float = 300.0;
var damage:float = 2.5;

var velocity:Vector3;
var explosion:GameObject;

function Start () {
	//velocity = Vector3(0,0,0);

	Debug.Log("Grenade : Start");
}

//input should be  a normalized vector with direction only
function Fire(direction:Vector3)
{
	Debug.Log("Fire - "+direction);
	velocity = direction;
	rigidbody.AddForce(velocity*speed);

	//EXPLODE after x seconds
	yield WaitForSeconds(1.5);
	Explode();
}

function Explode()
{
	var exp = Instantiate(explosion,gameObject.transform.position,Quaternion.identity);
	Destroy(gameObject);
}

function OnCollisionEnter(coll:Collision)
{
	Debug.Log("Grenade collision");

	if(coll.gameObject.tag == "Enemy" || coll.gameObject.tag == "PlayerProjectile")
	{
		//explode
		Explode();
	}
}

function OnTriggerEnter(coll:Collider)
{
	Debug.Log("Grenade trigger");

	if(coll.gameObject.tag == "Enemy" || coll.gameObject.tag == "PlayerProjectile")
	{
		Explode();
	}
}