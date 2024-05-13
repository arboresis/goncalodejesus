/**
 * Room Data Model
 */
class Room {
    /**
     * The Constructor
     * 
     * @param {string}  varName The room identifier
     * @param {string}  name The room name
     * @param {string}  look The outward facing description of the room
     * @param {array}   items The list of Items in the room
     * @param {bool}    isDark Is the room dark
     */
    constructor(varName, name, firstLook, look, items, isDark = false, requiredItems = [], locked = "", givesItems = []) {
        this.varName = varName;
        this.name = name;
        this.firstLook = firstLook;
        this.look = look;
        this.items = items;
        this.visited = false;
        this.isDark = isDark;
        this.darkText = "You have moved into a dark place.<br />It is pitch black. You are likely to be eaten by a grue.<br />";
        this.exits = [,];
        //Array of required items to enter the room
        this.requiredItems = requiredItems;
        this.locked = locked;
        this.givesItems = givesItems;
    }

    /**
     * 
     * Add exit creates an exit solution for the room object.
     * 
     * @param {string} direction 
     * @param {string} exit
     */
    addExit(direction, exit) {

        this.exits[direction] = exit;

        switch (direction) {

            case "startgame":
                this.startgame = exit;
                break;

            case "north":
                this.north = exit;
                break;

            case "northeast":
                this.northeast = exit;
                break;

            case "east":
                this.east = exit;
                break;

            case "southeast":
                this.southeast = exit;
                break;

            case "south":
                this.south = exit;
                break;

            case "southwest":
                this.southwest = exit;
                break;

            case "west":
                this.west = exit;
                break;

            case "northwest":
                this.northwest = exit;
                break;

            case "up":
                this.up = exit;
                break;
            case "down":
                this.down = exit;
                break;
            case "enter":
                this.enter = exit;
                break;
            case "exit":
                this.exit = exit;
                break;
            case "open":
                this.open = exit;
                break;
            case "climb":
                this.climb = exit;
                break;
            case "move":
                this.move = exit;
                break;
            case "rug":
                this.move = exit;
                break;
        }

    }
}

