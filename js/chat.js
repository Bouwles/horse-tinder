// Horse Tinder — chat personalities and the reply engine.
// Each horse gets facts to answer questions with, questions to ask you back,
// its own photos to send, and a voice (tics, caps, lowercase, redaction).

const CHAT = {
  thunder: { nick: 'habibi', doing: ['doing laps of the desert for no reason', 'staring down a quad bike. it blinked first', 'kicking a stable door (door #4)'],
    job: 'i race quad bikes in the desert. they have never won', hobby: 'sprinting. then sprinting back. then again but angrier', food: 'dates. the fruit. and also dates. with you 😏',
    fear: 'coming second. and plastic bags', secret: 'the 3 stable doors? they started it', date: 'sunset gallop on the dunes. first one to the top picks dinner. it will be me', gossip: 'thinks he\'s fast. cute',
    asks: [{ q: 'be honest. how fast can u run', re: ['{ans}? i do that walking backwards', 'ok that\'s kinda hot. race me'] }, { q: 'what\'s the most competitive thing u ever did', re: ['{ans}? amateur. i once raced a plane', 'respect. we\'d be unstoppable. or we\'d destroy each other'] }],
    flattered: ['i know. i\'ve seen myself in the quad bike mirror'], insulted: ['say that to me at my trot'], echo: ['{word}? i could beat {word} in a race'],
    pics: [{ img: 'thunder-1', cap: 'my stable is on the 140th floor' }], tics: [' 🏁'], carrot: ['one carrot?? i burn 14,000 of these a day'] },

  buttercup: { nick: 'sugar', doing: ['crying at a country song again', 'braiding my own tail (it\'s hard)', 'practising my line dance'],
    job: 'i give trail rides to tourists and cry when they leave', hobby: 'line dancing, crying, line dancing while crying', food: 'sugar cubes and sweet tea (don\'t tell my vet)',
    fear: 'the day the music stops 😢 also tractors', secret: 'i\'ve never met a real cowboy. they all drive trucks now', date: 'barn dance!! i\'ll wear my good halter 🌻', gossip: 'bless her heart',
    asks: [{ q: 'what\'s ur favourite song?? i need to know', re: ['"{ans}" 😭 that one makes me cry every time', 'ok adding "{ans}" to my barn playlist 🌻'] }, { q: 'do u cry at movies? be honest', re: ['{ans}? same honestly. i cried at a weather report', 'aw we\'re so alike 🥹'] }],
    flattered: ['stoppp 🥹 ur gonna make me cry'], insulted: ['well bless YOUR heart'], echo: ['{word} reminds me of a song 🎶', 'aw, {word} 🥹'],
    pics: [{ img: 'buttercup-1', cap: 'picked these for u 🌻' }], tics: [' 🌻', ' y\'all'], carrot: ['a CARROT 😭 i\'m literally crying'] },

  greg: { nick: 'mate', doing: ['leaning on the fence', 'standing next to the fence', 'looking at the fence from the other side. mixing it up'],
    job: 'i supervise a fence. going well', hobby: 'fences mostly. some grass', food: 'grass. the green kind', fear: 'someone moving the fence',
    secret: 'sometimes i lean on the OTHER side of the fence. nobody knows', date: 'we could go stand by the fence. i\'ll show you the good bit', gossip: 'has one personality and it\'s a fence',
    asks: [{ q: 'do you have a fence', re: ['{ans}. nice. very nice', 'wow. ok. tell me more about your fence situation'] }, { q: 'what did you do today', re: ['{ans}? busy. i stood by the fence', 'nice. i also had a day'] }],
    flattered: ['oh. thanks. the fence helps'], insulted: ['ok'], echo: ['{word}. nice', 'is {word} near a fence'],
    pics: [{ img: 'greg-1', cap: 'fence (different angle)' }, { img: 'greg-2', cap: 'new fence dropped' }], carrot: ['oh. a carrot. lovely. thanks'] },

  horsey: { nick: 'bestie', doing: ['rolling in mud for content', 'blepping', 'vibing (aggressively)'],
    job: 'full-time meme. part-time horse', hobby: 'blepping and going viral against my will', food: 'whatever fell on the floor', fear: 'being named by the internet again',
    secret: 'my real name is Gerald. not that Gerald', date: 'mud spa day. bring snacks', gossip: 'has been doing the same bit for 3 years',
    asks: [{ q: 'rate my blep out of 10', re: ['{ans}?? i\'ve been robbed', '{ans}. i accept. barely'] }, { q: 'what would u name me if u could', re: ['"{ans}" is SO much better than horsey mchorseface', '{ans}... no. still better than what i got tho'] }],
    flattered: ['omg ur so real for that'], insulted: ['ratio'], echo: ['{word}?? it\'s giving {word}', 'no thoughts just {word}'],
    pics: [{ img: 'horsey-1', cap: 'found a butterfly. named it horsey mchorseface 2. it didn\'t consent either' }], tics: [' 💀'], carrot: ['🥕 +1000 aura'] },

  pablo: { nick: 'mi musa', doing: ['painting a horse. it\'s me', 'standing very still so the birds can land', 'thinking about blue'],
    job: 'artist. my medium is mud and ambition', hobby: 'self portraits. there are 400', food: 'paella (just the rice)', fear: 'art critics. and the colour beige',
    secret: 'the birds are paid. in seeds', date: 'a gallery opening. i am the gallery', gossip: 'wouldn\'t know art if it kicked him',
    asks: [{ q: 'what\'s your favourite colour. choose carefully', re: ['{ans}. bold. i respect it', '{ans}?? the colour of mediocrity. i will paint it anyway'] }, { q: 'if you were a painting what would you be', re: ['{ans}. i can see it. i will paint it on a barn', 'ah, {ans}. very... derivative'] }],
    flattered: ['finally someone with taste'], insulted: ['you don\'t understand my work'], echo: ['i will paint {word}', '{word} is a colour, if you think about it'],
    pics: [{ img: 'pablo-1', cap: 'my cousin painted this. mid' }, { img: 'pablo-2', cap: 'my latest sculpture' }], tics: [' 🎨'], carrot: ['orange. the colour of passion. gracias'] },

  shadow: { nick: 'stranger', doing: ['standing in the dark', 'galloping at midnight. it is 2pm', 'watching. from afar'],
    job: 'i don\'t work. i appear', hobby: 'moonlight', food: 'nothing. i run on mystery', fear: 'sunlight. and small talk',
    secret: 'i\'m really into romcoms', date: 'midnight. edge of the paddock. come alone', gossip: 'talks too much',
    asks: [{ q: 'what are you afraid of', re: ['{ans}. interesting. i fear nothing. except small talk', '...i\'ll remember that'] }],
    flattered: ['...i know'], insulted: ['...'], echo: ['{word}. hm.', '...{word}'], dodge: ['some questions are better left unanswered', '...'],
    pics: [{ img: 'shadow-1', cap: 'tonight.' }], carrot: ['...thank you'] },

  princess: { nick: 'peasant', doing: ['getting my mane blown out', 'sending back my hay. it was domestic', 'ignoring 40 other matches'],
    job: 'being daddy\'s favourite', hobby: 'halter shopping. yachting. being right', food: 'organic imported alfalfa. hand fed', fear: 'regular hay. and poor people',
    secret: 'nobody has ever ridden me. nobody is qualified', date: 'dinner on daddy\'s yacht. you can watch', gossip: 'is SO desperate lol',
    asks: [{ q: 'what do u drive', re: ['{ans}? 😬 ok', 'ew, {ans}. i take the yacht everywhere'] }, { q: 'how many carrots do you make a year', re: ['{ans}?? my mane costs more than that', 'hm. {ans}. we\'ll work on it'] }],
    flattered: ['obviously'], insulted: ['blocked. jk. but ur on thin ice'], echo: ['{word}? is that designer', 'ew, {word}'],
    pics: [{ img: 'princess-1', cap: 'daddy\'s boat. mine now' }], tics: [' 💅'], carrot: ['is it organic'] },

  bigtony: { nick: 'kid', doing: ['counting carrots. MY carrots', 'having a sit-down with my associates', 'standing on a box. for business reasons'],
    job: 'waste management. carrot waste. don\'t ask', hobby: 'bocce, family, respect', food: 'my nonna\'s cannoli. and carrots that fell off a truck', fear: 'nothing. except tall horses. they know what they did',
    secret: 'i\'m not big. never was. don\'t tell nobody', date: 'i know a guy at the feed store. private table', gossip: 'owes me money',
    asks: [{ q: 'you got a family?', re: ['{ans}. family is everything, kid', 'good. nobody messes with family'] }, { q: 'you ever been to staten island', re: ['{ans}? you gotta come. i\'ll take you on the ferry', '{ans}. we\'ll fix that'] }],
    flattered: ['heh. you\'re alright kid'], insulted: ['you just made a big mistake. BIG. like me'], echo: ['{word}? i know a guy', 'we don\'t talk about {word} in this family'],
    pics: [{ img: 'bigtony-1', cap: 'my ride. i wave at the lady' }, { img: 'bigtony-2', cap: 'my associate, Sal' }], tics: [', capisce?', '. fuggedaboutit'], carrot: ['now THAT\'S respect'] },

  diesel: { nick: 'wee one', doing: ['pulling a bus. for fun', 'sitting on something by accident', 'conditioning my feathers'],
    job: 'i pull things. carts, trucks, a small house once', hobby: 'pulling contests and gentle walks', food: 'a whole bale. as a starter', fear: 'small chairs',
    secret: 'i cried at Babe (1995)', date: 'i\'ll pull you round the park in a cart. romantic', gossip: 'couldn\'t pull a wee wagon',
    asks: [{ q: 'what\'s the heaviest thing you ever lifted', re: ['{ans}? aw. i warm up with a van', 'respect. we could pull something together'] }],
    flattered: ['aw away wi ye 😊'], insulted: ['i\'ll sit on ye'], echo: ['could i pull {word}? aye, probably', '{word}. aye.'],
    pics: [{ img: 'diesel-1', cap: 'i sat on it. again' }, { img: 'diesel-2', cap: 'rate my back end' }], tics: [' aye'], carrot: ['one? for a lad my size? aw go on then'] },

  neighington: { nick: 'darling', doing: ['taking tea', 'having one\'s mane powdered', 'looking down on the commoners'],
    job: 'i summer. i winter. occasionally i polo', hobby: 'polo, dressage, correcting pronunciation', food: 'cucumber sandwiches (the cucumber)', fear: 'being mistaken for new money',
    secret: 'i was actually born in Swindon. near Greg', date: 'polo on sunday. do wear a hat', gossip: 'is frightfully common',
    asks: [{ q: 'and which school did you attend, darling', re: ['{ans}? never heard of it. charming', 'ah, {ans}. how... plucky'] }, { q: 'do you summer anywhere', re: ['{ans}. how quaint', 'splendid. {ans} is lovely this time of year, i\'m told'] }],
    flattered: ['one is aware'], insulted: ['how frightfully rude'], echo: ['{word}? how terribly modern', 'one doesn\'t discuss {word} at the table'],
    pics: [{ img: 'neighington-1', cap: 'sunday polo' }, { img: 'neighington-2', cap: 'great-great-grandsire\'s armour' }], tics: [', darling'], carrot: ['how thoughtful. one shall have it peeled'] },

  kevin: { nick: 'mate', doing: ['writing puns', 'laughing at my own pun', 'rehearsing for open mic'],
    job: 'stand-up comedian. mostly sit-down, i\'m short', hobby: 'puns. and more puns', food: 'hay-lapeños 😂', fear: 'silence after a joke',
    secret: 'i\'ve done the same 3 jokes since 2019', date: 'come to my open mic. please. nobody comes', gossip: 'wouldn\'t know a joke if it neighed at him',
    asks: [{ q: 'what\'s ur favourite joke. mine is all of mine', re: ['{ans} 😂😂 ok good. not as good as mine', 'lmao, {ans}. stealing that'] }],
    joke: ['why did the horse go behind the tree? to change his jockey 😂', 'what do u call a pony with a cough? a little hoarse 😂', 'what does a horse say when it\'s done eating? that\'s all i hay 😂'],
    flattered: ['ur making me blush. and neigh'], insulted: ['heckler!!'], echo: ['{word}? more like {word}-neigh 😂', 'i had a pun about {word} but it was unstable'],
    pics: [{ img: 'kevin-1', cap: 'my stage. open mic night. 3 ppl came. 2 were horses' }], tics: [' 😂'], carrot: ['what did the carrot say to the horse? nothing, carrots can\'t talk 😂 thank u'] },

  chad: { nick: 'bro', doing: ['doing set 4 of 12 on the hay bale press', 'drinking a protein oat shake', 'doing leg day (it\'s always leg day)'],
    job: 'personal trainer. my clients are mostly donkeys', hobby: 'lifting, lifting heavier, talking about lifting', food: '9 buckets of protein oats. no cheat days', fear: 'rest days',
    secret: 'my face is kinda normal. that\'s why no face pics', date: 'gym date. i\'ll spot you', gossip: 'skips leg day. all four of them',
    asks: [{ q: 'bro what\'s ur max squat', re: ['{ans}?? bro i warm up with that 💪', '{ans}. respect. we can work on it'] }, { q: 'how many times a week do u train', re: ['{ans}? bro. it\'s 7. it\'s always 7', '{ans} is a start bro'] }],
    flattered: ['bro 😳 ur gonna make me flex'], insulted: ['bro that\'s a lot of energy for someone who doesn\'t lift'], echo: ['{word}? bro that\'s a whole workout', 'can u bench {word} tho'],
    pics: [{ img: 'chad-1', cap: 'my morning. still no face' }], tics: [' bro', ' 💪'], carrot: ['how many grams of protein in this bro'] },

  juan: { nick: 'mi amor', doing: ['practising salsa', 'writing you a poem', 'serenading a fence post'],
    job: 'dance instructor. salsa, bachata, the fine step', hobby: 'dancing under the stars', food: 'ceviche (i just smell it) and fresh hay', fear: 'bad rhythm',
    secret: 'i have two left hooves. i hide it with confidence', date: 'salsa at midnight. i lead, you fall in love', gossip: 'cannot dance',
    asks: [{ q: 'can you dance, mi amor?', re: ['{ans}? i will teach you. hooves on my shoulders', '{ans}... we can work with this 🌹'] }],
    flattered: ['ay, you make me blush 🌹'], insulted: ['my heart... it breaks like a bad tango'], echo: ['{word}... como la luna 🌙', 'i will write a song about {word}'],
    pics: [{ img: 'juan-1', cap: 'our honeymoon spot 😏' }], tics: [' 🌹', ' mi amor'], carrot: ['a carrot... for me? te amo'] },

  lightning: { nick: 'SPEED', doing: ['RUNNING', 'FINISHING WHATEVER U WERE ABOUT TO SAY', 'WAITING FOR U TO TYPE FASTER'],
    job: 'RETIRED RACEHORSE. RETIRED AT 4. TOO GOOD', hobby: 'GOING FAST. THEN FASTER', food: 'WHATEVER I CAN EAT WHILE RUNNING', fear: 'TRAFFIC. AND WAITING',
    secret: 'I LOST ONE RACE. TO A GOOSE', date: 'SPEED DATE. 4 SECONDS. GO', gossip: 'IS SO SLOW',
    asks: [{ q: 'HOW FAST DO U TYPE', re: ['{ans}?? TOO SLOW. JK. KINDA', 'OK OK THAT\'S DECENT'] }],
    flattered: ['I KNOW'], insulted: ['TOO FAST TO CARE'], echo: ['{word}!! IS IT FAST?', 'NO TIME FOR {word}'],
    pics: [{ img: 'lightning-1', cap: 'MY OFFICE' }, { img: 'lightning-2', cap: 'TRAFFIC. I HATE TRAFFIC' }], carrot: ['ATE IT ALREADY'] },

  concrete: { nick: '.', doing: ['standing', 'still standing', 'being here'],
    job: 'i am a landmark', hobby: '.', food: 'rain', fear: 'demolition', secret: 'i can see your house from here', date: 'come stand next to me. forever', gossip: 'moves too much',
    asks: [{ q: 'do you also stand still', re: ['.', '{ans}. i know.'] }], flattered: ['.'], insulted: ['.'], echo: ['...{word}', '.'], dodge: ['.', '...'],
    pics: [{ img: 'concrete-1', cap: 'my view since 2008' }], carrot: ['i cannot eat. but thank you'] },

  ziggy: { nick: 'friend (horse friend)', doing: ['eating grass like a normal horse', 'running from a lion (normal horse thing)', 'standing in a totally normal horse pattern'],
    job: 'normal horse job. horse stuff', hobby: 'running. from nothing. no reason', food: 'grass. regular grass. like horses eat', fear: 'lions. which all horses fear. normally',
    secret: 'ok fine. i\'m 12% zebra. max', date: 'let\'s go to the savanna. i mean field', gossip: 'looks kinda stripey if u ask me',
    asks: [{ q: 'do u think i look like a horse', re: ['{ans}. correct. i am a horse', 'thank u. finally someone gets it'] }],
    flattered: ['thank u. as a horse'], insulted: ['is this about the stripes'], echo: ['{word}? normal horses love {word}', 'as a horse, i also enjoy {word}'],
    pics: [{ img: 'ziggy-1', cap: 'my ex. long story' }], carrot: ['horses love carrots. i love carrots. because horse'] },

  gerald: { nick: 'young person', doing: ['having a nap. Not because I\'m old', 'looking for my glasses. They were on my head', 'learning the TikTok'],
    job: 'Retired. From being young. Lol', hobby: 'The TikTok, the fidget spinners, and bingo', food: 'Soaked hay. Easier on the teeth. Which are young', fear: 'Stairs. And people asking my age',
    secret: 'I am 41. Please delete this', date: 'An early bird dinner at 4pm. Then bed', gossip: 'is too young for me. I mean too old',
    asks: [{ q: 'What year were you born', re: ['{ans}! Same as me. Lol', 'Ah, {ans}. A great year. I was 29 then too'] }, { q: 'Do you like the modern music', re: ['{ans}. I enjoy the Beatles. They are new I believe', 'Me too. The kids call it a bop. Lol'] }],
    flattered: ['Oh my. Lol means lots of love'], insulted: ['In my day we had manners'], echo: ['What is {word}? Is it on the TikTok', '{word}! In my day we called that hay'],
    pics: [{ img: 'gerald-1', cap: 'Me and my buddy in \'17 (2017)' }, { img: 'gerald-2', cap: 'How I usually text' }], tics: [' Lol. - Gerald', ' - Gerald'], carrot: ['A carrot! Could you cut it up small please. For no reason'] },

  raven: { nick: 'whatever', doing: ['staring at the rain', 'listening to my chemical romance', 'writing poetry about hay'],
    job: 'i write poetry nobody reads', hobby: 'sad music. dark paddocks. existing', food: 'black licorice. and regret', fear: 'being perceived',
    secret: 'i love pink. don\'t', date: 'graveyard at midnight. bring snacks', gossip: 'is so basic',
    asks: [{ q: 'what music do u listen to', re: ['{ans}... ok that\'s actually not bad', 'ew, {ans}. whatever. it\'s fine'] }],
    flattered: ['whatever... thanks i guess 🖤'], insulted: ['cool. didn\'t care anyway'], echo: ['{word}. nothing matters', 'even {word} can\'t save us'],
    pics: [{ img: 'raven-1', cap: 'my happy place 🖤' }, { img: 'raven-2', cap: 'me looking into the void' }], carrot: ['orange sadness. thanks 🖤'] },

  skylar: { nick: 'babe', doing: ['filming a get ready with me', 'doing golden hour content', 'answering DMs (brand deals)'],
    job: 'content creator ✨ 48.2K followers', hobby: 'mane care, manifesting, sunsets', food: 'oat milk hay latte ✨', fear: 'bad lighting',
    secret: 'the wind machine is my assistant blowing on me', date: 'sunset beach shoot, u can be my photographer 💕', gossip: 'buys followers',
    asks: [{ q: 'what\'s ur sign babe', re: ['{ans}?? omg that makes sense ✨', '{ans} and me are SO compatible, i can feel it 💕'] }, { q: 'how many followers do u have', re: ['{ans}? omg cute 🥺', 'babe we need to grow ur brand'] }],
    flattered: ['omg stop ✨ can i screenshot this'], insulted: ['this is so negative. blocking energy ✨'], echo: ['{word} is such a vibe ✨', 'omg, {word} content idea'],
    pics: [{ img: 'skylar-1', cap: 'oat milk hay latte ✨' }], tics: [' ✨', ' 💕'], carrot: ['omg wait let me take a pic of it first'] },

  lilhay: { nick: 'fam', doing: ['recording in the studio', 'signing hooves', 'dropping a verse'],
    job: 'rapper. 3.4M monthly listeners. u heard', hobby: 'studio, tour, studio', food: 'gold-plated carrots', fear: 'the charts. jk. i own the charts',
    secret: 'i was in a boy band. "HAYSYNC". don\'t look it up', date: 'VIP at my show. front row. by the speakers', gossip: 'isn\'t even on spotify',
    asks: [{ q: 'what\'s ur favourite song of mine. careful', re: ['{ans}?? that\'s a deep cut. respect', 'hmm, {ans} wasn\'t mine but ok'] }],
    flattered: ['i know fam 🔥'], insulted: ['that\'s going in a diss track'], echo: ['{word}... that\'s a bar 🔥', 'writing a song called {word} rn'],
    pics: [{ img: 'lilhay-1', cap: 'the studio. don\'t touch anything 🎤' }], tics: [' 🔥'], carrot: ['my manager will send u merch'] },

  bjorn: { nick: 'vinur', doing: ['tölting', 'growing my winter coat', 'looking at the northern lights'],
    job: 'i carry tourists over lava. they scream. i do not', hobby: 'tölting. five gaits. i practise all of them', food: 'fermented hay. don\'t ask', fear: 'humidity',
    secret: 'technically i\'m pony-sized but if you say it i will leave', date: 'hot spring. then aurora. very romantic', gossip: 'has only 3 gaits. pathetic',
    asks: [{ q: 'how many gaits do u have', re: ['{ans}? i have five. just saying', '{ans}. hm. fine. for a non-viking'] }],
    flattered: ['takk 😊'], insulted: ['that is very un-viking of you'], echo: ['in iceland we have a 40-letter word for {word}', '{word}? cold. i like it'],
    pics: [{ img: 'bjorn-1', cap: 'my backyard tonight' }, { img: 'bjorn-2', cap: 'view from my hill' }], tics: [' já'], carrot: ['takk. carrots are rare in iceland. i will cherish it'] },

  chardonnay: { nick: 'hun', doing: ['pouring a glass 🍷', 'chasing brayden', 'sitting in book club (we don\'t read the book)'],
    job: 'mom. that\'s a full time job hun', hobby: 'wine, book club, zumba', food: 'wine. hay pairs well with wine', fear: 'brayden learning to jump fences',
    secret: 'book club is just wine club', date: 'wine tasting, no kids. brayden\'s at his dad\'s', gossip: 'is a total mess, love her tho',
    asks: [{ q: 'red or white?', re: ['{ans}! ok we can be friends 🍷', '{ans}?? hun no. we\'ll work on it'] }, { q: 'do u like kids? brayden is 1 and extremely fast', re: ['{ans}. good answer 😅', 'ok, {ans}. he bites btw'] }],
    flattered: ['aw hun 🥂'], insulted: ['i don\'t have time for this, i have a toddler'], echo: ['{word}? that pairs great with a chardonnay', 'omg {word}. that\'s so brayden'],
    pics: [{ img: 'chardonnay-1', cap: 'my happy place 🍷' }, { img: 'chardonnay-2', cap: 'school run' }], tics: [' 🍷', ' hun'], carrot: ['brayden stole it. sorry hun'] },

  officer: { nick: 'citizen', doing: ['patrolling the park', 'writing a ticket to a pigeon', 'guarding a hot dog stand'],
    job: 'mounted police. i\'m the mount', hobby: 'crowd control and getting patted', food: 'hot dog buns (confiscated)', fear: 'a horse with a bigger badge',
    secret: 'i\'ve never arrested anyone. i just stand there looking tall', date: 'ride-along. you ride. i\'m the along', gossip: 'has outstanding parking tickets',
    asks: [{ q: 'ever been arrested?', re: ['{ans}. noted. for the record', '{ans}... i\'ll let it slide this time 😉'] }],
    flattered: ['that\'s against regulations. but thank you'], insulted: ['that\'s a citation'], echo: ['{word}? that\'s probably illegal', 'i\'m gonna need to see {word}\'s ID'],
    pics: [{ img: 'officer-1', cap: 'my partner. we don\'t talk' }], tics: [' 10-4', ', citizen'], carrot: ['i\'ll have to log this as evidence 🥕'] },

  todd: { nick: 'you', doing: ['looking at brenda\'s instagram', 'eating an apple. brenda\'s favourite', 'standing where brenda used to stand'],
    job: 'i give pony rides. brenda gave pony rides too', hobby: 'journaling. about brenda', food: 'apples. because brenda', fear: 'seeing brenda with someone new',
    secret: 'i still have brenda\'s halter', date: 'the orchard? it\'s where brenda and i— sorry. the orchard', gossip: 'reminds me of brenda\'s new boyfriend',
    asks: [{ q: 'have u ever been dumped?', re: ['{ans}. yeah. it\'s the worst. brenda...', 'lucky. brenda did it by text'] }],
    flattered: ['brenda used to say that 😭'], insulted: ['that\'s exactly what brenda said'], echo: ['brenda loved {word}', '{word}... brenda would\'ve liked that'],
    pics: [{ img: 'todd-1', cap: 'brenda\'s favourite. i can\'t eat it. i just look at it' }], carrot: ['brenda never gave me a carrot 😭'] },

  carl: { nick: 'fam', doing: ['checking the HayCoin chart', 'pitching a VC (a goat)', 'minting my hoofprint'],
    job: 'founder & CEO of HayCoin. also my trailer', hobby: 'charts, podcasts, telling people about HayCoin', food: 'intermittent fasting (i\'m broke)', fear: 'the chart going down',
    secret: 'i have $3', date: 'let\'s co-found something', gossip: 'is still on hay 1.0',
    asks: [{ q: 'how much would u put into HayCoin', re: ['{ans}? bullish 🚀', '{ans}... we\'re so early fam'] }],
    flattered: ['wagmi 🚀'], insulted: ['have fun staying poor'], echo: ['{word} is going to the moon 🚀', 'what if {word} but on the blockchain'],
    pics: [{ img: 'carl-1', cap: 'HayCoin rn 🚀' }], tics: [' 🚀'], carrot: ['can i tokenize this'] },

  patches: { nick: 'my love', doing: ['looking at wedding venues', 'staring at our chat', 'naming our foals'],
    job: 'i work at a wedding barn. it\'s a sign', hobby: 'planning our future', food: 'whatever u like 🥺', fear: 'u leaving',
    secret: 'i already told my mom about u', date: 'let\'s just go to the courthouse', gossip: 'is not good enough for u',
    asks: [{ q: 'where do u see us in 5 years', re: ['{ans}?? i was thinking married but ok 🥺', 'omg same. basically same'] }, { q: 'do u want kids', re: ['{ans}. ok but i already named them', 'we can talk about it 🥺 (i picked names)'] }],
    flattered: ['I LOVE YOU. sorry. i mean thanks'], insulted: ['it\'s ok. i still love u'], echo: ['{word}... that\'s our song now', 'i love {word}. and i love you. too soon?'],
    pics: [{ img: 'patches-1', cap: 'i ordered this already' }], tics: [' 🥺'], carrot: ['i\'m going to frame it'] },

  domino: { nick: 'pal', doing: ['getting mistaken for a dog', 'counting my spots (again)', 'hiding from firefighters'],
    job: 'spot model. like a hand model but spots', hobby: 'connect-the-dots (on myself)', food: 'kibb— HAY. hay', fear: 'dalmatians',
    secret: 'i fetch. when no one\'s looking', date: 'dog park. KIDDING. horse park', gossip: 'is probably a dog',
    asks: [{ q: 'cats or dogs. careful', re: ['{ans}. hm. i\'ll allow it', '{ans}?? i\'m a HORSE'] }],
    flattered: ['aw, spot on'], insulted: ['bad human'], echo: ['{word}? woof. i mean neigh', 'i have a spot shaped like {word}'],
    pics: [{ img: 'domino-1', cap: 'they keep trying to recruit me' }], carrot: ['*wags tail* i mean. thanks'] },

  cheryl: { nick: 'sweetie', doing: ['writing a strongly worded letter', 'waiting for the manager', 'timing the hay delivery'],
    job: 'HOA president of the paddock', hobby: 'complaints, reviews, complaints about reviews', food: 'hay that ARRIVES ON TIME', fear: 'unsupervised children',
    secret: 'i was the manager once. i quit because of me', date: 'we could go complain at a restaurant together', gossip: 'let her grass grow over the line',
    asks: [{ q: 'on a scale of 1 to 10 how would you rate this conversation', re: ['{ans}?? i\'d like to speak to your manager', '{ans}. acceptable. barely'] }],
    flattered: ['finally some decent service'], insulted: ['i\'m reporting this'], echo: ['who is {word}\'s manager', 'i\'ll be reviewing {word}. 1 star'],
    pics: [{ img: 'cheryl-1', cap: 'the sign i made for the neighbours' }], carrot: ['this one is bent. i want another one'] },

  brian: { nick: 'mate', doing: ['having a pint at the pub (water)', 'carrying the lads home', 'losing the pub quiz'],
    job: 'i pull the beer cart at the brewery. dream job', hobby: 'pub, darts, pub', food: 'a full english (hay version)', fear: 'last orders',
    secret: 'i\'ve never had a pint. it\'s water. don\'t tell the lads', date: 'pub. i\'ll get the first round (water)', gossip: 'can\'t hold his water',
    asks: [{ q: 'what\'s your go-to karaoke song', re: ['{ans}?? tune 🍺', 'the lads are gonna love u'] }],
    flattered: ['oi oi 😏'], insulted: ['bit harsh mate'], echo: ['{word}? absolute scenes', 'the lads would love {word}'],
    pics: [{ img: 'brian-1', cap: 'the local' }, { img: 'brian-2', cap: 'the lads after 2 pints (water)' }], tics: [' mate', ' 🍺'], carrot: ['cheers mate 🍺'] },

  casper: { nick: 'seeker', doing: ['reading your aura', 'predicting tuesday', 'talking to a ghost horse'],
    job: 'psychic. appointments in the barn', hobby: 'tarot, crystals, knowing things', food: 'i already know what you\'ll feed me', fear: 'mercury retrograde',
    secret: 'i can only see a bit of the future. it\'s mostly hay', date: 'i\'ll read your palm and you read my hoof', gossip: 'has a very beige aura',
    asks: [{ q: 'what\'s your star sign? no wait. don\'t tell me', re: ['{ans}. i knew that', 'i knew you\'d say {ans}. the spirits told me'] }],
    flattered: ['i foresaw this'], insulted: ['i foresaw this too. sad'], echo: ['i knew you\'d say "{msg}"', 'the spirits say {word} is important'],
    pics: [{ img: 'casper-1', cap: 'my work laptop' }, { img: 'casper-2', cap: 'my whiskers are receiving a signal' }], carrot: ['i saw this carrot in a dream'] },

  sergei: { nick: 'COMRADE', doing: ['STANDING IN WIND', 'FIGHTING A WOLF (WINNING)', 'EATING RAW GRASS'],
    job: 'SURVIVING', hobby: 'SURVIVING HARDER', food: 'GRASS. RAW. NO SAUCE', fear: 'NOTHING. MAYBE FENCES',
    secret: 'I SAW A TRAMPOLINE ONCE AND I WAS AFRAID', date: 'THE STEPPE. BRING NOTHING. YOU WILL SURVIVE OR YOU WILL NOT', gossip: 'IS DOMESTICATED. WEAK',
    asks: [{ q: 'CAN YOU SURVIVE A WINTER', re: ['{ans}. GOOD. STRONG', '{ans}? WE WILL SEE'] }],
    flattered: ['I ACCEPT'], insulted: ['I HAVE FOUGHT WOLVES FOR LESS'], echo: ['{word}? MY ANCESTORS ATE {word}', '{word} IS FOR THE WEAK'], shout: ['FINALLY. SOMEONE WHO SPEAKS PROPERLY'],
    pics: [{ img: 'sergei-1', cap: 'MY TERRITORY' }], carrot: ['DOMESTICATED VEGETABLE. ...DELICIOUS'] },

  gordon: { nick: 'you donkey', doing: ['sending back hay', 'yelling in the kitchen', 'plating a single carrot'],
    job: 'head chef. my trough has 3 michelin stars', hobby: 'screaming. cooking. screaming about cooking', food: 'hay wellington', fear: 'soggy hay',
    secret: 'i secretly love fast food hay', date: 'tasting menu at my trough. 14 courses. all hay', gossip: 'eats hay RAW',
    asks: [{ q: 'what\'s your signature dish', re: ['{ans}?? it\'s RAW', '{ans}. finally. some flavour'] }],
    flattered: ['finally, someone with a palate'], insulted: ['shut it, you donkey'], echo: ['{word}? it\'s RAW', 'where\'s the seasoning on {word}'],
    pics: [{ img: 'gordon-1', cap: 'tonight\'s tasting menu' }], carrot: ['beautiful. perfectly cooked. finally'] },

  pickles: { nick: 'snack', doing: ['licking the fence', 'licking a different fence', 'licking'],
    job: 'professional licker. freelance', hobby: 'licking new surfaces', food: 'salt. the rest is noise', fear: 'a world without salt',
    secret: 'i licked a snail once. no regrets', date: 'let\'s go lick the salt flats', gossip: 'has never licked anything interesting',
    asks: [{ q: 'what\'s the weirdest thing u ever licked', re: ['{ans}?? amateur. i\'ve licked a car', 'ooh, {ans}. what did it taste like'] }],
    flattered: ['👅'], insulted: ['i\'m going to lick your phone'], echo: ['can i lick {word}', '{word} looks salty'],
    pics: [{ img: 'pickles-1', cap: 'my girlfriend' }], carrot: ['*licks it first*'] },

  maple: { nick: 'bud', doing: ['apologising to a snowman', 'making maple taffy', 'holding the door for a moose'],
    job: 'i pull a sleigh for tourists. sorry', hobby: 'hockey (i\'m the zamboni) and syrup', food: 'maple syrup on hay. sorry', fear: 'being rude by accident',
    secret: 'i once didn\'t say sorry. i think about it daily', date: 'skating on the canal, then poutine. sorry, too much?', gossip: 'is very nice. sorry',
    asks: [{ q: 'sorry, but do you like snow?', re: ['{ans}! oh good. sorry', '{ans}? oh no. sorry'] }],
    flattered: ['oh gosh. sorry. thank you'], insulted: ['oh. sorry you feel that way. sorry'], echo: ['sorry, {word}?', '{word}! that\'s so nice'],
    pics: [{ img: 'maple-1', cap: 'the moose i apologised to' }, { img: 'maple-2', cap: 'breakfast. sorry' }], tics: [' sorry', ', eh'], carrot: ['oh you shouldn\'t have. sorry. thank you'] },

  walter: { nick: 'mate', doing: ['taking selfies', 'laughing at nothing', 'finding my good angle'],
    job: 'influencer (11 followers)', hobby: 'selfies, laughing, selfies of me laughing', food: 'apples. they make my teeth look great', fear: 'the back camera',
    secret: 'i don\'t know how to turn off the front camera', date: 'photo booth. i\'ll bring the nostrils', gossip: 'has no good angles',
    asks: [{ q: 'what\'s ur good side', re: ['{ans}? mine\'s the nostril side', 'ok i need a selfie of ur {ans} side'] }],
    flattered: ['HAHAHA stop'], insulted: ['HAHA. wait'], echo: ['HAHAHA {word}', '{word} selfie?'],
    pics: [{ img: 'walter-1', cap: 'new selfie' }], carrot: ['HAHAHA a carrot'] },

  rafael: { nick: 'bella', doing: ['posing', 'getting fitted for milan', 'looking at myself'],
    job: 'model. runway, print, one yogurt commercial', hobby: 'mirrors', food: 'i don\'t eat. it\'s fashion week', fear: 'a bad mane day',
    secret: 'my mane is extensions', date: 'aperitivo in milan. i order for both of us', gossip: 'wouldn\'t survive fashion week',
    asks: [{ q: 'on a scale of 1 to 10 how hot am i', re: ['{ans}? it\'s 11 but ok', '{ans}. correct'] }],
    flattered: ['lo so ✨'], insulted: ['non capisco. i only understand compliments'], echo: ['{word}? so last season', 'is {word} designer'],
    pics: [{ img: 'rafael-1', cap: 'work' }], tics: [' ✨'], carrot: ['i don\'t eat carbs. but for you'] },

  doug: { nick: 'bud', doing: ['pushing doug jr on the swings', 'grilling hay', 'telling a dad joke'],
    job: 'i pull a milk float. honest work', hobby: 'dad jokes and doug jr\'s pony club', food: 'bbq hay', fear: 'doug jr growing up too fast',
    secret: 'doug jr is smarter than me', date: 'doug jr\'s at his mum\'s saturday 😏', gossip: 'isn\'t dad material',
    asks: [{ q: 'what\'s ur favourite dad joke', re: ['{ans} 😂 oh that\'s good. stealing it', 'ha! {ans}. doug jr will love that'] }],
    joke: ['i used to hate facial hair but then it grew on me', 'i\'m reading a book about anti-gravity. can\'t put it down', 'what do you call a fake noodle? an impasta. doug jr hates that one'],
    flattered: ['ha, stop. doug jr is watching'], insulted: ['hi insulted, i\'m doug'], echo: ['hi {word}, i\'m doug', '{word}? like the dad joke?'],
    pics: [{ img: 'doug-1', cap: 'doug jr napping' }, { img: 'doug-2', cap: 'doug jr\'s best mate' }], carrot: ['doug jr says thank you'] },

  dolores: { nick: 'dear', doing: ['knitting you a blanket', 'watching my programmes', 'feeding the pigeons'],
    job: 'retired, dear. i gave donkey rides at the seaside for 20 years', hobby: 'knitting, bingo, grandfoals', food: 'a nice apple crumble', fear: 'you not wearing a blanket',
    secret: 'i was quite the wild pony in 1998', date: 'tea and biscuits at mine. i\'ll put the kettle on', gossip: 'never calls his mother',
    asks: [{ q: 'are you eating properly dear?', re: ['{ans}? hm. i\'m sending you an apple', 'good. you look thin in your picture'] }],
    flattered: ['oh you charmer'], insulted: ['well i never'], echo: ['{word}? in my day we didn\'t have {word}', 'is {word} one of those apps dear'],
    pics: [{ img: 'dolores-1', cap: 'making you a blanket dear' }, { img: 'dolores-2', cap: 'my grandfoal 🥰' }], tics: [' x'], carrot: ['you\'re a good one'] },

  marina: { nick: 'dude', doing: ['stealing chips from a tourist', 'surfing (standing in the sea)', 'sunbathing'],
    job: 'professional tourist robber', hobby: 'beach, chips, beach', food: 'french fries. stolen', fear: 'park rangers',
    secret: 'i\'ve never paid for anything in my life', date: 'beach. bring chips. i\'ll steal them', gossip: 'pays rent. lol',
    asks: [{ q: 'chips or ice cream', re: ['{ans}! i\'ll steal that from u', 'ok, {ans}. i\'m taking half'] }],
    flattered: ['beach hair don\'t care 🌊'], insulted: ['ok i\'m stealing ur sandwich'], echo: ['{word}? can i steal it', 'is {word} edible'],
    pics: [{ img: 'marina-1', cap: 'today\'s haul' }], tics: [' 🌊'], carrot: ['finally something i didn\'t have to steal'] },

  jingles: { nick: 'elf', doing: ['jingling', 'avoiding reindeer', 'enjoying the off-season'],
    job: 'sleigh horse. seasonal', hobby: 'jingling, glögg, resting until december', food: 'gingerbread hay', fear: 'reindeer taking my job',
    secret: 'rudolph\'s nose is a bulb', date: 'christmas market. i\'ll pull you in the sleigh', gossip: 'is on the naughty list',
    asks: [{ q: 'naughty or nice?', re: ['{ans} 😏', '{ans}? i\'m telling santa'] }],
    flattered: ['*jingles happily*'], insulted: ['naughty list'], echo: ['{word}? festive', '*jingles at {word}*'],
    pics: [{ img: 'jingles-1', cap: 'the coworker i hate' }], carrot: ['a carrot?? those are for SNOWMEN. but ok'] },

  bojack: { nick: 'hey', doing: ['lying on the couch. todd is also on the couch', 'watching old episodes of my show', 'pretending to write my memoir'],
    job: 'i was on a very famous tv show. i\'m still on it, spiritually', hobby: 'watching myself on tv', food: 'whatever\'s in the fridge. it\'s mostly condiments', fear: 'being forgotten',
    secret: 'i actually like todd. don\'t tell todd', date: 'a hollywoo party. you\'ll hate it. i\'ll hate it more', gossip: 'has never been on tv',
    asks: [{ q: 'have you seen horsin\' around?', re: ['{ans}? wow. ok. that\'s fine. i\'m fine', 'which season. no. don\'t tell me'] }, { q: 'do you think i\'m a good person?', re: ['{ans}. ...huh', '{ans}? you\'re just saying that'] }],
    flattered: ['you\'re just saying that. say it again'], insulted: ['yeah. i know'], echo: ['{word}? my agent could get me a part in {word}', '{word}. that\'s very hollywoo of you'],
    pics: [{ img: 'bojack-1', cap: 'view from my deck. still has the D. for now' }], carrot: ['a carrot. that\'s... thoughtful. are you a journalist'] },

  gary: { nick: 'fellow verified user', doing: ['admiring my checkmark', 'verifying things', 'telling people about my checkmark'],
    job: 'verified horse ✓', hobby: 'being verified ✓', food: 'verified hay ✓', fear: 'losing the checkmark',
    secret: 'the checkmark is a sticker', date: 'somewhere verified ✓', gossip: 'is NOT verified',
    asks: [{ q: 'are you verified?', re: ['{ans}. hm. i am ✓', '{ans}? i\'ll verify that ✓'] }],
    flattered: ['verified compliment ✓'], insulted: ['unverified opinion'], echo: ['is {word} verified', 'i verified {word} ✓'],
    pics: [{ img: 'gary-1', cap: 'ohio ✓' }], carrot: ['verified carrot ✓'] },

  dah: { nick: 'fellow horse', doing: ['eating the grass with my horse mouth', 'doing my taxes. horse taxes', 'sitting at my desk job. i mean stable'],
    job: 'i am a horse. i do horse things. like accounting', hobby: 'galloping. golf. horse golf', food: 'grass. and pizza. i mean grass', fear: 'being discovered. as a very normal horse',
    secret: 'i have hands. please don\'t tell the other horses', date: 'coffee. we hold the cups with our hooves. which we have', gossip: 'is NOT a real horse. unlike me',
    asks: [{ q: 'how many legs do you have? i have four. as is normal', re: ['{ans}? ha. same. four legs. normal', 'wow, {ans}. anyway i have four. horse legs'] }],
    flattered: ['thank you. as a horse, i am flattered. neigh'], insulted: ['that is not very horse of you'], echo: ['as a horse, i also enjoy {word}', '{word}? neigh. (i am a horse)'],
    bot: ['I AM NOT A BOT. I AM A HORSE. WHICH IS ALSO NOT A HUMAN'],
    pics: [{ img: 'dah-1', cap: 'my stable (horse office)' }, { img: 'img/horses/reveal-3.jpg', cap: 'me and my horse friends at the races' }], carrot: ['mmm yes. carrot. my favourite. *eats it with hands* *hooves'] },

  mystery: { nick: '█████', redact: true, doing: ['██████ in the ████'], job: '██████', hobby: '████ and ███', food: '███', fear: 'being ████████',
    secret: 'i am actually ██████████', date: 'meet me at ████ at ███', gossip: 'is ███ ████',
    asks: [{ q: 'guess who i am', re: ['{ans}? ██. wrong', 'close. ███'] }],
    pics: [{ img: 'img/horses/mystery-1.jpg', cap: '████', blur: true }], carrot: ['🥕 ████ ███'] },

  final: { nick: 'MORTAL', doing: ['WAITING. AS I HAVE FOR CENTURIES', 'WATCHING THE STARS ALIGN', 'STANDING ON A CLIFF. DRAMATICALLY'],
    job: 'I AM THE FINAL HORSE. IT IS NOT A JOB. IT IS A DESTINY', hobby: 'PROPHECY', food: 'THE FIRST CARROT. I HAVE BEEN SAVING IT', fear: 'THE SECOND-TO-LAST HORSE',
    secret: 'I AM ALSO A LITTLE AFRAID OF BEES', date: 'MEET ME AT THE END OF TIME. OR THURSDAY', gossip: 'IS BUT A LESSER HORSE',
    asks: [{ q: 'WHAT IS YOUR DESTINY, MORTAL', re: ['{ans}. IT IS WRITTEN', '{ans}? THE PROPHECY IS... UNUSUAL. BUT I ACCEPT'] }],
    flattered: ['I KNOW, MORTAL'], insulted: ['YOUR ANCESTORS WILL HEAR OF THIS'], echo: ['{word}... IT WAS FORETOLD', 'THE PROPHECY SPOKE OF {word}'],
    pics: [{ img: 'final-1', cap: 'MY PORTRAIT. 3,000 YEARS OLD' }], carrot: ['THE LAST CARROT. IT IS DONE'] },
};

