#pragma strict

var delay:float = 3.0;

function Start()
{
	delayDestroy();
}

function delayDestroy()
{
	yield WaitForSeconds(delay);
	DestroyObject(gameObject);
}