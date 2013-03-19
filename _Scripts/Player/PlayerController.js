#pragma strict

//Weapons star
enum Weapons
{
	STANDARD_LAUNCHER,
	GRENADE_LAUNCHER,
	ROCKET_LAUNCHER,
	SHOTGUN
}

var currWeapon:Weapons;
private var numberOfWeaponTypes = System.Enum.GetValues(Weapons).Length;

//projectiles
var projStandard:GameObject;
var projGrenade:GameObject;
var projRocket:GameObject;
var projShotgun:GameObject;
var projExplosion:GameObject;

// End weapons

var speed:float = 0.5;

var fireRate:float = 30.0;


private var currFireRate:int;

var leftJoystick:Joystick;
var rightJoystick:Joystick;

private var playerStats:PlayerStats;

function Start () {
	currFireRate = 0;

	//get player stats
	playerStats = GetComponent("PlayerStats");
}

function Update () {

	var			movement:Vector3;

	//Setup our fire rate counter
	if(currFireRate>0)
		currFireRate -= Time.deltaTime;

	


	//create a movement vector for the character

#if UNITY_IPHONE
	movement.x = leftJoystick.position.x*speed+playerStats.extraSpeed;
	movement.z = leftJoystick.position.y*speed+playerStats.extraSpeed;

	//player shoot controls
	if(rightJoystick.position.x > 0 && currFireRate == 0)
	{
		shootProjectile(1);
		currFireRate = fireRate-playerStats.extraFirerate;
	}

	if(rightJoystick.position.x < 0 && currFireRate == 0)
	{
		shootProjectile(-1.0);
		currFireRate = fireRate-playerStats.extraFirerate;
	}

#else
	//hide joysticks
	var 		joysticks:GameObject = GameObject.Find("Dual Joysticks");
	//joysticks.active = false;

#endif

#if UNITY_ANDROID
	movement.x = leftJoystick.position.x*speed+playerStats.extraSpeed;
	movement.z = leftJoystick.position.y*speed+playerStats.extraSpeed;

	//player shoot controls
	if(rightJoystick.position.x > 0 && currFireRate == 0)
	{
		shootProjectile(1);
		currFireRate = fireRate-playerStats.extraFirerate;
	}

	if(rightJoystick.position.x < 0 && currFireRate == 0)
	{
		shootProjectile(-1.0);
		currFireRate = fireRate-playerStats.extraFirerate;
	}
#endif

#if (UNITY_STANDALONE_OSX||UNITY_EDITOR||UNITY_WEBPLAYER)

	//player shoot controls
	if(Input.GetKey(KeyCode.RightArrow) && currFireRate == 0)
	{
		shootProjectile(1);
		currFireRate = fireRate - playerStats.extraFirerate;
	}

	if(Input.GetKey(KeyCode.LeftArrow) && currFireRate == 0)
	{
		shootProjectile(-1.0);
		currFireRate = fireRate - playerStats.extraFirerate;
	}

	//player movement
	if(Input.GetKey("d"))
		movement.x += speed+playerStats.extraSpeed;

	if(Input.GetKey("a"))
		movement.x -= speed+playerStats.extraSpeed;

	if(Input.GetKey("w"))
		movement.z += speed+playerStats.extraSpeed;

	/*if(Input.GetKey("t"))
	{
		var clone = Instantiate(projExplosion,gameObject.transform.position,Quaternion.identity);
		//clone.GetComponent(Explosion).Fire(Vector3(dir,0,0));
	}*/

	//cycle weapons
	if(Input.GetKeyDown("t"))
	{
		currWeapon += 1;
    	if(currWeapon == numberOfWeaponTypes) currWeapon = 0;
	}


	if(Input.GetKey("s"))
		movement.z -= speed+playerStats.extraSpeed;

	if(Input.GetKey("r"))
		gameObject.rigidbody.AddForce(Vector3(0,10,0));

#endif

	movement *= Time.deltaTime;

	//invert scale x based on movement vector
	if(movement.x < 0)
		gameObject.transform.localScale.x = -1;

	else if(movement.x > 0)
		gameObject.transform.localScale.x = 1;

	gameObject.transform.position += movement;
}

function shootProjectile(dir:float)
{

	Debug.Log("shootProjectile");

	//set start position of projectile
	var pos = gameObject.transform.position;
	pos.y = -2;

	//shoot projectile 
	var clone:GameObject;

	switch(currWeapon)
	{
		case Weapons.STANDARD_LAUNCHER:
			//intantiate bullet
			clone = Instantiate(projStandard,pos,Quaternion.identity);
			clone.GetComponent(BulletStandard).Fire(Vector3(dir,0,0));
		break;

		case Weapons.ROCKET_LAUNCHER:
			//intantiate rocket
			clone = Instantiate(projRocket,pos,Quaternion.identity);
			clone.GetComponent(Rocket).Fire(Vector3(dir,0,0));
		break;

		case Weapons.GRENADE_LAUNCHER:
			//instantiate grenade
			clone = Instantiate(projGrenade,pos,Quaternion.identity);
			clone.GetComponent(Grenade).Fire(Vector3(dir,0,0));
		break;

		case Weapons.SHOTGUN:
			//instantiate grenade
			clone = Instantiate(projShotgun,pos,Quaternion.identity);
			clone.GetComponent(Shotgun).Fire(Vector3(dir,0,0));
		break;
	}
}