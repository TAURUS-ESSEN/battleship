'use strict';
let array = [[1,2], [2,5], [6,9],[12,3]]
array = array.filter(arr=> {
    const  [x , y] = arr
    if ((x>2) && (y>2)) {
        return arr 
    }
})

// let array2 = array.forEach((arr,index,thisarray)=> {
//     console.log(index)
//     const  [x , y] = arr
//     if ((x>2) && (y>2)) {
//         // return arr
//         thisarray.splice(index,1)
//     }
// })


console.log(array)
console.log(array[0])
console.log(array[1])
console.log(array[2])