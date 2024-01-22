import achievements from "../achievements";
var achievementInit = achievements;
var key;
for (key in achievementInit) {
    achievementInit[key] = false;
}
var company = {
    boss: "",
    basicHire: 1,
    extraHire: 0,
    started: false,
    product: {
        burger: 0,
        pizza: 0,
        soda: 0,
        beer: 0,
        lemonade: 0,
    },
    beach: new Array("CEO"),
    working: new Array("CEO"),
    tranning: new Array(),
    achieve: achievementInit,
    price: 10,
    total: 0,
};
export default company;
