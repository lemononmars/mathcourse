export const officialCards = {
  word: [
    'HAS 1 SYLLABLE', 'HAS 2 SYLLABLES', '5 OR FEWER LETTERS LONG',
    "HAS A CONSECUTIVE DOUBLE LETTER (E.G. 'TT', 'LL', 'EE')", 'HAS AN "O"', 'HAS AN "R"',
    'EXACTLY 5 LETTERS LONG', 'STARTS WITH A VOWEL OR "Y"', 'STARTS WITH A LETTER FROM "A"-"M"',
    'HAS 2 OR MORE DIFFERENT VOWELS', 'HAS 4 OR FEWER UNIQUE LETTERS',
    'IS A COMPOUND WORD (E.G. SKYLINE, UNDERGROUND)',
    'FIRST LETTER IS REPEATED WITHIN THE WORD (E.G. RURAL, EERIE)',
    'HAS 3 OR MORE CONSECUTIVE CONSONANTS (E.G. FIGHT, PEBBLE)',
    'HAS 1 OR MORE REPEATED LETTERS (E.G. KEEP, TOTAL)', 'ENDS WITH A CONSONANT OR "Y"',
    '6-8 LETTERS LONG', 'HAS 2 OR MORE CONSECUTIVE VOWELS (NOT INCLUDING "Y") (E.G. EE, OU, AI)',
    'HAS 1 OR MORE REPEATED VOWELS', 'ENDS WITH 2 CONSONANTS', 'ENDS WITH A LETTER FROM "N"-"Z"',
    '4-6 LETTERS LONG', 'HAS EXACTLY 1 VOWEL (NOT INCLUDING "Y")',
    'FIRST 2 LETTERS ARE IN ALPHABETICAL ORDER'
  ],
  context: [
    'MOST PEOPLE HAVE IT AT HOME', 'MOST PEOPLE HAVE TOUCHED IT', 'YOU EXPECT TO FIND IT IN AN OFFICE',
    'YOU EXPECT TO FIND IT AT A SCHOOL', 'CAN BE DANGEROUS', 'MOSTLY FOUND OUTSIDE', 'MAN-MADE', 'USEFUL',
    'YOU CAN FIND IT WITHIN AN HOUR FROM HERE', 'CAN BE BOUGHT IN A STORE', 'USUALLY WORTH MORE THAN $100',
    'MAKES PEOPLE HAPPY', 'EASILY FOUND IF LOST', 'USUALLY FOUND WITH OTHERS NEARBY', 'SINGLE-USE',
    'USUALLY ONLY OWNED BY RICH PEOPLE', 'MOST PEOPLE SEE IT REGULARLY', 'USUALLY FOUND IN RURAL AREAS',
    'EXPECTED TO LAST 100+ YEARS', 'CAN BE FOUND IN THIS BUILDING', 'PRE-DATES THE USA (1776)',
    'COULD HELP YOU SURVIVE IN THE WILDERNESS', 'SUBJECT OF MYTH OR LEGEND',
    'PASSENGERS CAN CARRY IT ON AN AIRPLANE'
  ],
  attribute: [
    'HAS ONE OR MORE HOLES', 'BIGGER THAN A PERSON', 'CONTAINS PLASTIC', 'USUALLY ROUND OR CURVED',
    'SHINY OR REFLECTIVE', 'HAS A POINT OR SPIKE', 'EASY TO DESTROY', 'FLOATS IN WATER',
    'YOU CAN LOOK THROUGH IT', 'ALIVE', 'CONTAINS WOOD', 'OFTEN HAS SPOTS OR STRIPES',
    'WEIGHS MORE THAN A CHAIR', 'WOULD HURT IF DROPPED ON YOU', 'FLAMMABLE', 'OFTEN MAKES A SOUND',
    'USUALLY A SINGLE COLOR', 'HAS A STRONG TASTE', 'OFTEN HAS WRITING ON IT',
    'COULD BE HELD WITH ONE HAND', "SHOULDN'T GET WET", 'HAS A STANDARD SIZE',
    'TYPICALLY THE SAME SIZE', 'EASY TO CLEAN'
  ]
} as const;

export type RingIndex = 0 | 1 | 2;
export type RingPuzzle = {
  categories: [string, string, string];
  objects: { name: string; rings: RingIndex[] }[];
};

export const soloPuzzles: RingPuzzle[] = [
  {
    categories: ['HAS AN "O"', 'MOST PEOPLE HAVE IT AT HOME', 'CONTAINS PLASTIC'],
    objects: [
      { name: 'Phone', rings: [0, 1, 2] }, { name: 'Toy robot', rings: [0, 1, 2] },
      { name: 'Book', rings: [0, 1] }, { name: 'Sofa', rings: [0, 1] },
      { name: 'Plastic chair', rings: [1, 2] }, { name: 'Keyboard', rings: [1, 2] },
      { name: 'Cloud', rings: [0] }, { name: 'Traffic cone', rings: [0, 2] },
      { name: 'Towel', rings: [1] }, { name: 'Helmet', rings: [2] }, { name: 'Sun', rings: [] }
    ]
  },
  {
    categories: ['5 OR FEWER LETTERS LONG', 'CAN BE BOUGHT IN A STORE', 'SHINY OR REFLECTIVE'],
    objects: [
      { name: 'Coin', rings: [0, 1, 2] }, { name: 'Spoon', rings: [0, 1, 2] },
      { name: 'Apple', rings: [0, 1] }, { name: 'Lamp', rings: [0, 1] },
      { name: 'Mirror', rings: [1, 2] }, { name: 'Necklace', rings: [1, 2] },
      { name: 'Moon', rings: [0, 2] }, { name: 'Glass', rings: [0, 1, 2] },
      { name: 'Pencil case', rings: [1] }, { name: 'Star', rings: [0, 2] }, { name: 'Thunder', rings: [] }
    ]
  },
  {
    categories: ['HAS AN "R"', 'MOSTLY FOUND OUTSIDE', 'ALIVE'],
    objects: [
      { name: 'Tree', rings: [0, 1, 2] }, { name: 'Bird', rings: [0, 1, 2] },
      { name: 'Car', rings: [0, 1] }, { name: 'Rock', rings: [0, 1] },
      { name: 'Giraffe', rings: [0, 1, 2] }, { name: 'River', rings: [0, 1] },
      { name: 'Dog', rings: [2] }, { name: 'Flower', rings: [0, 1, 2] },
      { name: 'Bench', rings: [1] }, { name: 'Teacher', rings: [0, 2] }, { name: 'Spoon', rings: [] }
    ]
  }
];