var roomList = {
    "start": new Room(
        "start",
        "Would you like to play?",
        "Write \"play\" below and press 'Enter' to start the game.<br/><span style=\"font-size: 75%\"><i>This will clear the page and start the game, " +
        "so make sure you have read the text above!</i><br/>Approximate duration: 1 hour and 10 minutes</span><br/>",
        "Write \"play\" below and press 'Enter' to start the game.<br/><span style=\"font-size: 75%\"><i>This will clear the page and start the game, " +
        "so make sure you have read the text above!</i><br/>Approximate duration: 1 hour and 10 minutes</span><br/>",
        [],
        false,
        []),



    //------------------------// APARTMENT //------------------------//

    "Icorridor": new Room(
        "Icorridor",
        "Ceaseless Corridor",
        "Your eyes slowly open, and you find yourself inside an infinite corridor. You can't quite remember how you arrived, but you feel no rush to leave. " +
        "There are no other doors but your own and his, facing each other in their lifeless wooden essence. I guess you were never that far away from him.<br/><br/>" +
        "You go to knock at his door, but it opens before you do; its knob emitting a silence that leaves you wondering who or what opened it.",

        "The corridor's immense extent stares back at you in complete stillness. It makes you feel an unease you didn't feel before, with its cold featurelessness " +
        "that goes on beyond sight contrasting with the warm style and decoration inside.",
        [],
        false,
        []),

    "Ientrance": new Room(
        "Ientrance",
        "Entrance Hall",
        "You step inside the stranger's house, and feel the walls hug the strangely familiar ambience with an emotional charge you've never experienced before, but " +
        "doesn't scare you. It's like the house senses that it doesn't know you, but shares the pain and the glory you've lived, and absorbs fragments of your memories.<br/><br/>" +
        "Is this a fever dream? Somewhere beneath the cacophony of city life outside, an unintelligible murmur. You try to understand, but it fades away. You can only hear it when " +
        "you're not paying attention.",

        "You're back in the house's beating heart. You could easily be this stranger's friend with how well the house knows you now. And in a way, you're beginning " +
        "to know it too. Light reflects from the floor on the rooms around, casting beautiful patterns on the wooden ceiling.",
        [photo],
        false,
        []),

    "IelectricalCloset": new Room(
        "IelectricalCloset",
        "Electrical Closet",
        "You open the electrical closet door to find the panel looking back at you. Among the various identical switches, one is bigger and more colorful. " +
        "You flip that switch off, then on. In the background, you hear a beep from the oven, confirming that the power's back up.",

        "The closet is tight and, in a strike of irony, quite dark. When he was alone at home, he'd make sure the door was well closed. A small gap peering " +
        "into a dark closet gave him the creeps. Entirely unashamed to admit it, he was afraid of ghosts. And this would be a great lurking spot for one.",
        [],
        false,
        ['key'],
        "You try to open the electrical closet's door, but it won't move. Seems to be locked.",
        ["bedroomKey"],),

    "IlivingRoom": new Room(
        "IlivingRoom",
        "Living Room",
        "You step into the living room. The comfortable sofa tells the story of one whose favorite moment in any weekday is to lay down at night with their better " +
        "half, each hugging a hot water bottle and wrapped up in blankets. On the TV, some show would make fun of the country's politics, which – for a second or two – would " +
        "help keep his mind away from the rise of radical extreme parties all through the world.<br/><br/>A battered console lies on the shelf below the television. To the right, " +
        "a collection of games from his teenage years populates the shelf. Though known as the era of ever-similar grey screen games, these are colorful, unique, and mostly story-based. " +
        "Games of wind-guided petals and sand-surfing contrast with epic stories of space politics and branching choices in zombie-laden worlds, in an amalgam that suits his taste for " +
        "artistic and original narrative experiences.<br/><br/>A coffee table sits between the sofa and the TV, with an ornate white runner atop. A small basket in the center holds a " +
        "multitude of tea types, with a sea of chamomile and mango-peach bags holding the majority of the basket's real estate. To the basket's left, two empty hot water bottles. " +
        "The orange one sports a smiling cat, with an \"I'm feline good\" tag that makes you giggle. The other – simpler, grey-blue toned – is embroidered with a cute winking " +
        "dinosaur.<br/><br/>A dinner table fills almost half of the room. At its center, a Christmas decoration that he never took down; partially because it gives the table personality " +
        "and something to look at, partially because of laziness. Mostly the second.",

        "You enter the living room, and are presented with a coziness you'd feel lying down on the sofa, with a blanket over you; and yet, you are standing beside it. You feel… rested." +
        "<br/><br/>You can't help but chuckle once more at the orange hot water bottle, but only after a half-hearted groan that lets the lack of people around you know that you're above " +
        "laughing at such a silly pun.",
        [controller],
        false,
        []),

    "Ikitchen": new Room(
        "Ikitchen",
        "Kitchen",
        "Even before you step into the kitchen, a scent runs through the air. Your favorite food. You immediately look for the stove, but much to your unjustified surprise, nothing " +
        "is cooking. In fact, a thin layer of dust covers the stove. No one's been here in a while.<br/><br/>A tight table for four hugs the east wall. Its cover is beautiful yet simple, " +
        "with a neutral beige tone that goes well with the walls and flooring, crossed by a complementing single navy-blue stripe. Atop, another small basket with tea bags of all shapes " +
        "and sizes. But not red fruit. <b>Never</b> red fruit. Ever.<br/><br/>To the basket's side along the wall, a homely large plate sits. The plate's cold tones do nothing to harm " +
        "the kitchen's comfortable feeling, as pale blue stripes flow and cross and intertwine along the edges of the white base, with a complementing flower painted at the center. " +
        "Here, strawberries and pears; bananas and the occasional mango; a symphony of fresh fruit calling at every snack break. Needless to say, he wouldn't always answer the fruit " +
        "basket's call; there was cake on the other line.<br/><br/>Throughout the length of the counter, various appliances populate this kitchen that was once used for the most " +
        "delicious meals, especially those of rice and meat. I wonder what he could have done if he ever got around to buying that one sharp knife he'd been flirting with at the " +
        "supermarket for months at a time.",

        "The kitchen's pleasant scent is mostly faded, but still lingers enough to bring you fond recollections of moments past.<br/><br/>Simply looking at the fruit basket soothes " +
        "your stomach, and glancing at the tea basket, you get a warm feeling running inside, like a long sip in a cold winter afternoon.",
        [drawer, microwave],
        false,
        []),

    "IkitchenDrawer": new Room(
        "IkitchenDrawer",
        "Kitchen",
        "You open the kitchen drawer.",

        "You open the kitchen drawer.",
        [key],
        false,
        []),

    "IlaundryRoom": new Room(
        "IlaundryRoom",
        "Laundry Room",
        "You step out onto the laundry room: a balcony enclosed with moderately opaque glass, which creates a controlled greenhouse effect. Though the full heat of the middle of " +
        "the day is clearly done and gone, a portion of the prolonged heat remains, hugging you into a welcoming environment that somehow avoids the common breathless feeling of such " +
        "a place.<br/><br/>Not only is there air, there's also a strong smell of perfumed detergent hovering about. You inspect the washing machine, which shows no signs of being used " +
        "in recent times.<br/><br/>Through the closed window, the garage closes out the space between, occupied by a small backyard. Mostly overlaid by concrete flooring, occasional " +
        "green areas create an array of thinly spread visual disparities, which paradoxically contribute to the harmonious view.<br/><br/>Your eyes roam above the garage, to find a " +
        "street behind it. The buildings on the other side aren't all that tall, and if you look above and between them, you see a river in the distance. In the Summer, that would " +
        "be his choice of sunlight and water, much to the discontent of everyone else in the group, who preferred the salt-filled beaches of the western shore.<br/><br/>So off they'd " +
        "go to the coast and bathe in the Sun as their skin yearned for a pinch of hydration. And in the shade of the beach umbrella, he'd sit and miss the view from the river, and " +
        "its calm waters, much less distracting than the living waves crashing down onto the sand, pulled into the air by the strong gusts of the August time.",

        "You re-enter this heated cubicle, and to your nostrils' joy, the smooth aroma of the detergent's perfume travels through your body. You feel the restoring and softly " +
        "energizing power of putting on clean clothes from the pure act of breathing.<br/><br/>The view outside is charming, the air around you is warm, and you feel good.<br/>" +
        "This is a good place to be.",
        [bicycle],
        false,
        []),

    "Ihallway": new Room(
        "Ihallway",
        "Hallway",
        "You open the door to the hall, and proceed. There isn't much light here, just a few stray rays of late afternoon sunshine wandering from the two doors to the side. " +
        "The differing tones force your eyes to adjust for a while. Only bare walls and doorways populate this enclosed space, leaving not much to look at.<br/><br/>But a light " +
        "wind flows from the guest bedroom to the entrance hall. And for a second, your mind drifts to a tranquil long tar road. A weeping willow sits on the side of the road at " +
        "its dead center. Another closes it out at one end. Somewhere in the space between them, a large double trailer truck is parked, fully blocking one side of the road. It's " +
        "a neighbor's truck, and while he's in town, it'll stay there day and night.<br/><br/>A memory that isn't yours rears its head. <i>In it, your breath tries to stop the " +
        "violence with which your heart beats. Your lungs struggle for air, but your brain tells them to hold. You're hidden beneath the truck's back, holding your arms and legs " +
        "on two axles to keep them from being seen from the side.<br/><br/>From your count, only you and another are left; all others have been found, and your brother is \"it\". " +
        "And he's the absolute best.<br/><br/>Your legs start giving in, as your slender arms begin to ache. Your breath is starting to give you away.<br/><br/>Then, the sound " +
        "you've longed for.<br/><br/>\"I've caught you!\"<br/><br/>Your pulse both relaxes and surges, at the thought of winning your first game of hide and seek. You drop to the " +
        "floor and roll your way onto the road, where the others look at you in surprise, unaware of your hiding spot.</i><br/><br/>Your eyes open, and the unadorned hallway " +
        "stares back at you with dancing shadows reflecting inside from the second door to your right.",

        "You step into the hallway, and once more feel the current of flowing air pass through your face. You can't help but think that there could be a decoration or two " +
        "around here, but can't quite place what it could be, too.",
        [],
        false,
        []),

    "Ibathroom": new Room(
        "Ibathroom",
        "Bathroom",
        "The bathroom's dim lighting brings out your body's outline against the hallway's brightly colored wall behind. For a second, there is nothing else. You move your " +
        "hand around and feel the silence of the bathroom's darkness.<br/><br/>You faintly remember <i>someone else being afraid to look at the bathroom from the hall as a child, " +
        "fearful of catching a glimpse of a moving shadow or an amorphous shape observing from within.</i><br/><br/>Here, the shadows ever-so-slightly dance along the ceiling " +
        "and walls, creating an eerie feeling when you look at them directly, but bringing you warmth when you soften your vision to see beyond.",

        "Along with you, the silhouette of your reflection enters the bathroom. It's a bit dark here, but you can just about make out a bathtub to your left, and a toilet " +
        "setup to your right.<br/><br/>For good measure, you move one hand, then the other. The reflection mirrors your movements. Good.",
        [],
        false,
        []),

    "Ibedroom": new Room(
        "Ibedroom",
        "Bedroom",
        "You flip the light switch on, and the room brightens. You step into the bedroom.<br/><br/>With its headboard against the wall to your left, a large bed takes up most of " +
        "the room's real estate, and sucks your attention for a second or two. You can almost see a couple of children wrestling on top of it, using pillows and blankets as friends " +
        "and foes, steel chairs and wooden tables.<br/><br/>Inevitably, the younger sibling, with his long, wavy light brown hair flying through the air, falls on his shoulder or " +
        "his back, and starts to cry. Startled, the older brother comforts him, telling him to be quiet, to avoid raising mom's suspicions. The younger brother whimpers and " +
        "struggles through it, and, after making sure nothing's out of place, the two lay down to continue watching the wrestling show on the television. But you know for sure " +
        "it's a matter of minutes until the cycle starts anew.<br/><br/>You snap back, and resume scanning the room.<br/><br/>In the far corner to your right, a chair with its " +
        "back covered with a few clothing items. Closer to you along that wall, there is a small glass table with a phone charger rolled up atop. The phone it belongs to isn't " +
        "in sight, and you don't have much hope of finding it. You get the impression that he keeps his phone on the other side of the room at night, to force himself to get up " +
        "when the alarm rings. Otherwise, the 'snooze' button is too close.<br/><br/>You sit on the side of the bed, and your mind takes a break. For a second, you can see it go " +
        "somewhere else; a place where conscience is left at the door. You fight to keep yourself awake. You can leave the room and explore more, or not. If and when you so wish, " +
        "you can let go: drift to sleep, and let your dreams tell the rest of the story.",

        "You enter the bedroom, and your mind's invaded by the thought of shaping cities and mountains out of old VHS cases. Here, skyscrapers built from translucent plastic and " +
        "paper billboards would come alive in your imagination, and give life to an otherwise boring, static pile of obsolete remnants of past technology.<br/><br/>The idea fades " +
        "away as the room's uneventful constitution regrettably pulls you back from the vibrant liveliness of your temporary absence.<br/><br/>You sit on the side of the bed, and " +
        "your mind takes a break. For a second, you can see it go somewhere else; a place where conscience is left at the door. You fight to keep yourself awake. You can leave the " +
        "room and explore more, or not. If and when you so wish, you can let go: drift to sleep, and let your dreams tell the rest of the story.",
        [],
        false,
        ['bedroomKey'],
        
        "You look inside the bedroom, but it's pretty dark. You search for the blinds, but can't find where they might be; not that you'd know the way without bruising a " +
        "knee or two. You peer inside and flip the light switch, to no effect. There was a storm a while back, maybe the electrical panel needs a reset?"),

    "IhomeOffice": new Room(
        "IhomeOffice",
        "Home Office",
        "The afternoon breeze lightly swings the home office's curtains to one side, then the other. A layer of thin dust seems to have just settled on top of the many " +
        "others before it, which blend themselves unnoticeably with the dark wooden floor, with the faded scratch marks from the repeated passage of a comfortable desk chair. " +
        "But the large computer screen doesn't lie, and its curved surface hosts the telltale signs of unmistakable abandonment. No one's been here for a while.<br/><br/>" +
        "The computer itself is gone. On top of the desk to your left, the screen oversees a loose keyboard and mouse; at the desk's feet, their cables fall on their " +
        "lonesome. To their side, a controller sits, wrapped in its cable. You look at the controller, and cast your memory back to <i>darker times, days where life " +
        "wasn't on your side and the world seemed to weigh a thousand times your own weight.<br/><br/>You recall nights of gaming alone and with friends. At times, you " +
        "enjoyed your own company and the serenity of a single player experience. At others, a group of the right people felt like just what you needed, whether in " +
        "hilarious nonsensical fun or in complete silence, simply appreciating your friends' presence.</i><br/><br/>From the corner of your eye, a plushie to your right " +
        "brings you back to the present. It sits atop the last of five shelves, with another desk at the bottom. The plushie has its tongue sticking out in a sort of taunt " +
        "that invites you to think where you know its cheeky cute face from. You can't quite place it, though.",

        "The home office has an oddly comforting atmosphere, and though you can imagine the endless hours of work that this room produced, you only know memories of " +
        "fondness; of having fun playing games or solving a particularly intriguing bug in a game or an app.",
        [chair],
        false,
        []),

    "IhomeOfficeOnTopOfChair": new Room(
        "IhomeOfficeOnTopOfChair",
        "Home Office",
        "You climb the chair, and take a look at the top shelves. They're mostly populated with books, most of which you're 90% sure he hasn't read, but bought them " +
        "with the best intentions to do so.<br/><br/>A handful of handmade crafts and received presents deliver a warmer touch to a couple of areas mainly dedicated to " +
        "binders and folders with useless documents he'll never need in his life, but has amassed anyways, kind of like everyone else.<br/><br/>You look around for " +
        "anything of interest.",

        "You climb the chair once more. For a while there, you remember your age isn't what it used to be. You chuckle nonchalantly at the passage of time, and " +
        "proceed – as one does.",
        [plushie],
        false,
        []),



    "sleep": new Room(
        "sleep",
        " ",
        " ",

        " ",
        [],
        false,
        []),



    //------------------------// DREAM HOUSE //------------------------//

    "IIbeginning": new Room(
        "IIbeginning",
        "",
        "You're standing outside of a house made of concrete with occasional wooden details. Its imposing and angular figure takes nothing away from its admirably crafted " +
        "outlines and gaps. You can almost envision spontaneous beams of light shooting out of the scarce openings in the walls at night.<br/><br/>But it's the daytime, and " +
        "you look around for any signs of... anything.<br/><br/>You're standing near the entrance of the house, on a vast, flat piece of land. There's a gate farther out " +
        "that would lead outside of the property, and a smooth road coming your way that gradually becomes a ramp into an underground garage you can't see from here.<br/><br/>In " +
        "the distance, a thin golden line silhouettes a couple of mountains. You can just make out the small patches of melting snow near their topside. It must be getting warm up " +
        "there; but here, the Sun doesn't shine in the sky. It's fully gray, but no rain graces this area. Your favorite type of weather.<br/><br/>There is a nearby field " +
        "of trees that just stand there, looking beautiful. Saddened that their steady beauty clashes with the moving landscape that surrounds them, you crouch a bit and " +
        "look at them closer to the ground. A couple of leaves dance in the light wind near the floor, and move just enough to make the trees' figures seem to dance along in a " +
        "wavy motion. You smile, satisfied with the leaves' effort to help the trees fit into the view.<br/><br/>Slowly, you let your sight fade away, and the light " +
        "bouncing off the floor <i>becomes a white and red plaid towel. Your body is stretched out, and a dark gray jacket passes as a pillow with such a negligible " +
        "discomfort that you're half awake after only a few minutes.<br/><br/>A couple of meters to your side, friends play keep-up with a bouncing green and yellow ball. " +
        "They're able to get three or four touches before it falls, then they try again. Every time, one of them tries an acrobatic touch, invariably falling flat on " +
        "their butt, which pulls a few loud laughs from everyone.<br/><br/>Sat beside you, two other friends discuss the intricacies of the country's politics with teeth " +
        "crunching down on a handful of chips. A classic.<br/><br/>You look up, where the Sun creates faded beams of light that squeeze through the branches of the large " +
        "tree above.<br/><br/>Your eyes close again, and consciousness becomes an unfamiliar concept as you doze off once more.<br/><br/></i>You come to your senses, and a key " +
        "appears in your hand. You get the feeling that you have to open this door yourself.",

        "",
        [],
        false,
        []),

    "IIentrance": new Room(
        "IIentrance",
        "Entrance Hall",
        "You insert the key and turn. The door unlocks, and is pushed back a bit by the faint wind.<br/><br/>If any worries and troubles of the world made it through the " +
        "outside gate, they surely didn't make it inside. You move into the entrance hall and are greeted with a mellow breeze flowing through. Though it feels entirely " +
        "natural, you know it to be filtered; masses of air from the outside that undergo layers of cleaning and purifying in passive and active systems. Your allergies " +
        "have never been better.<br/><br/>A series of wooden slats deliver a comforting touch to this otherwise gray chamber. A couple of houseplants bring about a certain " +
        "life to the place, accompanied by an artistic standing coat hanger, with its bare uncovered arms sprawling out in various directions. Amidst the bottom half of " +
        "the piece, a small plate contains random keys you figure you won't need any time soon.<br/><br/>The ceiling's transparent glass mosaic creates shadows that look " +
        "dissonant when carefully observed, but make up stunning abstract figures when you blur your vision a bit. A round, open entryway closes out the room on the " +
        "opposite side, in front of you.",

        "You return to the entrance hall, and are reminded of the mental repose the house provides. You feel and think about the layers of protection around you: the house, " +
        "where you feel safe and at home; the surrounding grounds and gardens, where your exposure to the outside world is controlled, with nature within sight and out of " +
        "reach of prying human hands; and the outer world, where nothing ever goes according to plan and the planet is pummelled daily, and condemned to a seemingly inescapable " +
        "decay.<br/><br/>And your thoughts return to you. Inside, everything is alright. You're here. You can be here for as long as you want.",
        [],
        false,
        []),

    "IIlibraryCorner": new Room(
        "IIlibraryCorner",
        "Library Corner",
        "You follow the radiant light coming from the ceiling, to find the library corner. The division between the living room and this corner is almost none, with only " +
        "a small privacy screen in between.<br/><br/>You approach the wooden privacy screen. It's patterned with a repeating flowery design. A plant cascades over this half-wall " +
        "to the living room's side; it's subtle enough to not interfere with the flow of movement, but noticeable enough to become a detail that absorbs your attention for " +
        "a bit as you pass.<br/><br/>You move around it, and find yourself in a cozy division surrounded by bookshelves, with an armchair and a small sofa that seems to " +
        "also serve as a footrest whenever needed. Nearby, a table holds a tea cup and a kettle; a tasteful lamp and a couple of pencils and pens complete the set.<br/><br/>" +
        "This part of the room has a glass ceiling, which casts a clear light from above. The ceiling corners line up a series of disguised lightbulbs, ready to allow for " +
        "some night reading.<br/><br/>You glance at the shelves and find a very fluid and indefinable taste. From epic and lyrical poems to books that dive into the meaning " +
        "and design of everyday things, there aren't many genres left out of this collection.<br/><br/>Keeping the books company, there are decorative items and ornaments " +
        "spread throughout the shelves.",

        "You walk around the privacy screen and into the library corner. Light comes from above at just the right angle to make the room look like something out of an interior " +
        "decorator's catalogue. You rest your hands on the armchair's soft cover, and take a look at the shelves.",
        [],
        false,
        []),

    "IIlivingRoom": new Room(
        "IIlivingRoom",
        "Living Room",
        "You enter the living room through the round passageway with matching tall plants.<br/><br/>You are immediately greeted by a water feature on the other side of " +
        "the room. The concrete wall – until then lined with wooden details, shelves, and posters to its left – becomes a strip of stone cladding with a thin opening " +
        "near the top. From there, crystalline water falls down in a controlled manner, so that the landing produces a satisfying, but low-volume sound. It seems to " +
        "provide a soothing background noise that you almost can't hear if you take a step or two away.<br/><br/>The shelves contain a plethora of books, board games, " +
        "and decorative trinkets. An occasional vase with a plant or a small terrarium switch up a shelf's visual style, and breathe green life into the room. Going " +
        "from this wall to the next, a collection of movie posters show a varied taste. A poster with a pair of rocks standing atop a rocky mountain sides with one of a " +
        "space ship headed towards a black hole. On the wall beside them, a poster shows a beige, sandy planet. An oddly specific picture of a middle-aged country singer " +
        "with a grand pompadour closes out this room's poster display.<br/><br/>A large television is embedded into the northern wall, and faces a spacious couch that " +
        "creates a squared U-shape. Between the two, an elegant large round table with adjustable legs serves as a tea table and board game space on demand. You can easily " +
        "picture an intense night of carefully placing wooden blocks on top of each other until it all falls apart. There's not much that any waterfall can do to relax " +
        "anyone in that situation!<br/><br/>Above the center table, the ceiling's wooden slats open up briefly to show a glass block with water in motion inside. Daylight " +
        "passes through in swirling rays that spread all around this side of the room and give it something of a moving essence.",

        "You enter the living room area, and are soothed by the faint sound of falling water and the sight of dancing shadows that seem to coat the floor and walls in " +
        "colors you've never seen.",
        [],
        false,
        []),

    "IIkitchen": new Room(
        "IIkitchen",
        "Kitchen",
        "A dinner table divides the living room and the kitchen area. In a minimalistic wooden style with chairs to match, you figure you could fit eight or nine people " +
        "sat around it. It seems to be a sort of lonely divider, as it doesn't even come close to occupying the full length of the room. However, you get the feeling " +
        "that the table isn't meant to be larger or fit more people; it's more than enough for a holiday meal with friends and family.<br/><br/><i>You recall holidays past, " +
        "many years ago, with two tables full of people around them. It's cold outside, and the carolers are going about the town doing their thing. Times are simpler; " +
        "but not necessarily happier, too. A glass of wine leads to another, and the adults start an argument over something that none of them will remember in a few minutes. " +
        "Somewhere between wanting the grown-ups to stop and not wanting to get on their parents' bad side, the children either jump in with promptly ignored comments " +
        "or appeals, or stay in their corner, trying to move past the commotion.<br/><br/>You sit with your brother on the floor near the radio. It's playing jolly tunes " +
        "of happiness and unity. You're not about to let the grown-ups ruin your newly-obtained toy wrestling ring, complete with two of your favorite characters. The " +
        "whole building could collapse, and it wouldn't take your mind off of landing the final aerial move to finish the match.<br/><br/>At the last moment, though, your " +
        "brother moves the prone toy! An astonishing turn of events, that leaves your own toy falling into the empty carpet. And with a loud thud and a collective audible " +
        "wince from the imaginary crowd, your exhausted fighter lays motionless, with no energy left in his plastic body. Your brother's wrestler moves in for the final " +
        "pin, and gets it!<br/><br/></i>Surprised at how long you've been looking at a simple wooden table reminiscing about the past, you conclude that it fits the people it " +
        "needs to fit, and move on to the kitchen.<br/><br/>An island forms a corridor with the counter, that surrounds the island in all sides but one.<br/><br/>The " +
        "island is hovered by an extractor fan that falls from the ceiling. Right beneath it, a modern stove sits in one corner, accompanied by a set of cutlery and cooking " +
        "pots that are neatly arranged and placed for easy access. On the side closer to the dining table, a small minibar forms. A handful of different drinks sit atop " +
        "a shelf, with glasses of different shapes and sizes. Beneath the counter, high stools provide adequate seating for such a space.<br/><br/>Embedded into the counter " +
        "and above it, an oven and a microwave provide most of the cooking utility on this side of the corridor. A dishwasher in the corner avoids the dreaded chore of " +
        "hand-washing the dishes. To its side, the sink. Other than the microwave, the top half is mostly lined up with overhead cabinets containing plates and other assorted " +
        "tableware.",

        "You move around the table and into the kitchen. You run a hand over the island's concrete surface as you pass along; its edge is smooth and pleasant to the touch, " +
        "and the wooden portions that hold and separate the tableware seem to be embedded. You are now between the island and the counter.",
        [cabinet],
        false,
        []),

    "IIkitchenInsideCabinet": new Room(
        "IIkitchenInsideCabinet",
        "Kitchen",
        "You open the cabinet's top drawer, and find a handful of random utility items: scissors, a couple of pens, four rubber bands, and two clothespins.",

        "You open the cabinet's top drawer, and find a handful of random utility items: scissors, a couple of pens, four rubber bands, and two clothespins.",
        [screwdriver],
        false,
        []),

    "IIhallway": new Room(
        "IIhallway",
        "Hallway",
        "You step through the round open entrance into a wide hallway. Immediately to your right is a similar round passage into what looks like the living room. Two vases " +
        "guard this circular hole in the concrete wall. One on each side, they help the tall plants inside to reach high above their own small frames. High enough, in fact, " +
        "to curve inwards toward the top, geometrically complementing the arch behind them.<br/><br/>Throughout the hallway to your left, a series of doors populate either " +
        "side. Each has its own subtle motif, which helps define the small indentations that bloom out of the door and blend into the walls' pattern.<br/><br/>Indeed, " +
        "these walls seem to have flourished somewhere between the utility of reducing the sound reflection in this mostly empty corridor and the artistic need to observe " +
        "the house's arteries from within. Along their length, they are sculpted with minimalistic waves that match the hallway's flow.",

        "You step into the hallway, and are once again greeted by the wavy design on the walls, as each of the doors seems to say 'hello' and welcome you to enter. This " +
        "is the house's gently pulsing heart, and everywhere it leads is a good place to be.",
        [compartment],
        false,
        []),

    "IIhallwayInsideCompartment": new Room(
        "IIhallwayInsideCompartment",
        "Hallway",
        "You align the door, and use the screwdriver to put the top hinge back in place. You give it an experimental pull, and it smoothly swings open.<br/><br/>Inside, there " +
        "are two shelves. On the top shelf, a large group of tools are gathered around lubricants and oil cans like kids around a teacher. Beneath, a pair of inline skates " +
        "lay beside a pair of ice skates. You grab one of the inline skates and flip it in your hand. You give the wheels a spin, and feel satisfied with the free-flowing " +
        "movement they display in return.<br/><br/>Entranced by their rotating motion, <i>you cast your memory back to sunny afternoons spent with some of the best people around. " +
        "Some on their bikes, some in skates; you recall moving along the care-free seaside for hours at a time. The orange-red pavement below goes on for stretches of " +
        "smooth and rough, often with enough pebbles to create a chaotic obstacle course for those on small wheels. The occasional steep descent makes you grab onto a bike-riding " +
        "friend for support, and the both of you laugh as you turn into an amorphous sort of tricycle.<br/><br/>The promise of chocolate cookies and pineapple juice at the end " +
        "of the journey keeps your tired legs moving. Everyone in the group agrees that you're absolutely going to end the day in calory excess with the snacks, but you think " +
        "you're 90% sure of a suspicion that you must have burnt more than you'll eat... Right? Probably.<br/><br/></i>A small button on the compartment's top left calls you back. " +
        "You'd almost miss it; a mere bump with no discernable border or color change, it seems to be effectively camouflaged. You give it a hesitant press, and hear a click " +
        "down the hall. Looks like the lobby door is unlocked.",

        "You run your hand along the protrusion on the wall, and open the compartment. The lubricants and oils still seem to be lecturing the tools about something only they " +
        "understand. On the shelf below, the two pairs of skates sleep tightly until the next time they're needed.",
        [],
        false,
        ['screwdriver'],
        "You crouch in front of the compartment, and inspect the door. It seems a bit crooked. You lean in to take a closer look, and find that one of the hinges is loose. " +
        "Peeking through a small gap on the door's right, the inside is too dark to see. You give the door a try, but it seems to be forcing, so you let go. Maybe there's " +
        "something around you can fix it with.",
        ["lobbyKey"]),

    "IIhomeOffice": new Room(
        "IIhomeOffice",
        "Home Office",
        "You open the door, and are greeted by an imposing figure.<br/><br/>Sitting near the far wall, a gray desk proudly displays its exquisite outline. The asymmetrical " +
        "clash between the slimmer bottom and the larger top quickly becomes a background detail to the atypical surface, which exhibits indented curves that gradually lead " +
        "to different levels. Were you to work at this desk, various items would populate these pits and cavities that surround a flat portion right in the middle, to " +
        "better organize your space.<br/><br/>But by far, what sucks your attention in the most is the office's centerpiece that hangs above the desk. With its tip centered " +
        "high up, the otherwise featureless ceiling morphs into an inverted, ever-so-gently curving pyramid. A rectangular window extends through the far wall's full " +
        "width behind the workspace. Light shines through from the outside, and provides the perfect backdrop for the discontinuous shape that the ceiling and desk compose." +
        "<br/><br/>Along most of the wall to your right, wooden shelves emerge from the concrete with effortless ease, displaying groups of books, and gracefully-shaped " +
        "lamps. Their warm lighting softens the room's almost intimidating personality, and some even cast soft shadows that blend with the light emitted from their brethren. " +
        "Inside one particular wooden nest, a small faucet protrudes, accompanied by an elegant tea kettle and a basket filled with tea bags of all flavors. But not red " +
        "fruit. Never red fruit. Ever.<br/><br/>The wall to your left is decorated with a group of paintings and prints, arranged in a geometrical fashion that satisfyingly " +
        "fits the many pieces with round and square corners.<br/><br/>The top contains a line of abstract prints of lines and curves, lights and shadows. Every print seems " +
        "to mimick the energy and movement (or lack thereof) of the waves beneath it. Devoid of any colors, their focus is on shape rather than visual. You get the idea that " +
        "these are meant to evoke thoughts, not feelings.<br/>Lining up at the middle, a series of paintings of oceans and waves crashing; each circular golden frame " +
        "delineates these hand-sized windows to other worlds. Your viewport may be small, but the imagination it feeds is endless.<br/>In the center just below them, a " +
        "rectangular canvas brings into view a lady with her hair up. An elaborate braid pulled up into a bun reveals her neck, and her shoulders turn into a thin, black " +
        "layer of cloth near the edges. The main strokes are careful and firm, while loose strands of hair and delicate lines from the lady's shirt are rendered with a " +
        "free-handed and fine-lined attitude. To each side, another series of similar pieces describe different people. Each with their own hairstyle, clothing, and skin, " +
        "they make up a group of nonchalant non-observers to the work that would be performed in this room. You gather this to be a unique way to feel the company while " +
        "being humbled, in a sense.",

        "You return once more to the home office. Strangely, you are starting to feel accustomed to the presence of such an angular ceiling piece. The lineup of paintings " +
        "of people looking the other way still feels weird, but it does give the room – and you – a certain sense of company.",
        [garden],
        false,
        []),

    "IIgamingRoom": new Room(
        "IIgamingRoom",
        "Gaming Room",
        "You place your bracelet near the electronic sensor, and a small click briefly rings through the air. You give the handle a try, and the door to the gaming room " +
        "opens. Its walls are crowded with game posters. Each has a small green tree logo at the bottom.<br/><br/>Immediately to your left, there's a large television " +
        "atop a long piece of furniture. On the shelf below the television, there is a line of different consoles. A bit farther into the center of the room, a large " +
        "couch is accompanied by a couple of armchairs.<br/><br/>Behind the couch, there is a relatively spacious square area, where the walls are padded. Printed on " +
        "the floor at one of the edges, the words \"VR Corner\" tell you all you need to know about what this is for.<br/><br/>On the opposite corner, a simple desk " +
        "contains a computer. A large screen occupies the top part of the desk, along with a keyboard, a mouse, and a game controller. Above the standing computer " +
        "screen, there's another screen embedded into the wall. It seems useful for co-op playing on the computer, but you assume that it wouldn't be used much otherwise.",

        "You enter the gaming room. You imagine the amount of countless afternoons and evenings playing here, alone or with friends. It's a comfortable place to be.",
        [card],
        false,
        ['bracelet'],
        "You try opening the gaming room's door. The handle turns, but the door doesn't unlock. You notice a small electronic sensor above it. You look around, and there " +
        "seems to be one in almost every door, but they are all turned off. Someone must have forgotten to unlock this door."),

    "IIlobby": new Room(
        "IIlobby",
        "Lobby Area",
        "You slide the door to the lobby open, and enter.<br/><br/>This snub patch of hallway is guarded by a glass ceiling, through which the gray light of the overcast " +
        "sky comes in. A couple of lamps are built into the walls, and there is a shoe rack to your right that grows into a console table with a vase and some picture " +
        "frames.<br/><br/>A couple of paintings give the otherwise plain concrete walls something to look at. Each more fascinating than the other, their suggestivist " +
        "nature makes you stop and stare for a while. You have nowhere else to be, in this realm of calmness and safety. You approach each painting, and take your time " +
        "analyzing them.<br/><br/>You look at a painting of fabulous and flamboyant colors that coat a town and its people, in what seems to be a celebration; every " +
        "single one having lived a life that never existed. You lose track of time imagining what they've been through, why they look the way they look, how they are " +
        "and who they know. You feel helpless as a character, turning into dust in the background away from the crowd's attention, looks directly into your eyes before " +
        "further vanishing into forgetfulness without ever actually moving.<br/><br/>You move across the lobby hallway and take a look at the other. A simple frame with " +
        "broad strokes effectively conveys far-ranging wintry mountains in the background, and gray clouds above that scatter light coming not from beyond, but from beneath. " +
        "Your eyes trail to the bottom of the painting, where the Sun lays with half its spherical body immersed in a lake. Its wincing expression alarms the many " +
        "animals and creatures that surround it; some stare in awe and concern, others make preparations to try to do something – anything at all – to help the Sun " +
        "recover. A whole ecosystem paused: rivalries, friendships, and symbiotic relationships put on hold with concern for the greater good.<br/><br/>You step to your " +
        "right, and look at your reflection on a mirror atop the console table. You take a moment to wonder why the real world is unable to do the same.",

        "You step into the lobby, and observe the paintings again. You stand there, taking them in once more; they seem to gather a different meaning every time you " +
        "look at them. And each time, you discover a new detail you hadn't seen before. You look around at the many doors to choose from.",
        [],
        false,
        ['lobbyKey'],
        "You try to slide the door open, but it doesn't move. It seems to be locked. Maybe there's something around that will open it?"),

    "IIbathroom": new Room(
        "IIbathroom",
        "Bathroom",
        "You enter the common bathroom, and are surprised by its lovely, minimalistic style. Without the wooden details you found in other rooms, the bathroom is fully " +
        "built of concrete. The glass ceiling once more allows daylight to pass through, reducing the need to use the artificial lighting.<br/><br/>In this corridor of " +
        "sorts, there is a toilet setup to your left; a spacious shower at the far end, and a curvy washbasin that flows out of the wall. Above it, a big round mirror " +
        "reflects your own image.<br/><br/>The room's bright walls and floor bounce the light from above, and perfectly illuminate your face. You do a couple of poses " +
        "and faces in front of the mirror. You look amazing, same as you always do.",

        "You enter the common bathroom, and are showered with its light again. You feel kind of weird about how good the lighting makes you feel, but it makes you feel " +
        "great nonetheless.",
        [],
        false,
        []),

    "IIbedroom": new Room(
        "IIbedroom",
        "Bedroom",
        "You walk into the bedroom.<br/><br/>More suggestivist paintings grace the bedroom walls. These are wider than the ones in the lobby, but have the same type of " +
        "simple black framing that, in contrast with the light gray walls, really brings out the flamboyant painterly nature of these pieces. These seem to be less " +
        "color-splashed than the ones before, though. You notice a different focus, as exaggerated (almost surrealistic) landscapes allude to Autumn as a theme. The " +
        "dominant presence of yellow and brown color palettes makes the paintings pop out, as well as creates a pleasant division between the imaginary worlds they represent " +
        "and the room's edges and curves.<br/><br/>The ceiling isn't fully made of glass, but there are glass openings in certain spots which produce interesting " +
        "criss-crosses of daylight that enter the room at various angles.<br/><br/>Occasional wooden slat details match the wooden flooring, adding a warmer touch to " +
        "the room.<br/><br/>On the wall to your right, a television hangs overhead. In the far corner, there is a comfortable armchair with a small table that holds a " +
        "couple of books and a lamp. To your left, there is a door that seems to lead to the bathroom. Beside it, an embedded concrete wardrobe with sliding doors; " +
        "two are made of wood, the other is a large mirror, top to bottom.<br/><br/>Centered on the far wall, a large bed extends beyond the middle of the room. It's " +
        "almost as long as it is wide, and its frame emerges out of the floor. An off-white weighted duvet covers the bed and falls down to the sides, with a couple of " +
        "thinner blankets folded on top of it. Two concrete nightstands flank the large bed, one on each side.",

        "You go into the bedroom, and take a second to appreciate the color scheme in front of you. Your eyes read the room top-to-bottom and then side-to-side, starting " +
        "with the beautiful glass openings, moving on to the lovely and imaginative paintings, and finishing on the armchair, the wardrobe, and the bed.",
        [bracelet],
        false,
        []),

    "IIsuiteBathroom": new Room(
        "IIsuiteBathroom",
        "Suite Bathroom",
        "You enter the bathroom adjacent to the bedroom. To your left, the toilet setup. Behind glass sliding doors to your right, a large bathtub with a shower occupies " +
        "the length of the wall.<br/><br/>Along the wall opposite to you, two washbasins sit inside a united structure that comes out of the wall and runs across it. " +
        "Each has a small cabinet beneath, and a large mirror above follows the wall, ignoring the division between the washbasins.<br/><br/>There is an indentation above, " +
        "complete with a skylight that keeps the space well lit during the day. The light cream concrete walls and simple tile floor bounce the light around.<br/><br/>" +
        "A few vases adorn the room, and a couple of prints on the wall to your right display abstract strokes and shapes.",

        "You enter the adjacent bathroom once more. The skylight feeds the plants as the abstract posters reflect on the mirror. You look lovely as ever, by the way.",
        [],
        false,
        []),

    "IIhomeCinema": new Room(
        "IIhomeCinema",
        "Home Cinema",
        "You enter a long, inclined room. The sounds of the world stay outside, as it's dead quiet inside.<br/><br/>There is a center aisle that passes through various " +
        "rows of comfortable, reclining armchairs, each with a support for food and drinks, including a small tray to one side that can be rotated onto the sitter's lap." +
        "<br/><br/>On your left, there's a projector hanging from the ceiling that points to the other side. Across, at the far end, there is a large silver screen.<br/><br/>" +
        "Though there seem to be windows, they're currently covered by black-out blinds. This is not the first time you've seen such blinds, but the windows were " +
        "uncovered everywhere else. Given the movie theater-like nature of the room, you figure that it makes sense to keep the blinds down, even during the day.<br/><br/>" +
        "Lined up along the wall to your left and sparsely placed in other walls as well, multiple framed posters of movies decorate the area. You turn on the lights " +
        "to see them more clearly. Unlike previous posters you've found, at the bottom of each of these, there is a small green tree logo. All seem to be written or " +
        "produced by Arboresis.",

        "You enter the home cinema, and find yourself in the midst of the aisle, surrounded by armchairs. You rest a hand on one as you look at the many movie posters " +
        "here, each with the logo of a small green tree at the bottom.",
        [],
        false,
        []),

    "IIfinale": new Room(
        "IIfinale",
        " ",
        " ",

        " ",
        [],
        false,
        []),

}
roomList.start.visited = true;


