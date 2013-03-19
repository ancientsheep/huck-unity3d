#pragma strict

var sound:AudioClip;

function OnTriggerEnter(coll:Collider)
{
	SoundManager.PlaySound(sound,coll.transform.position);
}