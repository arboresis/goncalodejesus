isMobileDevice = false;

var isExecuting = false;
var queuedOutput = "";
var charactersPerTextTick = 1;

playerInterruptedScroll = false;
detectScroll = true;

var dreamsToShow = 3;
var hasShownDreams = false;

var playerDream = "";

/**
 * CLI Service Class
 */
class CLI {
    /**
     * 
     * @param {element} inputElement The input element 
     * @param {element} outputElement The output element
     * @param {element} cliContainer The cli containing element
     */
    constructor(inputElement, outputElement, cliContainer) {
        this.isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.playerInterruptedScroll = false;
        this.detectScroll = true;
        this.inputElement = inputElement;
        this.outputElement = outputElement;
        this.outputStack = [];
        this.cliContainer = cliContainer;
        this.allowedVerbs = [
            "GO",
            "MOVE",
            "WALK",
            "TRAVEL",
            "JOURNEY",
            "RUN",
            "SPRINT",
            "ROAM",
            "EXPLORE",
            "RELOCATE",

            "LOOK",
            "EXAMINE",
            "OBSERVE",
            "SCAN",
            "SURVEY",
            "SEE",
            "VIEW",
            "WATCH",
            "INSPECT",

            "TAKE",
            "PICK",
            "PICK UP",
            "GRAB",
            "COLLECT",
            "SNATCH",

            "RETURN",

            "OPEN",
            "UNLOCK",

            "ENTER",
            "ACCESS",
            "STEP INTO",
            "STEP INSIDE",
            "COME IN",
            "COME INTO",

            "INVENTORY",
            "ITEMS",
            "BELONGINGS",
            "POSSESSIONS",

            "BAG",
            "SACK",
            "POUCH",

            "HELP",
            "TUTORIAL",
            "COMMANDS",

            "USE",
            "UTILIZE",

            "NORTH",
            "NORTHWEST",
            "NORTHEAST",

            "SOUTH",
            "SOUTHWEST",
            "SOUTHEAST",

            "WEST",

            "EAST",

            "UP",
            "ASCEND",
            "CLIMB",

            "DOWN",
            "DESCEND",
            "LOWER",

            "SAVE",
            "SAVEGAME",

            "RESET",
            "RESTART",

            "BRIEF",

            "VERBOSE",

            "READ",
            "PERUSE",
            "SKIM",
            "CONSULT",

            "BACK",

            "STATE",

            "PLAY", "SLEEP", "DREAM", "AWAKEN",

            "MAILBOX", "RUG", "CARPET", "MAT", "FLOOR COVERING"
        ];

        this.synonyms = {
            "GO": ["MOVE", "WALK", "TRAVEL", "JOURNEY", "RUN", "SPRINT", "ROAM", "EXPLORE", "RELOCATE"],
            "LOOK": ["EXAMINE", "OBSERVE", "SCAN", "SURVEY", "SEE", "VIEW", "WATCH", "INSPECT"],
            "TAKE": ["PICK", "PICK UP", "GRAB", "COLLECT", "SNATCH"],
            "OPEN": ["UNLOCK"],
            "ENTER": ["ACCESS", "STEP INTO", "STEP INSIDE", "COME IN", "COME INTO"],
            "INVENTORY": ["ITEMS", "BELONGINGS", "POSSESSIONS"],
            "BAG": ["SACK", "POUCH"],
            "HELP": ["TUTORIAL", "COMMANDS"],
            "USE": ["UTILIZE"],
            "UP": ["ASCEND", "CLIMB"],
            "DOWN": ["DESCEND", "LOWER"],
            "SAVE": ["SAVEGAME"],
            "RESET": ["RESTART"],
            "READ": ["PERUSE", "SKIM", "CONSULT"],
        };

        this.openableInstances = [
            "WINDOW", "DOOR", "TRAPDOOR", "TRAP", "TREE", "KITCHEN",
            "CHIMNEY",
        ];

        this.output('Hello there, stranger! I\'m <b>Gonçalo de Jesus</b>, a <b>Narrative and Game Designer, Writer, and Game Developer</b>.<br/><br/>'
            + 'Make yourself at home in my little corner of the internet, where I hope you\'ll have a wonderful and inspiring stay.<br/>'
            + 'In the top bar, you can find various tabs with information about me.<br/><br/>'
            + '<div style="padding-left: 2%; padding-bottom:12px; line-height: 100%"><b><i>┉Gonçalo de⠀Jesus</i></b></a> will bring you back here.</div>'
            + '<div style="padding-left: 4%; padding-bottom:12px; line-height: 100%">If you\'re interested in my professional background, feel free to browse through my <a href="GoncalodeJesus_CV.pdf" target="_blank" style="color: #000; white-space: nowrap;"><b><i>⌯ CV</i></b></a>.</div>'
            + '<div style="padding-left: 6%; padding-bottom:12px; line-height: 100%">Bring up my <a href="portfoliopage.html" target="_blank" style="color: #000; white-space: nowrap;"><b><i>⪤ Portfolio</i></b></a> if you\'re interested in work samples and projects I\'ve worked on before.</div>'
            + '<div style="padding-left: 8%; padding-bottom:12px; line-height: 100%">To know what I\'m familiar with in my daily work, give <a href="skillspage.html" target="_blank" style="color: #000; white-space: nowrap;"><b><i>⑇ Skills</i></b></a> a look.</div>'
            + '<div style="padding-left: 10%;padding-bottom:12px; line-height: 100%">Should you like what you see, you can reach out to me at the <a href="contactform.html" target="_blank" style="color: #000; white-space: nowrap;"><b><i>⨬ Contact</i></b></a> tab.</div>'
            + '<div style="padding-left: 12%;padding-bottom:12px; line-height: 100%">You can toggle <b><i>Screen Effects</i></b> with the button on the right.</div><br/>'
            + '<div class="vertical-text-divider"></div><br/>', 5, undefined, undefined, undefined, 'intro-text');

        this.output('<b>Welcome to <i>An Interdimensional Ode to the Oresis Tree</i>!</b><br/>'
            + '<div style = "font-size: 70%"><i>Implementation based on Zork, by Dillon Lomnitzer; itself a reiteration of Josh Stevens\'.<br/>'
            + 'Original Zork game & copy | 1981, 1982, 1983 Infocom Inc. All rights reserved.</i></div>', 5, undefined, undefined, undefined, 'intro-text');

        this.output('If you\'re on a <b>tight schedule</b>, feel free to check out the <b>other sections for quick summaries</b> of my professional path so far.<br/>'
            + '<b>If you have time</b> to spare, <b>sit back and enjoy</b> this short game where you\'ll explore my personal journey through life!<span style=\"font-size: 75%;\"><br/><br/>If you need any help, enter the <b>\"help\"</b> command.<br/>Don\'t forget to <b>\"save\"</b> if you\'d like to continue your progress another time.<br/>This game uses <b>auto-scroll</b>. You can <b>scroll up when text is being presented</b> to pause auto-scrolling.</span><br/><br/>'
            + '<div class="vertical-text-divider"></div><br/>', 5, undefined, undefined, undefined, 'intro-text');
    }

