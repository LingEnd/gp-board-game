import achievements from "../achievements";

const achievementInit = achievements;
let key: keyof typeof achievementInit;
for (key in achievementInit) {
  achievementInit[key] = false;
}

export type workerList =
  | ""
  | "Regional_Manager"
  | "Luxuries_Manager"
  | "Zeppelin_Pilot"
  | "CFO"
  | "Brand_Director"
  | "Burger_Chef"
  | "Pizza_Chef"
  | "Executive_Vice_President"
  | "Guru"
  | "HR_Director"
  | "Local_Manager"
  | "Discount_Manager"
  | "Cart_Operator"
  | "Truck_Driver"
  | "New_Business_Developer"
  | "Campaign_Manager"
  | "Brand_Manager"
  | "Burger_Cook"
  | "Pizza_Cook"
  | "Vice_President"
  | "Senior_Vice_President"
  | "Coach"
  | "Recruiting_Manager"
  | "Pricing_Manager"
  | "Errand_Boy"
  | "Waitress"
  | "Marketing_Trainee"
  | "Kitchen_Trainee"
  | "Junior_Vice_President"
  | "Trainer"
  | "Recruiting_Girl"
  | "Management_Trainee"
  | "CEO";

const company = {
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
  beach: new Array<workerList>("CEO"),
  working: new Array<workerList>("CEO"),
  tranning: new Array<workerList>(),
  achieve: achievementInit,
  price: 10,
  total: 0,
};
export default company;
