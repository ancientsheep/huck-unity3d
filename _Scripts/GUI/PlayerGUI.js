#pragma strict

var fullHeart:Texture2D;
var halfHeart:Texture2D;
var emptyHeart:Texture2D;
var coinTexture:Texture2D;

var coinText:GUIText;

var xOffset:int = 20;
var yOffset:int = 20;

//individual heart dimensions
var height:int = 50;
var width:int = 50;
var padding:int = 3;

//health
private var hearts:int[];

private var player:GameObject;
private var healthComp:Health;
private var playerStats:PlayerStats;

function Start () {
	//get a reference to our player
	player = GameObject.Find("Player");
	healthComp = player.GetComponent("Health");
	playerStats = player.GetComponent("PlayerStats");
}

function OnGUI()
{
	calculateHearts();

	//create our hearts group
	for(var i=0;i<hearts.length;i++)
	{
		//full heart
		if(hearts[i] == 1)
			GUI.DrawTexture(Rect(i*width+i*padding+xOffset,yOffset,width,height),fullHeart);
		else
			GUI.DrawTexture(Rect(i*width+i*padding+xOffset,yOffset,width,height),emptyHeart);

	}

	//display coins
	GUI.DrawTexture(Rect(padding+xOffset,yOffset+70,width,height),coinTexture);
	coinText.pixelOffset = Vector2(padding*2+xOffset+width,yOffset+70);
	coinText.text = playerStats.coins.ToString();
}

function calculateHearts()
{
	//get player health and max health (hearts)
	var health = healthComp.health;
	var maxHearts = healthComp.maxHealth;

	hearts = new int[maxHearts];

	for(var i=0;i<maxHearts;i++)
	{
		//empty heart
		if(i >= health)
			hearts[i] = 0;
		//full heart
		else
			hearts[i] = 1;
	}
}