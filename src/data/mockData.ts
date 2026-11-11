import { Confession, Episode, ChatMessage, CommunityRoom, Conversation, NotificationItem, UserProfile } from '../types';

export const INITIAL_CONFESSIONS: Confession[] = [
  {
    id: 'conf-1',
    author: 'Starlit Stranger',
    avatarColor: 'from-pink-500 to-rose-400',
    mood: 'Crush',
    title: 'To the girl reading Haruki Murakami on the 11:42 PM train',
    content: 'Every Tuesday night we sit across from each other on the southbound train. You fold the corner of page 84 and smile when the train tilts on the river bridge. I always pretend to look at my phone, but I just want to muster the courage to ask what chapter you are on. If you ever stumble upon this broadcast: you have the gentlest laugh.',
    timestamp: '14 minutes ago',
    likes: 247,
    songDedication: 'Cigarettes After Sex — "Sweet"',
    comments: [
      {
        id: 'c-1',
        author: 'Night Owl 99',
        avatarColor: 'from-violet-500 to-purple-400',
        text: 'Please talk to her next Tuesday! Life is too brief to leave gentle smiles on train tracks.',
        timestamp: '9m ago',
        likes: 38,
      },
      {
        id: 'c-2',
        author: 'Moonlit Echo',
        avatarColor: 'from-blue-500 to-cyan-400',
        text: 'This reads like a scene from an indie film. Wishing you courage, stranger!',
        timestamp: '4m ago',
        likes: 19,
      }
    ]
  },
  {
    id: 'conf-2',
    author: 'Quiet Rain',
    avatarColor: 'from-cyan-500 to-blue-500',
    mood: 'Heartbreak',
    title: 'I still order your favorite roast when it rains',
    content: 'It has been seven months since we packed the apartment into cardboard boxes. Yesterday it rained the kind of slow October drizzle you used to open the windows for. I instinctively reached for my jacket to walk down to our corner bakery and order two cardamom buns and an oat cortado. Then I stopped at the hallway mirror and remembered I live here alone now.',
    timestamp: '42 minutes ago',
    likes: 512,
    songDedication: 'Bon Iver — "Holocene"',
    comments: [
      {
        id: 'c-3',
        author: 'Warm Hearth',
        avatarColor: 'from-amber-500 to-orange-400',
        text: 'The phantom habits of a shared life are the hardest to outgrow. Sending you a warm hug tonight.',
        timestamp: '31m ago',
        likes: 64,
      },
      {
        id: 'c-4',
        author: 'Julian (Host)',
        avatarColor: 'from-pink-600 to-rose-500',
        text: 'Reading this on air in tonight’s midnight hour. Hold space for your grief; it means the love was deeply real.',
        timestamp: '15m ago',
        likes: 120,
      }
    ]
  },
  {
    id: 'conf-3',
    author: 'Velvet Horizon',
    avatarColor: 'from-purple-500 to-pink-500',
    mood: 'Love',
    title: 'After 8 years of best friendship, we confessed tonight',
    content: 'We were sitting on his fire escape eating cheap takeout dumplings under city smog. Out of nowhere he looked at me and said, "I think I have loved you since the rainy day you loaned me your green umbrella in 2018." My heart did a flip that sent shockwaves through my fingers. We are sitting on the couch right now listening to this exact radio show, our hands barely touching, both blushing like teenagers.',
    timestamp: '1 hour ago',
    likes: 890,
    songDedication: 'Norah Jones — "Come Away With Me"',
    comments: [
      {
        id: 'c-5',
        author: 'Coffee & Vinyl',
        avatarColor: 'from-emerald-500 to-teal-400',
        text: 'BEST FEELING ON EARTH!! Friends-to-lovers is the highest tier of human experience.',
        timestamp: '45m ago',
        likes: 142,
      }
    ]
  },
  {
    id: 'conf-4',
    author: 'Echoes at Dawn',
    avatarColor: 'from-fuchsia-500 to-rose-500',
    mood: 'Regret',
    title: 'I deleted the voice note before hitting send',
    content: 'It was 3 minutes and 42 seconds long. I poured out why I panicked and distanced myself two summers ago when things became serious. I explained that I was terrified of being vulnerable. But my thumb hovered over the trash bin icon, and I let it go. Now you are engaged, and I am genuinely praying for your happiness, but I wonder if 3 minutes of bravery could have rewritten my entire world.',
    timestamp: '2 hours ago',
    likes: 673,
    songDedication: 'The 1975 — "Somebody Else"',
    comments: [
      {
        id: 'c-6',
        author: 'Anonymous Poet',
        avatarColor: 'from-indigo-500 to-violet-400',
        text: 'The hardest ghost to live with is the ghost of what could have been.',
        timestamp: '1h ago',
        likes: 88,
      }
    ]
  },
  {
    id: 'conf-5',
    author: 'Golden Hour Glass',
    avatarColor: 'from-yellow-500 to-amber-500',
    mood: 'Gratitude',
    title: 'To the stranger who left a coffee receipt with a poem in the public library',
    content: 'Last exam season I was having an anxiety spiral at the silent study desk on the 4th floor. I went to get water and when I came back, someone had slipped a Starbucks receipt under my laptop. On the back was a handwritten stanza from Mary Oliver: "You do not have to be good. You only have to let the soft animal of your body love what it loves." I laminated it. You kept me afloat.',
    timestamp: '3 hours ago',
    likes: 420,
    songDedication: 'Sleeping At Last — "Turning Page"',
    comments: []
  },
  {
    id: 'conf-6',
    author: 'Subway Midnight',
    avatarColor: 'from-slate-500 to-zinc-400',
    mood: 'Secret',
    title: 'I secretly write songs about you under a pseudonym',
    content: 'You listen to indie lofi on Spotify while working from home. You even shared one of my tracks on your Instagram stories last Friday with the caption "this artist gets autumn moods." You had no idea it was me singing those exact words about your sleepy morning coffee rituals and how you wrinkle your nose when you concentrate. Some secrets are safer kept in chords.',
    timestamp: '5 hours ago',
    likes: 1104,
    songDedication: 'Laufey — "From The Start"',
    comments: [
      {
        id: 'c-7',
        author: 'Melody Seeker',
        avatarColor: 'from-rose-500 to-pink-500',
        text: 'DROP THE ARTIST NAME! Oh wait, anonymous confessions. But that is genuinely magical.',
        timestamp: '4h ago',
        likes: 153,
      }
    ]
  },
  {
    id: 'conf-7',
    author: 'Seaside Drift',
    avatarColor: 'from-teal-500 to-emerald-400',
    mood: 'Love',
    title: 'Waking up before you just to watch the dawn light hit your eyelashes',
    content: 'We have been married for five years this November. The butterflies evolved into a deep, unshakable ocean. This morning at 5:30 AM the lighthouse beam swept past our ceiling and lit your forehead. I felt an overwhelming surge of awe that out of 8 billion souls on this spinning sphere, you chose to share your breakfast, your tears, and your quiet Sunday mornings with me.',
    timestamp: '7 hours ago',
    likes: 830,
    songDedication: 'Sufjan Stevens — "Mystery of Love"',
    comments: []
  },
  {
    id: 'conf-8',
    author: 'Clover Field',
    avatarColor: 'from-green-500 to-emerald-600',
    mood: 'Heartbreak',
    title: 'Saying goodbye at airport terminal 4',
    content: 'Our visas expired in different directions. We stood by gate 28 holding each other so tightly our coats seemed fused together. You whispered, "In another timeline, there are no borders." I haven’t changed my phone wallpaper from the polaroid we took at the photo booth outside baggage claim.',
    timestamp: '9 hours ago',
    likes: 742,
    songDedication: 'Lord Huron — "The Night We Met"',
    comments: []
  },
  {
    id: 'conf-9',
    author: 'Neon Drifter',
    avatarColor: 'from-violet-600 to-indigo-500',
    mood: 'Secret',
    title: 'I still have the cinema ticket from our first awkward date',
    content: 'The movie was terrible—some loud sci-fi action flick neither of us cared about. We spent the whole 2 hours whispering in the back row and sharing buttered popcorn. It’s tucked safely inside my copy of The Little Prince on my nightstand. You think I’m too unsentimental to keep mementos. I’m just pretending.',
    timestamp: '11 hours ago',
    likes: 318,
    comments: []
  },
  {
    id: 'conf-10',
    author: 'Silver Birch',
    avatarColor: 'from-sky-400 to-blue-600',
    mood: 'Gratitude',
    title: 'Thank you to my therapist who didn’t let me give up on connection',
    content: 'Two years ago I was convinced I was fundamentally unlovable due to childhood trauma. Tonight I hosted a homemade pasta dinner for four friends who laughed until their sides hurt. I looked around the candlelight and realized I finally built a soft sanctuary. If you are sitting alone in the dark right now: healing is real, and softness is your birthright.',
    timestamp: '14 hours ago',
    likes: 955,
    songDedication: 'Billie Eilish — "Everything I Wanted"',
    comments: []
  },
  {
    id: 'conf-11',
    author: 'Copper Lantern',
    avatarColor: 'from-orange-500 to-red-500',
    mood: 'Regret',
    title: 'I let pride win during our last argument',
    content: 'It was about something so trivial—who forgot to book the train tickets for our holiday getaway. I raised my voice, used defensive sarcasm, and walked out to sleep in the guest room. By the time I cooled down the next evening, an invisible wall had calcified. Never let your ego destroy someone who loved you with soft open palms.',
    timestamp: '18 hours ago',
    likes: 560,
    comments: []
  },
  {
    id: 'conf-12',
    author: 'Cherry Blossom Mist',
    avatarColor: 'from-pink-400 to-rose-300',
    mood: 'Crush',
    title: 'The pottery studio instructor with clay-stained apron',
    content: 'When you centered the clay on my wheel last Thursday, your hands covered mine and for about six seconds I completely forgot how respiration worked. You have that patient, grounding presence that makes the chaos of the city melt away. I deliberately signed up for the advanced 8-week ceramics course just to keep coming on Thursdays.',
    timestamp: '1 day ago',
    likes: 479,
    comments: []
  }
];

