#pragma strict

var audiofx:AudioClip;

function Start () {
	SoundManager.PlaySound(audiofx,gameObject.transform.position);
}