    /**
     * Add event listener for input commands
     */
    startCommandListener() {
        this.inputElement.on('keypress', (event) => {
            if (event.which === 13) {
                if (document.getElementsByClassName("commandline")[0].style.display != 'none') {
                    this.submitCommand();
                    this.scrollDown();
                }

                if (document.getElementsByClassName("dreamcommandline")[0].style.display != 'none') {
                    this.submitDream();
                    this.scrollDown();
                }
            }
        });

        let lastScrollTop = 0;

        document.addEventListener("scroll", (event) => {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (this.detectScroll && scrollTop < lastScrollTop) {
                console.log("Set playerInterruptedScroll to true!");
                this.playerInterruptedScroll = true;
            }
            /*else if (isExecuting && scrollTop >= (document.documentElement.scrollHeight - window.innerHeight)) {
                console.log("SCROLLED TO BOTTOM!");
                this.playerInterruptedScroll = false;
            }*/

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });


        window.onkeypress = function (e) {
            //Speed up the text writing
            this.charactersPerTextTick = 500;
        }
    }

    /**
     * Receive, parse and return valid commands
     * 
     * @returns {array}
     */
    submitCommand() {
        if (this.inputElement.val() === "") {
            return;
        }

        console.log("Resetting playerInterruptedScroll");
        this.playerInterruptedScroll = false;

        // Get command input
        let cmd = this.inputElement.val();
        // Drop command to lower case
        // This function is easier to implement and still runs in O(n)
        cmd = cmd.toUpperCase();

        console.log("User input: " + cmd);

        if (cmd === 'PLAY') {

            if (GameEngine.player.getCurrentLocation() === 'start') {
                this.executeCommand('PLAY', 'startGame');
            }
            else {
                this.invalidCommand();
            }
            return;
        }

        if (cmd === 'SLEEP') {
            if (GameEngine.player.getCurrentLocation() === 'Ibedroom') {
                this.executeCommand('GO', 'sleep');
            }
            else {
                this.invalidCommand();
            }
            return;
        }

        if (cmd === 'DREAM') {
            if (GameEngine.player.getCurrentLocation() === 'sleep') {
                this.executeCommand('GO', 'dream');
            }
            else {
                this.invalidCommand();
            }
            return;
        }

        // Define a list of prepositions to ignore
        let prepositions = ['THE', 'AT', 'TO', 'IN', 'ON', 'UNDER', 'WITH', 'FROM', 'INTO', 'UPON', 'BY', 'FOR', 'ABOUT', 'THROUGH', 'OVER', 'BEHIND', 'ACROSS', 'BENEATH', 'AROUND', 'NEAR', 'AGAINST'];

        // Remove prepositions from the command
        let cmdWithoutPrepositions = cmd.split(' ').filter(word => !prepositions.includes(word)).join(' ');

        // Split any words separated by a space into array parts.
        // This function is based off the similar python implementation.
        let cmdParts = cmdWithoutPrepositions.split(/(\s+)/).filter(e => e.trim().length > 0);

        // Extract the verb from the first part of the command
        let verb = cmdParts[0];

        // Check if the verb is a synonym, if so, replace it with the main verb
        let mainVerb = Object.keys(this.synonyms).find(mainVerb => {
            return this.synonyms[mainVerb].includes(verb);
        });

        // If a main verb is found, replace the verb with it
        if (mainVerb) {
            verb = mainVerb;
        }

        // Validate the modified command
        if (!this.validateCommand(verb)) {
            this.invalidCommand();
            $('input').val('');
            return;
        }

        // Command is valid
        $('input').val('');

        // Extract command argument (if any)
        let commandArgument = (cmdParts[1]) ? cmdParts[1] : null;

        // Execute the command with the modified verb
        this.executeCommand(verb, commandArgument);

        //Halt the detection of manual scrolls, until the text starts being written
        this.haltScrollDetection(500);
    }