export const INITIAL_EPISODES: Episode[] = [
  {
    id: 'ep-1',
    title: 'Midnight Whispers: Confessions We Never Dared to Speak',
    episodeNumber: 142,
    host: 'Maya Lin & Julian Vance',
    guest: 'Anonymous Callers',
    duration: '52:18',
    durationSeconds: 3138,
    coverImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
    description: 'Julian and Maya dim the studio lamps and read through this week’s most vulnerable confessions on unsent letters, missed subway glances, and rebuilding after love.',
    releaseDate: 'Tonight Live',
    likes: 1840,
    listens: 14890,
    tags: ['Late Night', 'Vulnerability', 'Live Calls'],
    audioTheme: 'lofi'
  },
  {
    id: 'ep-2',
    title: 'The Anatomy of Heartbreak & Why We Crave Closure',
    episodeNumber: 141,
    host: 'Maya Lin',
    guest: 'Dr. Evelyn Ward (Psychotherapist)',
    duration: '46:40',
    durationSeconds: 2800,
    coverImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    description: 'Why do our brains loop through memories like old film reels? Dr. Ward unpacks why true closure is rarely something an ex gives you, but a peace you build yourself.',
    releaseDate: 'Nov 8, 2026',
    likes: 2430,
    listens: 28400,
    tags: ['Psychology', 'Healing', 'Self-Love'],
    audioTheme: 'ambient'
  },
  {
    id: 'ep-3',
    title: 'Friends to Lovers: Navigating the Delicate Boundary',
    episodeNumber: 140,
    host: 'Julian Vance',
    duration: '38:15',
    durationSeconds: 2295,
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    description: 'When does gentle camaraderie turn into romantic devotion? Julian shares listener audio notes from listeners who crossed the bridge and never looked back.',
    releaseDate: 'Nov 4, 2026',
    likes: 3120,
    listens: 34100,
    tags: ['Friendship', 'Romance', 'Stories'],
    audioTheme: 'jazz'
  },
  {
    id: 'ep-4',
    title: 'Rainy Night In Tokyo: Distance, Time Zones & Longing',
    episodeNumber: 139,
    host: 'Chloe Rivera',
    guest: 'Kenji Sato',
    duration: '58:02',
    durationSeconds: 3482,
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    description: 'Live broadcast from a cozy cafe in Shibuya during an autumn thunderstorm. Stories of holding hands over FaceTime screens and counting days until airport reunions.',
    releaseDate: 'Oct 31, 2026',
    likes: 1980,
    listens: 21500,
    tags: ['LDR', 'Travel', 'Rainy Night'],
    audioTheme: 'rain'
  },
  {
    id: 'ep-5',
    title: 'Unsent Letters Vol. 9: Words Left in the Drafts Folder',
    episodeNumber: 138,
    host: 'Maya Lin & Julian Vance',
    duration: '49:30',
    durationSeconds: 2970,
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
    description: 'We read 10 anonymous letters submitted through the Love Broadcast portal that will never reach their intended recipients. Soft guitar background by Leo Miller.',
    releaseDate: 'Oct 27, 2026',
    likes: 4210,
    listens: 45200,
    tags: ['Unsent Letters', 'Acoustic', 'Deep Feels'],
    audioTheme: 'lofi'
  },
  {
    id: 'ep-6',
    title: 'Second Chances: Is Love Ever Better the Second Time?',
    episodeNumber: 137,
    host: 'Chloe Rivera',
    duration: '41:12',
    durationSeconds: 2472,
    coverImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    description: 'Couples who separated for years and serendipitously met again share what had to change within themselves before they could truly love each other.',
    releaseDate: 'Oct 22, 2026',
    likes: 1560,
    listens: 18900,
    tags: ['Reconnection', 'Maturity', 'Growth'],
    audioTheme: 'ambient'
  },
  {
    id: 'ep-7',
    title: 'Loving Someone with Anxiety: A Guide to Gentle Partnership',
    episodeNumber: 136,
    host: 'Julian Vance',
    guest: 'Dr. Liam Thorne',
    duration: '54:20',
    durationSeconds: 3260,
    coverImage: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
    description: 'How to be a safe harbor when your partner’s nervous system is overwhelmed. Grounding techniques, communication without trigger words, and patient love.',
    releaseDate: 'Oct 18, 2026',
    likes: 3890,
    listens: 39800,
    tags: ['Mental Health', 'Compassion', 'Guide'],
    audioTheme: 'ambient'
  },
  {
    id: 'ep-8',
    title: 'Solo & Content: The Beauty of Loving Your Own Company',
    episodeNumber: 135,
    host: 'Maya Lin',
    duration: '35:45',
    durationSeconds: 2145,
    coverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    description: 'Before you can be someone’s home, you have to enjoy resting inside your own walls. Maya explores solitude, romanticizing solo rituals, and peaceful joy.',
    releaseDate: 'Oct 14, 2026',
    likes: 2750,
    listens: 31200,
    tags: ['Solitude', 'Self-Care', 'Independence'],
    audioTheme: 'jazz'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'm-1',
    username: 'VelvetRain',
    avatarColor: 'from-pink-500 to-rose-400',
    text: 'Julian’s voice over this lofi track is giving me goosebumps tonight 🥺',
    timestamp: '23:18',
  },
  {
    id: 'm-2',
    username: 'MidnightDrifter',
    avatarColor: 'from-violet-500 to-purple-400',
    text: 'Listening from Berlin where it is 4 AM and quiet outside. Anyone else awake?',
    timestamp: '23:18',
  },
  {
    id: 'm-3',
    username: 'EchoOfYou',
    avatarColor: 'from-blue-500 to-indigo-400',
    text: 'That train confession hit way too close to home... tell her!!',
    timestamp: '23:19',
  },
  {
    id: 'm-4',
    username: 'Love Broadcast Bot',
    avatarColor: 'from-rose-600 to-pink-500',
    text: '🎧 You are listening to Live Stream #142: Late Night Whispers. 12,480 people online.',
    timestamp: '23:19',
    isSystem: true
  },
  {
    id: 'm-5',
    username: 'Maya (Host)',
    avatarColor: 'from-pink-500 to-fuchsia-500',
    text: 'Remember lovers and dreamers: send your live voice notes or drop a confession in the box! We are reading in 5 mins.',
    timestamp: '23:20',
    isHost: true
  },
  {
    id: 'm-6',
    username: 'CinnamonChai',
    avatarColor: 'from-amber-500 to-orange-400',
    text: 'Currently drinking tea wrapped in a fleece blanket. This broadcast is my safe haven every Wednesday.',
    timestamp: '23:20',
  },
  {
    id: 'm-7',
    username: 'AutumnLeaves',
    avatarColor: 'from-red-500 to-rose-400',
    text: 'Sending love to everyone who is missing someone who is no longer here ❤️',
    timestamp: '23:21',
  },
  {
    id: 'm-8',
    username: 'NeonShadow',
    avatarColor: 'from-cyan-500 to-teal-400',
    text: 'I just confessed to my crush yesterday and got rejected, but this show is healing my soul right now.',
    timestamp: '23:21',
  },
  {
    id: 'm-9',
    username: 'StarryEyed99',
    avatarColor: 'from-purple-500 to-indigo-500',
    text: '@NeonShadow your courage is beautiful. Rejection is just redirection to the right person! ✨',
    timestamp: '23:22',
  }
];

