/**
 * Player Data Model
 */
class Player
{
    /**
     * The Constructor
     *  
     * @param {array}    inventory Player inventory
     * @param {object}   currentRoom Current room object
     * @param {object}   previousRoom Previous room object
     * @param {bool}     gameIsSaved Whether game has been saved  
     * @param {bool}     verbose Whether verbose mode is active 
     */
    constructor(inventory = [],
                currentRoom = "start", 
                previousRoom = null, 
                gameIsSaved = false, 
                verbose = false,
                visitedRooms = []
                )
    {
        this.inventory           = inventory;
        this.currentRoom         = currentRoom;
        this.previousRoom        = previousRoom;
        this.gameIsSaved         = gameIsSaved;
        this.verbose             = verbose;
        this.visitedRooms        = visitedRooms;
    }

    getPlayer()
    {
        return this;
    }

    getPlayerInventory()
    {
        return this.inventory;
    }

    getCurrentLocation()
    {
        return this.currentRoom;
    }

    getPreviousLocation()
    {
        return this.previousRoom;
    }

    getSaveState()
    {
        return this.gameIsSaved;
    }

    getVerboseMode()
    {
        return this.verbose;
    }

    setCurrentLocation(currentRoom)
    {
        this.currentRoom = currentRoom;
    }

    setPreviousLocation(previousRoom)
    {
        this.previousRoom = previousRoom;
    }

    setSaveState(saved)
    {
        this.gameIsSaved = saved;
    }

    setVerboseMode(verbose)
    {
        this.verbose = verbose;
    }

    addToInventory(item)
    {
        this.inventory.push(item);
    }

    addVisitedRoom(room) {
        if (!this.visitedRooms.includes(room)) {
            this.visitedRooms.push(room);
        }
    }

    removeFromInventory(item)
    {
        this.inventory = this.inventory.filter(e => e !== item);
    }

    loadPlayerState()
    {
        if(localStorage.getItem('aiototSaveGameState')) 
        {
            let savedGame       = JSON.parse(localStorage.getItem('aiototSaveGameState'));
            this.inventory      = savedGame.inventory;
            this.currentRoom    = savedGame.currentRoom;
            this.previousRoom   = savedGame.previousRoom;
            this.gameIsSaved    = savedGame.gameIsSaved;
            this.verbose        = savedGame.verbose;
            this.visitedRooms   = savedGame.visitedRooms;
            return this;
        } 
        else 
        {
            this.inventory      = [];
            this.currentRoom    = "start";
            this.previousRoom   = null;
            this.gameIsSaved    = false;
            this.verbose        = false;
            this.visitedRooms   = [];
            return this;
        }
    }

    savePlayerState()
    {
        this.gameIsSaved = true;
        localStorage.setItem('aiototSaveGameState', JSON.stringify(this));
    }

    resetPlayerState()
    {
        localStorage.removeItem('aiototSaveGameState');
        this.inventory      = [];
        this.currentRoom    = "start";
        this.previousRoom   = null;
        this.gameIsSaved    = false;
        this.verbose        = false;
        this.visitedRooms   = [];
        return this;
    }
}