    haltScrollDetection(delayMs) {
        this.detectScroll = false;
        this.playerInterruptedScroll = false;

        setTimeout(() => {
            this.detectScroll = true;
        }, delayMs);
    }

    /**
     * Validate that the parameter CMD is within the
     * allowed verbs array.
     * 
     * @param {string} cmd The input command
     * @returns {bool}
     */
    validateCommand(cmd) {
        if (this.allowedVerbs.includes(cmd) ||
            itemArray.includes(cmd.toLowerCase()) ||
            this.openableInstances.includes(cmd)
        ) {
            return true;
        }
        return false;
    }

    /**
     * Outputs an invalid command statement
     */
    invalidCommand() {
        this.output("Oh no, that doesn't look right!", undefined, undefined, undefined, 'invalidOutputText');
    }

    unclimbableCommand() {
        this.output("Doesn't seem like you can climb that.", undefined, undefined, undefined, 'invalidOutputText');
    }

    unopenableCommand() {
        this.output("Doesn't seem like you can open that.", undefined, undefined, undefined, 'invalidOutputText');
    }

    /**
     * Prints output strings to the DOM CLI
     * 
     * @param {string} output The output 
     */
    output(output, charactersPerUpdate = 1, outputAvailableExits = false, outputAvailableItems = false, outputElementTag = 'descriptiveText', outputElementId = 'game-text', endWithLineBreak = true, showCommandLineAtEnd = true, showDreamCommandLineAtEnd = false) {
        this.outputStack.push({ output, charactersPerUpdate, outputAvailableExits, outputAvailableItems, outputElementTag, outputElementId, endWithLineBreak, showCommandLineAtEnd, showDreamCommandLineAtEnd });

        if (!isExecuting) {
            this.executeOutput();
        }

        if (outputAvailableItems) {
            GameEngine.showItems(roomList[GameEngine.player.currentRoom]);
        }
    }

    /**
     * Prints output strings to the DOM CLI
     */
    executeOutput() {
        if (this.outputStack.length === 0 || isExecuting) {
            return; // Nothing to execute or already executing
        }

        isExecuting = true; // Set flag to indicate execution is in progress

        const { output, charactersPerUpdate, outputAvailableExits, outputAvailableItems, outputElementTag, outputElementId, endWithLineBreak, showCommandLineAtEnd, showDreamCommandLineAtEnd } = this.outputStack.shift();

        console.log("Showing text: " + output);

        queuedOutput = output;
        charactersPerTextTick = charactersPerUpdate;

        charactersPerTextTick *= 2;

        document.getElementsByClassName("commandline")[0].style.display = 'none';
        document.getElementsByClassName("dreamcommandline")[0].style.display = 'none';

        let index = 0;
        let text = '';

        // Create a new text node
        const newText = document.createElement(outputElementTag);

        if (outputElementTag !== 'aiotot-title') {
            newText.id = outputElementId;
            newText.style = "user-select: none;";
        }
        else {
            newText.style = "justify-self: center;";
        }

        // Insert the new text node before the outputElement
        this.outputElement.before(newText, this.outputElement);

        const displayInterval = setInterval(() => {
            for (let i = 0; i < charactersPerTextTick; i++) {
                if (queuedOutput[index] === "<") {
                    // Find the end of the HTML tag
                    const endIndex = queuedOutput.indexOf(">", index + 1);
                    if (endIndex !== -1) {
                        var tag = queuedOutput.substring(index, endIndex + 1);
                        text += tag;

                        index = endIndex;
                    }
                } else {
                    text += queuedOutput[index];
                }

                index++;

                // Break if all characters are displayed
                if (index === queuedOutput.length) {
                    clearInterval(displayInterval);
                    // Trigger the next action after text is fully displayed
                    // This could be a callback function or other logic

                    if (endWithLineBreak) {
                        const lineBreaks = document.createElement(outputElementTag);
                        lineBreaks.innerHTML = "<br>";

                        this.outputElement.before(lineBreaks, this.outputElement);
                    }

                    if (showCommandLineAtEnd) {
                        document.getElementById("user_in").value = '';
                        document.getElementsByClassName("commandline")[0].style.display = 'inline-grid';
                        if (this.outputStack.length === 0 && this.isMobileDevice == false && this.playerInterruptedScroll == false) {
                            document.getElementById("user_in").focus();
                        }
                    }

                    if (showDreamCommandLineAtEnd) {
                        document.getElementById("dreamuser_in").value = '';
                        document.getElementsByClassName("dreamcommandline")[0].style.display = 'inline-grid';
                        if (this.outputStack.length === 0 && this.isMobileDevice == false && this.playerInterruptedScroll == false) {
                            document.getElementById("dreamuser_in").focus();
                        }
                    }

                    if (outputElementTag !== 'aiotot-title') {
                        newText.style = "user-select: initial;";
                    }

                    // Set isExecuting to false to indicate that the function has finished executing
                    isExecuting = false;

                    // If there is queued output, execute the function again with the queued output
                    if (this.outputStack.length > 0) {
                        this.executeOutput();
                    } else {
                        queuedOutput = ""; // Clear queued output
                    }

                    break;
                }
            }

            // Update the text of the new text node
            newText.innerHTML = text;

            if (this.playerInterruptedScroll == false) {
                this.scrollDown();
            }
        }, 1);

        // If the available exits should be shown, output them
        if (outputAvailableExits === true) {
            this.output(this.outputAvailableRooms(), undefined, undefined, undefined, 'availableExitsText');
        }

        if (GameEngine.player != undefined && hasShownDreams == false && GameEngine.player.currentRoom === "sleep") {
            this.showDreams();
        }
    }

