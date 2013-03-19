#pragma strict

var health:int = 5;
var maxHealth:int = 5;
var delayDamage:boolean = false;
var delayDamageTime = 1;


private var damageColorTime = 0.1;
private var delayDamageCurr = 0;

function Start () {
	if(gameObject.tag == "Player")
	{
		//set prefs if they don't exist
		if(PlayerPrefs.GetInt("gamePlayerHealth"))
		{
			health = PlayerPrefs.GetInt("gamePlayerHealth");
			maxHealth = PlayerPrefs.GetInt("gamePlayerHealthMax");
		}
	}
}

function Update () {

}

function doDamage(damage:float)
{
	//decrement our delayDamageCurr
	if(delayDamage==true && delayDamageCurr > 0)
		delayDamageCurr -= Time.deltaTime;

	if(delayDamage==false || delayDamageCurr == 0)
	{
		//start our delay damage timer
		if(delayDamage==true)
			delayDamageCurr = delayDamageTime;

		health -= damage;
	}

	Debug.Log("Do damage - "+damage+" Health: "+health);

	if(health<=0)
	{
		//Get the death script
		var death:Death = gameObject.GetComponent("Death");
		if(death!=null)
			death.doDeath();
	}

	//flash hurt color
	else
	{
		var tint = GetComponent(TintColorTimed);
		if(tint)
			tint.doTint();
	}	
}

function incMaxHealth(by)
{
	maxHealth++;
}

function save()
{
	PlayerPrefs.SetInt("gamePlayerHealth",health);
	PlayerPrefs.SetInt("gamePlayerHealthMax",maxHealth);
}