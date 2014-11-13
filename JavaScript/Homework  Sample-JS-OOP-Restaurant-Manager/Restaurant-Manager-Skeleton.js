function processRestaurantManagerCommands(commands) {
   "use strict";
    Object.prototype.extends = function(parent) {
        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
    };

    var RestaurantEngine = (function() {
        var _restaurants, _recipes;

        function initialize() {
            _restaurants = [];
            _recipes = [];
        }
       
        var Restaurant = (function() {
            function Restaurant(name, location) {
                this.setName(name);
                this.setLocation(location);
                this.setRecipes();
            }
                   
            Restaurant.prototype.setName = function(name) {
                if (!name) {
                    throw new Error("Name cannot be null");
                }
                if (name === "") {
                    throw new Error("Name cannot be empty");
                }
                this._name = name;
            };
            Restaurant.prototype.getName = function() {
                return this._name;
            };

            Restaurant.prototype.setLocation = function(location) {
                if (!location) {
                    throw new Error("Location cannot be null");
                }
                if (location === "") {
                    throw new Error("Location cannot be empty");
                }
                this._location = location;
            };
            Restaurant.prototype.getLocation = function() {
                return this._location;
            };

            Restaurant.prototype.setRecipes = function() {
                this._recipes = [];
            };

            Restaurant.prototype.getRecipes = function() {
                return this._recipes;
            };

            Restaurant.prototype.addRecipe = function(recipe) {
                this.getRecipes().push(recipe);

            };

            Restaurant.prototype.removeRecipe = function(recipe) {
                var index = this.getRecipes().indexOf(recipe);
                this.getRecipes().splice(index, 1);
            };

            Restaurant.prototype.printRestaurantMenu = function() {
                var i,resultStr,len;
                resultStr = "***** " + this.getName() + " - " + this.getLocation() + " *****\n";

                if (this.getRecipes().length === 0) {
                    return resultStr += "No recipes... yet\n";
                }
                var drinks = this.getRecipes().filter(function(drink) {
                    return drink instanceof Drink;
                }).sort(function(a, b) {
                    return a.getName().localeCompare(b.getName());
                });
                var salads = this.getRecipes().filter(function(salad) {
                    return salad instanceof Salad;
                }).sort(function(a, b) {
                    return a.getName().localeCompare(b.getName());
                });
                var desserts = this.getRecipes().filter(function(dessert) {
                    return dessert instanceof Dessert;
                }).sort(function(a, b) {
                    return a.getName().localeCompare(b.getName());

                });

                var mainCourses = this.getRecipes().filter(function(mainCourse) {
                    return mainCourse instanceof MainCourse;
                }).sort(function(a, b) {
                    return a.getName().localeCompare(b.getName());
                });
                if (drinks.length > 0) {
                    resultStr += "~~~~~ DRINKS ~~~~~\n";
                    for (i = 0,len = drinks.length; i < len; i++) {

                        resultStr += drinks[i];
                    }
                }
                if (salads.length > 0) {
                    resultStr += "~~~~~ SALADS ~~~~~\n";
                    for (i = 0,len = salads.length; i < len; i++) {
                        resultStr += salads[i];
                    }
                }
                if (mainCourses.length > 0) {
                    resultStr += "~~~~~ MAIN COURSES ~~~~~\n";
                    for (i = 0,len = mainCourses.length; i < len; i++) {
                        resultStr += mainCourses[i];
                    }
                }
                if (desserts.length > 0) {
                    resultStr += "~~~~~ DESSERTS ~~~~~\n";
                    for (i = 0,len = desserts.length; i < len; i++) {
                        resultStr += desserts[i];
                    }
                }

                return resultStr;
            };
            return Restaurant;
        }());

        var Recipe = (function() {
            function Recipe(name, price, calories, quantity, unit, timeToPrepare) {
                if (this.constructor === Recipe) {
                    throw new Error("Cannot instantiate abstract class Recipe.");
                }
                this.setName(name);
                this.setPrice(price);
                this.setCalories(calories);
                this.setQuantity(quantity);
                this.setUnit(unit);
                this.setTimeToPrepare(timeToPrepare);
            }

            Recipe.prototype.setName = function(name) {
                if (!name) {
                    throw new Error("Name cannot be null");
                }
                if (name === "") {
                    throw new Error("Name cannot be empty");
                }
                this._name = name;
            };
            Recipe.prototype.getName = function() {
                return this._name;
            };

            Recipe.prototype.setPrice = function(price) {
                if (price < 0) {
                    throw new Error("Price cannot be negative");
                }
                this._price = price;
            };
            Recipe.prototype.getPrice = function() {
                return this._price;
            };

            Recipe.prototype.setCalories = function(calories) {
                if (calories < 0) {
                    throw new Error("Calories cannot be negative");
                }
                this._calories = calories;
            };

            Recipe.prototype.getCalories = function() {
                return this._calories;
            };

            Recipe.prototype.setQuantity = function(quantity) {
                if (quantity < 0) {
                    throw new Error("Quantity cannot be negative");
                }

                this._quantity = quantity;
            };

            Recipe.prototype.getQuantity = function(first_argument) {
                return this._quantity;
            };

            Recipe.prototype.setTimeToPrepare = function(timeToPrepare) {
                if (timeToPrepare < 0) {
                    throw new Error("Time to prepare cannot be negative");
                }
                this._timeToPrepare = timeToPrepare;
            };
            Recipe.prototype.getTimeToPrepare = function() {
                return this._timeToPrepare;
            };

            Recipe.prototype.setUnit = function(unit) {
                this._unit = unit;
            };

            Recipe.prototype.getUnit = function() {
                return this._unit;
            };

            Recipe.prototype.toString = function() {
                var resultStr = "==  " + this.getName() +
                    " == $" + this.getPrice().toFixed(2) + "\n" +
                    "Per serving: " + this.getQuantity() + " " + this.getUnit() +
                    ", " + this.getCalories() + " kcal\n" +
                    "Ready in " + this.getTimeToPrepare() + " minutes";
                return resultStr;
            };

            return Recipe;
        }());

        var Drink = (function() {
            function Drink(name, price, calories, quantity, timeToPrepare, isCarbonated) {
                Recipe.call(this, name, price, calories, quantity, "ml", timeToPrepare);
                this.setIsCarbonated(isCarbonated);

            }

            Drink.extends(Recipe);
            Drink.prototype.setIsCarbonated = function(isCarbonated) {
                this._isCarbonated = isCarbonated;
            };

            Drink.prototype.getIsCarbonated = function() {
                return this._isCarbonated;
            };
            Drink.prototype.setTimeToPrepare = function(timeToPrepare) {
                if (timeToPrepare > 20) {
                    throw new Error("Time to prepare cannot be greater than 20");
                }
                Recipe.prototype.setTimeToPrepare.call(this);
                this._timeToPrepare = timeToPrepare;
            };
            Drink.prototype.setCalories = function(calories) {
                if (calories > 100) {
                    throw new Error("Calories cannot be greater than 100");
                }
                Recipe.prototype.setCalories.call(this);
                this._calories = calories;
            };

            Drink.prototype.toString = function() {
                var isCarbonated = this.getIsCarbonated() ? "yes" : "no";
                return Recipe.prototype.toString.call(this) + "\nCarbonated: " + isCarbonated + "\n";
            };
            return Drink;
        }());

        var Meal = (function() {
            function Meal(name, price, calories, quantity, timeToPrepare, isVegan) {
                Recipe.call(this, name, price, calories, quantity, "g", timeToPrepare);
                if (this.constructor === Meal) {
                    throw new Error("Cannot instantiate abstract class Meal.");
                }
                this.setIsVegan(isVegan);
            }

            Meal.extends(Recipe);

            Meal.prototype.setIsVegan = function(isVegan) {
                this._isVegan = isVegan;
            };
            Meal.prototype.getIsVegan = function() {
                return this._isVegan;
            };

            Meal.prototype.toggleVegan = function() {
                this.setIsVegan(!this.getIsVegan());
            };
            Meal.prototype.toString = function() {
                var isVegan = this.getIsVegan() ? "[VEGAN] " : "";
                return isVegan + Recipe.prototype.toString.call(this);
            };
            return Meal;
        }());

        var Dessert = (function() {
            function Dessert(name, price, calories, quantity, timeToPrepare, isVegan) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, isVegan);
                this.setWithSugar(true);
            }

            Dessert.extends(Meal);
            Dessert.prototype.setWithSugar = function(withSugar) {
                this._withSugar = withSugar;
            };
            Dessert.prototype.getWithSugar = function() {
                return this._withSugar;
            };
            Dessert.prototype.toggleSugar = function() {
                this.setWithSugar(!this.getWithSugar());
            };
            Dessert.prototype.toString = function() {
                var withSugar = this.getWithSugar() ? "" : "[NO SUGAR] ";
                return withSugar + Meal.prototype.toString.call(this) + "\n";
            };
            return Dessert;
        }());

        var MainCourse = (function() {
            function MainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, isVegan);
                this.setType(type);
            }

            MainCourse.extends(Meal);
            MainCourse.prototype.setType = function(type) {
                this._type = type;
            };
            MainCourse.prototype.getType = function() {
                return this._type;
            };
            MainCourse.prototype.toString = function() {
                return Meal.prototype.toString.call(this) + "\nType: " + this.getType() + "\n";
            };
            return MainCourse;
        }());

        var Salad = (function() {
            function Salad(name, price, calories, quantity, timeToPrepare, isVegan, containsPasta) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, true);
                this.setContainsPasta(containsPasta);
            }

            Salad.extends(Meal);
            Salad.prototype.setContainsPasta = function(containsPasta) {
                this._containsPasta = containsPasta;
            };
            Salad.prototype.getContainsPasta = function() {
                return this._containsPasta;
            };
            Salad.prototype.toggleVegan = function() {
                this.setIsVegan(true);
            };
            Salad.prototype.toString = function() {
                var containsPasta = this.getContainsPasta() ? "yes" : "no";
                return Meal.prototype.toString.call(this) + "\nContains pasta: " + containsPasta + "\n";
            };
            return Salad;
        }());

        var Command = (function() {

            function Command(commandLine) {
                this._params = new Array();
                this.translateCommand(commandLine);
            }

            Command.prototype.translateCommand = function(commandLine) {
                var self, paramsBeginning, name, parametersKeysAndValues;
                self = this;
                paramsBeginning = commandLine.indexOf("(");

                this._name = commandLine.substring(0, paramsBeginning);
                name = commandLine.substring(0, paramsBeginning);
                parametersKeysAndValues = commandLine
                    .substring(paramsBeginning + 1, commandLine.length - 1)
                    .split(";")
                    .filter(function(e) {
                        return true
                    });

                parametersKeysAndValues.forEach(function(p) {
                    var split = p
                        .split("=")
                        .filter(function(e) {
                            return true;
                        });
                    self._params[split[0]] = split[1];
                });
            }

            return Command;
        }());

        function createRestaurant(name, location) {
            _restaurants[name] = new Restaurant(name, location);
            return "Restaurant " + name + " created\n";
        }

        function createDrink(name, price, calories, quantity, timeToPrepare, isCarbonated) {
            _recipes[name] = new Drink(name, price, calories, quantity, timeToPrepare, isCarbonated);
            return "Recipe " + name + " created\n";
        }

        function createSalad(name, price, calories, quantity, timeToPrepare, containsPasta) {
            _recipes[name] = new Salad(name, price, calories, quantity, timeToPrepare, containsPasta);
            return "Recipe " + name + " created\n";
        }

        function createMainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type) {
            _recipes[name] = new MainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type);
            return "Recipe " + name + " created\n";
        }

        function createDessert(name, price, calories, quantity, timeToPrepare, isVegan) {
            _recipes[name] = new Dessert(name, price, calories, quantity, timeToPrepare, isVegan);
            return "Recipe " + name + " created\n";
        }

        function toggleSugar(name) {
            var recipe;

            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }
            recipe = _recipes[name];

            if (recipe instanceof Dessert) {
                recipe.toggleSugar();
                return "Command ToggleSugar executed successfully. New value: " + recipe._withSugar.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleSugar is not applicable to recipe " + name + "\n";
            }
        }

        function toggleVegan(name) {
            var recipe;

            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }

            recipe = _recipes[name];
            if (recipe instanceof Meal) {
                recipe.toggleVegan();
                return "Command ToggleVegan executed successfully. New value: " +
                    recipe._isVegan.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleVegan is not applicable to recipe " + name + "\n";
            }
        }

        function printRestaurantMenu(name) {
            var restaurant;

            if (!_restaurants.hasOwnProperty(name)) {
                throw new Error("The restaurant " + name + " does not exist");
            }

            restaurant = _restaurants[name];
            return restaurant.printRestaurantMenu();
        }

        function addRecipeToRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;

            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }
            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }

            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.addRecipe(recipe);
            return "Recipe " + recipeName + " successfully added to restaurant " + restaurantName + "\n";
        }

        function removeRecipeFromRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;

            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }
            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }

            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.removeRecipe(recipe);
            return "Recipe " + recipeName + " successfully removed from restaurant " + restaurantName + "\n";
        }

        function executeCommand(commandLine) {
            var cmd, params, result;
            cmd = new Command(commandLine);
            params = cmd._params;

            switch (cmd._name) {
                case 'CreateRestaurant':
                    result = createRestaurant(params["name"], params["location"]);
                    break;
                case 'CreateDrink':
                    result = createDrink(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["carbonated"]));
                    break;
                case 'CreateSalad':
                    result = createSalad(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["pasta"]));
                    break;
                case "CreateMainCourse":
                    result = createMainCourse(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["vegan"]), params["type"]);
                    break;
                case "CreateDessert":
                    result = createDessert(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                        parseInt(params["quantity"]), params["time"], parseBoolean(params["vegan"]));
                    break;
                case "ToggleSugar":
                    result = toggleSugar(params["name"]);
                    break;
                case "ToggleVegan":
                    result = toggleVegan(params["name"]);
                    break;
                case "AddRecipeToRestaurant":
                    result = addRecipeToRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "RemoveRecipeFromRestaurant":
                    result = removeRecipeFromRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "PrintRestaurantMenu":
                    result = printRestaurantMenu(params["name"]);
                    break;
                default:
                    throw new Error('Invalid command name: ' + cmdName);
            }

            return result;
        }

        function parseBoolean(value) {
            switch (value) {
                case "yes":
                    return true;
                case "no":
                    return false;
                default:
                    throw new Error("Invalid boolean value: " + value);
            }
        }

        return {
            initialize: initialize,
            executeCommand: executeCommand
        };
    }());


    // Process the input commands and return the results
    var results = '';
    RestaurantEngine.initialize();
    commands.forEach(function(cmd) {
        if (cmd != "") {
            try {
                var cmdResult = RestaurantEngine.executeCommand(cmd);
                results += cmdResult;
            } catch (err) {

                results += err.message + "\n";
            }
        }
    });

    return results.trim();
}

// ------------------------------------------------------------
// Read the input from the console as array and process it
// Remove all below code before submitting to the judge system!
// ------------------------------------------------------------

(function() {
    var arr = [];
    if (typeof(require) == 'function') {
        // We are in node.js --> read the console input and process it
        require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        }).on('line', function(line) {
            arr.push(line);
        }).on('close', function() {
            console.log(processRestaurantManagerCommands(arr));
        });
    }
})();