    showDreams() {
        const dreamReader = new DreamReader('assets/js/dreams.json');
        dreamReader.readData(() => {
            const { dreams, names } = dreamReader.getDreamsAndNames(dreamsToShow, dreamsToShow);
            hasShownDreams = true;
            console.log('Random Dreams:', dreams);
            console.log('Random Names:', names);

            this.output("You lay your head on the ergonomic pillow, grab a blanket and cover yourself. In no time, you feel yourself drifting asleep.<br/><br/>Dreams come in all shapes and sizes.");

            for (var d = 0; d < dreamsToShow; d++) {
                this.output(this.getRandomDreamSentence(names[d], this.toSentenceCase(dreams[d])));
            }

            this.output(dreamReader.arboresis + "'s dreams? Like several others, he's got too many to count, really. " + dreamReader.arboresisDream);
            this.output("<div class=\"vertical-text-divider\"></div>");

            this.executeCommand('GO', 'sleep', true);

            this.output(roomList['IIbeginning'].firstLook, undefined, true);
        });
    }

    getRandomDreamSentence(name, dream) {
        const genericSentences = [
            `${name} dreams <i>${dream}</i>.`,
            `${name}'s dream? <i>${dream}</i>.`,
            `${name}'s dream is <i>${dream}</i>.`,
            `${name}'s aspirations are <i>${dream}</i>.`
        ];

        const randomIndex = Math.floor(Math.random() * genericSentences.length);
        return genericSentences[randomIndex];
    }

    toSentenceCase(inputString) {
        // Split the input string into an array of sentences
        var sentences = inputString.split(/(?<=\.|\?|\!)\s+/);

        // Convert each sentence to sentence case
        var sentenceCaseSentences = sentences.map(function (sentence) {
            // Convert the first character to uppercase and the rest to lowercase
            return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
        });

        // Join the sentences back into a single string
        return sentenceCaseSentences.join(' ');
    }

    getRooms() {
        for (const roomKey in roomList) {
            if (roomList.hasOwnProperty(roomKey)) {
                const room = roomList[roomKey];
                console.log(`Room: ${room.name}`);
                console.log(`Description: ${room.look}`);
            }
        }
    }

    outputAvailableRooms() {

        //Make sure that here's no other available room information visible
        this.clearAvailableExits();

        // Get the current room object based on the player's current location
        const currentRoom = roomList[GameEngine.player.getCurrentLocation()];

        var exitList = "<br/><div style=\"font-size: 75%;\"><i>";

        console.log("Existing exits:");
        for (const direction in currentRoom.exits) {
            if (currentRoom.exits.hasOwnProperty(direction)) {

                var directionIndicator;

                switch (direction) {
                    case "down":
                        directionIndicator = 'You can <b>descend</b> to return to the ' + currentRoom.exits[direction].name + ".";
                        break;
                    case "climb":
                        directionIndicator = 'There\'s something around here you can <b>climb</b>, too.';
                        break;
                    case "open":
                        directionIndicator = 'There seems to be something around you can <b>open</b>, too.';
                        break;
                    case "back":
                        directionIndicator = 'You can go <b>back</b> to ' + currentRoom.exits[direction].name + ".";
                        break;
                    case "sleep":
                        directionIndicator = "<b>Sleep</b> to let your dreams tell the rest of the story.";
                        break;
                    case "awaken":

                        if (GameEngine.canFinishGame() == false) {
                            directionIndicator = "";
                        }
                        else {
                            directionIndicator = "<b>Awaken</b> to go back to writing your own story.";
                        }


                        break;
                    default:
                        directionIndicator = this.getRandomExitSentence(direction, currentRoom.exits[direction].name);
                        break;
                }

                exitList += (directionIndicator + "<br/>");
                console.log(directionIndicator);
            }
        }

        exitList = exitList.substring(0, exitList.length - 5);
        exitList += "</i></div>";

        return exitList;
    }