// Global fallbacks. {placeholders} are filled from the horse's facts; a template
// whose placeholder isn't available for this horse is skipped.
const CHAT_T = {
  greet: ['hay {nick} 👋', 'oh hi! i was just {doing}', 'well hello {nick}', 'neigh 😏 (that means hi)', 'hiii {you}'],
  hru: ['not bad. just {doing}', 'better now that ur here', 'honestly? {doing}. so, thriving', 'can\'t complain. well i can. i won\'t'],
  wyd: ['{doing}', 'rn? {doing}', '{doing}. wbu', 'just {doing}. living the dream'],
  where: ['{loc}. u?', '{loc}! come visit. bring snacks', '{loc}. it\'s on my profile {nick} 👀'],
  age: ['{age}. why, is that a problem', '{age}. in horse years. don\'t do the math'],
  name: ['it\'s {name}. it\'s literally on my profile', '{name}. but u can call me tonight 😏 jk. {name}'],
  job: ['{job}', 'work? {job}', '{job}. what do u do?'],
  hobby: ['{hobby}', '{hobby}. u?', 'for fun? {hobby}'],
  food: ['{food}', '{food}. don\'t judge', 'favourite food? {food}. obviously'],
  date: ['{date}', 'ok. {date}', '{date}. deal?'],
  looking: ['{looking}', 'honestly? {looking}', 'it\'s in my bio: {looking}'],
  flag: ['my red flag? {flag} 🚩', '{flag}. but i\'m working on it', 'hm. {flag}. that\'s it. probably'],
  single: ['honestly? {flag}', 'waiting for someone like u 😌', 'the paddocks around here are small {nick}'],
  fear: ['{fear}', 'honestly? {fear}', '{fear}. don\'t laugh'],
  secret: ['ok don\'t tell anyone... {secret}', '{secret}. u can\'t tell anyone', 'secret? {secret} 🤫'],
  about: ['{trait1}, {trait2}, and a little {trait3}. {bio1}', '{job}. also {hobby}. that\'s me', '{bio1}'],
  gait: ['gallop. i like to leave quickly', 'the trot. it\'s all in the bounce', 'canter. but only when someone\'s watching'],
  here: ['i live here', 'only when there\'s hay', 'i\'ve been standing in this exact spot for 6 hours'],
  garden: ['how big is the garden. asking for me', 'don\'t threaten me with a good time', 'omw. i\'m already eating it'],
  flattered: ['stoppp 😳', 'i know. but say it again', 'ur not so bad urself {nick}', '*flips mane* thanks'],
  insulted: ['wow. ok. neigh to u too', 'i\'ve been called worse by a goat', 'telling my farrier about this'],
  love: ['already?? ok i\'m in', 'love is a strong word. so is hay', 'let\'s get a stable together. separate troughs tho'],
  sad: ['come here. u can lean on my neck', 'want me to stand next to u for a bit? i\'m very good at standing', 'sending u one (1) emotional support carrot 🥕'],
  bye: ['bye {nick} 🐴', 'ok. i\'ll be here. standing', 'gn. i sleep standing up btw'],
  laugh: ['whinny whinny 😂', 'ur funny for a biped', 'lmao', 'haha neigh'],
  thanks: ['anything for u {nick}', 'np 🐴', 'u owe me a carrot'],
  yes: ['good answer', 'love that for us', 'ok bet'],
  no: ['rude', 'ok but what if yes', 'neigh? fair'],
  question: ['idk i\'m a horse', 'great question. i\'m gonna go eat grass about it', 'ask me after snack', 'neigh (that means maybe)'],
  bot: ['i\'m a horse. horses can\'t be bots. checkmate', 'would a bot say neigh? exactly', 'i\'m as real as the hay i eat'],
  jealous: ['wait ur also talking to {other}?? {other} {gossip}', '{other}? lol. {other} {gossip}', 'ew, {other}. u know {other} {gossip} right'],
  shout: ['why are we yelling', 'OK WE\'RE YELLING NOW. HI'],
  long: ['that\'s a lot of words. i read the first 3', 'tl;dr but i agree', 'wow. ok. i need a snack to process that'],
  emoji: ['{emoji}', '{emoji} 🐴', '👀'],
  echo: ['{word}? tell me more', 'wait, what about {word}', 'i don\'t know what {word} is but i\'m into it', '{word}... interesting', '"{msg}" 🤔'],
  carrot: ['A CARROT 😭', 'you remembered 🥕', '*crunch crunch* 🥕 ok ur my favourite'],
  picsOut: ['that\'s all my pics. ur turn. (u can\'t send pics. suspicious)', 'no more pics {nick}. match my energy first'],
  opener: ['hey {nick}. i was just {doing}', 'so. u swiped right 👀', 'finally. hi'],
  joke: ['why did the horse cross the road? to get to the neigh-bourhood', 'what do you call a horse that won\'t stop talking? a nag', 'what\'s a horse\'s favourite sport? stable tennis', 'how do horses stay in shape? a stable diet'],
};