//REGULAR START
roomList.start.addExit("startgame", roomList.Icorridor);

//Part I shortcut:
//roomList.start.addExit("startgame", roomList.Ikitchen);

//Part II:
//roomList.start.addExit("startgame", roomList.IIbeginning);

//Part II shortcut:
//roomList.start.addExit("startgame", roomList.IIkitchen);




//------------------------// APARTMENT //------------------------//

//The Ceaseless Corridor
roomList.Icorridor.addExit("north", roomList.Ientrance);

//Entrance Hall
roomList.Ientrance.addExit("north", roomList.Ikitchen);
roomList.Ientrance.addExit("south", roomList.Icorridor);
roomList.Ientrance.addExit("southeast", roomList.IelectricalCloset);
roomList.Ientrance.addExit("east", roomList.IlivingRoom);
roomList.Ientrance.addExit("west", roomList.Ihallway);

//Electrical Closet
roomList.IelectricalCloset.addExit("west", roomList.Ientrance);

//Living Room
roomList.IlivingRoom.addExit("west", roomList.Ientrance);

//Kitchen
roomList.Ikitchen.addExit("north", roomList.IlaundryRoom);
roomList.Ikitchen.addExit("south", roomList.Ientrance);
roomList.Ikitchen.addExit("open", roomList.IkitchenDrawer);
roomList.IkitchenDrawer.addExit("back", roomList.Ikitchen);

