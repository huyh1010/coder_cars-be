const fs = require("fs");

const editCar = () => {
  let data = JSON.parse(fs.readFileSync("cars.json"));

  for (let i = 0; i < data.length; i++) {
    const car = data[i];
    const lowerCaseKeys = Object.keys(car).reduce((accumulator, key) => {
      accumulator[key.toLowerCase()] = car[key];
      return accumulator;
    }, {});

    data[i] = lowerCaseKeys;
    car["release_date"] = car["year"];
    car["transmission_type"] = car["transmission type"];
    car["size"] = car["vehicle size"];
    car["style"] = car["vehicle style"];
    car["price"] = car["msrp"];
    delete car["year"];
    delete car["transmission type"];
    delete car["vehicle size"];
    delete car["vehicle style"];
    delete car["msrp"];

    data[i] = car;
  }
  fs.writeFileSync("cars.json", JSON.stringify(data));
};

editCar();