    getRandomExitSentence(direction, roomName) {
        const genericSentences = [
            `Going <b>${direction}</b> will lead to the ${roomName}.`,
            `You can go <b>${direction}</b> to reach the ${roomName}.`,
            `Heading <b>${direction}</b> will lead you to the ${roomName}.`,
            `Venturing towards <b>${direction}</b> will lead you to the ${roomName}.`,
            `Exploring <b>${direction}</b> will lead you to the ${roomName}.`,
            `If you go <b>${direction}</b>, you'll find the ${roomName}.`,
            `The ${roomName} sits to your <b>${direction}</b>.`,
            `The ${roomName} can be found to your <b>${direction}</b>.`,
            `You look to the <b>${direction}</b>, and find the ${roomName}.`,
            `You search <b>${direction}</b>, where you find the ${roomName}.`,
            `If you venture <b>${direction}</b>, you'll find yourself at the ${roomName}.`,
            `To your <b>${direction}</b>, the ${roomName}.`,
            `To the <b>${direction}</b>, the ${roomName}.`,
            `Sitting to your <b>${direction}</b>, the ${roomName}.`
        ];

        const randomIndex = Math.floor(Math.random() * genericSentences.length);
        return genericSentences[randomIndex];
    }


    clearScreen() {
        this.clearElementsOfTag("descriptiveText");
        this.clearElementsOfTag("invalidOutputText");
        this.clearElementsOfTag("givenCommandOutputText");
        this.clearElementsOfTag("availableItemsText");
        this.clearElementsOfTag("availableExitsText");
    }

    clearAvailableExits() {
        this.clearElementsOfTag("availableExitsText");
        this.clearElementsOfTag("invalidOutputText");
    }

    clearElementsOfTag(tag) {
        var textElements = document.getElementsByTagName(tag);

        while (textElements.length > 0) {
            textElements[0].remove();
        }
    }