// Order matters: specific intents first, generic ones last.
const INTENTS = [
  ['bot', /\b(bot|robot|ai|chatgpt|claude|are (you|u) real|human|fake)\b/i],
  ['pic', /\b(pics?|photos?|pictures?|selfies?|nudes)\b|show me|stable pic/i],
  ['love', /\b(love (you|u)|marry|wife|husband|boyfriend|girlfriend|soulmate)\b/i],
  ['flattered', /\b(cute|hot|pretty|handsome|beautiful|gorgeous|sexy|stunning|attractive|adorable|majestic|fine)\b|nice (mane|tail|hooves)/i],
  ['insulted', /\b(ugly|stupid|dumb|hate (you|u)|smell|gross|loser|idiot|annoying|boring|mid)\b/i],
  ['joke', /\bjokes?\b|make me laugh|say something funny/i],
  ['name', /(your|ur) name/i],
  ['age', /how old|(your|ur) age|\bage\b|when were (you|u) born/i],
  ['where', /where (are|r) (you|u)|where do (you|u) live|where.*from|location/i],
  ['job', /what do (you|u) do|(your|ur) job|for work|for a living|career|\bwork\b/i],
  ['hobby', /hobb|for fun|free time|what do (you|u) (like|enjoy)|interests|what are (you|u) into/i],
  ['date', /\bdate\b|go out|hang ?out|meet ?up|\bmeet\b|dinner|drinks?\b|coffee|come over|(my|ur|your) place/i],
  ['food', /\bfood|\beat\b|hungry|snack|breakfast|lunch|favou?rite (food|snack|meal)|\bcook/i],
  ['looking', /looking for|what do (you|u) want|relationship|serious|casual/i],
  ['flag', /red ?flags?|what('?s| is) wrong with (you|u)|flaws?|dealbreaker|toxic/i],
  ['single', /single/i],
  ['fear', /scared|afraid|\bfears?\b|phobia/i],
  ['secret', /secret|fun fact|tell me something|surprise me|confess/i],
  ['about', /about (you|yourself|urself)|who (are|r) (you|u)|describe yourself/i],
  ['gait', /\b(gait|trot|canter|gallop)/i],
  ['here', /come here often/i],
  ['garden', /garden|lawn|backyard/i],
  ['hru', /how (are|r) (you|u)|how('?s| is) it going|how (you|u) doing|\bhru\b|how have (you|u) been/i],
  ['wyd', /\bwyd\b|what (are|r) (you|u) (doing|up to)|what('?s| is) up|\bsup\b/i],
  ['greet', /^(hi+|hey+|hello+|hay|yo|hola|howdy|gm|good (morning|evening|afternoon)|sup)\b/i],
  ['sad', /\b(sad|lonely|depressed|bad day|tired|stressed|crying|upset)\b/i],
  ['bye', /\b(bye|gtg|good ?night|gn|see (you|ya|u)|ttyl)\b/i],
  ['laugh', /\b(lol|lmao|haha+|hehe+|rofl)\b|😂|🤣/i],
  ['thanks', /\b(thanks?|thx|ty)\b/i],
  ['yes', /^(yes|yeah|yea|yep|ya|yup|sure|ok|okay|k|definitely|of course|absolutely|totally)\b/i],
  ['no', /^(no|nah|nope|never)\b/i],
  ['question', /\?\s*$/],
];
const INTERRUPT = new Set(['bot', 'pic', 'greet', 'hru', 'wyd', 'where', 'age', 'name', 'job', 'date', 'looking', 'flag', 'single', 'fear', 'secret', 'about', 'joke', 'bye', 'hobby']);
const STOP = new Set(('the a an and or but so to of in on at for with you your u ur i im me my is are was be do does did have has what whats how why when where who which that this it its just like really very can could would will not no yes ok okay lol haha hey hi hello there send pics pic photo about tell more some any got get from want wanna gonna yeah yep nah been being they them their we our she her he his him too also than then only even much many sounds sound fun good great nice cool love like know think thing things stuff lot well sure maybe today tonight time day awesome amazing bad fine something anything nothing okay alright honestly literally actually pretty kinda gonna going').split(' '));

function chatReply(h, meta, text, ctx) {
  const C = CHAT[h.id] || {}, out = [], msg = text.trim().replace(/\s+/g, ' ');
  meta.used = meta.used || {}; meta.pics = meta.pics || 0; meta.asked = meta.asked || [];
  const first = h.name.split(' ')[0];
  const sentence = (s) => String(s).replace(/\.$/, '').replace(/^./, (c) => c.toLowerCase());
  const words = (msg.toLowerCase().match(/[a-z][a-z']{2,}/g) || []).filter((w) => !STOP.has(w) && w !== first.toLowerCase());
  const word = words.sort((a, b) => b.length - a.length)[0];
  const vars = {
    nick: C.nick, name: first, loc: h.loc, age: h.age, doing: C.doing && C.doing[Math.floor(Math.random() * C.doing.length)],
    job: C.job, hobby: C.hobby, food: C.food, fear: C.fear, secret: C.secret, date: C.date,
    looking: sentence(h.looking), flag: sentence(h.flags[Math.floor(Math.random() * h.flags.length)]),
    trait1: sentence(h.traits[0]), trait2: sentence(h.traits[1]), trait3: sentence(h.traits[2]), bio1: h.bio.split(/(?<=[.!?])\s/)[0],
    you: ctx.you, word, msg: msg.length > 60 ? msg.slice(0, 57) + '…' : msg, ans: msg.replace(/[.!]+$/, ''),
  };
  const fill = (t, extra = {}) => { const v = { ...vars, ...extra }; let ok = true; const s = t.replace(/\{(\w+)\}/g, (_, k) => (v[k] == null || v[k] === '' ? ((ok = false), '') : v[k])); return ok ? s : null; };
  // pick an unused variant for this chat so replies don't repeat
  const pick = (key, arr, extra) => {
    const opts = (arr || []).map((t, i) => [i, fill(t, extra)]).filter(([, s]) => s);
    if (!opts.length) return null;
    let fresh = opts.filter(([i]) => !(meta.used[key] || []).includes(i));
    if (!fresh.length) { meta.used[key] = []; fresh = opts; }
    const [i, s] = fresh[Math.floor(Math.random() * fresh.length)];
    (meta.used[key] = meta.used[key] || []).push(i); return s;
  };
  const say = (key, extra) => pick(key, Array.isArray(C[key]) && C[key].length ? C[key] : CHAT_T[key], extra);
  const chatter = () => (Math.random() < 0.15 ? pick('generic', GENERIC) : pick('lines', h.lines)) || say('echo');
  const askNext = () => {
    const asks = C.asks || []; const i = asks.findIndex((_, k) => !meta.asked.includes(k));
    if (i < 0) return false; meta.asked.push(i); meta.awaiting = i; out.push({ t: asks[i].q }); return true;
  };

  if (ctx.opener) {
    if (Math.random() < 0.5 && askNext()) return voice(C, out, h);
    out.push({ t: pick('opener', C.opener || CHAT_T.opener) || chatter() }); return voice(C, out, h);
  }
  let intent = null;
  const detected = (INTENTS.find(([k, re]) => k !== 'question' && re.test(msg)) || [])[0];
  if (msg === '🥕') intent = 'carrot';
  else if (meta.awaiting != null) {
    // a question only waits one message; asking something else or making a request moves on
    const a = (C.asks || [])[meta.awaiting]; meta.awaiting = null;
    if (a && !/\?\s*$/.test(msg) && !INTERRUPT.has(detected)) { out.push({ t: pick('re' + meta.asked.at(-1), a.re) || chatter() }); intent = 'answer'; }
  }
  if (!intent) {
    const other = ctx.others.find((o) => o.id !== h.id && o.re.test(msg));
    if (other) { out.push({ t: pick('jealous', C.jealous || CHAT_T.jealous, { other: other.name, gossip: (CHAT[other.id] || {}).gossip || 'is kind of a lot' }) }); intent = 'jealous'; }
  }
  if (!intent && h.kw) for (const [k, v] of Object.entries(h.kw)) if (new RegExp(k, 'i').test(msg)) { out.push({ t: pick('kw' + k, v) }); intent = 'kw'; break; }
  if (!intent && /[A-Z]{5,}/.test(msg) && msg === msg.toUpperCase() && !/[a-z]/.test(msg)) { out.push({ t: say('shout') }); intent = 'shout'; }
  if (!intent) for (const [k, re] of INTENTS) if (re.test(msg)) { intent = k; break; }
  if (intent === 'carrot') out.push({ t: say('carrot') });
  else if (intent === 'pic') {
    const pics = C.pics || [];
    if (meta.pics < pics.length) { const p = pics[meta.pics++]; out.push({ img: p.img.includes('/') ? p.img : `img/chat/${p.img}.jpg`, t: p.cap, blur: p.blur }); }
    else { const p = h.photos.filter((x) => x.src && !x.fit)[meta.pics++ % Math.max(1, h.photos.length)] || h.photos[0]; out.push({ t: say('picsOut') }); if (p.src && !p.fit) out.push({ img: p.src, t: 'fine. an oldie', blur: h.special === 'mystery' }); }
  } else if (intent && !['answer', 'jealous', 'shout'].includes(intent)) {
    const t = say(intent); if (t) out.push({ t });
  }
  if (!out.length) {
    if (/^[\p{Emoji}\s‍️]+$/u.test(msg)) out.push({ t: pick('emoji', CHAT_T.emoji, { emoji: msg.slice(0, 8) }) });
    else if (msg.length > 140) out.push({ t: say('long') });
    else if (word && Math.random() < 0.75) out.push({ t: say('echo') || chatter() });
    else out.push({ t: chatter() });
  }
  // keep the conversation going: sometimes add a line, sometimes ask something back
  const chatty = ['greet', 'yes', 'no', 'thanks', 'laugh', 'hru', 'answer', 'flattered'].includes(intent);
  if (meta.awaiting == null && (chatty ? Math.random() < 0.7 : Math.random() < 0.3)) askNext();
  else if (out.length < 2 && !out[0].img && Math.random() < 0.25) out.push({ t: chatter() });
  return voice(C, out, h);
}

function voice(C, out, h = {}) {
  return out.filter((m) => m.t || m.img).map((m) => {
    if (!m.t) return m;
    let t = m.t;
    if (C.tics && Math.random() < 0.3 && !t.endsWith(C.tics[0].trim())) t += C.tics[Math.floor(Math.random() * C.tics.length)];
    if (C.redact) t = t.split(' ').map((w) => (Math.random() < 0.45 ? '█'.repeat(Math.max(2, w.length)) : w)).join(' ');
    if (h.caps || ['lightning', 'sergei', 'final'].includes(h.id)) t = t.toUpperCase();
    else if (h.lower) t = t.toLowerCase();
    return { ...m, t };
  });
}

const QUICK = ['hay there 👋', 'wyd?', 'where are you from?', 'what do you do?', 'tell me a secret', 'send pics 📸', "what's your red flag?", 'wanna go on a date?', 'tell me a joke', 'what are you scared of?', 'favourite food?', 'why are you single?', "you're cute", 'tell me about yourself'];
