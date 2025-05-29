'use strict';

export function playMiss() {
    const soundMiss = new Audio('./audio/miss.mp3');
    soundMiss.play();
}

export function playHit() {
    const soundHit = new Audio('./audio/hit.mp3');
    soundHit.play();
}

export function playSunk() {    
    const soundHit = new Audio('./audio/sunk.mp3');
    soundHit.play();
}