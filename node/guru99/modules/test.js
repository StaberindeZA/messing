function outer() {
    var b = 10;
    function inner() {
        var a = 20;
        console.log(a+b);
    }
    return inner;
}

// var X = outer();
// var Y = outer();

console.log(outer.inner);