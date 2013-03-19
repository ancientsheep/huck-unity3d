#pragma strict

var extraDamage = 0;
var extraFirerate:float = 0;
var extraSpeed:float = 0;

var coins:int = 0;

function Awake()
{
	extraFirerate = PlayerPrefs.GetInt("gameExtraFirerate");
	extraSpeed = PlayerPrefs.GetInt("gameExtraSpeed");
	coins = PlayerPrefs.GetInt("gameCoins");
}

function save()
{
	PlayerPrefs.SetInt("gameExtraFirerate",extraFirerate);
	PlayerPrefs.SetInt("gameExtraSpeed",extraSpeed);
	PlayerPrefs.SetInt("gameCoins",coins);
}