    /**
     * Scrolls the CLI Container down when a command is submitted
     */
    scrollDown() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    /**
     * Receives a command and determine the output function
     * 
     * @param {string} cmd The command
     * @param {string|null} arg The command arguments ( if any )
     */
    executeCommand(cmd, arg = null, forceNoLogging = false) {

        var verbMap = {
            "GO": GameEngine.goAction,

            "LOOK": GameEngine.lookAction,

            "TAKE": GameEngine.takeAction,
            "PICK": GameEngine.takeAction,
            "PICK UP": GameEngine.takeAction,
            "GRAB": GameEngine.takeAction,
            "COLLECT": GameEngine.takeAction,
            "SNATCH": GameEngine.takeAction,

            "RETURN": GameEngine.goAction,

            "OPEN": GameEngine.openAction,
            "UNLOCK": GameEngine.openAction,

            "ENTER": GameEngine.goAction,
            "ACCESS": GameEngine.goAction,
            "STEP INTO": GameEngine.goAction,
            "STEP INSIDE": GameEngine.goAction,
            "COME IN": GameEngine.goAction,
            "COME INTO": GameEngine.goAction,

            "INVENTORY": GameEngine.printInventory,
            "ITEMS": GameEngine.printInventory,
            "BELONGINGS": GameEngine.printInventory,
            "POSSESSIONS": GameEngine.printInventory,

            "BAG": GameEngine.printInventory,
            "SACK": GameEngine.printInventory,
            "POUCH": GameEngine.printInventory,

            "HELP": GameEngine.printHelp,
            "TUTORIAL": GameEngine.printHelp,

            "USE": GameEngine.useAction,
            "UTILIZE": GameEngine.useAction,

            "NORTH": GameEngine.goAction,
            "NORTHWEST": GameEngine.goAction,
            "NORTHEAST": GameEngine.goAction,

            "SOUTH": GameEngine.goAction,
            "SOUTHWEST": GameEngine.goAction,
            "SOUTHEAST": GameEngine.goAction,

            "WEST": GameEngine.goAction,

            "EAST": GameEngine.goAction,

            "SLEEP": GameEngine.goAction,
            "DREAM": GameEngine.goAction,
            "AWAKEN": GameEngine.goAction,

            "UP": GameEngine.goAction,
            "ASCEND": GameEngine.goAction,
            "CLIMB": GameEngine.goAction,

            "DOWN": GameEngine.goAction,
            "DESCEND": GameEngine.goAction,
            "LOWER": GameEngine.goAction,

            "SAVE": GameEngine.saveGame,
            "SAVEGAME": GameEngine.saveGame,

            "RESET": GameEngine.resetGame,
            "RESTART": GameEngine.resetGame,

            "BRIEF": GameEngine.setBriefOutput,

            "VERBOSE": GameEngine.setVerboseOutput,

            "READ": GameEngine.readAction,
            "PERUSE": GameEngine.readAction,
            "SKIM": GameEngine.readAction,
            "CONSULT": GameEngine.readAction,

            "PLAY": GameEngine.goAction,

        }

        if (cmd === 'PLAY') {
            verbMap['PLAY']('startgame');
            return;
        }

        if (cmd === 'SLEEP') {
            verbMap['SLEEP']('sleep');
            return;
        }

        if (cmd === 'AWAKEN') {
            verbMap['AWAKEN']('awaken');
            return;
        }

        console.log(cmd);

        if (cmd === 'GO' && (arg === 'OPEN' || arg === 'UP' || arg === 'CLIMB')) {
            this.invalidCommand();
            return;
        }

        if (cmd === 'UP') {
            if (arg) {
                // Search for the arg in the list
                let item = GameEngine.getItemByName(arg.toLowerCase());
                if (item) {
                    if (item.isClimbable) {
                        // If the item is found, execute the command with the item as the argument
                        this.outputGivenCommand('climb', item.varString, forceNoLogging);
                        verbMap['GO']('climb');
                    }
                    else {
                        this.unclimbableCommand();
                    }
                    return;
                } else {
                    // If the item is not found, handle it accordingly (e.g., output a message)
                    this.invalidCommand();
                    return;
                }
            } else {
                // Handle the case where no argument is provided for the "UP" command
                this.invalidCommand();
                return;
            }
        }

        if (cmd === 'OPEN') {
            if (arg) {
                // Search for the arg in the list
                let item = GameEngine.getItemByName(arg.toLowerCase());
                if (item) {
                    if (item.isOpenable) {
                        // If the item is found, execute the command with the item as the argument
                        this.outputGivenCommand('open', item.varString, forceNoLogging);
                        verbMap['GO']('open');
                    }
                    else {
                        this.unopenableCommand();
                    }
                    return;
                } else {
                    // If the item is not found, handle it accordingly (e.g., output a message)
                    this.invalidCommand();
                    return;
                }
            } else {
                // Handle the case where no argument is provided for the "UP" command
                this.invalidCommand();
                return;
            }
        }

        if (cmd === 'LOOK') {
            if (arg) {
                // Search for the arg in the list
                let item = GameEngine.getItemByName(arg.toLowerCase());
                if (item) {
                    if (item.actionArray.includes('look') && item.lookDesc && (roomList[GameEngine.player.getCurrentLocation()].items.includes(item) || GameEngine.player.inventory.includes(item.varString))) {
                        this.outputGivenCommand('look', item.varString, forceNoLogging);
                        GameEngine.cli.output(horizontalSeparator);
                        GameEngine.cli.output(item.lookDesc + "<br/><br/>" + horizontalSeparator, item.takeDescSpeed, true);
                    }
                    else {
                        this.invalidCommand();
                    }
                    return;
                } else {
                    // If the item is not found, handle it accordingly (e.g., output a message)
                    this.invalidCommand();
                    return;
                }
            } else {
                // Handle the case where no argument is provided for the "UP" command
                this.invalidCommand();
                return;
            }
        }

        if (cmd === 'DOWN') {
            this.outputGivenCommand('go', 'down', forceNoLogging);
            verbMap['GO']('down');
            return;
        }

        if (cmd === 'BACK') {
            this.outputGivenCommand('go', 'back', forceNoLogging);
            verbMap['GO']('back');
            return;
        }

        if (["NORTH", "NORTHWEST", "NORTHEAST", "SOUTH", "SOUTHWEST", "SOUTHEAST", "EAST", "WEST", "CLIMB", "ENTER", "UP", "DOWN", "MOVE"].includes(cmd)) {
            this.outputGivenCommand('go', cmd, forceNoLogging);
            verbMap[cmd](cmd);
        } else {
            this.outputGivenCommand(cmd, arg, forceNoLogging);
            verbMap[cmd](arg);
        }

    }


    outputGivenCommand(cmd, arg, forceNoLogging = false) {

        if (forceNoLogging == true) {
            return;
        }

        var commandString = "";
        commandString = arg != undefined ? cmd + " " + arg : cmd;
        this.output("<div style=\"width: 100%; text-align: right;\">> <i>" + commandString.toLowerCase() + "</i></div>", undefined, undefined, undefined, 'givenCommandOutputText', undefined, false);
    }

    clearLastCommandOutput() {
        var textElements = document.getElementsByTagName('givenCommandOutputText');

        if (textElements.length > 0) {
            textElements[textElements.length - 1].remove();
        }
    }

    playFinale() {
        this.clearScreen();
        this.output(" ", 1, false, false, 'finaleText', undefined, false, false, false);
        this.output("What's <b>your</b> dream?<br/>If, like me, you have a whole box full of dreams, feel free to pick just one to think about.<br/><span style=\"font-size: 75%\">This will not be shared anywhere; it's just for you. If you'd rather not answer, simply press <b>Enter</b>.</span><br/>", 1, false, false, 'finaleText', undefined, undefined, false, true);
    }

