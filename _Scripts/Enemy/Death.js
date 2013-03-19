#pragma strict

var deathSound: AudioClip;
var deathAnimation: GameObject;
var heart: GameObject;

var numFlickers = 5;
var flickerTime = 0.2;

private
var damageColorTime = 0.2;
private
var deathTransform: Transform;

function Start() {

}

function doDeath() {
	deathTransform = gameObject.transform;

	//remove standard object, we'll isntantiate death animation
	DestroyObject(gameObject);



	if(deathAnimation) {
		//instantiate death animation if we have one
		var deathAnimation = GameObject.Instantiate(deathAnimation, deathTransform.position, deathTransform.rotation);
		deathAnimation.transform.localScale = deathTransform.localScale;

		//do tint color
		var tint = deathAnimation.GetComponent(TintColorTimed);
		if(tint) tint.doTint();
	}

	//play death sound
	if(deathSound) SoundManager.PlaySound(deathSound, deathTransform.position);

	if(gameObject.tag == "Player") {
		var yieldComponents = GameObject.Find("YieldComponents");
		if(yieldComponents);
		yieldComponents.AddComponent("PlayerDied");
	}else{
		Debug.Log("the enemy died at: " + gameObject.transform.position);

		//gameObject position fixed to the floor
		var pos = gameObject.transform.position;
		pos.y = -3.465124;

		//only add hearts / consumables randomly
		//if(Random.Range(0,4)==0)
		if(true)
			GameObject.Instantiate(heart, pos, heart.transform.rotation);
	}



}