//Laundry Room
roomList.IlaundryRoom.addExit("south", roomList.Ikitchen);

//Hallway
roomList.Ihallway.addExit("north", roomList.IhomeOffice);
roomList.Ihallway.addExit("south", roomList.Ibathroom);
roomList.Ihallway.addExit("east", roomList.Ientrance);
roomList.Ihallway.addExit("west", roomList.Ibedroom);

//Bathroom
roomList.Ibathroom.addExit("north", roomList.Ihallway);

//Home Office
roomList.IhomeOffice.addExit("south", roomList.Ihallway);
roomList.IhomeOffice.addExit("climb", roomList.IhomeOfficeOnTopOfChair);
roomList.IhomeOfficeOnTopOfChair.addExit("down", roomList.IhomeOffice);

//Bedroom
roomList.Ibedroom.addExit("east", roomList.Ihallway);
roomList.Ibedroom.addExit("sleep", roomList.sleep);

roomList.sleep.addExit("sleep", roomList.IIbeginning);
roomList.IIbeginning.addExit("north", roomList.IIentrance);




//------------------------// DREAM HOUSE //------------------------//

//Entrance Hall
roomList.IIentrance.addExit("north", roomList.IIhallway);
roomList.IIentrance.addExit("awaken", roomList.IIfinale);