    submitDream() {

        playerDream = document.getElementById("dreamuser_in").value.trim();

        //If the player hasn't submitted a dream, no need to put it in sentence case
        if (playerDream != "") {
            playerDream = this.toSentenceCase(playerDream);
        }

        console.log("PLAYER DREAM: " + playerDream);

        this.playEnding();
    }

    playEnding() {
        this.output(" ", 1, false, false, 'finaleText', undefined, false, false, false);
        this.output("<div class=\"vertical-text-divider\"></div><br/>", 1, false, false, 'finaleText', undefined, false, false, false);

        //Though the ode is the same for each case, the text must be appended to one another to avoid auto-scrolling when it's not supposed to
        if (playerDream == "") {
            this.output("You walk towards the front door, and put your hand around the knob. Your eyes look up, to find a letter pinned against the door. " +
                "It reads:<br/><br/>On a rainy Wednesday morning,<br/>As wet as wet can be,<br/>You were walking down the sidewalk,<br/>And pulled down your hood to see.<br/>" +
                "Side to side, the empty street gave you the green light,<br/>You put a foot onto the pavement, and felt the ground melt,<br/>" +
                "As the other side seemed to shine bright.<br/><br/>You tried to step back, but your body wouldn't listen,<br/>" +
                "Your feet had minds of their own, and on they went.<br/>Maybe your eyes were seeing things and tricking you,<br/>" +
                "Maybe it's just that all your free will was spent.<br/><br/>Your eyes closed as you approached it,<br/>And you felt a warm embrace,<br/>" +
                "Like you've been here all your time,<br/>But led a life without a trace.<br/><br/>You opened your eyes, the heat went away,<br/>" +
                "And you were in a different town.<br/>No one talked to you, but something was off,<br/>Just by looking at everyone's frown.<br/>" +
                "You took a walk around, to see what's the hassle,<br/>Everything was business as usual,<br/>The chain gang walked through the streets,<br/>" +
                "While their boss watched from their castle.<br/><br/>Amidst your stroll, you took a seat on a bus stop;<br/>An ad blared through the air,<br/>" +
                "With an android talking on the screens.<br/>It spoke of a two-for-one deal in a company<br/>That helped parents extract their kids' dreams.<br/>" +
                "It soon became apparent what the problem was for folks:<br/>Someone took their dreams, goals, fears, hopes,<br/>" +
                "And left them lifeless up against the ropes.<br/><br/>You screamed and shouted, until your lungs almost gave,<br/>You've been in a dream, now a nightmare,<br/>" +
                "And you'd like to get out of this town<br/>That no one can ever save.<br/>You ran towards all directions, but none said \"way out\",<br/>" +
                "You looked everywhere, but nothing was there,<br/>Except people sat and burned out.<br/><br/>It's like they stored their dreams in their eye bags,<br/>" +
                "And zipped their pride tight;<br/>Did away with their own rights,<br/>And then called it a night.<br/>And the dreams they had before,<br/>" +
                "They're nowhere to be found!<br/>Dreams of glory, family or self<br/>Are six feet underground.<br/><br/>But you looked inside yourself, and found a better way:<br/>" +
                "If we're here, let's do it right,<br/>You can become a beacon of light,<br/>With a kindness that no defeat can ever outweigh.<br/><br/>" +
                "You closed your eyes and opened them,<br/>And you were back home, where you belong;<br/>Where your uplift and empathy<br/>Help those around you move on strong.<br/><br/>" +
                "And there's a lesson you take from that town,<br/>Where the soul never grows past twenty:<br/>Nothing and no one can put out your fire<br/>" +
                "When there's wood aplenty.<br/>And should you become a bright flame<br/>Amidst the darkness around,<br/>You can help illuminate the path<br/>" +
                "Of those who have fallen down.<br/><br/>So celebrate the variety<br/>That makes each of us unique,<br/>You can change society, don't be afraid to speak,<br/>" +
                "Put an arm around who's closest,<br/>And ring out a powerful scream:<br/><br/><b>\"I'm not afraid to try, I'm not afraid to dream!\"</b>" +
                "<br/><br/><br/><br/><br/><br/><br/><div class=\"vertical-text-divider\"></div><div class=\"vertical-text-divider\"></div><br/><br/><br/><br/><br/><br/><br/>" +
                "Never be afraid to try. Never be afraid to reach out. Regardless of how big or small they are, dreams mean nothing if you lose your " +
                "kindness and sense of self along the way. Believe in yourself; you have more power than you think.<br/><br/><br/><br/><br/>Thank you " +
                "for playing <i>An Interdimensional Ode to the Oresis Tree</i>.<br/><br/>If you haven't already, feel free to browse through the rest of the " +
                "website.<br/>If you'd like to write a dream to be included in an anonymous list for future players to see, head over to the " +
                "<a href=\"contactform.html\" target=\"_blank\" style=\"color: #000; white-space: nowrap; line-height: 100%;\"><b><i>⨬ Contact</i></b></a> page, " +
                "and send a message with the subject \"DREAM\".<br/><br/><br/>Thank you.<br/><br/><br/><br/><br/><br/>",
                1, false, false, 'finaleText', undefined, false, false, false);
        }
        else {
            this.output("You walk towards the front door, and put your hand around the knob. Your eyes look up, to find a letter pinned against the door. " +
                "It reads:<br/><br/>On a rainy Wednesday morning,<br/>As wet as wet can be,<br/>You were walking down the sidewalk,<br/>And pulled down your hood to see.<br/>" +
                "Side to side, the empty street gave you the green light,<br/>You put a foot onto the pavement, and felt the ground melt,<br/>" +
                "As the other side seemed to shine bright.<br/><br/>You tried to step back, but your body wouldn't listen,<br/>" +
                "Your feet had minds of their own, and on they went.<br/>Maybe your eyes were seeing things and tricking you,<br/>" +
                "Maybe it's just that all your free will was spent.<br/><br/>Your eyes closed as you approached it,<br/>And you felt a warm embrace,<br/>" +
                "Like you've been here all your time,<br/>But led a life without a trace.<br/><br/>You opened your eyes, the heat went away,<br/>" +
                "And you were in a different town.<br/>No one talked to you, but something was off,<br/>Just by looking at everyone's frown.<br/>" +
                "You took a walk around, to see what's the hassle,<br/>Everything was business as usual,<br/>The chain gang walked through the streets,<br/>" +
                "While their boss watched from their castle.<br/><br/>Amidst your stroll, you took a seat on a bus stop;<br/>An ad blared through the air,<br/>" +
                "With an android talking on the screens.<br/>It spoke of a two-for-one deal in a company<br/>That helped parents extract their kids' dreams.<br/>" +
                "It soon became apparent what the problem was for folks:<br/>Someone took their dreams, goals, fears, hopes,<br/>" +
                "And left them lifeless up against the ropes.<br/><br/>You screamed and shouted, until your lungs almost gave,<br/>You've been in a dream, now a nightmare,<br/>" +
                "And you'd like to get out of this town<br/>That no one can ever save.<br/>You ran towards all directions, but none said \"way out\",<br/>" +
                "You looked everywhere, but nothing was there,<br/>Except people sat and burned out.<br/><br/>It's like they stored their dreams in their eye bags,<br/>" +
                "And zipped their pride tight;<br/>Did away with their own rights,<br/>And then called it a night.<br/>And the dreams they had before,<br/>" +
                "They're nowhere to be found!<br/>Dreams of glory, family or self<br/>Are six feet underground.<br/><br/>But you looked inside yourself, and found a better way:<br/>" +
                "If we're here, let's do it right,<br/>You can become a beacon of light,<br/>With a kindness that no defeat can ever outweigh.<br/><br/>" +
                "You closed your eyes and opened them,<br/>And you were back home, where you belong;<br/>Where your uplift and empathy<br/>Help those around you move on strong.<br/><br/>" +
                "And there's a lesson you take from that town,<br/>Where the soul never grows past twenty:<br/>Nothing and no one can put out your fire<br/>" +
                "When there's wood aplenty.<br/>And should you become a bright flame<br/>Amidst the darkness around,<br/>You can help illuminate the path<br/>" +
                "Of those who have fallen down.<br/><br/>So celebrate the variety<br/>That makes each of us unique,<br/>You can change society, don't be afraid to speak,<br/>" +
                "Put an arm around who's closest,<br/>And ring out a powerful scream:<br/><br/><b>\"I'm not afraid to try, I'm not afraid to dream!\"</b>" +
                "<br/><br/><br/><br/><br/><br/><br/><div class=\"vertical-text-divider\"></div><div class=\"vertical-text-divider\"></div><br/><br/><br/><br/><br/><br/><br/>" +
                "I gave you a glimpse into my Oresis Tree: my goals, my hopes.<br/><br/><br/><div style=\"text-align: center;\"><b>Your Oresis Tree is</b><br/><br/><i>" + playerDream + "</i></div><br/><br/><br/>" +
                "Don't be afraid to try. Don't be afraid to reach out. Regardless of how big or small they are, dreams mean nothing if you lose your kindness and " +
                "sense of self along the way. Believe in yourself; you have more power than you think.<br/><br/><br/><br/><br/>Thank you for playing <i>An Interdimensional " +
                "Ode to the Oresis Tree</i>.<br/><br/>If you haven't already, feel free to browse through the rest of the website.<br/>If you'd like your dream to be " +
                "included in an anonymous list for future players to see, head over to the " +
                "<a href=\"contactform.html\" target=\"_blank\" style=\"color: #000; white-space: nowrap; line-height: 100%;\"><b><i>⨬ Contact</i></b></a> page, and send a message with the " +
                "subject \"DREAM\".<br/><br/><br/>Thank you.<br/><br/><br/><br/><br/><br/>",
                1, false, false, 'finaleText', undefined, false, false, false);
        }
    }
}
