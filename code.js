// triangle
function triangle(num) {
    let result = '';
    for (let x = 0; x < num; x++) {
        for (let y = num; y > x + 1; y--) {
            result += ' '
        }
        for (let z = 0; z <= x; z++) {
            result += '*'
        }
        result += '\n';
    }
    return result;
}

console.log(triangle(5));
console.log(triangle(7));

// box 
function box(num) {
    let result = '';
    for (let x = 0; x < num; x++) {
        for (let y = 0; y < num; y++) {
            if (x === 0 || x === num - 1) {
                result += '*';
            } else if (y === 0 || y === num - 1) {
                result += '*';
            } else {
                result += ' ';
            }
        }
        result += '\n';
    }
    return result;
}

console.log(box(5));
console.log(box(7));

//  prims
function prims(num) {
    if(num % 2 === 0) return `Input number must be an odd number`
    let result = '';
    for (let x = 0; x < num; x += 2) {
        for (let y = num; y > x + 1; y -= 2) {
            result += ' '
        }
        for (let z = 0; z <= x; z++) {
            result += '*'
        }
        result += '\n';
    }
    for (let x = 0; x < num; x += 2) {
        for (let y = x - 1; y >= 1; y -= 2) {
            result += ' '
        }
        for (let z = x; z <= num - 1; z++) {
            result += '*'
        }
        result += '\n';
    }
    return result;
}

console.log(prims(5)); 
console.log(prims(7)); 