export const CHAT_MESSAGE_POOL: Array<{ username: string; avatarColor: string; text: string; isSystem?: boolean }> = [
  { username: 'SilverMist', avatarColor: 'from-slate-400 to-zinc-500', text: 'This music selection is pure magic tonight ✨' },
  { username: 'GoldenSunset', avatarColor: 'from-amber-400 to-yellow-500', text: 'To whoever needs to hear this: you are worthy of gentle, unhurried love.' },
  { username: 'LofiLover', avatarColor: 'from-emerald-400 to-teal-500', text: 'Can anyone name the background vinyl sample playing right now?' },
  { username: 'StarlightWanderer', avatarColor: 'from-pink-400 to-rose-500', text: 'Holding hands while listening to this with my partner of 6 years 🤍' },
  { username: 'QuietSoul', avatarColor: 'from-indigo-400 to-blue-500', text: 'Sometimes crying at 11 PM to a stranger’s radio confession is the best medicine.' },
  { username: 'System', avatarColor: 'from-pink-600 to-rose-600', text: '✨ AmberGlow and 24 others just joined the room', isSystem: true },
  { username: 'LavenderDreams', avatarColor: 'from-purple-400 to-fuchsia-400', text: 'Maya’s laugh always makes my chest feel lighter.' },
  { username: 'NightRider', avatarColor: 'from-blue-500 to-cyan-500', text: 'Cruising on the coastal highway listening through the car speakers. City lights look ethereal.' },
  { username: 'PaperPlanes', avatarColor: 'from-yellow-400 to-orange-400', text: 'I wrote an unsent letter today. Feels good to leave it here.' },
  { username: 'Julian (Host)', avatarColor: 'from-rose-500 to-pink-600', text: 'Next track coming up is dedicated to everyone who took a leap of faith this week.' },
  { username: 'Rosewood', avatarColor: 'from-rose-400 to-pink-500', text: 'Who else saves all these episodes for long rainy train commutes?' },
  { username: 'MidnightCoffee', avatarColor: 'from-stone-400 to-zinc-500', text: 'Coffee at midnight while watching rain stream down the window glass ☕🌧️' },
  { username: 'VelvetChime', avatarColor: 'from-fuchsia-500 to-purple-500', text: 'Big hugs to anyone having a quiet, lonely night. You are not alone.' },
  { username: 'SkylineBlue', avatarColor: 'from-sky-400 to-blue-500', text: '12K listeners all feeling vulnerable together. The internet can be beautiful sometimes.' },
  { username: 'DuskTillDawn', avatarColor: 'from-violet-500 to-indigo-600', text: 'This community has saved me from spiraling so many times.' },
  { username: 'System', avatarColor: 'from-pink-600 to-rose-600', text: '💌 MoonlitSerenade shared a confession in #Secret', isSystem: true },
  { username: 'WarmWhisper', avatarColor: 'from-pink-500 to-red-400', text: 'Never regret loving with your whole heart. Even if it broke, it was brave.' },
  { username: 'CloudNine', avatarColor: 'from-cyan-400 to-teal-400', text: 'Sending heart reactions from Melbourne! 🇦🇺❤️' },
  { username: 'HearthKeeper', avatarColor: 'from-orange-400 to-amber-500', text: 'Soft blankets, warm tea, Love Broadcast on low volume... peak comfort.' }
];

