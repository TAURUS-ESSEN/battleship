'use strict';
export let soundOn = true;

export function toggleSound() {
    console.log('soundOn',soundOn)
 
    return soundOn = soundOn === true? false : true  
}

export function playMiss() {
    const soundMiss = new Audio('./audio/miss.mp3');
    if (soundOn) soundMiss.play();
}

export function playHit() {
    const soundHit = new Audio('./audio/hit.mp3');
    if (soundOn) soundHit.play();
}

export function playSunk() {    
    const soundHit = new Audio('./audio/sunk.mp3');
    if (soundOn) soundHit.play();
}