//Hallway
roomList.IIhallway.addExit("north", roomList.IIbathroom);
roomList.IIhallway.addExit("southeast", roomList.IIentrance);
roomList.IIhallway.addExit("southwest", roomList.IIgamingRoom);
roomList.IIhallway.addExit("east", roomList.IIlivingRoom);
roomList.IIhallway.addExit("west", roomList.IIlobby);
roomList.IIhallway.addExit("open", roomList.IIhallwayInsideCompartment);

roomList.IIhallwayInsideCompartment.addExit("back", roomList.IIhallway);

//Living Room
roomList.IIlivingRoom.addExit("south", roomList.IIkitchen);
roomList.IIlivingRoom.addExit("west", roomList.IIhallway);
roomList.IIlivingRoom.addExit("northwest", roomList.IIlibraryCorner);

//Library Corner
roomList.IIlibraryCorner.addExit("east", roomList.IIlivingRoom);

//Kitchen
roomList.IIkitchen.addExit("north", roomList.IIlivingRoom);
roomList.IIkitchen.addExit("open", roomList.IIkitchenInsideCabinet);

roomList.IIkitchenInsideCabinet.addExit("back", roomList.IIkitchen);

//Bathroom
roomList.IIbathroom.addExit("south", roomList.IIhallway);

//Gaming Room
roomList.IIgamingRoom.addExit("north", roomList.IIhallway);

//Lobby
roomList.IIlobby.addExit("north", roomList.IIhomeOffice);
roomList.IIlobby.addExit("south", roomList.IIhomeCinema);
roomList.IIlobby.addExit("east", roomList.IIhallway);
roomList.IIlobby.addExit("west", roomList.IIbedroom);

//Home Office
roomList.IIhomeOffice.addExit("south", roomList.IIlobby);

//Guest Bedroom
roomList.IIhomeCinema.addExit("north", roomList.IIlobby);

//Bedroom
roomList.IIbedroom.addExit("east", roomList.IIlobby);
roomList.IIbedroom.addExit("south", roomList.IIsuiteBathroom);

//Suite Bathroom
roomList.IIsuiteBathroom.addExit("north", roomList.IIbedroom);