export const INITIAL_ROOMS: CommunityRoom[] = [
  {
    id: 'room-1',
    name: 'Late Night Feels',
    tagline: 'When the city sleeps and thoughts get loud',
    description: 'The cozy sanctuary for night owls, insomniacs, and dreamers looking for tender midnight reflections.',
    memberCount: 42100,
    iconName: 'Moon',
    coverGradient: 'from-indigo-900/60 via-purple-900/40 to-pink-900/40',
    tags: ['Midnight', 'Vulnerable', 'Ambient'],
    isJoined: true,
    activeTopic: 'What is keeping your mind restless tonight?'
  },
  {
    id: 'room-2',
    name: 'Healing Hearts',
    tagline: 'Mending slowly, one soft day at a time',
    description: 'A dedicated compassionate circle for navigating breakups, grief, boundary setting, and rediscovering your light.',
    memberCount: 38400,
    iconName: 'HeartHandshake',
    coverGradient: 'from-rose-950/70 via-pink-900/40 to-amber-900/40',
    tags: ['Breakups', 'Growth', 'Support'],
    isJoined: true,
    activeTopic: 'One small kindness you did for yourself today'
  },
  {
    id: 'room-3',
    name: 'First Love Nostalgia',
    tagline: 'Locker notes, walkmans, and innocence',
    description: 'Relive the sweet, bittersweet memories of the first time your heart fluttered uncontrollably in youth.',
    memberCount: 29800,
    iconName: 'Sparkles',
    coverGradient: 'from-fuchsia-950/70 via-pink-900/40 to-violet-900/40',
    tags: ['Nostalgia', 'Youth', 'Firsts'],
    isJoined: false,
    activeTopic: 'The song that immediately transports you to age 17'
  },
  {
    id: 'room-4',
    name: 'Unsent Letters',
    tagline: 'The words you swallowed to protect peace',
    description: 'Post the drafts, poems, and apologies you will never mail. Anonymously unburden your soul here.',
    memberCount: 51200,
    iconName: 'Mail',
    coverGradient: 'from-violet-950/70 via-purple-900/40 to-rose-900/40',
    tags: ['Drafts', 'Catharsis', 'Anonymous'],
    isJoined: true,
    activeTopic: 'Dear you, if I could speak for sixty seconds without consequence...'
  },
  {
    id: 'room-5',
    name: 'Long Distance Tales',
    tagline: 'Bridging oceans, borders, and time zones',
    description: 'Countdowns, boarding passes, screen freezes, and the magical moment of running into their arms at Arrivals.',
    memberCount: 19400,
    iconName: 'Compass',
    coverGradient: 'from-blue-950/70 via-indigo-900/40 to-cyan-900/40',
    tags: ['LDR', 'Airports', 'Patience'],
    isJoined: false,
    activeTopic: 'How many days until your next reunion flight?'
  },
  {
    id: 'room-6',
    name: 'Midnight Musings & Poetry',
    tagline: 'Expressive verses and lyrical thoughts',
    description: 'For songwriters, poets, and lovers of cadence. Share fragments of romance, longing, and city rain.',
    memberCount: 24700,
    iconName: 'Feather',
    coverGradient: 'from-emerald-950/70 via-teal-900/40 to-purple-900/40',
    tags: ['Poetry', 'Lyricism', 'Art'],
    isJoined: false,
    activeTopic: 'Drop 4 lines of poetry you wrote recently'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    alias: 'Starlight Whisperer',
    avatarColor: 'from-pink-500 to-rose-400',
    lastMessage: 'Your reply on the train confession was so comforting. Thank you.',
    lastTimestamp: '22:45',
    unreadCount: 1,
    status: 'online',
    messages: [
      {
        id: 'msg-1',
        sender: 'Starlight Whisperer',
        text: 'Hey! I saw your comment on my confession about the girl on the train.',
        timestamp: '22:30',
        isMe: false,
      },
      {
        id: 'msg-2',
        sender: 'You',
        text: 'It was such a poetic moment! Did you get a chance to see her again today?',
        timestamp: '22:38',
        isMe: true,
      },
      {
        id: 'msg-3',
        sender: 'Starlight Whisperer',
        text: 'Not yet, Tuesday is tomorrow. I bought two bookmarks just in case I get the nerve to offer one.',
        timestamp: '22:42',
        isMe: false,
      },
      {
        id: 'msg-4',
        sender: 'Starlight Whisperer',
        text: 'Your reply on the train confession was so comforting. Thank you.',
        timestamp: '22:45',
        isMe: false,
      }
    ]
  },
  {
    id: 'conv-2',
    alias: 'Velvet Echo',
    avatarColor: 'from-violet-500 to-purple-400',
    lastMessage: 'Are you listening to Julian’s live broadcast right now?',
    lastTimestamp: '21:10',
    unreadCount: 2,
    status: 'online',
    messages: [
      {
        id: 'msg-5',
        sender: 'Velvet Echo',
        text: 'Hello fellow night listener! Are you tuned in tonight?',
        timestamp: '21:05',
        isMe: false,
      },
      {
        id: 'msg-6',
        sender: 'Velvet Echo',
        text: 'Are you listening to Julian’s live broadcast right now?',
        timestamp: '21:10',
        isMe: false,
      }
    ]
  },
  {
    id: 'conv-3',
    alias: 'Quiet Rain',
    avatarColor: 'from-cyan-500 to-blue-500',
    lastMessage: 'Take all the time you need to heal. One tea at a time.',
    lastTimestamp: 'Yesterday',
    unreadCount: 0,
    status: 'idle',
    messages: [
      {
        id: 'msg-7',
        sender: 'Quiet Rain',
        text: 'Thank you for bookmarking my story about the bakery. It made me feel less alone.',
        timestamp: 'Yesterday 18:20',
        isMe: false,
      },
      {
        id: 'msg-8',
        sender: 'You',
        text: 'Take all the time you need to heal. One tea at a time.',
        timestamp: 'Yesterday 18:35',
        isMe: true,
      }
    ]
  },
  {
    id: 'conv-4',
    alias: 'Neon Drifter',
    avatarColor: 'from-amber-500 to-rose-500',
    lastMessage: 'Saved the movie ticket too haha, great minds think alike!',
    lastTimestamp: '2 days ago',
    unreadCount: 0,
    status: 'offline',
    messages: [
      {
        id: 'msg-9',
        sender: 'Neon Drifter',
        text: 'Saved the movie ticket too haha, great minds think alike!',
        timestamp: '2 days ago',
        isMe: false,
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Live Broadcast in Session',
    description: 'Maya & Julian are live now: "Midnight Whispers: Confessions We Never Dared to Speak". 12K listening.',
    timestamp: '5m ago',
    type: 'episode',
    read: false,
    actionUrl: 'now-live'
  },
  {
    id: 'notif-2',
    title: 'New Resonance on Your Confession',
    description: '38 people resonated with your recent confession in #Love.',
    timestamp: '25m ago',
    type: 'confession',
    read: false,
    actionUrl: 'confessions'
  },
  {
    id: 'notif-3',
    title: 'Anonymous Message Received',
    description: 'Starlight Whisperer sent you a new response in your private inbox.',
    timestamp: '45m ago',
    type: 'message',
    read: false,
    actionUrl: 'messages'
  },
  {
    id: 'notif-4',
    title: 'Community Topic of the Night',
    description: 'Late Night Feels opened a new prompt: "What is keeping your mind restless tonight?"',
    timestamp: '2h ago',
    type: 'community',
    read: true,
    actionUrl: 'community'
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  alias: 'Velvet Wanderer #482',
  tagline: 'Quiet heart listening to late-night frequencies from the edge of the city.',
  avatarColor: 'from-pink-500 via-rose-500 to-violet-600',
  joinedDate: 'October 2026',
  stats: {
    confessionsCount: 3,
    heartsGiven: 48,
    hoursListened: 14.5,
    savedCount: 5
  },
  badges: [
    {
      id: 'b-1',
      name: 'Night Owl',
      description: 'Tuned in for over 10 live midnight broadcasts.',
      icon: 'Moon'
    },
    {
      id: 'b-2',
      name: 'Gentle Empath',
      description: 'Resonated and left kind words on 30+ confessions.',
      icon: 'HeartHandshake'
    },
    {
      id: 'b-3',
      name: 'First Whisper',
      description: 'Shared an anonymous confession with the community.',
      icon: 'Mic'
    },
    {
      id: 'b-4',
      name: 'Soul Keeper',
      description: 'Bookmarked and cherished tender unsent stories.',
      icon: 'Bookmark'
    }
  ]
};
