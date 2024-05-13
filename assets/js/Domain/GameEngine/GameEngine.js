const horizontalSeparator = "<div class='vertical-text-divider'></div>";
var firstTimeInDreamHouse = false;

GameEngine = {

    crtToggle: $('#crt-toggle'),

    /**
     * Start the game engine
     */
    init: () => {
        GameEngine.initializeCLI();
        GameEngine.cli.startCommandListener();
        GameEngine.initalizePlayer();
        GameEngine.lookAction();
    },

    initializeCLI: () => {
        let outputElement = $('.commandline');
        let inputElement = $('input');
        let cliContainer = $('#content-inner');
        GameEngine.cli = new CLI(inputElement,
            outputElement,
            cliContainer);
    },

    initalizePlayer: () => {
        GameEngine.player = new Player();
        GameEngine.player = GameEngine.player.loadPlayerState();

        if (GameEngine.player.gameIsSaved) { GameEngine.cli.output(GameEngine.outputList.saveLoaded); }
    },

    /**
     * Save a current gameState object
     */
    saveGame: () => {

        let currentRoom = GameEngine.getCurrentRoom();

        if (GameEngine.getInvalidSaveLocations().includes(currentRoom)) {
            GameEngine.cli.output("Unable to save here, please move to another location.", undefined, undefined, undefined, 'invalidOutputText');
            return;
        }

        GameEngine.player.savePlayerState();
        GameEngine.cli.output(GameEngine.outputList.gameSaved);
    },

    getInvalidSaveLocations() {
        //These are locations in which saving isn't allowed
        //Examples of these are locations for transitions between scenes, or places where "back" is an available exit
        return ["IkitchenDrawer", "sleep", "IIbeginning", "IIhallwayInsideCompartment", "IIkitchenInsideCabinet", "IIfinale"];
    },

    /**
     * Reset a gameState object
     */
    resetGame: () => {
        GameEngine.player.resetPlayerState();
        GameEngine.cli.output(GameEngine.outputList.gameReset);
    },

    /********* CORE COMMANDS *********/

    // Outputs a help dialog to the player
    printHelp: () => {
        GameEngine.cli.output(GameEngine.outputList.acceptableCommands);
        GameEngine.cli.output(GameEngine.outputList.acceptableCommandList);
    },

    // Function to get an item object from its name
    getItemByName(itemName) {
        // Check if the item exists in the itemObjects dictionary
        if (itemObjects.hasOwnProperty(itemName)) {
            // Retrieve and return the item object using its name
            return itemObjects[itemName];
        } else {
            // If the item does not exist, return null or handle the error accordingly
            return null;
        }
    },

    printInventory: () => {
        let inventory = GameEngine.player.getPlayerInventory();
        let output = '';

        if (inventory === undefined || inventory.length == 0 || (inventory.length == 1 && GameEngine.player.inventory[0][0] == '_')) {
            output += GameEngine.outputList.emptyBag;
        } else {
            output += GameEngine.outputList.bagContains + "<div style=\"font-size: 90%;\">";
            // Iterate through the inventory
            for (let j = 0; j < inventory.length; j++) {
                // Get the item name from the inventory
                const itemName = inventory[j];
                const item = GameEngine.getItemByName(itemName);

                // Check if the item exists in the itemObjects dictionary
                if (item !== undefined && item.name[0] !== '_') {
                    // Append the item's name to the output
                    output += '∗ ' + item.name + '<br/>';
                }
            }

            output += "</div>";
        }

        // Output the accumulated output
        GameEngine.cli.output(output);
    },

    // Sets the output of items and rooms to verbose mode
    setVerboseOutput: () => {
        GameEngine.player.setVerboseMode(true);
        GameEngine.cli.output(GameEngine.outputList.verboseMode);
    },
    // Sets the output of items and rooms to brief mode
    setBriefOutput: () => {
        GameEngine.player.setVerboseMode(false);
        GameEngine.cli.output(GameEngine.outputList.briefMode);
    },

    getCurrentRoom: () => {
        return GameEngine.player.getCurrentLocation();
    },

    getPreviousRoom: () => {
        return GameEngine.player.getPreviousLocation();
    },

    /********* DIRECTIONAL COMMANDS *********/

    lookAction: () => {
        if (GameEngine.player.previousRoom != undefined) {
            var previousRoomName = roomList[GameEngine.player.previousRoom].name;
        }

        let currentRoom = GameEngine.getCurrentRoom();

        console.log(previousRoomName + " | " + roomList[currentRoom].name);

        if (!roomList[currentRoom].roomIsDark) {
            if (previousRoomName != roomList[currentRoom].name) {
                GameEngine.cli.clearAvailableExits();
                GameEngine.cli.output(horizontalSeparator + horizontalSeparator + "<strong>" + roomList[currentRoom].name + "</strong>" + horizontalSeparator + horizontalSeparator);
            }
            else {
                GameEngine.cli.clearAvailableExits();
                GameEngine.cli.output(horizontalSeparator);
            }

            //If the game is in verbose mode OR the room hasn't yet been visited
            if (GameEngine.player.getVerboseMode() || (!roomList[currentRoom].visited && !GameEngine.player.visitedRooms.includes(currentRoom))) {
                GameEngine.cli.output(roomList[currentRoom].firstLook, 1, currentRoom !== 'start', true);

                if (roomList[currentRoom].givesItems.length >= 0) {
                    for (var k = 0; k < roomList[currentRoom].givesItems.length; k++) {

                        if (GameEngine.player.inventory.includes(roomList[currentRoom].givesItems[k]) === false) {
                            GameEngine.player.addToInventory(roomList[currentRoom].givesItems[k]);
                            console.log("Room gave item: " + roomList[currentRoom].givesItems[k]);
                        }
                    }
                }
            }
            else {
                GameEngine.cli.output(roomList[currentRoom].look, 1, currentRoom !== 'start', true);
            }

            roomList[currentRoom].visited = true; // Mark the room as visited
            GameEngine.player.addVisitedRoom(currentRoom);
        }
        else if (roomList[currentRoom].roomIsDark && !lantern.itemInUse) {
            if (previousRoomName != roomList[currentRoom].name) {
                GameEngine.cli.clearAvailableExits();
                GameEngine.cli.output(horizontalSeparator + horizontalSeparator + "<strong>" + roomList[currentRoom].darkText + "</strong>" + horizontalSeparator + horizontalSeparator);
            } else {
                GameEngine.cli.clearAvailableExits();
                GameEngine.cli.output(horizontalSeparator);
            }
        }
        else if (roomList[currentRoom].roomIsDark && lantern.itemInUse) {
            if (previousRoomName != roomList[currentRoom].name) {
                GameEngine.cli.clearAvailableExits();
                GameEngine.cli.output(horizontalSeparator + horizontalSeparator + "<strong>" + roomList[currentRoom].name + "</strong>" + horizontalSeparator + horizontalSeparator);
            } else {
                GameEngine.cli.clearAvailableExits();
                GameEngine.cli.output(horizontalSeparator);
            }

            //If the game is in verbose mode OR the room hasn't yet been visited
            if (GameEngine.player.getVerboseMode() || !roomList[currentRoom].visited) {
                GameEngine.cli.output(roomList[currentRoom].firstLook, 1, currentRoom !== 'start', true);
            }
            else {
                GameEngine.cli.output(roomList[currentRoom].look, 1, currentRoom !== 'start', true);
            }
        }
    },

    showItems: (room) => {
        var itemlist = [];

        for (var i = 0; i < room.items.length; i++) {

            console.log(room.items[i].name + " | " + room.items[i].taken);

            if (!room.items[i].taken && !GameEngine.player.inventory.includes(room.items[i].varString)) { // Check if the item is not taken
                if (room.items[i].specialdesc) {
                    GameEngine.cli.output(room.items[i].specialdesc, undefined, undefined, undefined, 'availableItemsText');
                } else {
                    itemlist.push(room.items[i].description);
                }
            }
        }

        if (itemlist.length === 1) {
            GameEngine.cli.output("There is a " + itemlist[0] + " here.", undefined, undefined, undefined, 'availableItemsText');
        } else if (itemlist.length > 1) {
            var str = "";
            for (var i = 0; i < itemlist.length; i++) {
                if (!itemlist[i + 1]) {
                    str += itemlist[i];
                } else {
                    str += itemlist[i] + ", ";
                }
            }
            GameEngine.cli.output("There is a " + str + " here.", undefined, undefined, undefined, 'availableItemsText');
        }
    },

    "goAction": (direction) => {
        let currentRoom = GameEngine.getCurrentRoom();
        let lDirection = direction.toLowerCase();

        // Check if the direction is valid
        if (currentRoom === 'start' && lDirection === 'startgame') {
            GameEngine.cli.clearScreen();
            GameEngine.currentRoom = 'Icorridor';
        }

        // Check if the direction is valid
        if (currentRoom === 'Ibedroom' && lDirection === 'sleep') {
            GameEngine.cli.clearScreen();
            GameEngine.currentRoom = 'sleep';
            GameEngine.player.currentRoom = 'sleep';
            GameEngine.player.setPreviousLocation(undefined);
        }

        // Check if the direction is valid
        if (currentRoom === 'sleep' && lDirection === 'sleep') {
            GameEngine.cli.clearScreen();
            GameEngine.currentRoom = 'IIbeginning';
            GameEngine.player.currentRoom = 'IIbeginning';
            GameEngine.player.setPreviousLocation(undefined);
        }

        // Check if the direction is valid
        if (currentRoom === 'IIentrance' && lDirection === 'awaken') {
            if (GameEngine.canFinishGame() == true) {
                /*GameEngine.cli.clearScreen();
                GameEngine.currentRoom = 'IIfinale';
                GameEngine.player.currentRoom = 'IIfinale';
                GameEngine.player.setPreviousLocation(undefined);*/

                GameEngine.cli.playFinale();
                return;
            }
        }

        if (lDirection === "back") {
            // Move the player back to the previous room
            let previousRoom = GameEngine.player.getPreviousLocation();
            if (previousRoom) {
                // Set the current room to the previous room
                GameEngine.player.setPreviousLocation(currentRoom); // Update previous room to the current room
                GameEngine.player.setCurrentLocation(previousRoom); // Set current room to the previous room
                currentRoom = GameEngine.getCurrentRoom(); // Get the current room

                // Display the description of the new room
                if (GameEngine.player.getVerboseMode()) {
                    if (roomList[currentRoom].visited || GameEngine.player.visitedRooms.includes(currentRoom)) {
                        GameEngine.cli.clearAvailableExits();
                        GameEngine.cli.output("<strong>" + roomList[currentRoom].name + "</strong>");
                        GameEngine.showItems(roomList[currentRoom]);
                    } else {
                        GameEngine.lookAction();
                        roomList[currentRoom].visited = true;
                        GameEngine.player.addVisitedRoom(currentRoom);
                    }
                } else {
                    GameEngine.lookAction();
                    roomList[currentRoom].visited = true;
                    GameEngine.player.addVisitedRoom(currentRoom);
                }
            } else {
                // Handle case where there's no previous room (maybe display a message)
                GameEngine.cli.clearLastCommandOutput();
                GameEngine.cli.output("There is no previous room to go back to.", undefined, undefined, undefined, 'invalidOutputText');
            }
        } else {

            if (currentRoom == 'sleep') {
                return;
            }

            // Check if the direction is valid for the current room
            if (roomList[currentRoom][lDirection] === undefined) {

                if (currentRoom == 'Ibedroom' && lDirection == 'sleep') {
                    GameEngine.cli.output("⦙⍭⧶⌥⌇⩪⁰²⎩₇₃⨜²²⎎₀₉⑇⁷³⏦₈₄⁖⁰⁴⤳₃₁⦧⁰⁴");
                    GameEngine.cli.clearLastCommandOutput();
                    return;
                }

                GameEngine.cli.output(GameEngine.outputList.invalidDirection, undefined, undefined, undefined, 'invalidOutputText');
                GameEngine.cli.clearLastCommandOutput();
                return;
            }

            // Check if the room requires any items to enter
            let nextRoom = roomList[currentRoom][lDirection];
            if (nextRoom.requiredItems.length > 0) {
                // Check if the player has all the required items
                let hasRequiredItems = nextRoom.requiredItems.every(item => GameEngine.player.inventory.includes(item));
                if (!hasRequiredItems) {
                    // Display a message indicating that the room is locked
                    GameEngine.cli.clearAvailableExits();
                    if (nextRoom.locked === "") {
                        GameEngine.cli.output(horizontalSeparator + "The room is locked. You need certain items to enter." + horizontalSeparator, undefined, true);
                    }
                    else {
                        GameEngine.cli.output(horizontalSeparator + nextRoom.locked + horizontalSeparator, undefined, true);
                    }

                    return;
                }
            }

            // Move to the next room
            if (currentRoom !== 'start') {
                GameEngine.player.setPreviousLocation(currentRoom);
            }

            // Move to the next room
            if (currentRoom == 'sleep' || currentRoom == 'IIbeginning') {
                GameEngine.player.setPreviousLocation(undefined);
            }

            if (firstTimeInDreamHouse && currentRoom == 'IIentrance') {
                GameEngine.player.setPreviousLocation(undefined);
                firstTimeInDreamHouse = true;
            }

            GameEngine.player.setCurrentLocation(nextRoom.varName);
            currentRoom = GameEngine.getCurrentRoom();

            // Display the description of the new room
            if (GameEngine.player.getVerboseMode()) {
                if (roomList[currentRoom].visited || GameEngine.player.visitedRooms.includes(currentRoom)) {
                    GameEngine.cli.output("<strong>" + roomList[currentRoom].name + "</strong>");
                    GameEngine.showItems(roomList[currentRoom]);
                } else {
                    GameEngine.lookAction();
                    roomList[currentRoom].visited = true;
                    GameEngine.player.addVisitedRoom(currentRoom);
                }
            } else {
                GameEngine.lookAction();
                roomList[currentRoom].visited = true;
                GameEngine.player.addVisitedRoom(currentRoom);
            }
        }
    },

    openAction: (direction) => {

        if (direction == "EGG") {
            GameEngine.useAction("EGG");
            return;
        }

        let currentRoom = GameEngine.getCurrentRoom();

        if (roomList[currentRoom]["open"] === undefined || !roomList[currentRoom]["open"]) {
            GameEngine.cli.clearLastCommandOutput();
            GameEngine.cli.output(GameEngine.outputList.notOpenable);
        }
        else {

            // console.log("**GameEngine: Opening room");
            GameEngine.player.setPreviousLocation(roomList[currentRoom].varName);
            GameEngine.player.setCurrentLocation(roomList[currentRoom]["open"].varName);
            currentRoom = GameEngine.getCurrentRoom();

            if (GameEngine.player.getVerboseMode()) {
                if (currentRoom.visited || GameEngine.player.visitedRooms.includes(currentRoom)) {
                    GameEngine.cli.output("<strong>" + roomList[currentRoom].name + "</strong>");
                    GameEngine.showItems(roomList[currentRoom]);
                }
                else {
                    GameEngine.lookAction();
                    roomList[currentRoom].visited = true;
                    GameEngine.player.addVisitedRoom(currentRoom);
                }
            }

            else {
                GameEngine.lookAction();
                roomList[currentRoom].visited = true;
                GameEngine.player.addVisitedRoom(currentRoom);
            }
        }
    },

    takeAction: (item) => {

        let lItem = item.toLowerCase();
        let itemObject = itemObjects[lItem];
        let currentRoom = GameEngine.getCurrentRoom();

        if (!roomList[currentRoom].items.includes(itemObject)) {
            GameEngine.cli.clearLastCommandOutput();
            GameEngine.cli.output("A " + lItem + " does not exist here.", undefined, undefined, undefined, 'invalidOutputText');
            return;
        }

        if (itemObject.canBeTaken == false) {
            GameEngine.cli.clearLastCommandOutput();
            GameEngine.cli.output("The " + lItem + " can't be taken.", undefined, undefined, undefined, 'invalidOutputText');
            return;
        }

        if (GameEngine.player.inventory.includes(lItem)) {
            GameEngine.cli.clearLastCommandOutput();
            GameEngine.cli.output("The " + lItem + " is already in your bag.", undefined, undefined, undefined, 'invalidOutputText');
            return;
        }

        GameEngine.player.addToInventory(lItem);
        itemObject.taken = true;

        var itemTakeDescription = itemObject.takeDesc;

        if (itemTakeDescription == "") {
            GameEngine.cli.output(horizontalSeparator);
            GameEngine.cli.output("You put the " + lItem + " in your bag." + "<br/><br/>" + horizontalSeparator, 1, true);
        }
        else {
            GameEngine.cli.output(horizontalSeparator);
            GameEngine.cli.output(itemTakeDescription + "<br/><br/>" + horizontalSeparator, itemObject.takeDescSpeed, true);
        }

    },

    readAction: (item) => {
        let lItem = item.toLowerCase();
        let itemObject = itemObjects[lItem];

        if (!GameEngine.player.inventory.includes(lItem)) {
            GameEngine.cli.output("You don't own a " + lItem + " to read.", undefined, undefined, undefined, 'invalidOutputText');
            return;
        }

        if (!itemObject.actionArray.includes("read")) {
            GameEngine.cli.clearLastCommandOutput();
            GameEngine.cli.output(GameEngine.outputList.notReadable);
            return;
        }

        GameEngine.cli.output(itemObject.contents);
    },

    useAction: (item) => {

        if (!item) {
            GameEngine.cli.clearLastCommandOutput();
            GameEngine.cli.output(GameEngine.outputList.notUseable);
        }

        let lItem = item.toLowerCase();

        if (!GameEngine.player.getPlayerInventory().includes(lItem)) {
            GameEngine.cli.output("You don't have a " + lItem + " to use!", undefined, undefined, undefined, 'invalidOutputText');
        }

        if (itemObjects[lItem].inUse) {
            GameEngine.cli.output(GameEngine.outputList.alreadyInUse);
            itemObjects[lItem].inUse = false;
            GameEngine.lookAction();
        } else {
            if (lItem == "egg") {
                GameEngine.cli.output("<strong>" + itemObjects[lItem].openDesc + "</strong>");
                if (GameEngine.getCurrentRoom() == "tree") {
                    GameEngine.goAction("back");
                    return;
                }
            } else {
                GameEngine.cli.output("<strong>" + itemObjects[lItem].useDesc + "</strong>");
            }
            itemObjects[lItem].inUse = true;
            GameEngine.lookAction();
        }

    },

    canFinishGame() {
        return GameEngine.player.inventory.includes("card");
    },

    outputList: {
        saveLoaded: "<strong>Game loaded from a previous save.</strong>",
        gameSaved: "<strong>Your game state has been saved.</strong>",
        gameReset: "<strong>Your game state has been reset.</strong>",
        emptyBag: "There is nothing in your bag!",
        bagContains: "Your bag contains:",
        acceptableCommands: "Here is a list of acceptable commands:",

        acceptableCommandList: "> <i>go [direction]</i> or <i>[direction]</i><br/>" +
            "> <i>look [item in your inventory]</i><br/>" +
            "> <i>open [item]</i><br/>" +
            "> <i>climb [item]</i><br/>" +
            "> <i>brief</i>: Use shorter descriptions for rooms you've already visited<br/>" +
            "> <i>verbose</i>: Always use long room descriptions<br/>" +
            "> <i>help</i>: Show this list of commands'<br/>" +
            "> <i>take [item name]</i>: Take the specified item<br/>" +
            "> <i>bag</i>: Check your inventory<br/>" +
            "> <i>save</i>: Save your game progress<br/>" +
            "> <i>reset</i>: Reset game progress (restart the game story)",

        verboseMode: "Long descriptions of locations will be given, even if you've been there before.",
        briefMode: "Long descriptions of places never before visited, and short descriptions otherwise.",
        invalidDirection: "You can't go that way.",
        notOpenable: "You can't open that.",
        notUseable: "Use what?",
        alreadyInUse: "The item is already in use. Putting item away.",
        notReadable: "You can't read that."
    },

}

$(window).on('load', function () {
    GameEngine.init();
})