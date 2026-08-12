<script lang="ts">
  import { onMount } from 'svelte';
  import Eye from '@lucide/svelte/icons/eye';
  import EyeOff from '@lucide/svelte/icons/eye-off';
  import RefreshCw from '@lucide/svelte/icons/refresh-cw';
  import RotateCw from '@lucide/svelte/icons/rotate-cw';
  import Users from '@lucide/svelte/icons/users';
  import UserRound from '@lucide/svelte/icons/user-round';
  import Layers from '@lucide/svelte/icons/layers';
  import { officialCards, soloPuzzles, type RingIndex } from '$lib/things-in-rings-data';

  type Deck = keyof typeof officialCards;
  type HostObject = { name: string; syllables: number; compound?: boolean; context: string[]; attribute: string[] };

  const colors = ['#f3c623', '#ff6b6b', '#4c6ef5'];
  const ringNames = ['Word', 'Context', 'Attribute'];
  const regionPoints: Record<string, [number, number]> = {
    '': [4.15, -3.15],
    '0': [-2.5, 1.4],
    '1': [2.5, 1.4],
    '2': [0, -2.65],
    '0,1': [0, 1.75],
    '0,2': [-1.2, -0.72],
    '1,2': [1.2, -0.72],
    '0,1,2': [0, 0.18]
  };

  // 200 Diverse Host Objects
  const hostObjects: HostObject[] = [
    { name: 'Phone', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'MOST PEOPLE HAVE TOUCHED IT', 'YOU EXPECT TO FIND IT IN AN OFFICE', 'MAN-MADE', 'USEFUL', 'CAN BE BOUGHT IN A STORE', 'MOST PEOPLE SEE IT REGULARLY', 'PASSENGERS CAN CARRY IT ON AN AIRPLANE'], attribute: ['CONTAINS PLASTIC', 'SHINY OR REFLECTIVE', 'OFTEN MAKES A SOUND', 'COULD BE HELD WITH ONE HAND', "SHOULDN'T GET WET", 'HAS A STANDARD SIZE'] },
    { name: 'Tree', syllables: 1, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MOSTLY FOUND OUTSIDE', 'USEFUL', 'USUALLY FOUND WITH OTHERS NEARBY', 'MOST PEOPLE SEE IT REGULARLY', 'EXPECTED TO LAST 100+ YEARS'], attribute: ['BIGGER THAN A PERSON', 'ALIVE', 'CONTAINS WOOD', 'WEIGHS MORE THAN A CHAIR', 'WOULD HURT IF DROPPED ON YOU', 'FLAMMABLE'] },
    { name: 'Spoon', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE', 'USEFUL', 'CAN BE BOUGHT IN A STORE', 'PASSENGERS CAN CARRY IT ON AN AIRPLANE'], attribute: ['USUALLY ROUND OR CURVED', 'SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND', 'HAS A STANDARD SIZE', 'EASY TO CLEAN'] },
    { name: 'School bus', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE TOUCHED IT', 'YOU EXPECT TO FIND IT AT A SCHOOL', 'MAN-MADE', 'USEFUL', 'USUALLY WORTH MORE THAN $100', 'MOST PEOPLE SEE IT REGULARLY'], attribute: ['BIGGER THAN A PERSON', 'CONTAINS PLASTIC', 'SHINY OR REFLECTIVE', 'WEIGHS MORE THAN A CHAIR', 'OFTEN MAKES A SOUND', 'OFTEN HAS WRITING ON IT'] },
    { name: 'Apple', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME', 'MOST PEOPLE HAVE TOUCHED IT', 'USEFUL', 'CAN BE BOUGHT IN A STORE', 'MOST PEOPLE SEE IT REGULARLY'], attribute: ['USUALLY ROUND OR CURVED', 'EASY TO DESTROY', 'ALIVE', 'HAS A STRONG TASTE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Mirror', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME', 'MOST PEOPLE HAVE TOUCHED IT', 'YOU EXPECT TO FIND IT IN AN OFFICE', 'MAN-MADE', 'USEFUL', 'CAN BE BOUGHT IN A STORE'], attribute: ['SHINY OR REFLECTIVE', 'EASY TO DESTROY', 'YOU CAN LOOK THROUGH IT', 'COULD BE HELD WITH ONE HAND', 'HAS A STANDARD SIZE'] },
    { name: 'Dragon', syllables: 2, context: ['CAN BE DANGEROUS', 'SUBJECT OF MYTH OR LEGEND'], attribute: ['BIGGER THAN A PERSON', 'HAS A POINT OR SPIKE', 'ALIVE', 'WEIGHS MORE THAN A CHAIR', 'FLAMMABLE', 'OFTEN MAKES A SOUND'] },
    { name: 'Notebook', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE IT AT HOME', 'MOST PEOPLE HAVE TOUCHED IT', 'YOU EXPECT TO FIND IT IN AN OFFICE', 'YOU EXPECT TO FIND IT AT A SCHOOL', 'MAN-MADE', 'USEFUL'], attribute: ['CONTAINS WOOD', 'EASY TO DESTROY', 'FLAMMABLE', 'OFTEN HAS WRITING ON IT', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Bicycle', syllables: 3, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MOSTLY FOUND OUTSIDE', 'MAN-MADE', 'USEFUL', 'CAN BE BOUGHT IN A STORE'], attribute: ['SHINY OR REFLECTIVE', 'WEIGHS MORE THAN A CHAIR', 'HAS A STANDARD SIZE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Guitar', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE', 'USEFUL', 'CAN BE BOUGHT IN A STORE'], attribute: ['CONTAINS WOOD', 'OFTEN MAKES A SOUND', 'FLAMMABLE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Sunlight', syllables: 2, compound: true, context: ['MOSTLY FOUND OUTSIDE', 'MOST PEOPLE SEE IT REGULARLY'], attribute: ['SHINY OR REFLECTIVE', 'USUALLY A SINGLE COLOR'] },
    { name: 'Laptop', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE IT AT HOME', 'YOU EXPECT TO FIND IT IN AN OFFICE', 'MAN-MADE', 'USEFUL', 'USUALLY WORTH MORE THAN $100'], attribute: ['CONTAINS PLASTIC', 'SHINY OR REFLECTIVE', 'OFTEN HAS WRITING ON IT', 'COULD BE HELD WITH ONE HAND', "SHOULDN'T GET WET"] },
    { name: 'Watermelon', syllables: 4, compound: true, context: ['MOST PEOPLE HAVE TOUCHED IT', 'CAN BE BOUGHT IN A STORE', 'USEFUL'], attribute: ['USUALLY ROUND OR CURVED', 'ALIVE', 'HAS A STRONG TASTE', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Clock', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'YOU EXPECT TO FIND IT IN AN OFFICE', 'YOU EXPECT TO FIND IT AT A SCHOOL', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'SHINY OR REFLECTIVE', 'OFTEN MAKES A SOUND', 'HAS A STANDARD SIZE'] },
    { name: 'Key', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE', 'USEFUL'], attribute: ['SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND', 'HAS A POINT OR SPIKE', 'TYPICALLY THE SAME SIZE'] },
    { name: 'Banana', syllables: 3, context: ['MOST PEOPLE HAVE IT AT HOME', 'MOST PEOPLE HAVE TOUCHED IT', 'CAN BE BOUGHT IN A STORE'], attribute: ['ALIVE', 'HAS A STRONG TASTE', 'COULD BE HELD WITH ONE HAND', 'EASY TO DESTROY'] },
    { name: 'Cat', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'MOST PEOPLE HAVE TOUCHED IT', 'MOST PEOPLE SEE IT REGULARLY'], attribute: ['ALIVE', 'OFTEN MAKES A SOUND', 'COULD BE HELD WITH ONE HAND', 'OFTEN HAS SPOTS OR STRIPES'] },
    { name: 'Dog', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'MOST PEOPLE HAVE TOUCHED IT', 'MOST PEOPLE SEE IT REGULARLY'], attribute: ['ALIVE', 'OFTEN MAKES A SOUND', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Pencil', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME', 'YOU EXPECT TO FIND IT AT A SCHOOL', 'MAN-MADE'], attribute: ['CONTAINS WOOD', 'COULD BE HELD WITH ONE HAND', 'HAS A POINT OR SPIKE', 'FLAMMABLE'] },
    { name: 'Backpack', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE IT AT HOME', 'YOU EXPECT TO FIND IT AT A SCHOOL', 'MAN-MADE', 'USEFUL'], attribute: ['COULD BE HELD WITH ONE HAND', 'HAS A STANDARD SIZE', 'EASY TO CLEAN'] },
    { name: 'Airplane', syllables: 2, compound: true, context: ['MAN-MADE', 'USEFUL', 'USUALLY WORTH MORE THAN $100', 'CAN BE DANGEROUS'], attribute: ['BIGGER THAN A PERSON', 'SHINY OR REFLECTIVE', 'WEIGHS MORE THAN A CHAIR', 'OFTEN MAKES A SOUND'] },
    { name: 'Helicopter', syllables: 4, context: ['MAN-MADE', 'USEFUL', 'USUALLY WORTH MORE THAN $100'], attribute: ['BIGGER THAN A PERSON', 'SHINY OR REFLECTIVE', 'OFTEN MAKES A SOUND'] },
    { name: 'Submarine', syllables: 3, context: ['MAN-MADE', 'USEFUL', 'USUALLY WORTH MORE THAN $100'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Rocket', syllables: 2, context: ['MAN-MADE', 'USEFUL', 'USUALLY WORTH MORE THAN $100'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR', 'FLAMMABLE'] },
    { name: 'Satellite', syllables: 3, context: ['MAN-MADE', 'USEFUL', 'USUALLY WORTH MORE THAN $100'], attribute: ['BIGGER THAN A PERSON', 'SHINY OR REFLECTIVE'] },
    { name: 'Telescope', syllables: 3, context: ['MAN-MADE', 'USEFUL'], attribute: ['YOU CAN LOOK THROUGH IT', 'SHINY OR REFLECTIVE', 'HAS A STANDARD SIZE'] },
    { name: 'Microscope', syllables: 3, context: ['YOU EXPECT TO FIND IT AT A SCHOOL', 'MAN-MADE', 'USEFUL'], attribute: ['YOU CAN LOOK THROUGH IT', 'SHINY OR REFLECTIVE'] },
    { name: 'Compass', syllables: 2, context: ['COULD HELP YOU SURVIVE IN THE WILDERNESS', 'MAN-MADE', 'USEFUL'], attribute: ['USUALLY ROUND OR CURVED', 'SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Flashlight', syllables: 2, compound: true, context: ['COULD HELP YOU SURVIVE IN THE WILDERNESS', 'MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND', 'CONTAINS PLASTIC'] },
    { name: 'Umbrella', syllables: 3, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE', 'USEFUL'], attribute: ['COULD BE HELD WITH ONE HAND', 'HAS A POINT OR SPIKE'] },
    { name: 'Sunglasses', syllables: 3, compound: true, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE', 'USEFUL'], attribute: ['YOU CAN LOOK THROUGH IT', 'COULD BE HELD WITH ONE HAND', 'CONTAINS PLASTIC'] },
    { name: 'Helmet', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE', 'USEFUL'], attribute: ['CONTAINS PLASTIC', 'COULD BE HELD WITH ONE HAND', 'HAS A STANDARD SIZE'] },
    { name: 'Hammer', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE', 'USEFUL'], attribute: ['WOULD HURT IF DROPPED ON YOU', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Wrench', syllables: 1, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE', 'USEFUL'], attribute: ['SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Scissors', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME', 'YOU EXPECT TO FIND IT IN AN OFFICE', 'MAN-MADE'], attribute: ['HAS A POINT OR SPIKE', 'SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Needle', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['HAS A POINT OR SPIKE', 'SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Candle', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['FLAMMABLE', 'COULD BE HELD WITH ONE HAND', 'EASY TO DESTROY'] },
    { name: 'Matchbox', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['FLAMMABLE', 'COULD BE HELD WITH ONE HAND', 'EASY TO DESTROY'] },
    { name: 'Fireworks', syllables: 2, compound: true, context: ['CAN BE DANGEROUS', 'MAN-MADE'], attribute: ['FLAMMABLE', 'OFTEN MAKES A SOUND', 'EASY TO DESTROY'] },
    { name: 'Campfire', syllables: 2, compound: true, context: ['MOSTLY FOUND OUTSIDE', 'COULD HELP YOU SURVIVE IN THE WILDERNESS'], attribute: ['FLAMMABLE', 'USUALLY A SINGLE COLOR'] },
    { name: 'Volcano', syllables: 3, context: ['MOSTLY FOUND OUTSIDE', 'CAN BE DANGEROUS'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR', 'FLAMMABLE'] },
    { name: 'Tornado', syllables: 3, context: ['MOSTLY FOUND OUTSIDE', 'CAN BE DANGEROUS'], attribute: ['BIGGER THAN A PERSON', 'OFTEN MAKES A SOUND'] },
    { name: 'Earthquake', syllables: 2, compound: true, context: ['CAN BE DANGEROUS'], attribute: ['OFTEN MAKES A SOUND'] },
    { name: 'Lightning', syllables: 2, context: ['MOSTLY FOUND OUTSIDE', 'CAN BE DANGEROUS'], attribute: ['SHINY OR REFLECTIVE', 'FLAMMABLE'] },
    { name: 'Rainbow', syllables: 2, compound: true, context: ['MOSTLY FOUND OUTSIDE', 'SUBJECT OF MYTH OR LEGEND'], attribute: ['USUALLY ROUND OR CURVED'] },
    { name: 'Cloud', syllables: 1, context: ['MOSTLY FOUND OUTSIDE', 'MOST PEOPLE SEE IT REGULARLY'], attribute: ['BIGGER THAN A PERSON', 'USUALLY ROUND OR CURVED'] },
    { name: 'Snowman', syllables: 2, compound: true, context: ['MOSTLY FOUND OUTSIDE', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'EASY TO DESTROY'] },
    { name: 'Iceberg', syllables: 2, compound: true, context: ['MOSTLY FOUND OUTSIDE', 'CAN BE DANGEROUS'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Waterfall', syllables: 3, compound: true, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['BIGGER THAN A PERSON', 'OFTEN MAKES A SOUND'] },
    { name: 'Cave', syllables: 1, context: ['MOSTLY FOUND OUTSIDE', 'COULD HELP YOU SURVIVE IN THE WILDERNESS'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Island', syllables: 2, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Mountain', syllables: 2, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR', 'EXPECTED TO LAST 100+ YEARS'] },
    { name: 'Pyramid', syllables: 3, context: ['MAN-MADE', 'EXPECTED TO LAST 100+ YEARS', 'SUBJECT OF MYTH OR LEGEND'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR', 'HAS A POINT OR SPIKE'] },
    { name: 'Castle', syllables: 2, context: ['MAN-MADE', 'EXPECTED TO LAST 100+ YEARS', 'SUBJECT OF MYTH OR LEGEND'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Statue', syllables: 2, context: ['MAN-MADE', 'MOSTLY FOUND OUTSIDE', 'EXPECTED TO LAST 100+ YEARS'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Bridge', syllables: 1, context: ['MAN-MADE', 'MOSTLY FOUND OUTSIDE', 'EXPECTED TO LAST 100+ YEARS'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Tower', syllables: 2, context: ['MAN-MADE', 'MOSTLY FOUND OUTSIDE', 'EXPECTED TO LAST 100+ YEARS'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Lighthouse', syllables: 2, compound: true, context: ['MAN-MADE', 'MOSTLY FOUND OUTSIDE', 'EXPECTED TO LAST 100+ YEARS'], attribute: ['BIGGER THAN A PERSON', 'SHINY OR REFLECTIVE'] },
    { name: 'Windmill', syllables: 2, compound: true, context: ['MAN-MADE', 'MOSTLY FOUND OUTSIDE'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Barn', syllables: 1, context: ['MAN-MADE', 'MOSTLY FOUND OUTSIDE', 'USUALLY FOUND IN RURAL AREAS'], attribute: ['BIGGER THAN A PERSON', 'CONTAINS WOOD', 'FLAMMABLE'] },
    { name: 'Tractor', syllables: 2, context: ['MAN-MADE', 'USUALLY FOUND IN RURAL AREAS', 'USEFUL'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR', 'OFTEN MAKES A SOUND'] },
    { name: 'Scarecrow', syllables: 2, compound: true, context: ['MAN-MADE', 'USUALLY FOUND IN RURAL AREAS'], attribute: ['CONTAINS WOOD', 'FLAMMABLE', 'EASY TO DESTROY'] },
    { name: 'Wheat', syllables: 1, context: ['USUALLY FOUND IN RURAL AREAS', 'USEFUL'], attribute: ['ALIVE', 'FLAMMABLE', 'EASY TO DESTROY'] },
    { name: 'Corn', syllables: 1, context: ['USUALLY FOUND IN RURAL AREAS', 'USEFUL'], attribute: ['ALIVE', 'HAS A STRONG TASTE', 'EASY TO DESTROY'] },
    { name: 'Pumpkin', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT', 'USEFUL'], attribute: ['USUALLY ROUND OR CURVED', 'ALIVE', 'HAS A STRONG TASTE'] },
    { name: 'Mushroom', syllables: 2, compound: true, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'EASY TO DESTROY', 'USUALLY ROUND OR CURVED'] },
    { name: 'Flower', syllables: 2, context: ['MOST PEOPLE SEE IT REGULARLY', 'MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'EASY TO DESTROY', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Rose', syllables: 1, context: ['MOST PEOPLE SEE IT REGULARLY'], attribute: ['ALIVE', 'HAS A POINT OR SPIKE', 'EASY TO DESTROY'] },
    { name: 'Cactus', syllables: 2, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'HAS A POINT OR SPIKE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Pineapple', syllables: 3, compound: true, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['ALIVE', 'HAS A POINT OR SPIKE', 'HAS A STRONG TASTE'] },
    { name: 'Coconut', syllables: 3, compound: true, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['USUALLY ROUND OR CURVED', 'ALIVE', 'HAS A STRONG TASTE'] },
    { name: 'Strawberry', syllables: 3, compound: true, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['ALIVE', 'HAS A STRONG TASTE', 'EASY TO DESTROY', 'OFTEN HAS SPOTS OR STRIPES'] },
    { name: 'Grape', syllables: 1, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['USUALLY ROUND OR CURVED', 'ALIVE', 'HAS A STRONG TASTE', 'EASY TO DESTROY'] },
    { name: 'Orange', syllables: 2, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['USUALLY ROUND OR CURVED', 'ALIVE', 'HAS A STRONG TASTE', 'EASY TO DESTROY'] },
    { name: 'Lemon', syllables: 2, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['USUALLY ROUND OR CURVED', 'ALIVE', 'HAS A STRONG TASTE', 'EASY TO DESTROY'] },
    { name: 'Water', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME', 'USEFUL'], attribute: ['EASY TO CLEAN', 'FLAMMABLE'] },
    { name: 'Milk', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE', 'EASY TO CLEAN'] },
    { name: 'Bread', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE', 'EASY TO DESTROY'] },
    { name: 'Cheese', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE', 'EASY TO DESTROY'] },
    { name: 'Pizza', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT', 'CAN BE BOUGHT IN A STORE'], attribute: ['USUALLY ROUND OR CURVED', 'HAS A STRONG TASTE'] },
    { name: 'Burger', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT', 'CAN BE BOUGHT IN A STORE'], attribute: ['USUALLY ROUND OR CURVED', 'HAS A STRONG TASTE'] },
    { name: 'Chocolate', syllables: 3, context: ['MOST PEOPLE HAVE TOUCHED IT', 'CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE', 'EASY TO DESTROY'] },
    { name: 'Ice cream', syllables: 2, compound: true, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE', 'EASY TO DESTROY'] },
    { name: 'Coffee', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT', 'CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE', 'OFTEN MAKES A SOUND'] },
    { name: 'Tea', syllables: 1, context: ['MOST PEOPLE HAVE TOUCHED IT', 'CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE'] },
    { name: 'Soda', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT', 'CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE', 'CONTAINS PLASTIC'] },
    { name: 'Popcorn', syllables: 2, compound: true, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE', 'EASY TO DESTROY'] },
    { name: 'Cookie', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT', 'CAN BE BOUGHT IN A STORE'], attribute: ['USUALLY ROUND OR CURVED', 'HAS A STRONG TASTE', 'EASY TO DESTROY'] },
    { name: 'Doughnut', syllables: 2, compound: true, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['USUALLY ROUND OR CURVED', 'HAS A STRONG TASTE'] },
    { name: 'Cake', syllables: 1, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE', 'EASY TO DESTROY'] },
    { name: 'Pie', syllables: 1, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['USUALLY ROUND OR CURVED', 'HAS A STRONG TASTE'] },
    { name: 'Soup', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME'], attribute: ['HAS A STRONG TASTE'] },
    { name: 'Salad', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT'], attribute: ['ALIVE', 'HAS A STRONG TASTE'] },
    { name: 'Sushi', syllables: 2, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Ramen', syllables: 2, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE'] },
    { name: 'Taco', syllables: 2, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Burrito', syllables: 3, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Sandwich', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT'], attribute: ['HAS A STRONG TASTE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Egg', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME'], attribute: ['USUALLY ROUND OR CURVED', 'EASY TO DESTROY', 'HAS A STRONG TASTE'] },
    { name: 'Bacon', syllables: 2, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE', 'OFTEN HAS SPOTS OR STRIPES'] },
    { name: 'Steak', syllables: 1, context: ['CAN BE BOUGHT IN A STORE'], attribute: ['HAS A STRONG TASTE'] },
    { name: 'Fish', syllables: 1, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'HAS A STRONG TASTE', 'OFTEN HAS SPOTS OR STRIPES'] },
    { name: 'Shark', syllables: 1, context: ['CAN BE DANGEROUS', 'MOSTLY FOUND OUTSIDE'], attribute: ['BIGGER THAN A PERSON', 'ALIVE', 'HAS A POINT OR SPIKE'] },
    { name: 'Whale', syllables: 1, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['BIGGER THAN A PERSON', 'ALIVE', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Dolphin', syllables: 2, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['BIGGER THAN A PERSON', 'ALIVE', 'OFTEN MAKES A SOUND'] },
    { name: 'Octopus', syllables: 3, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'USUALLY ROUND OR CURVED'] },
    { name: 'Crab', syllables: 1, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'HAS A POINT OR SPIKE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Lobster', syllables: 2, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'HAS A POINT OR SPIKE'] },
    { name: 'Turtle', syllables: 2, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'USUALLY ROUND OR CURVED', 'EXPECTED TO LAST 100+ YEARS'] },
    { name: 'Frog', syllables: 1, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'OFTEN MAKES A SOUND', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Snake', syllables: 1, context: ['CAN BE DANGEROUS', 'MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'OFTEN HAS SPOTS OR STRIPES'] },
    { name: 'Lizard', syllables: 2, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Crocodile', syllables: 3, context: ['CAN BE DANGEROUS', 'MOSTLY FOUND OUTSIDE'], attribute: ['BIGGER THAN A PERSON', 'ALIVE', 'HAS A POINT OR SPIKE'] },
    { name: 'Dinosaur', syllables: 3, context: ['SUBJECT OF MYTH OR LEGEND'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR', 'HAS A POINT OR SPIKE'] },
    { name: 'Lion', syllables: 2, context: ['CAN BE DANGEROUS', 'MOSTLY FOUND OUTSIDE'], attribute: ['BIGGER THAN A PERSON', 'ALIVE', 'OFTEN MAKES A SOUND'] },
    { name: 'Tiger', syllables: 2, context: ['CAN BE DANGEROUS', 'MOSTLY FOUND OUTSIDE'], attribute: ['BIGGER THAN A PERSON', 'ALIVE', 'OFTEN HAS SPOTS OR STRIPES'] },
    { name: 'Bear', syllables: 1, context: ['CAN BE DANGEROUS', 'MOSTLY FOUND OUTSIDE'], attribute: ['BIGGER THAN A PERSON', 'ALIVE', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Elephant', syllables: 3, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['BIGGER THAN A PERSON', 'ALIVE', 'WEIGHS MORE THAN A CHAIR', 'WOULD HURT IF DROPPED ON YOU'] },
    { name: 'Giraffe', syllables: 2, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['BIGGER THAN A PERSON', 'ALIVE', 'OFTEN HAS SPOTS OR STRIPES'] },
    { name: 'Zebra', syllables: 2, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['BIGGER THAN A PERSON', 'ALIVE', 'OFTEN HAS SPOTS OR STRIPES'] },
    { name: 'Monkey', syllables: 2, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'OFTEN MAKES A SOUND', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Kangaroo', syllables: 3, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['BIGGER THAN A PERSON', 'ALIVE'] },
    { name: 'Penguin', syllables: 2, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Eagle', syllables: 2, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'HAS A POINT OR SPIKE'] },
    { name: 'Owl', syllables: 1, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'OFTEN MAKES A SOUND', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Parrot', syllables: 2, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'OFTEN MAKES A SOUND', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Duck', syllables: 1, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'OFTEN MAKES A SOUND', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Chicken', syllables: 2, context: ['MOSTLY FOUND OUTSIDE', 'USUALLY FOUND IN RURAL AREAS'], attribute: ['ALIVE', 'OFTEN MAKES A SOUND', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Cow', syllables: 1, context: ['USUALLY FOUND IN RURAL AREAS'], attribute: ['BIGGER THAN A PERSON', 'ALIVE', 'WEIGHS MORE THAN A CHAIR', 'OFTEN HAS SPOTS OR STRIPES'] },
    { name: 'Horse', syllables: 1, context: ['USUALLY FOUND IN RURAL AREAS'], attribute: ['BIGGER THAN A PERSON', 'ALIVE', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Pig', syllables: 1, context: ['USUALLY FOUND IN RURAL AREAS'], attribute: ['ALIVE', 'WEIGHS MORE THAN A CHAIR', 'OFTEN MAKES A SOUND'] },
    { name: 'Sheep', syllables: 1, context: ['USUALLY FOUND IN RURAL AREAS'], attribute: ['ALIVE', 'WEIGHS MORE THAN A CHAIR', 'OFTEN MAKES A SOUND'] },
    { name: 'Goat', syllables: 1, context: ['USUALLY FOUND IN RURAL AREAS'], attribute: ['ALIVE', 'HAS A POINT OR SPIKE', 'OFTEN MAKES A SOUND'] },
    { name: 'Rabbit', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT'], attribute: ['ALIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Mouse', syllables: 1, context: ['MOST PEOPLE SEE IT REGULARLY'], attribute: ['ALIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Bat', syllables: 1, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Spider', syllables: 2, context: ['CAN BE DANGEROUS', 'MOST PEOPLE SEE IT REGULARLY'], attribute: ['ALIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Bee', syllables: 1, context: ['CAN BE DANGEROUS', 'MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'HAS A POINT OR SPIKE', 'OFTEN HAS SPOTS OR STRIPES'] },
    { name: 'Butterfly', syllables: 3, compound: true, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'OFTEN HAS SPOTS OR STRIPES', 'EASY TO DESTROY'] },
    { name: 'Ant', syllables: 1, context: ['MOST PEOPLE SEE IT REGULARLY'], attribute: ['ALIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Mosquito', syllables: 3, context: ['CAN BE DANGEROUS'], attribute: ['ALIVE', 'OFTEN MAKES A SOUND'] },
    { name: 'Dragonfly', syllables: 3, compound: true, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Snail', syllables: 1, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'USUALLY ROUND OR CURVED', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Starfish', syllables: 2, compound: true, context: ['MOSTLY FOUND OUTSIDE'], attribute: ['ALIVE', 'HAS A POINT OR SPIKE'] },
    { name: 'Jellyfish', syllables: 3, compound: true, context: ['CAN BE DANGEROUS'], attribute: ['ALIVE', 'EASY TO DESTROY'] },
    { name: 'Unicorn', syllables: 3, context: ['SUBJECT OF MYTH OR LEGEND'], attribute: ['BIGGER THAN A PERSON', 'HAS A POINT OR SPIKE'] },
    { name: 'Phoenix', syllables: 2, context: ['SUBJECT OF MYTH OR LEGEND'], attribute: ['FLAMMABLE', 'ALIVE'] },
    { name: 'Mermaid', syllables: 2, compound: true, context: ['SUBJECT OF MYTH OR LEGEND'], attribute: ['ALIVE'] },
    { name: 'Alien', syllables: 3, context: ['SUBJECT OF MYTH OR LEGEND'], attribute: ['ALIVE'] },
    { name: 'Robot', syllables: 2, context: ['MAN-MADE', 'USEFUL'], attribute: ['CONTAINS PLASTIC', 'SHINY OR REFLECTIVE', 'OFTEN MAKES A SOUND'] },
    { name: 'Spaceship', syllables: 2, compound: true, context: ['MAN-MADE', 'USUALLY WORTH MORE THAN $100'], attribute: ['BIGGER THAN A PERSON', 'SHINY OR REFLECTIVE'] },
    { name: 'Submarine', syllables: 3, context: ['MAN-MADE', 'USUALLY WORTH MORE THAN $100'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Hovercraft', syllables: 3, compound: true, context: ['MAN-MADE'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Skateboard', syllables: 3, compound: true, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['CONTAINS WOOD', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Rollercoaster', syllables: 4, compound: true, context: ['MAN-MADE', 'CAN BE DANGEROUS'], attribute: ['BIGGER THAN A PERSON', 'OFTEN MAKES A SOUND'] },
    { name: 'Trampoline', syllables: 3, context: ['MAN-MADE'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Boomerang', syllables: 3, context: ['MAN-MADE'], attribute: ['CONTAINS WOOD', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Frisbee', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['CONTAINS PLASTIC', 'USUALLY ROUND OR CURVED', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Yo-yo', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Kite', syllables: 1, context: ['MOSTLY FOUND OUTSIDE', 'MAN-MADE'], attribute: ['EASY TO DESTROY', 'FLAMMABLE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Balloon', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'EASY TO DESTROY', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Basketball', syllables: 3, compound: true, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'COULD BE HELD WITH ONE HAND', 'HAS A STANDARD SIZE'] },
    { name: 'Football', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Baseball', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'COULD BE HELD WITH ONE HAND', 'TYPICALLY THE SAME SIZE'] },
    { name: 'Tennis ball', syllables: 3, compound: true, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'COULD BE HELD WITH ONE HAND', 'TYPICALLY THE SAME SIZE'] },
    { name: 'Bowling ball', syllables: 3, compound: true, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'WOULD HURT IF DROPPED ON YOU', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Golf ball', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'COULD BE HELD WITH ONE HAND', 'TYPICALLY THE SAME SIZE'] },
    { name: 'Chessboard', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['CONTAINS WOOD', 'OFTEN HAS SPOTS OR STRIPES'] },
    { name: 'Dice', syllables: 1, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['CONTAINS PLASTIC', 'COULD BE HELD WITH ONE HAND', 'OFTEN HAS SPOTS OR STRIPES'] },
    { name: 'Domino', syllables: 3, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['CONTAINS PLASTIC', 'COULD BE HELD WITH ONE HAND', 'OFTEN HAS SPOTS OR STRIPES'] },
    { name: 'Puzzle', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['CONTAINS WOOD', 'EASY TO DESTROY'] },
    { name: 'Teddy bear', syllables: 3, compound: true, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['COULD BE HELD WITH ONE HAND', 'EASY TO DESTROY'] },
    { name: 'Doll', syllables: 1, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['CONTAINS PLASTIC', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Lego', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['CONTAINS PLASTIC', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Slime', syllables: 1, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['COULD BE HELD WITH ONE HAND', 'EASY TO DESTROY'] },
    { name: 'Play-Doh', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['COULD BE HELD WITH ONE HAND', 'EASY TO DESTROY'] },
    { name: 'Crayon', syllables: 2, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['FLAMMABLE', 'COULD BE HELD WITH ONE HAND', 'EASY TO DESTROY'] },
    { name: 'Paintbrush', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE TOUCHED IT', 'MAN-MADE'], attribute: ['CONTAINS WOOD', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Canvas', syllables: 2, context: ['MAN-MADE'], attribute: ['FLAMMABLE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Statue', syllables: 2, context: ['MAN-MADE', 'EXPECTED TO LAST 100+ YEARS'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Crown', syllables: 1, context: ['MAN-MADE', 'SUBJECT OF MYTH OR LEGEND'], attribute: ['SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Sword', syllables: 1, context: ['CAN BE DANGEROUS', 'MAN-MADE', 'SUBJECT OF MYTH OR LEGEND'], attribute: ['HAS A POINT OR SPIKE', 'SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Shield', syllables: 1, context: ['MAN-MADE', 'SUBJECT OF MYTH OR LEGEND'], attribute: ['SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Bow', syllables: 1, context: ['CAN BE DANGEROUS', 'MAN-MADE'], attribute: ['CONTAINS WOOD', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Arrow', syllables: 2, context: ['CAN BE DANGEROUS', 'MAN-MADE'], attribute: ['HAS A POINT OR SPIKE', 'CONTAINS WOOD', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Spear', syllables: 1, context: ['CAN BE DANGEROUS', 'MAN-MADE'], attribute: ['HAS A POINT OR SPIKE', 'CONTAINS WOOD'] },
    { name: 'Axe', syllables: 1, context: ['CAN BE DANGEROUS', 'MAN-MADE'], attribute: ['HAS A POINT OR SPIKE', 'WOULD HURT IF DROPPED ON YOU'] },
    { name: 'Cannon', syllables: 2, context: ['CAN BE DANGEROUS', 'MAN-MADE'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR', 'OFTEN MAKES A SOUND'] },
    { name: 'Anchor', syllables: 2, context: ['MAN-MADE'], attribute: ['WEIGHS MORE THAN A CHAIR', 'WOULD HURT IF DROPPED ON YOU', 'SHINY OR REFLECTIVE'] },
    { name: 'Compass', syllables: 2, context: ['COULD HELP YOU SURVIVE IN THE WILDERNESS', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Map', syllables: 1, context: ['COULD HELP YOU SURVIVE IN THE WILDERNESS', 'MAN-MADE'], attribute: ['FLAMMABLE', 'EASY TO DESTROY', 'OFTEN HAS WRITING ON IT'] },
    { name: 'Globe', syllables: 1, context: ['YOU EXPECT TO FIND IT AT A SCHOOL', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'CONTAINS PLASTIC', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Book', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'YOU EXPECT TO FIND IT AT A SCHOOL', 'MAN-MADE'], attribute: ['CONTAINS WOOD', 'FLAMMABLE', 'OFTEN HAS WRITING ON IT', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Dictionary', syllables: 4, context: ['YOU EXPECT TO FIND IT AT A SCHOOL', 'MAN-MADE'], attribute: ['CONTAINS WOOD', 'OFTEN HAS WRITING ON IT', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Calculator', syllables: 4, context: ['YOU EXPECT TO FIND IT AT A SCHOOL', 'YOU EXPECT TO FIND IT IN AN OFFICE', 'MAN-MADE'], attribute: ['CONTAINS PLASTIC', 'OFTEN HAS WRITING ON IT', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Stapler', syllables: 2, context: ['YOU EXPECT TO FIND IT IN AN OFFICE', 'MAN-MADE'], attribute: ['COULD BE HELD WITH ONE HAND', 'HAS A POINT OR SPIKE'] },
    { name: 'Paperclip', syllables: 3, compound: true, context: ['YOU EXPECT TO FIND IT IN AN OFFICE', 'MAN-MADE'], attribute: ['SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND', 'TYPICALLY THE SAME SIZE'] },
    { name: 'Eraser', syllables: 3, context: ['MOST PEOPLE HAVE TOUCHED IT', 'YOU EXPECT TO FIND IT AT A SCHOOL', 'MAN-MADE'], attribute: ['COULD BE HELD WITH ONE HAND', 'TYPICALLY THE SAME SIZE', 'EASY TO CLEAN'] },
    { name: 'Ruler', syllables: 2, context: ['YOU EXPECT TO FIND IT AT A SCHOOL', 'MAN-MADE'], attribute: ['CONTAINS PLASTIC', 'OFTEN HAS WRITING ON IT', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Backpack', syllables: 2, compound: true, context: ['YOU EXPECT TO FIND IT AT A SCHOOL', 'MAN-MADE'], attribute: ['COULD BE HELD WITH ONE HAND', 'HAS A STANDARD SIZE'] },
    { name: 'Blackboard', syllables: 2, compound: true, context: ['YOU EXPECT TO FIND IT AT A SCHOOL', 'MAN-MADE'], attribute: ['BIGGER THAN A PERSON', 'OFTEN HAS WRITING ON IT'] },
    { name: 'Desk', syllables: 1, context: ['YOU EXPECT TO FIND IT IN AN OFFICE', 'YOU EXPECT TO FIND IT AT A SCHOOL', 'MAN-MADE'], attribute: ['CONTAINS WOOD', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Chair', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'YOU EXPECT TO FIND IT IN AN OFFICE', 'MAN-MADE'], attribute: ['CONTAINS WOOD', 'HAS A STANDARD SIZE'] },
    { name: 'Sofa', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Bed', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR'] },
    { name: 'Pillow', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['COULD BE HELD WITH ONE HAND', 'EASY TO CLEAN'] },
    { name: 'Blanket', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['EASY TO CLEAN', 'FLAMMABLE'] },
    { name: 'Towel', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['EASY TO CLEAN', 'FLAMMABLE'] },
    { name: 'Soap', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['EASY TO CLEAN', 'HAS A STRONG TASTE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Toothbrush', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['CONTAINS PLASTIC', 'COULD BE HELD WITH ONE HAND', 'EASY TO CLEAN'] },
    { name: 'Toothpaste', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['CONTAINS PLASTIC', 'HAS A STRONG TASTE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Shampoo', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['CONTAINS PLASTIC', 'EASY TO CLEAN'] },
    { name: 'Comb', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['CONTAINS PLASTIC', 'HAS A POINT OR SPIKE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Hairdryer', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['CONTAINS PLASTIC', 'OFTEN MAKES A SOUND', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Washing machine', syllables: 4, compound: true, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR', 'OFTEN MAKES A SOUND'] },
    { name: 'Refrigerator', syllables: 5, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['BIGGER THAN A PERSON', 'WEIGHS MORE THAN A CHAIR', 'SHINY OR REFLECTIVE'] },
    { name: 'Microwave', syllables: 3, compound: true, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['WEIGHS MORE THAN A CHAIR', 'OFTEN MAKES A SOUND', 'SHINY OR REFLECTIVE'] },
    { name: 'Toaster', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND', 'FLAMMABLE'] },
    { name: 'Oven', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['WEIGHS MORE THAN A CHAIR', 'SHINY OR REFLECTIVE'] },
    { name: 'Kettle', syllables: 2, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Teapot', syllables: 2, compound: true, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Plate', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'EASY TO DESTROY', 'EASY TO CLEAN'] },
    { name: 'Bowl', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'EASY TO DESTROY', 'EASY TO CLEAN'] },
    { name: 'Cup', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['USUALLY ROUND OR CURVED', 'COULD BE HELD WITH ONE HAND', 'EASY TO CLEAN'] },
    { name: 'Glass', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['YOU CAN LOOK THROUGH IT', 'EASY TO DESTROY', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Fork', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'MAN-MADE'], attribute: ['HAS A POINT OR SPIKE', 'SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND'] },
    { name: 'Knife', syllables: 1, context: ['MOST PEOPLE HAVE IT AT HOME', 'CAN BE DANGEROUS', 'MAN-MADE'], attribute: ['HAS A POINT OR SPIKE', 'SHINY OR REFLECTIVE', 'COULD BE HELD WITH ONE HAND'] }
  ];

  let mode = $state<'solo' | 'host'>('solo');
  let puzzleIndex = $state(0), cardIndex = $state(4), guess = $state<RingIndex[]>([]), message = $state('');
  let revealed = $state([false, false, false]), score = $state(0), moves = $state(0), placed = $state<{name:string;rings:RingIndex[]}[]>([]);
  let hostCards = $state<[string,string,string]>(['','','']), hostHidden = $state([false,false,false]), hostObjectIndex = $state(0);
  let board: any, mounted = false;

  let puzzle = $derived(soloPuzzles[puzzleIndex]), card = $derived(puzzle.objects[cardIndex % puzzle.objects.length]);
  let hostObject = $derived(hostObjects[hostObjectIndex % hostObjects.length]);

  const regionKey = (rings: readonly number[]) => [...rings].sort().join(',');
  const regionLabel = (rings: readonly number[]) => rings.length ? rings.map((ring) => ringNames[ring]).join(' + ') : 'Outside all rings';
  const pick = <T,>(values: readonly T[]) => values[Math.floor(Math.random() * values.length)];
  const difficulty = (deck: Deck, cardText: string) => Math.floor(Math.max(0, (officialCards[deck] as readonly string[]).indexOf(cardText)) / 8) + 1;
  const stars = (level: number) => '★'.repeat(level) + '☆'.repeat(3 - level);

  function wordMatches(rule: string, object: HostObject) {
    const letters = object.name.toUpperCase().replace(/[^A-Z]/g, '');
    const vowels = new Set(letters.match(/[AEIOU]/g) ?? []);
    const counts = [...letters].reduce<Record<string, number>>((all, letter) => ({ ...all, [letter]: (all[letter] ?? 0) + 1 }), {});
    const first = letters[0] ?? '', second = letters[1] ?? '';
    if (rule === 'HAS 1 SYLLABLE') return object.syllables === 1;
    if (rule === 'HAS 2 SYLLABLES') return object.syllables === 2;
    if (rule === '5 OR FEWER LETTERS LONG') return letters.length <= 5;
    if (rule.startsWith('HAS A CONSECUTIVE DOUBLE')) return /(.)\1/.test(letters);
    if (rule === 'HAS AN "O"') return letters.includes('O');
    if (rule === 'HAS AN "R"') return letters.includes('R');
    if (rule === 'EXACTLY 5 LETTERS LONG') return letters.length === 5;
    if (rule === 'STARTS WITH A VOWEL OR "Y"') return /^[AEIOUY]/.test(letters);
    if (rule === 'STARTS WITH A LETTER FROM "A"-"M"') return first >= 'A' && first <= 'M';
    if (rule === 'HAS 2 OR MORE DIFFERENT VOWELS') return vowels.size >= 2;
    if (rule === 'HAS 4 OR FEWER UNIQUE LETTERS') return new Set(letters).size <= 4;
    if (rule.startsWith('IS A COMPOUND WORD')) return !!object.compound;
    if (rule.startsWith('FIRST LETTER IS REPEATED')) return (counts[first] ?? 0) > 1;
    if (rule.startsWith('HAS 3 OR MORE CONSECUTIVE CONSONANTS')) return /[^AEIOUY]{3}/.test(letters);
    if (rule.startsWith('HAS 1 OR MORE REPEATED LETTERS')) return Object.values(counts).some((count) => count > 1);
    if (rule === 'ENDS WITH A CONSONANT OR "Y"') return /[^AEIOU]$/.test(letters);
    if (rule === '6-8 LETTERS LONG') return letters.length >= 6 && letters.length <= 8;
    if (rule.startsWith('HAS 2 OR MORE CONSECUTIVE VOWELS')) return /[AEIOU]{2}/.test(letters);
    if (rule === 'HAS 1 OR MORE REPEATED VOWELS') return [...vowels].some((vowel) => (counts[vowel] ?? 0) > 1);
    if (rule === 'ENDS WITH 2 CONSONANTS') return /[^AEIOU]{2}$/.test(letters);
    if (rule === 'ENDS WITH A LETTER FROM "N"-"Z"') return letters.at(-1)! >= 'N';
    if (rule === '4-6 LETTERS LONG') return letters.length >= 4 && letters.length <= 6;
    if (rule === 'HAS EXACTLY 1 VOWEL (NOT INCLUDING "Y")') return vowels.size === 1;
    if (rule === 'FIRST 2 LETTERS ARE IN ALPHABETICAL ORDER') return first <= second;
    return false;
  }

  function hostSolution(): RingIndex[] {
    return [wordMatches(hostCards[0], hostObject), hostObject.context.includes(hostCards[1]), hostObject.attribute.includes(hostCards[2])].map((yes, index) => yes ? index as RingIndex : null).filter((value): value is RingIndex => value !== null);
  }

  let hostSolutionHidden = $state(false);
  function rerollHostCard(index: number) { const decks: Deck[] = ['word', 'context', 'attribute']; hostCards[index] = pick(officialCards[decks[index]]); hostCards = [...hostCards]; hostHidden[index] = false; hostHidden = [...hostHidden]; }
  function newHostCards() { rerollHostCard(0); rerollHostCard(1); rerollHostCard(2); }
  function toggleAllHostCards() { const hide = hostHidden.some((h) => !h); hostHidden = [hide, hide, hide]; hostSolutionHidden = hide; }
  function resetSolo() { puzzleIndex = (puzzleIndex + 1) % soloPuzzles.length; cardIndex = 4; guess = []; message = ''; revealed = [false, false, false]; score = 0; moves = 0; placed = []; setTimeout(buildBoard); }
  function selectRegion(rings: RingIndex[]) { guess = rings; message = ''; board?.update(); }

  function stackFor(key: string) {
    const initial = puzzle.objects.slice(0, 4).filter((object) => regionKey(object.rings) === key).map((object) => object.name);
    const answered = placed.filter((object) => regionKey(object.rings) === key).map((object) => object.name);
    const preview = regionKey(guess) === key && score < 5 ? [`<b style="color:#e64980">${card.name}</b>`] : [];
    return [...initial, ...answered, ...preview].join('<br>');
  }

  function buildBoard() {
    if (!mounted || !window.JXG || mode !== 'solo') return;
    if (board) window.JXG.JSXGraph.freeBoard(board);
    board = window.JXG.JSXGraph.initBoard('rings-board', { boundingbox: [-5, 4.5, 5, -4.5], axis: false, keepaspectratio: true, showCopyright: false, showNavigation: false, pan: { enabled: false }, zoom: { enabled: false } });
    const centers: [number, number][] = [[-1.35, .7], [1.35, .7], [0, -1.1]];
    centers.forEach(([x, y], index) => { board.create('circle', [[x, y], 2.55], { strokeColor: colors[index], fillColor: colors[index], fillOpacity: .17, strokeWidth: 5, fixed: true, highlight: false }); board.create('text', [x + (index === 0 ? -2.25 : index === 1 ? 1.25 : -.65), y + (index === 2 ? -2.7 : 2.55), ringNames[index].toUpperCase()], { color: colors[index], fontSize: 15, fixed: true, highlight: false, cssStyle: 'font-weight:900;letter-spacing:.08em' }); });
    Object.entries(regionPoints).forEach(([key, [x, y]]) => board.create('text', [x, y, () => stackFor(key)], { anchorX: 'middle', anchorY: 'middle', fontSize: 12, fixed: true, highlight: false, useHTML: true, cssStyle: 'text-align:center;line-height:1.25;font-weight:700;max-width:120px' }));
    board.on('down', (event: PointerEvent) => { if (score >= 5) return; const coords = new window.JXG.Coords(window.JXG.COORDS_BY_SCREEN, board.getMousePosition(event), board).usrCoords; selectRegion(centers.map(([x, y], index) => ({ index: index as RingIndex, inside: Math.hypot(coords[1] - x, coords[2] - y) <= 2.55 })).filter((item) => item.inside).map((item) => item.index)); });
  }

  function submit() {
    if (score >= 5) return; moves += 1; const correct = regionKey(card.rings) === regionKey(guess); placed = [...placed, { name: card.name, rings: card.rings }];
    if (correct) { score += 1; message = 'Correct — one point earned!'; } else { guess = [...card.rings]; message = `Placed correctly in ${regionLabel(card.rings)}.`; }
    board?.update(); setTimeout(() => { if (score < 5) { cardIndex = (cardIndex + 1) % puzzle.objects.length; guess = []; message = ''; board?.update(); } }, 850);
  }

  onMount(() => { mounted = true; newHostCards(); buildBoard(); return () => { if (board && window.JXG) window.JXG.JSXGraph.freeBoard(board); }; });
  $effect(() => { puzzleIndex; mode; if (mounted) setTimeout(buildBoard); });
</script>

<!-- Mobile-Friendly App Container (Zero Page Scroll) -->
<section class="rings-game flex h-[calc(100vh-80px)] max-h-[820px] min-h-[520px] flex-col justify-between overflow-hidden rounded-3xl border border-base-300 bg-base-100 p-3 shadow-xl sm:p-5">
  
  <!-- Top Header Navigation & Mode Switch -->
  <div class="flex items-center justify-between gap-2 border-b border-base-200 pb-3 shrink-0">
    <div class="flex items-center gap-2">
      <span class="badge badge-primary badge-sm font-bold uppercase">Week 1 Studio</span>
      <h2 class="text-lg font-black text-base-content sm:text-2xl">Things in Rings</h2>
    </div>

    <div class="tabs tabs-boxed bg-base-200 p-1 rounded-2xl">
      <button class:tab-active={mode==='solo'} class="tab tab-sm font-bold gap-1 transition-all" onclick={()=>mode='solo'}><UserRound size={15}/> Solo</button>
      <button class:tab-active={mode==='host'} class="tab tab-sm font-bold gap-1 transition-all" onclick={()=>mode='host'}><Users size={15}/> Host</button>
    </div>
  </div>

  <!-- Main View Area (Responsive Mobile Layout) -->
  <div class="flex-1 overflow-y-auto py-1 px-0.5">
    {#if mode==='solo'}
      <div class="flex flex-col md:grid md:grid-cols-12 gap-3 h-full animate-fade-in">
        
        <!-- UPPER (Mobile) / RIGHT (Desktop) : Interactive 3-Ring Venn Diagram -->
        <div class="order-1 md:order-2 md:col-span-7 flex flex-col justify-between rounded-2xl border border-base-300 bg-base-100 p-2 shadow-inner">
          <div id="rings-board" class="jxgbox !h-[280px] sm:!h-[480px] !w-full cursor-crosshair rounded-xl border-0" aria-label="Clickable three-ring Venn diagram"></div>
          
          <div class="mt-2 flex flex-wrap items-center justify-between gap-2 p-2 bg-base-200/40 rounded-xl">
            <p class="text-xs font-bold">Selected: <span class="text-primary font-mono">{regionLabel(guess)}</span></p>
            <button class="btn btn-sm btn-primary rounded-full px-5 font-bold" disabled={score>=5} onclick={submit}>Place Object</button>
          </div>
          {#if message}<div class={`alert py-1.5 mt-2 text-xs font-bold ${message.startsWith('Correct')?'alert-success':'alert-info'}`}>{message}</div>{/if}
        </div>

        <!-- LOWER (Mobile) / LEFT (Desktop) : Cards & Stats -->
        <div class="order-2 md:order-1 md:col-span-5 flex flex-col justify-between space-y-3 rounded-2xl border border-base-200 bg-base-200/30 p-4">
          <div>
            <!-- Stats Bar -->
            <div class="grid grid-cols-3 gap-2 mb-3 text-center">
              <div class="rounded-xl bg-base-100 p-2 border border-base-200"><span class="text-[10px] uppercase font-black text-base-content/50 block">Score</span><b class="text-lg text-primary font-mono">{score}/5</b></div>
              <div class="rounded-xl bg-base-100 p-2 border border-base-200"><span class="text-[10px] uppercase font-black text-base-content/50 block">Moves</span><b class="text-lg font-mono">{moves}</b></div>
              <div class="rounded-xl bg-base-100 p-2 border border-base-200"><span class="text-[10px] uppercase font-black text-base-content/50 block">Pool</span><b class="text-sm font-mono text-secondary">{hostObjects.length}</b></div>
            </div>

            <!-- Current Object Card -->
            <div class="rounded-2xl border border-primary/30 bg-primary/10 p-3 text-center mb-3">
              <span class="text-[10px] font-black uppercase tracking-wider text-primary block">{score>=5?'Completed':'Place this object'}</span>
              <strong class="text-xl sm:text-2xl font-black text-primary font-mono">{score>=5?`${score} pts in ${moves} moves`:card.name}</strong>
            </div>

            <!-- Category Cards -->
            <div class="flex items-center justify-between mb-2"><h3 class="font-black text-sm text-base-content">Category Cards</h3><button class="btn btn-ghost btn-xs gap-1" onclick={resetSolo}><RefreshCw size={14}/> New Game</button></div>
            <div class="space-y-2 max-h-[220px] overflow-y-auto">
              {#each puzzle.categories as category,index}
                <div class={`category-card official-ring-${index} p-2 rounded-xl border border-base-200 flex items-center justify-between text-xs`}>
                  <div>
                    <span class="text-[10px] opacity-70 block">{ringNames[index]} · {stars(difficulty((['word','context','attribute'] as Deck[])[index],category))}</span>
                    <b class="text-sm font-bold">{revealed[index]?category:'???'}</b>
                  </div>
                  <button class="btn btn-ghost btn-xs" onclick={()=>{revealed[index]=!revealed[index];revealed=[...revealed]}}>
                    {#if revealed[index]}<EyeOff size={13}/>{:else}<Eye size={13}/>{/if}
                  </button>
                </div>
              {/each}
            </div>
          </div>

          <!-- Keyboard Placement Options Collapse -->
          <details class="collapse collapse-arrow bg-base-100 rounded-xl border border-base-200">
            <summary class="collapse-title text-xs font-bold py-2 min-h-0">Keyboard Placement Options</summary>
            <div class="collapse-content grid grid-cols-2 gap-1.5 p-2 pt-0">
              {#each [[],[0],[1],[2],[0,1],[0,2],[1,2],[0,1,2]] as region}
                <button class:selected={regionKey(guess)===regionKey(region)} class="btn btn-xs btn-outline text-[10px] truncate" onclick={()=>selectRegion(region as RingIndex[])}>{regionLabel(region)}</button>
              {/each}
            </div>
          </details>
        </div>

      </div>
    {:else}
      <!-- HOST MODE -->
      <div class="flex flex-col md:grid md:grid-cols-12 gap-3 h-full animate-fade-in">
        <div class="order-1 md:col-span-7 flex flex-col justify-between space-y-3 rounded-2xl border border-base-300 bg-base-100 p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-black text-base text-base-content">Official Category Decks</h3>
            <div class="flex items-center gap-1">
              <button class="btn btn-sm btn-ghost gap-1" onclick={toggleAllHostCards}>
                {#if hostHidden.some((h) => !h)}<EyeOff size={14}/> Hide All{:else}<Eye size={14}/> Reveal All{/if}
              </button>
              <button class="btn btn-sm btn-primary gap-1" onclick={newHostCards}><RefreshCw size={14}/> Reroll All</button>
            </div>
          </div>
          <div class="grid gap-2">
            {#each hostCards as category,index}
              <div class={`category-card official-ring-${index} p-3 rounded-xl border border-base-200 flex items-center justify-between`}>
                <div>
                  <span class="text-xs opacity-70 block">{ringNames[index]} · {stars(difficulty((['word','context','attribute'] as Deck[])[index],category))}</span>
                  <b class="text-base font-bold">{hostHidden[index]?'HIDDEN':category}</b>
                </div>
                <div class="flex gap-1">
                  <button class="btn btn-ghost btn-xs" onclick={()=>{hostHidden[index]=!hostHidden[index];hostHidden=[...hostHidden]}}>
                    {#if hostHidden[index]}<Eye size={14}/>{:else}<EyeOff size={14}/>{/if}
                  </button>
                  <button class="btn btn-ghost btn-xs" onclick={()=>rerollHostCard(index)}><RotateCw size={14}/></button>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <div class="order-2 md:col-span-5 flex flex-col justify-between space-y-3 rounded-2xl border border-base-200 bg-base-200/30 p-4">
          <div>
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-black text-base text-base-content">Object Randomizer</h3>
              <button class="btn btn-sm btn-outline gap-1" onclick={()=>hostObjectIndex=Math.floor(Math.random()*hostObjects.length)}><RefreshCw size={14}/> Next Object</button>
            </div>

            <div class="rounded-2xl border border-secondary/30 bg-secondary/10 p-4 text-center mb-3">
              <span class="text-[10px] font-black uppercase tracking-wider text-secondary block">Random Object Card</span>
              <strong class="text-2xl font-black text-secondary font-mono">{hostObject.name}</strong>
            </div>

            <div class="alert alert-success py-2 font-mono text-xs flex items-center justify-between">
              <div>
                <b>Built-in Solution:</b>
                <div class="mt-1 font-bold">{hostSolutionHidden ? 'HIDDEN' : regionLabel(hostSolution())}</div>
              </div>
              <button class="btn btn-ghost btn-xs" onclick={() => hostSolutionHidden = !hostSolutionHidden}>
                {#if hostSolutionHidden}<Eye size={13}/>{:else}<EyeOff size={13}/>{/if}
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>

</section>
