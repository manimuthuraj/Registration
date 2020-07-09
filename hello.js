//scope
var a = 2 //gloal variable

function my() {
    console.log(a) //2 global variable
    var b = 3
    console.log(b) //3 local variable // cant access outside function
}
my()

//
//clouser - function inside function

function my1() {
    var count = 0

    function my2() {
        console.log(count = count + 1)
    }
    my2()
}
my1() //calling function

//
//callback - sending function as arguments into another function
function call(a) {
    console.log(a)
}

function back(x) { //getting call funcion as x
    console.log("back")
    x(4) //calling call function
    console.log("a")
}

back(call); //sending call function as parameter

//
//promise

var p = new Promise(function(resolve, reject) { //promise has one function argument that function has two argument resolve reject
    var n = 4 //if  condition is true we can call resole using .then and can do needed operation
    if (n > 5) {
        resolve("s")
    } else {
        reject("no") // n is < 5 so . catch is called
    }
})
p.then(function(x) {
    console.log(x)
}).catch(function(y) {
    console.log(y) // no will print
})

//
//async await
async function hello(n) {
    try {
        if (n > 5) {
            console.log(n)
        }
    } catch (e) {
        console.log("bn")
    }
}
hello(0);