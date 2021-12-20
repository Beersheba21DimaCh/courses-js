function getId(){
    return 100;
}
function getUser(id){
    return new Promise((resolve, reject) => {
        //resolve - callback of "then" method
        //reject - callback of "catch" method
       setTimeout(() => {
           if(Math.random() < 0.70) {
               resolve("user" + id); //movving in resolved
           } else {
                reject(() => console.log("wrong id"));
           }
       }, 1000) 
    })
}

function getProduct(user){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(Math.random()<0.3){
            resolve("Product of the user " + user);
            } else {
                reject(() => {
                    console.log("kuku", `the user ${user} doesn't have any products`);
                });
            }
        }, 1000)
    })
}

function displayProduct(){
    const id = getId();
    getUser(id)
    .then(user => getProduct(user))
    .then(product => console.log(product))
    .catch(error => error())
    .finally(() => console.log("bye"));
}

displayProduct();