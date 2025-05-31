'use strict';
import soundMiss from './audio/miss.mp3';
import soundHit from './audio/hit.mp3';
import soundSunk from './audio/sunk.mp3';

export let soundOn = true;

export function toggleSound() {
    console.log('soundOn',soundOn)
 
    return soundOn = soundOn === true? false : true  
}

export function playMiss() {
    const sound = new Audio(soundMiss);
    if (soundOn) sound.play();
}

export function playHit() {
    const sound = new Audio(soundHit);
    if (soundOn) sound.play();
}

export function playSunk() {    
    const sound = new Audio(soundSunk);
    if (soundOn) sound.play();
}