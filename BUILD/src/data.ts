import { ZenkaiType, TrainerTrait, TrainerTraitId, ZenkaiData, TrainerData } from './types';

export const SPONSORSHIP_DEALS_DATA: { id: string; name: string; description: string; requiredPopularity: number; weeklyIncome: number; totalWeeks: number; }[] = [
    {
        id: 'pokemart',
        name: "Parceria Zen Mart",
        description: "Uma parceria básica para vender Bolas Zenkai personalizadas. Uma fonte de renda estável, embora pequena.",
        requiredPopularity: 25,
        weeklyIncome: 500,
        totalWeeks: 20,
    },
    {
        id: 'pokenav',
        name: "Endosso KaiNav Plus",
        description: "Promova o mais recente modelo KaiNav. Popular entre os treinadores em movimento.",
        requiredPopularity: 100,
        weeklyIncome: 1500,
        totalWeeks: 15,
    },
    {
        id: 'silphco',
        name: "Patrocínio Tecnológico Zenko Co.",
        description: "A Zenko Co. quer exibir sua tecnologia avançada nos eventos da sua liga.",
        requiredPopularity: 250,
        weeklyIncome: 4000,
        totalWeeks: 10,
    },
    {
        id: 'devoncorp',
        name: "Bolsa de Pesquisa Oran Corp.",
        description: "Uma bolsa de pesquisa da Oran Corp. para estudar batalhas Zenkai em um ambiente de liga profissional.",
        requiredPopularity: 500,
        weeklyIncome: 8000,
        totalWeeks: 10,
    },
    {
        id: 'battlefrontier',
        name: "Exibição Batalha Zenkai",
        description: "Organize partidas de exibição em parceria com a lendária Batalha Zenkai. Um grande impulso para o prestígio da sua liga.",
        requiredPopularity: 1000,
        weeklyIncome: 15000,
        totalWeeks: 5,
    },
];


export const ZENKAI_DATA: ZenkaiData[] = [
  {
    "name": "Oranboo",
    "type": ZenkaiType.Herbal,
    "basePower": 70,
    "habitat": "Floresta",
    "forma": "Inicial",
    "evolution": {
      "level": 16,
      "to": "Simiboo"
    }
  },
  {
    "name": "Simiboo",
    "type": ZenkaiType.Herbal,
    "basePower": 90,
    "habitat": "Floresta",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Goriboo"
    }
  },
  {
    "name": "Goriboo",
    "type": ZenkaiType.Herbal,
    "basePower": 110,
    "habitat": "Floresta",
    "forma": "Elite"
  },
  {
    "name": "Burrny",
    "type": ZenkaiType.Fogo,
    "basePower": 70,
    "habitat": "Campina",
    "forma": "Inicial",
    "evolution": {
      "level": 16,
      "to": "Burrnoar"
    }
  },
  {
    "name": "Burrnoar",
    "type": ZenkaiType.Fogo,
    "basePower": 90,
    "habitat": "Campina",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Burrnout Kai"
    }
  },
  {
    "name": "Burrnout Kai",
    "type": ZenkaiType.Fogo,
    "basePower": 110,
    "habitat": "Campina",
    "forma": "Elite"
  },
  {
    "name": "Allipop",
    "type": ZenkaiType.Agua,
    "basePower": 70,
    "habitat": "Aquático",
    "forma": "Inicial",
    "evolution": {
      "level": 16,
      "to": "Alliptile"
    }
  },
  {
    "name": "Alliptile",
    "type": ZenkaiType.Agua,
    "basePower": 90,
    "habitat": "Aquático",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Allijaws"
    }
  },
  {
    "name": "Allijaws",
    "type": ZenkaiType.Agua,
    "basePower": 110,
    "habitat": "Aquático",
    "forma": "Elite"
  },
  {
    "name": "Pigroot",
    "type": ZenkaiType.Herbal,
    "basePower": 70,
    "habitat": "Campina",
    "forma": "Inicial",
    "evolution": {
      "level": 16,
      "to": "Poinroot"
    }
  },
  {
    "name": "Poinroot",
    "type": ZenkaiType.Herbal,
    "basePower": 90,
    "habitat": "Campina",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Porkroot"
    }
  },
  {
    "name": "Porkroot",
    "type": ZenkaiType.Herbal,
    "basePower": 110,
    "habitat": "Campina",
    "forma": "Elite"
  },
  {
    "name": "Rabblaze",
    "type": ZenkaiType.Fogo,
    "basePower": 70,
    "habitat": "Montanha",
    "forma": "Inicial",
    "evolution": {
      "level": 16,
      "to": "Rabblast"
    }
  },
  {
    "name": "Rabblast",
    "type": ZenkaiType.Fogo,
    "basePower": 90,
    "habitat": "Montanha",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Rabbomber Zen"
    }
  },
  {
    "name": "Rabbomber Zen",
    "type": ZenkaiType.Fogo,
    "basePower": 110,
    "habitat": "Montanha",
    "forma": "Elite"
  },
  {
    "name": "Coldeep",
    "type": ZenkaiType.Agua,
    "basePower": 70,
    "habitat": "Montanha",
    "forma": "Inicial",
    "evolution": {
      "level": 16,
      "to": "Goadeep"
    }
  },
  {
    "name": "Goadeep",
    "type": ZenkaiType.Agua,
    "basePower": 90,
    "habitat": "Montanha",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Thordeep"
    }
  },
  {
    "name": "Thordeep",
    "type": ZenkaiType.Agua,
    "basePower": 110,
    "habitat": "Montanha",
    "forma": "Elite"
  },
  {
    "name": "Robbyn",
    "type": ZenkaiType.Voador,
    "basePower": 55,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 12,
      "to": "Hawkyn"
    }
  },
  {
    "name": "Hawkyn",
    "type": ZenkaiType.Voador,
    "basePower": 75,
    "habitat": "Floresta",
    "forma": "Avançado",
    "evolution": {
      "level": 32,
      "to": "Garuffyn"
    }
  },
  {
    "name": "Garuffyn",
    "type": ZenkaiType.Voador,
    "basePower": 95,
    "habitat": "Floresta",
    "forma": "Elite"
  },
  {
    "name": "Howlee",
    "type": ZenkaiType.Noturno,
    "basePower": 20,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 27,
      "to": "Howluna"
    }
  },
  {
    "name": "Howluna",
    "type": ZenkaiType.Noturno,
    "basePower": 70,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Farfly",
    "type": ZenkaiType.Voador,
    "basePower": 55,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 18,
      "to": "Farfurian"
    }
  },
  {
    "name": "Farfurian",
    "type": ZenkaiType.Voador,
    "basePower": 75,
    "habitat": "Campina",
    "forma": "Avançado",
    "evolution": {
      "level": 38,
      "to": "Farfurious"
    }
  },
  {
    "name": "Farfurious",
    "type": ZenkaiType.Voador,
    "basePower": 95,
    "habitat": "Campina",
    "forma": "Elite"
  },
  {
    "name": "Silkling",
    "type": ZenkaiType.Toxico,
    "basePower": 50,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 10,
      "to": "Silkloon"
    }
  },
  {
    "name": "Silkloon",
    "type": ZenkaiType.Toxico,
    "basePower": 70,
    "habitat": "Floresta",
    "forma": "Avançado",
    "evolution": {
      "level": 22,
      "to": "Silkeefly"
    }
  },
  {
    "name": "Silkeefly",
    "type": ZenkaiType.Toxico,
    "basePower": 85,
    "habitat": "Floresta",
    "forma": "Elite"
  },
  {
    "name": "Workuna",
    "type": ZenkaiType.Herbal,
    "basePower": 20,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 24,
      "to": "Worclaw"
    }
  },
  {
    "name": "Worclaw",
    "type": ZenkaiType.Herbal,
    "basePower": 60,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Hotbone",
    "type": ZenkaiType.Noturno,
    "basePower": 70,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 16,
      "to": "Hotwoolf"
    }
  },
  {
    "name": "Hotwoolf",
    "type": ZenkaiType.Noturno,
    "basePower": 90,
    "habitat": "Montanha",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Hotskull"
    }
  },
  {
    "name": "Hotskull",
    "type": ZenkaiType.Noturno,
    "basePower": 110,
    "habitat": "Montanha",
    "forma": "Elite"
  },
  {
    "name": "Incibear",
    "type": ZenkaiType.Fogo,
    "basePower": 20,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 35,
      "to": "Ursineroar"
    }
  },
  {
    "name": "Ursineroar",
    "type": ZenkaiType.Fogo,
    "basePower": 80,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Dogoat",
    "type": ZenkaiType.Terra,
    "basePower": 20,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 25,
      "to": "Bearth"
    }
  },
  {
    "name": "Bearth",
    "type": ZenkaiType.Terra,
    "basePower": 70,
    "habitat": "Montanha",
    "forma": "Avançado"
  },
  {
    "name": "Deerbolt",
    "type": ZenkaiType.Eletrico,
    "basePower": 20,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 29,
      "to": "Kambolt"
    }
  },
  {
    "name": "Kambolt",
    "type": ZenkaiType.Eletrico,
    "basePower": 80,
    "habitat": "Campina",
    "forma": "Avançado"
  },
  {
    "name": "Beetick",
    "type": ZenkaiType.Herbal,
    "basePower": 20,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 29,
      "to": "Beethorn"
    }
  },
  {
    "name": "Beethorn",
    "type": ZenkaiType.Herbal,
    "basePower": 80,
    "habitat": "Montanha",
    "forma": "Avançado"
  },
  {
    "name": "Nimbat",
    "type": ZenkaiType.Mineral,
    "basePower": 20,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 24,
      "to": "Arctobat"
    }
  },
  {
    "name": "Arctobat",
    "type": ZenkaiType.Mineral,
    "basePower": 50,
    "habitat": "Montanha",
    "forma": "Avançado"
  },
  {
    "name": "Stordillo",
    "type": ZenkaiType.Fogo,
    "basePower": 50,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 18,
      "to": "Quardillo"
    }
  },
  {
    "name": "Quardillo",
    "type": ZenkaiType.Fogo,
    "basePower": 70,
    "habitat": "Montanha",
    "forma": "Avançado",
    "evolution": {
      "level": 31,
      "to": "Bunkdillo"
    }
  },
  {
    "name": "Bunkdillo",
    "type": ZenkaiType.Fogo,
    "basePower": 85,
    "habitat": "Montanha",
    "forma": "Elite"
  },
  {
    "name": "Blawny",
    "type": ZenkaiType.Mineral,
    "basePower": 70,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 16,
      "to": "Blazor"
    }
  },
  {
    "name": "Blazor",
    "type": ZenkaiType.Mineral,
    "basePower": 90,
    "habitat": "Campina",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Blazoth"
    }
  },
  {
    "name": "Blazoth",
    "type": ZenkaiType.Mineral,
    "basePower": 110,
    "habitat": "Campina",
    "forma": "Elite"
  },
  {
    "name": "Sharpee",
    "type": ZenkaiType.Agua,
    "basePower": 60,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 22,
      "to": "Carpedum"
    }
  },
  {
    "name": "Carpedum",
    "type": ZenkaiType.Agua,
    "basePower": 80,
    "habitat": "Aquático",
    "forma": "Avançado",
    "evolution": {
      "level": 38,
      "to": "Carpeduster"
    }
  },
  {
    "name": "Carpeduster",
    "type": ZenkaiType.Agua,
    "basePower": 100,
    "habitat": "Aquático",
    "forma": "Elite"
  },
  {
    "name": "Snabul",
    "type": ZenkaiType.Mineral,
    "basePower": 20,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 28,
      "to": "Weresnow"
    }
  },
  {
    "name": "Weresnow",
    "type": ZenkaiType.Mineral,
    "basePower": 80,
    "habitat": "Montanha",
    "forma": "Avançado"
  },
  {
    "name": "Samonji",
    "type": ZenkaiType.Mineral,
    "basePower": 20,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 26,
      "to": "Samonkai"
    }
  },
  {
    "name": "Samonkai",
    "type": ZenkaiType.Mineral,
    "basePower": 50,
    "habitat": "Montanha",
    "forma": "Avançado"
  },
  {
    "name": "Axseal",
    "type": ZenkaiType.Toxico,
    "basePower": 20,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 28,
      "to": "Axsailor"
    }
  },
  {
    "name": "Axsailor",
    "type": ZenkaiType.Toxico,
    "basePower": 80,
    "habitat": "Aquático",
    "forma": "Avançado"
  },
  {
    "name": "Frobble",
    "type": ZenkaiType.Agua,
    "basePower": 55,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 22,
      "to": "Toaddle"
    }
  },
  {
    "name": "Toaddle",
    "type": ZenkaiType.Agua,
    "basePower": 75,
    "habitat": "Aquático",
    "forma": "Avançado",
    "evolution": {
      "level": 41,
      "to": "Poseiddle"
    }
  },
  {
    "name": "Poseiddle",
    "type": ZenkaiType.Agua,
    "basePower": 95,
    "habitat": "Aquático",
    "forma": "Elite"
  },
  {
    "name": "Hexfish",
    "type": ZenkaiType.Noturno,
    "basePower": 20,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 42,
      "to": "Hexnado"
    }
  },
  {
    "name": "Hexnado",
    "type": ZenkaiType.Noturno,
    "basePower": 80,
    "habitat": "Aquático",
    "forma": "Avançado"
  },
  {
    "name": "Orduck",
    "type": ZenkaiType.Agua,
    "basePower": 20,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 20,
      "to": "Orquash"
    }
  },
  {
    "name": "Orquash",
    "type": ZenkaiType.Agua,
    "basePower": 50,
    "habitat": "Aquático",
    "forma": "Avançado",
    "evolution": {
      "level": 38,
      "to": "Thorquash"
    }
  },
  {
    "name": "Thorquash",
    "type": ZenkaiType.Agua,
    "basePower": 80,
    "habitat": "Aquático",
    "forma": "Elite"
  },
  {
    "name": "Drillur",
    "type": ZenkaiType.Mineral,
    "basePower": 20,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 22,
      "to": "Drillodon"
    }
  },
  {
    "name": "Drillodon",
    "type": ZenkaiType.Mineral,
    "basePower": 75,
    "habitat": "Montanha",
    "forma": "Avançado"
  },
  {
    "name": "Squirky",
    "type": ZenkaiType.Eletrico,
    "basePower": 20,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 20,
      "to": "Squarkle"
    }
  },
  {
    "name": "Squarkle",
    "type": ZenkaiType.Eletrico,
    "basePower": 75,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Pingull",
    "type": ZenkaiType.Voador,
    "basePower": 20,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 25,
      "to": "Pingoboat"
    }
  },
  {
    "name": "Pingoboat",
    "type": ZenkaiType.Voador,
    "basePower": 60,
    "habitat": "Aquático",
    "forma": "Avançado"
  },
  {
    "name": "Troppluf",
    "type": ZenkaiType.Herbal,
    "basePower": 30,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 30,
      "to": "Tropicorn"
    }
  },
  {
    "name": "Tropicorn",
    "type": ZenkaiType.Herbal,
    "basePower": 70,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Dinagam",
    "type": ZenkaiType.Terra,
    "basePower": 30,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 30,
      "to": "Raptagam"
    }
  },
  {
    "name": "Raptagam",
    "type": ZenkaiType.Terra,
    "basePower": 70,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Roclamp",
    "type": ZenkaiType.Mineral,
    "basePower": 10,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 50,
      "to": "Clamperial"
    }
  },
  {
    "name": "Clamperial",
    "type": ZenkaiType.Mineral,
    "basePower": 110,
    "habitat": "Aquático",
    "forma": "Avançado"
  },
  {
    "name": "Tortiga",
    "type": ZenkaiType.Toxico,
    "basePower": 70,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 16,
      "to": "Torterror"
    }
  },
  {
    "name": "Torterror",
    "type": ZenkaiType.Toxico,
    "basePower": 90,
    "habitat": "Aquático",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Tortenebrous"
    }
  },
  {
    "name": "Tortenebrous",
    "type": ZenkaiType.Toxico,
    "basePower": 110,
    "habitat": "Aquático",
    "forma": "Elite"
  },
  {
    "name": "Dinodon",
    "type": ZenkaiType.Terra,
    "basePower": 20,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 32,
      "to": "Tyranodon"
    }
  },
  {
    "name": "Tyranodon",
    "type": ZenkaiType.Terra,
    "basePower": 60,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Tentopod",
    "type": ZenkaiType.Noturno,
    "basePower": 35,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 25,
      "to": "Tentorior"
    }
  },
  {
    "name": "Tentorior",
    "type": ZenkaiType.Noturno,
    "basePower": 65,
    "habitat": "Aquático",
    "forma": "Avançado"
  },
  {
    "name": "Sunnince",
    "type": ZenkaiType.Eletrico,
    "basePower": 40,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 24,
      "to": "Sunking"
    }
  },
  {
    "name": "Sunking",
    "type": ZenkaiType.Eletrico,
    "basePower": 90,
    "habitat": "Campina",
    "forma": "Avançado"
  },
  {
    "name": "Quakfuu",
    "type": ZenkaiType.Voador,
    "basePower": 20,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 24,
      "to": "Pelifuu"
    }
  },
  {
    "name": "Pelifuu",
    "type": ZenkaiType.Voador,
    "basePower": 75,
    "habitat": "Campina",
    "forma": "Avançado"
  },
  {
    "name": "Hidragon",
    "type": ZenkaiType.Eletrico,
    "basePower": 70,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 16,
      "to": "Raidragon"
    }
  },
  {
    "name": "Raidragon",
    "type": ZenkaiType.Eletrico,
    "basePower": 90,
    "habitat": "Aquático",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Imperagon"
    }
  },
  {
    "name": "Imperagon",
    "type": ZenkaiType.Eletrico,
    "basePower": 110,
    "habitat": "Aquático",
    "forma": "Elite"
  },
  {
    "name": "Bufant",
    "type": ZenkaiType.Agua,
    "basePower": 25,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 22,
      "to": "Bufantom"
    }
  },
  {
    "name": "Bufantom",
    "type": ZenkaiType.Agua,
    "basePower": 50,
    "habitat": "Campina",
    "forma": "Avançado"
  },
  {
    "name": "Rhinnor",
    "type": ZenkaiType.Terra,
    "basePower": 70,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 16,
      "to": "Blinddor"
    }
  },
  {
    "name": "Blinddor",
    "type": ZenkaiType.Terra,
    "basePower": 90,
    "habitat": "Campina",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Blindhorn"
    }
  },
  {
    "name": "Blindhorn",
    "type": ZenkaiType.Terra,
    "basePower": 110,
    "habitat": "Campina",
    "forma": "Elite"
  },
  {
    "name": "Slowpotas",
    "type": ZenkaiType.Fogo,
    "basePower": 25,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 32,
      "to": "Killopotas"
    }
  },
  {
    "name": "Killopotas",
    "type": ZenkaiType.Fogo,
    "basePower": 85,
    "habitat": "Aquático",
    "forma": "Avançado"
  },
  {
    "name": "Giritox",
    "type": ZenkaiType.Toxico,
    "basePower": 60,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 18,
      "to": "Toximander"
    }
  },
  {
    "name": "Toximander",
    "type": ZenkaiType.Toxico,
    "basePower": 80,
    "habitat": "Campina",
    "forma": "Avançado",
    "evolution": {
      "level": 46,
      "to": "Toxizard"
    }
  },
  {
    "name": "Toxizard",
    "type": ZenkaiType.Toxico,
    "basePower": 100,
    "habitat": "Campina",
    "forma": "Elite"
  },
  {
    "name": "Hexbug",
    "type": ZenkaiType.Noturno,
    "basePower": 50,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 26,
      "to": "Hexclaw"
    }
  },
  {
    "name": "Hexclaw",
    "type": ZenkaiType.Noturno,
    "basePower": 70,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Nozzy",
    "type": ZenkaiType.Voador,
    "basePower": 20,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 12,
      "to": "Wingzy"
    }
  },
  {
    "name": "Wingzy",
    "type": ZenkaiType.Voador,
    "basePower": 50,
    "habitat": "Floresta",
    "forma": "Avançado",
    "evolution": {
      "level": 26,
      "to": "Wingzoom"
    }
  },
  {
    "name": "Wingzoom",
    "type": ZenkaiType.Voador,
    "basePower": 85,
    "habitat": "Floresta",
    "forma": "Elite"
  },
  {
    "name": "Capigum",
    "type": ZenkaiType.Terra,
    "basePower": 35,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 32,
      "to": "Capident"
    }
  },
  {
    "name": "Capident",
    "type": ZenkaiType.Terra,
    "basePower": 85,
    "habitat": "Campina",
    "forma": "Avançado"
  },
  {
    "name": "Igniloon",
    "type": ZenkaiType.Fogo,
    "basePower": 45,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 29,
      "to": "Lavaloon"
    }
  },
  {
    "name": "Lavaloon",
    "type": ZenkaiType.Fogo,
    "basePower": 85,
    "habitat": "Montanha",
    "forma": "Avançado"
  },
  {
    "name": "Gladian",
    "type": ZenkaiType.Toxico,
    "basePower": 20,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 30,
      "to": "Gladioon"
    }
  },
  {
    "name": "Gladioon",
    "type": ZenkaiType.Toxico,
    "basePower": 65,
    "habitat": "Montanha",
    "forma": "Avançado"
  },
  {
    "name": "Galiseed",
    "type": ZenkaiType.Herbal,
    "basePower": 55,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 20,
      "to": "Galifleur"
    }
  },
  {
    "name": "Galifleur",
    "type": ZenkaiType.Herbal,
    "basePower": 75,
    "habitat": "Campina",
    "forma": "Avançado",
    "evolution": {
      "level": 38,
      "to": "Galivine"
    }
  },
  {
    "name": "Galivine",
    "type": ZenkaiType.Herbal,
    "basePower": 95,
    "habitat": "Campina",
    "forma": "Elite"
  },
  {
    "name": "Kimeow",
    "type": ZenkaiType.Mineral,
    "basePower": 60,
    "habitat": "Glacial",
    "forma": "Base",
    "evolution": {
      "level": 22,
      "to": "Geowda"
    }
  },
  {
    "name": "Geowda",
    "type": ZenkaiType.Mineral,
    "basePower": 80,
    "habitat": "Glacial",
    "forma": "Avançado",
    "evolution": {
      "level": 41,
      "to": "Bleowzard"
    }
  },
  {
    "name": "Bleowzard",
    "type": ZenkaiType.Mineral,
    "basePower": 100,
    "habitat": "Glacial",
    "forma": "Elite"
  },
  {
    "name": "Digarp",
    "type": ZenkaiType.Toxico,
    "basePower": 70,
    "habitat": "Glacial",
    "forma": "Inicial",
    "evolution": {
      "level": 16,
      "to": "Digamp"
    }
  },
  {
    "name": "Digamp",
    "type": ZenkaiType.Toxico,
    "basePower": 90,
    "habitat": "Glacial",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Digchomp"
    }
  },
  {
    "name": "Digchomp",
    "type": ZenkaiType.Toxico,
    "basePower": 110,
    "habitat": "Glacial",
    "forma": "Elite"
  },
  {
    "name": "Haati",
    "type": ZenkaiType.Terra,
    "basePower": 50,
    "habitat": "Glacial",
    "forma": "Inicial",
    "evolution": {
      "level": 30,
      "to": "Haatibull"
    }
  },
  {
    "name": "Haatibull",
    "type": ZenkaiType.Terra,
    "basePower": 70,
    "habitat": "Glacial",
    "forma": "Avançado",
    "evolution": {
      "level": 50,
      "to": "Hatiskull Zen"
    }
  },
  {
    "name": "Hatiskull Zen",
    "type": ZenkaiType.Terra,
    "basePower": 85,
    "habitat": "Glacial",
    "forma": "Elite"
  },
  {
    "name": "Clorofiló",
    "type": ZenkaiType.Herbal,
    "basePower": 45,
    "habitat": "Glacial",
    "forma": "Base",
    "evolution": {
      "level": 35,
      "to": "Filossíntese"
    }
  },
  {
    "name": "Filossíntese",
    "type": ZenkaiType.Herbal,
    "basePower": 65,
    "habitat": "Glacial",
    "forma": "Avançado"
  },
  {
    "name": "Glivy",
    "type": ZenkaiType.Terra,
    "basePower": 40,
    "habitat": "Glacial",
    "forma": "Base",
    "evolution": {
      "level": 31,
      "to": "Snowivy"
    }
  },
  {
    "name": "Snowivy",
    "type": ZenkaiType.Terra,
    "basePower": 75,
    "habitat": "Glacial",
    "forma": "Avançado"
  },
  {
    "name": "Flashin",
    "type": ZenkaiType.Eletrico,
    "basePower": 70,
    "habitat": "Aquático",
    "forma": "Inicial",
    "evolution": {
      "level": 18,
      "to": "Flaship"
    }
  },
  {
    "name": "Flaship",
    "type": ZenkaiType.Eletrico,
    "basePower": 100,
    "habitat": "Aquático",
    "forma": "Avançado",
    "evolution": {
      "level": 34,
      "to": "Flashdeep"
    }
  },
  {
    "name": "Flashdeep",
    "type": ZenkaiType.Eletrico,
    "basePower": 110,
    "habitat": "Aquático",
    "forma": "Elite"
  },
  {
    "name": "Oikid",
    "type": ZenkaiType.Eletrico,
    "basePower": 80,
    "habitat": "Floresta",
    "forma": "Inicial",
    "evolution": {
      "level": 18,
      "to": "Oikros"
    }
  },
  {
    "name": "Oikros",
    "type": ZenkaiType.Eletrico,
    "basePower": 100,
    "habitat": "Floresta",
    "forma": "Avançado",
    "evolution": {
      "level": 34,
      "to": "Oikover Zen"
    }
  },
  {
    "name": "Oikover Zen",
    "type": ZenkaiType.Eletrico,
    "basePower": 110,
    "habitat": "Floresta",
    "forma": "Elite"
  },
  {
    "name": "Wardie",
    "type": ZenkaiType.Voador,
    "basePower": 50,
    "habitat": "Glacial",
    "forma": "Base",
    "evolution": {
      "level": 22,
      "to": "Alysward"
    }
  },
  {
    "name": "Alysward",
    "type": ZenkaiType.Voador,
    "basePower": 70,
    "habitat": "Glacial",
    "forma": "Avançado"
  },
  {
    "name": "Shiruo",
    "type": ZenkaiType.Agua,
    "basePower": 50,
    "habitat": "Glacial",
    "forma": "Base",
    "evolution": {
      "level": 40,
      "to": "Shirune"
    }
  },
  {
    "name": "Shirune",
    "type": ZenkaiType.Agua,
    "basePower": 75,
    "habitat": "Glacial",
    "forma": "Avançado"
  },
  {
    "name": "Howlloo",
    "type": ZenkaiType.Agua,
    "basePower": 20,
    "habitat": "Glacial",
    "forma": "Base",
    "evolution": {
      "level": 34,
      "to": "Apolloo"
    }
  },
  {
    "name": "Apolloo",
    "type": ZenkaiType.Agua,
    "basePower": 65,
    "habitat": "Glacial",
    "forma": "Avançado"
  },
  {
    "name": "Froslee",
    "type": ZenkaiType.Voador,
    "basePower": 20,
    "habitat": "Glacial",
    "forma": "Base",
    "evolution": {
      "level": 34,
      "to": "Frosluna"
    }
  },
  {
    "name": "Frosluna",
    "type": ZenkaiType.Voador,
    "basePower": 65,
    "habitat": "Glacial",
    "forma": "Avançado"
  },
  {
    "name": "Sparke",
    "type": ZenkaiType.Eletrico,
    "basePower": 20,
    "habitat": "Glacial",
    "forma": "Base",
    "evolution": {
      "level": 25,
      "to": "Mikebolt"
    }
  },
  {
    "name": "Mikebolt",
    "type": ZenkaiType.Eletrico,
    "basePower": 85,
    "habitat": "Glacial",
    "forma": "Avançado"
  },
  {
    "name": "Tinkie",
    "type": ZenkaiType.Toxico,
    "basePower": 50,
    "habitat": "Glacial",
    "forma": "Base",
    "evolution": {
      "level": 12,
      "to": "Tinkilly"
    }
  },
  {
    "name": "Tinkilly",
    "type": ZenkaiType.Toxico,
    "basePower": 70,
    "habitat": "Glacial",
    "forma": "Avançado",
    "evolution": {
      "level": 30,
      "to": "Tinkilian Kai"
    }
  },
  {
    "name": "Tinkilian Kai",
    "type": ZenkaiType.Toxico,
    "basePower": 85,
    "habitat": "Glacial",
    "forma": "Elite"
  },
  {
    "name": "Shiying",
    "type": ZenkaiType.Toxico,
    "basePower": 70,
    "habitat": "Glacial",
    "forma": "Base"
  },
  {
    "name": "Tzuyang",
    "type": ZenkaiType.Noturno,
    "basePower": 70,
    "habitat": "Glacial",
    "forma": "Base"
  },
  {
    "name": "Ikkan",
    "type": ZenkaiType.Mineral,
    "basePower": 20,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 27,
      "to": "Ikarikan"
    }
  },
  {
    "name": "Ikarikan",
    "type": ZenkaiType.Mineral,
    "basePower": 65,
    "habitat": "Aquático",
    "forma": "Avançado"
  },
  {
    "name": "Peakly",
    "type": ZenkaiType.Terra,
    "basePower": 20,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 32,
      "to": "Tomkly"
    }
  },
  {
    "name": "Tomkly",
    "type": ZenkaiType.Terra,
    "basePower": 90,
    "habitat": "Campina",
    "forma": "Avançado"
  },
  {
    "name": "Marleon",
    "type": ZenkaiType.Terra,
    "basePower": 70,
    "habitat": "Urbano",
    "forma": "Inicial",
    "evolution": {
      "level": 18,
      "to": "Marcoleon"
    }
  },
  {
    "name": "Marcoleon",
    "type": ZenkaiType.Terra,
    "basePower": 90,
    "habitat": "Urbano",
    "forma": "Avançado",
    "evolution": {
      "level": 34,
      "to": "Marteleon Zen"
    }
  },
  {
    "name": "Marteleon Zen",
    "type": ZenkaiType.Terra,
    "basePower": 110,
    "habitat": "Urbano",
    "forma": "Elite"
  },
  {
    "name": "Gokitten",
    "type": ZenkaiType.Fogo,
    "basePower": 20,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 28,
      "to": "Gokatt"
    }
  },
  {
    "name": "Gokatt",
    "type": ZenkaiType.Fogo,
    "basePower": 75,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Powsoca",
    "type": ZenkaiType.Noturno,
    "basePower": 50,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 32,
      "to": "Paçokout"
    }
  },
  {
    "name": "Paçokout",
    "type": ZenkaiType.Noturno,
    "basePower": 80,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Dolfn",
    "type": ZenkaiType.Fogo,
    "basePower": 45,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 32,
      "to": "Dolfgan"
    }
  },
  {
    "name": "Dolfgan",
    "type": ZenkaiType.Fogo,
    "basePower": 75,
    "habitat": "Campina",
    "forma": "Avançado"
  },
  {
    "name": "Mieen",
    "type": ZenkaiType.Agua,
    "basePower": 35,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 32,
      "to": "Mieenhau"
    }
  },
  {
    "name": "Mieenhau",
    "type": ZenkaiType.Agua,
    "basePower": 75,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Lussing",
    "type": ZenkaiType.Voador,
    "basePower": 25,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 32,
      "to": "Lussong"
    }
  },
  {
    "name": "Lussong",
    "type": ZenkaiType.Voador,
    "basePower": 80,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Tokko",
    "type": ZenkaiType.Fogo,
    "basePower": 50,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 28,
      "to": "Thorkko"
    }
  },
  {
    "name": "Thorkko",
    "type": ZenkaiType.Fogo,
    "basePower": 70,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Mohra",
    "type": ZenkaiType.Herbal,
    "basePower": 70,
    "habitat": "Campina",
    "forma": "Inicial",
    "evolution": {
      "level": 18,
      "to": "Amohra"
    }
  },
  {
    "name": "Amohra",
    "type": ZenkaiType.Herbal,
    "basePower": 90,
    "habitat": "Campina",
    "forma": "Avançado",
    "evolution": {
      "level": 34,
      "to": "Weremor"
    }
  },
  {
    "name": "Weremor",
    "type": ZenkaiType.Herbal,
    "basePower": 110,
    "habitat": "Campina",
    "forma": "Elite"
  },
  {
    "name": "Guatatá",
    "type": ZenkaiType.Noturno,
    "basePower": 70,
    "habitat": "Floresta",
    "forma": "Inicial",
    "evolution": {
      "level": 18,
      "to": "Taguará"
    }
  },
  {
    "name": "Taguará",
    "type": ZenkaiType.Noturno,
    "basePower": 90,
    "habitat": "Floresta",
    "forma": "Avançado",
    "evolution": {
      "level": 34,
      "to": "Untaguaram Kai"
    }
  },
  {
    "name": "Untaguaram Kai",
    "type": ZenkaiType.Noturno,
    "basePower": 110,
    "habitat": "Floresta",
    "forma": "Elite"
  },
  {
    "name": "Plumixie",
    "type": ZenkaiType.Voador,
    "basePower": 60,
    "habitat": "Floresta",
    "forma": "Inicial",
    "evolution": {
      "level": 22,
      "to": "Magivowl"
    }
  },
  {
    "name": "Magivowl",
    "type": ZenkaiType.Voador,
    "basePower": 80,
    "habitat": "Floresta",
    "forma": "Avançado",
    "evolution": {
      "level": 42,
      "to": "Hypnowl"
    }
  },
  {
    "name": "Hypnowl",
    "type": ZenkaiType.Voador,
    "basePower": 100,
    "habitat": "Floresta",
    "forma": "Elite"
  },
  {
    "name": "Zigafe",
    "type": ZenkaiType.Toxico,
    "basePower": 70,
    "habitat": "Aquático",
    "forma": "Inicial",
    "evolution": {
      "level": 18,
      "to": "Zengafe"
    }
  },
  {
    "name": "Zengafe",
    "type": ZenkaiType.Toxico,
    "basePower": 90,
    "habitat": "Aquático",
    "forma": "Avançado",
    "evolution": {
      "level": 34,
      "to": "Zengrafar Zen"
    }
  },
  {
    "name": "Zengrafar Zen",
    "type": ZenkaiType.Toxico,
    "basePower": 110,
    "habitat": "Aquático",
    "forma": "Elite"
  },
  {
    "name": "Gamboop",
    "type": ZenkaiType.Noturno,
    "basePower": 70,
    "habitat": "Floresta",
    "forma": "Inicial",
    "evolution": {
      "level": 18,
      "to": "Gambait"
    }
  },
  {
    "name": "Gambait",
    "type": ZenkaiType.Noturno,
    "basePower": 90,
    "habitat": "Floresta",
    "forma": "Avançado",
    "evolution": {
      "level": 34,
      "to": "Gamboost Zen"
    }
  },
  {
    "name": "Gamboost Zen",
    "type": ZenkaiType.Noturno,
    "basePower": 110,
    "habitat": "Floresta",
    "forma": "Elite"
  },
  {
    "name": "Pankidy",
    "type": ZenkaiType.Terra,
    "basePower": 70,
    "habitat": "Campina",
    "forma": "Inicial",
    "evolution": {
      "level": 18,
      "to": "Pandoken"
    }
  },
  {
    "name": "Pandoken",
    "type": ZenkaiType.Terra,
    "basePower": 90,
    "habitat": "Campina",
    "forma": "Avançado",
    "evolution": {
      "level": 34,
      "to": "Pandorun Kai"
    }
  },
  {
    "name": "Pandorun Kai",
    "type": ZenkaiType.Terra,
    "basePower": 110,
    "habitat": "Campina",
    "forma": "Elite"
  },
  {
    "name": "Chalango",
    "type": ZenkaiType.Fogo,
    "basePower": 40,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 30,
      "to": "Bravango"
    }
  },
  {
    "name": "Bravango",
    "type": ZenkaiType.Fogo,
    "basePower": 80,
    "habitat": "Montanha",
    "forma": "Avançado"
  },
  {
    "name": "Krox",
    "type": ZenkaiType.Mineral,
    "basePower": 70,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 45,
      "to": "Citrox"
    }
  },
  {
    "name": "Citrox",
    "type": ZenkaiType.Mineral,
    "basePower": 90,
    "habitat": "Montanha",
    "forma": "Avançado"
  },
  {
    "name": "Fluffy",
    "type": ZenkaiType.Voador,
    "basePower": 20,
    "habitat": "Montanha",
    "forma": "Inicial",
    "evolution": {
      "level": 22,
      "to": "Truffy"
    }
  },
  {
    "name": "Truffy",
    "type": ZenkaiType.Voador,
    "basePower": 45,
    "habitat": "Montanha",
    "forma": "Avançado",
    "evolution": {
      "level": 42,
      "to": "Storffy Kai"
    }
  },
  {
    "name": "Storffy Kai",
    "type": ZenkaiType.Voador,
    "basePower": 85,
    "habitat": "Montanha",
    "forma": "Elite"
  },
  {
    "name": "Ironpup",
    "type": ZenkaiType.Mineral,
    "basePower": 70,
    "habitat": "Campina",
    "forma": "Inicial",
    "evolution": {
      "level": 18,
      "to": "Irondog"
    }
  },
  {
    "name": "Irondog",
    "type": ZenkaiType.Mineral,
    "basePower": 90,
    "habitat": "Campina",
    "forma": "Avançado",
    "evolution": {
      "level": 34,
      "to": "Ironbull Zen"
    }
  },
  {
    "name": "Ironbull Zen",
    "type": ZenkaiType.Mineral,
    "basePower": 110,
    "habitat": "Campina",
    "forma": "Elite"
  },
  {
    "name": "Hexdeer",
    "type": ZenkaiType.Noturno,
    "basePower": 50,
    "habitat": "Glacial",
    "forma": "Base",
    "evolution": {
      "level": 43,
      "to": "Hexhorn"
    }
  },
  {
    "name": "Hexhorn",
    "type": ZenkaiType.Noturno,
    "basePower": 90,
    "habitat": "Glacial",
    "forma": "Avançado"
  },
  {
    "name": "Nixilin",
    "type": ZenkaiType.Terra,
    "basePower": 60,
    "habitat": "Glacial",
    "forma": "Base"
  },
  {
    "name": "Maialin",
    "type": ZenkaiType.Eletrico,
    "basePower": 60,
    "habitat": "Glacial",
    "forma": "Base"
  },
  {
    "name": "Ninkat",
    "type": ZenkaiType.Eletrico,
    "basePower": 20,
    "habitat": "Glacial",
    "forma": "Base",
    "evolution": {
      "level": 45,
      "to": "Nannikat"
    }
  },
  {
    "name": "Nannikat",
    "type": ZenkaiType.Eletrico,
    "basePower": 90,
    "habitat": "Glacial",
    "forma": "Avançado"
  },
  {
    "name": "Hexfur",
    "type": ZenkaiType.Noturno,
    "basePower": 40,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 45,
      "to": "Hexmane"
    }
  },
  {
    "name": "Hexmane",
    "type": ZenkaiType.Noturno,
    "basePower": 95,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Fuboots",
    "type": ZenkaiType.Terra,
    "basePower": 20,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 31,
      "to": "Fuketeer"
    }
  },
  {
    "name": "Fuketeer",
    "type": ZenkaiType.Terra,
    "basePower": 70,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Mumiau",
    "type": ZenkaiType.Toxico,
    "basePower": 30,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 40,
      "to": "Neferkitty"
    }
  },
  {
    "name": "Neferkitty",
    "type": ZenkaiType.Toxico,
    "basePower": 80,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Looksnap",
    "type": ZenkaiType.Toxico,
    "basePower": 15,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 55,
      "to": "Cochilook"
    }
  },
  {
    "name": "Cochilook",
    "type": ZenkaiType.Toxico,
    "basePower": 110,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Jadevine",
    "type": ZenkaiType.Herbal,
    "basePower": 30,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 25,
      "to": "Jadeleaf"
    }
  },
  {
    "name": "Jadeleaf",
    "type": ZenkaiType.Herbal,
    "basePower": 60,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Odinny",
    "type": ZenkaiType.Mineral,
    "basePower": 20,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 20,
      "to": "Odindoo"
    }
  },
  {
    "name": "Odindoo",
    "type": ZenkaiType.Mineral,
    "basePower": 50,
    "habitat": "Urbano",
    "forma": "Avançado",
    "evolution": {
      "level": 41,
      "to": "Odindorn Kai"
    }
  },
  {
    "name": "Odindorn Kai",
    "type": ZenkaiType.Mineral,
    "basePower": 100,
    "habitat": "Urbano",
    "forma": "Elite"
  },
  {
    "name": "Ninnan",
    "type": ZenkaiType.Voador,
    "basePower": 10,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 16,
      "to": "Nimelian"
    }
  },
  {
    "name": "Nimelian",
    "type": ZenkaiType.Voador,
    "basePower": 60,
    "habitat": "Urbano",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Nimelycan Zen"
    }
  },
  {
    "name": "Nimelycan Zen",
    "type": ZenkaiType.Voador,
    "basePower": 110,
    "habitat": "Urbano",
    "forma": "Elite"
  },
  {
    "name": "Donna",
    "type": ZenkaiType.Eletrico,
    "basePower": 10,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 21,
      "to": "Donpup"
    }
  },
  {
    "name": "Donpup",
    "type": ZenkaiType.Eletrico,
    "basePower": 60,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Mulian",
    "type": ZenkaiType.Terra,
    "basePower": 45,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 31,
      "to": "Mushulian"
    }
  },
  {
    "name": "Mushulian",
    "type": ZenkaiType.Terra,
    "basePower": 75,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Maddin",
    "type": ZenkaiType.Herbal,
    "basePower": 40,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 31,
      "to": "Madouga"
    }
  },
  {
    "name": "Madouga",
    "type": ZenkaiType.Herbal,
    "basePower": 70,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Trikity",
    "type": ZenkaiType.Mineral,
    "basePower": 20,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 55,
      "to": "Triacath"
    }
  },
  {
    "name": "Triacath",
    "type": ZenkaiType.Mineral,
    "basePower": 110,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Goombu",
    "type": ZenkaiType.Herbal,
    "basePower": 15,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 18,
      "to": "Gubbomb"
    }
  },
  {
    "name": "Gubbomb",
    "type": ZenkaiType.Herbal,
    "basePower": 55,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Maialfy",
    "type": ZenkaiType.Toxico,
    "basePower": 50,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 26,
      "to": "Gaialfy"
    }
  },
  {
    "name": "Gaialfy",
    "type": ZenkaiType.Toxico,
    "basePower": 70,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Yuki",
    "type": ZenkaiType.Eletrico,
    "basePower": 10,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 38,
      "to": "Dienuki"
    }
  },
  {
    "name": "Dienuki",
    "type": ZenkaiType.Noturno,
    "basePower": 90,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Kirin",
    "type": ZenkaiType.Eletrico,
    "basePower": 40,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 25,
      "to": "Kirion"
    }
  },
  {
    "name": "Kirion",
    "type": ZenkaiType.Eletrico,
    "basePower": 70,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Naala",
    "type": ZenkaiType.Noturno,
    "basePower": 60,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 27,
      "to": "Zunala"
    }
  },
  {
    "name": "Zunala",
    "type": ZenkaiType.Noturno,
    "basePower": 85,
    "habitat": "Urbano",
    "forma": "Avançado"
  },
  {
    "name": "Torkat",
    "type": ZenkaiType.Fogo,
    "basePower": 10,
    "habitat": "Glacial",
    "forma": "Base",
    "evolution": {
      "level": 52,
      "to": "Thorakat"
    }
  },
  {
    "name": "Thorakat",
    "type": ZenkaiType.Fogo,
    "basePower": 100,
    "habitat": "Glacial",
    "forma": "Avançado"
  },
  {
    "name": "Arabela",
    "type": ZenkaiType.Toxico,
    "basePower": 40,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 48,
      "to": "Aramaga"
    }
  },
  {
    "name": "Aramaga",
    "type": ZenkaiType.Toxico,
    "basePower": 80,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Tucatom",
    "type": ZenkaiType.Voador,
    "basePower": 50,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 19,
      "to": "Tutancatom"
    }
  },
  {
    "name": "Tutancatom",
    "type": ZenkaiType.Voador,
    "basePower": 95,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Poundy",
    "type": ZenkaiType.Terra,
    "basePower": 20,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 37,
      "to": "Poundora"
    }
  },
  {
    "name": "Poundora",
    "type": ZenkaiType.Terra,
    "basePower": 85,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Kalua",
    "type": ZenkaiType.Fogo,
    "basePower": 30,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 35,
      "to": "Kalalua"
    }
  },
  {
    "name": "Kalalua",
    "type": ZenkaiType.Fogo,
    "basePower": 90,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Astrum",
    "type": ZenkaiType.Toxico,
    "basePower": 30,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 41,
      "to": "Astoor"
    }
  },
  {
    "name": "Astoor",
    "type": ZenkaiType.Toxico,
    "basePower": 65,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Jaddyn",
    "type": ZenkaiType.Herbal,
    "basePower": 40,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 29,
      "to": "Jaddien"
    }
  },
  {
    "name": "Jaddien",
    "type": ZenkaiType.Herbal,
    "basePower": 85,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Musgoo",
    "type": ZenkaiType.Toxico,
    "basePower": 40,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 27,
      "to": "Musgops"
    }
  },
  {
    "name": "Musgops",
    "type": ZenkaiType.Toxico,
    "basePower": 85,
    "habitat": "Floresta",
    "forma": "Avançado"
  },
  {
    "name": "Seacinus",
    "type": ZenkaiType.Noturno,
    "basePower": 30,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 38,
      "to": "Orcacinus"
    }
  },
  {
    "name": "Orcacinus",
    "type": ZenkaiType.Noturno,
    "basePower": 100,
    "habitat": "Aquático",
    "forma": "Avançado"
  },
  {
    "name": "Zeeddle",
    "type": ZenkaiType.Agua,
    "basePower": 40,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 22,
      "to": "Zooddle"
    }
  },
  {
    "name": "Zooddle",
    "type": ZenkaiType.Agua,
    "basePower": 75,
    "habitat": "Aquático",
    "forma": "Avançado"
  },
  {
    "name": "Blooby",
    "type": ZenkaiType.Agua,
    "basePower": 20,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 31,
      "to": "Bloombo"
    }
  },
  {
    "name": "Bloombo",
    "type": ZenkaiType.Agua,
    "basePower": 60,
    "habitat": "Aquático",
    "forma": "Avançado"
  },
  {
    "name": "Crocorunt",
    "type": ZenkaiType.Terra,
    "basePower": 35,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 34,
      "to": "Crocodent"
    }
  },
  {
    "name": "Crocodent",
    "type": ZenkaiType.Terra,
    "basePower": 105,
    "habitat": "Aquático",
    "forma": "Avançado"
  },
  {
    "name": "Listroar",
    "type": ZenkaiType.Agua,
    "basePower": 20,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 36,
      "to": "Listarum"
    }
  },
  {
    "name": "Listarum",
    "type": ZenkaiType.Agua,
    "basePower": 110,
    "habitat": "Aquático",
    "forma": "Avançado"
  },
  {
    "name": "Shankie",
    "type": ZenkaiType.Agua,
    "basePower": 30,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 28,
      "to": "Skansage"
    }
  },
  {
    "name": "Skansage",
    "type": ZenkaiType.Agua,
    "basePower": 75,
    "habitat": "Aquático",
    "forma": "Avançado"
  },
  {
    "name": "Lunyx",
    "type": ZenkaiType.Mineral,
    "basePower": 0,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 25,
      "to": "Orlunyx"
    }
  },
  {
    "name": "Orlunyx",
    "type": ZenkaiType.Mineral,
    "basePower": 0,
    "habitat": "Montanha",
    "forma": "Avançado"
  },
  {
    "name": "Fuujinx",
    "type": ZenkaiType.Voador,
    "basePower": 0,
    "habitat": "Montanha",
    "forma": "Base"
  },
  {
    "name": "Raijinx",
    "type": ZenkaiType.Eletrico,
    "basePower": 0,
    "habitat": "Montanha",
    "forma": "Base"
  },
  {
    "name": "Claydog",
    "type": ZenkaiType.Mineral,
    "basePower": 0,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 32,
      "to": "Muddog"
    }
  },
  {
    "name": "Muddog",
    "type": ZenkaiType.Mineral,
    "basePower": 0,
    "habitat": "Montanha",
    "forma": "Avançado"
  },
  {
    "name": "Hexdog",
    "type": ZenkaiType.Noturno,
    "basePower": 0,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 32,
      "to": "Hexfang"
    }
  },
  {
    "name": "Hexfang",
    "type": ZenkaiType.Noturno,
    "basePower": 0,
    "habitat": "Montanha",
    "forma": "Avançado"
  },
  {
    "name": "Amboocy",
    "type": ZenkaiType.Noturno,
    "basePower": 0,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 26,
      "to": "Ambloost"
    }
  },
  {
    "name": "Ambloost",
    "type": ZenkaiType.Noturno,
    "basePower": 0,
    "habitat": "Montanha",
    "forma": "Avançado"
  },
  {
    "name": "Tatantik",
    "type": ZenkaiType.Herbal,
    "basePower": 10,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 18,
      "to": "Tarantorn"
    }
  },
  {
    "name": "Tarantorn",
    "type": ZenkaiType.Herbal,
    "basePower": 70,
    "habitat": "Campina",
    "forma": "Avançado"
  },
  {
    "name": "Auraa",
    "type": ZenkaiType.Herbal,
    "basePower": 30,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 26,
      "to": "Auroora"
    }
  },
  {
    "name": "Auroora",
    "type": ZenkaiType.Herbal,
    "basePower": 65,
    "habitat": "Campina",
    "forma": "Avançado"
  },
  {
    "name": "Glagon",
    "type": ZenkaiType.Voador,
    "basePower": 50,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 35,
      "to": "Goragon"
    }
  },
  {
    "name": "Goragon",
    "type": ZenkaiType.Voador,
    "basePower": 85,
    "habitat": "Campina",
    "forma": "Avançado"
  },
  {
    "name": "Hexbird",
    "type": ZenkaiType.Noturno,
    "basePower": 30,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 32,
      "to": "Hexwing"
    }
  },
  {
    "name": "Hexwing",
    "type": ZenkaiType.Noturno,
    "basePower": 100,
    "habitat": "Campina",
    "forma": "Avançado"
  },
  {
    "name": "Kaora",
    "type": ZenkaiType.Terra,
    "basePower": 30,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 38,
      "to": "Takaora"
    }
  },
  {
    "name": "Takaora",
    "type": ZenkaiType.Terra,
    "basePower": 100,
    "habitat": "Campina",
    "forma": "Avançado"
  },
  {
    "name": "Mimilo",
    "type": ZenkaiType.Fogo,
    "basePower": 20,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 18,
      "to": "Treymilo"
    }
  },
  {
    "name": "Treymilo",
    "type": ZenkaiType.Fogo,
    "basePower": 65,
    "habitat": "Campina",
    "forma": "Avançado"
  },
  {
    "name": "Hitmilo",
    "type": ZenkaiType.Fogo,
    "basePower": 0,
    "habitat": "Campina",
    "forma": "Elite"
  },
  {
    "name": "Hexcat",
    "type": ZenkaiType.Noturno,
    "basePower": 40,
    "habitat": "Campina",
    "forma": "Base",
    "evolution": {
      "level": 32,
      "to": "Hexlince"
    }
  },
  {
    "name": "Hexlince",
    "type": ZenkaiType.Noturno,
    "basePower": 80,
    "habitat": "Campina",
    "forma": "Avançado"
  },
  {
    "name": "Luppy",
    "type": ZenkaiType.Agua,
    "basePower": 70,
    "habitat": "Aquático",
    "forma": "Base",
    "evolution": {
      "level": 16,
      "to": "Luppup"
    }
  },
  {
    "name": "Luppup",
    "type": ZenkaiType.Agua,
    "basePower": 90,
    "habitat": "Aquático",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Luppitar Kai"
    }
  },
  {
    "name": "Luppitar Kai",
    "type": ZenkaiType.Agua,
    "basePower": 110,
    "habitat": "Aquático",
    "forma": "Elite"
  },
  {
    "name": "Rokkar",
    "type": ZenkaiType.Mineral,
    "basePower": 70,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 16,
      "to": "Rokkoyle"
    }
  },
  {
    "name": "Rokkoyle",
    "type": ZenkaiType.Mineral,
    "basePower": 90,
    "habitat": "Montanha",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Rokklith Kai"
    }
  },
  {
    "name": "Rokklith Kai",
    "type": ZenkaiType.Mineral,
    "basePower": 110,
    "habitat": "Montanha",
    "forma": "Elite"
  },
  {
    "name": "Pitixa",
    "type": ZenkaiType.Eletrico,
    "basePower": 70,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 16,
      "to": "Pitichu"
    }
  },
  {
    "name": "Pitichu",
    "type": ZenkaiType.Eletrico,
    "basePower": 90,
    "habitat": "Urbano",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Pitichomp Kai"
    }
  },
  {
    "name": "Pitichomp Kai",
    "type": ZenkaiType.Eletrico,
    "basePower": 110,
    "habitat": "Urbano",
    "forma": "Elite"
  },
  {
    "name": "Lunna",
    "type": ZenkaiType.Noturno,
    "basePower": 70,
    "habitat": "Urbano",
    "forma": "Base",
    "evolution": {
      "level": 16,
      "to": "Lunaroo"
    }
  },
  {
    "name": "Lunaroo",
    "type": ZenkaiType.Noturno,
    "basePower": 90,
    "habitat": "Urbano",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Lunaura Zen"
    }
  },
  {
    "name": "Lunaura Zen",
    "type": ZenkaiType.Noturno,
    "basePower": 110,
    "habitat": "Urbano",
    "forma": "Elite"
  },
  {
    "name": "Roclimb",
    "type": ZenkaiType.Mineral,
    "basePower": 70,
    "habitat": "Montanha",
    "forma": "Base",
    "evolution": {
      "level": 16,
      "to": "Roclide"
    }
  },
  {
    "name": "Roclide",
    "type": ZenkaiType.Mineral,
    "basePower": 90,
    "habitat": "Montanha",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Roctone Kai"
    }
  },
  {
    "name": "Roctone Kai",
    "type": ZenkaiType.Mineral,
    "basePower": 110,
    "habitat": "Montanha",
    "forma": "Elite"
  },
  {
    "name": "Piri-piri",
    "type": ZenkaiType.Eletrico,
    "basePower": 70,
    "habitat": "Floresta",
    "forma": "Base",
    "evolution": {
      "level": 16,
      "to": "Pirinox"
    }
  },
  {
    "name": "Pirinox",
    "type": ZenkaiType.Eletrico,
    "basePower": 90,
    "habitat": "Floresta",
    "forma": "Avançado",
    "evolution": {
      "level": 36,
      "to": "Lumenox Kai"
    }
  },
  {
    "name": "Lumenox Kai",
    "type": ZenkaiType.Eletrico,
    "basePower": 110,
    "habitat": "Floresta",
    "forma": "Elite"
  },
  {
    "name": "Taurage",
    "type": ZenkaiType.Eletrico,
    "basePower": 150,
    "habitat": "Campina",
    "forma": "Lenda"
  },
  {
    "name": "Workiller",
    "type": ZenkaiType.Toxico,
    "basePower": 150,
    "habitat": "Floresta",
    "forma": "Lenda"
  },
  {
    "name": "Cerberium",
    "type": ZenkaiType.Fogo,
    "basePower": 150,
    "habitat": "Campina",
    "forma": "Lenda"
  },
  {
    "name": "Sharpnox",
    "type": ZenkaiType.Agua,
    "basePower": 150,
    "habitat": "Aquático",
    "forma": "Lenda"
  },
  {
    "name": "Hexdeep",
    "type": ZenkaiType.Noturno,
    "basePower": 150,
    "habitat": "Aquático",
    "forma": "Lenda"
  },
  {
    "name": "Glaciatus",
    "type": ZenkaiType.Mineral,
    "basePower": 150,
    "habitat": "Glacial",
    "forma": "Lenda"
  },
  {
    "name": "Shellterror",
    "type": ZenkaiType.Toxico,
    "basePower": 150,
    "habitat": "Aquático",
    "forma": "Lenda"
  },
  {
    "name": "Durantitan",
    "type": ZenkaiType.Herbal,
    "basePower": 150,
    "habitat": "Campina",
    "forma": "Lenda"
  },
  {
    "name": "Tempestial",
    "type": ZenkaiType.Voador,
    "basePower": 150,
    "habitat": "Montanha",
    "forma": "Lenda"
  },
  {
    "name": "Geogamesh",
    "type": ZenkaiType.Terra,
    "basePower": 150,
    "habitat": "Montanha",
    "forma": "Lenda"
  },
  {
    "name": "Odahcam",
    "type": ZenkaiType.Eletrico,
    "basePower": 150,
    "habitat": "Floresta",
    "forma": "Lenda"
  },
  {
    "name": "Gamblastor",
    "type": ZenkaiType.Noturno,
    "basePower": 150,
    "habitat": "Floresta",
    "forma": "Lenda"
  },
  {
    "name": "Murpia",
    "type": ZenkaiType.Voador,
    "basePower": 150,
    "habitat": "Montanha",
    "forma": "Lenda"
  }
];

const typeMap: { [key: string]: ZenkaiType } = {
    "Fogo": ZenkaiType.Fogo, "Tóxico": ZenkaiType.Toxico, "Mineral": ZenkaiType.Mineral,
    "Água": ZenkaiType.Agua, "Terra": ZenkaiType.Terra, "Voador": ZenkaiType.Voador,
    "Elétrico": ZenkaiType.Eletrico, "Herbal": ZenkaiType.Herbal, "Noturno": ZenkaiType.Noturno,
};

const traitMap: { [key: string]: TrainerTraitId } = {
    "Mentor": "mentor", "Implacável": "relentless", "Prodígio": "prodigy", "Recrutador": "recruiter",
    "Guerreiro": "warrior", "Humilde": "humble", "Estrategista": "strategist", "Generalista": "generalist",
    "Magnata": "tycoon", "Famoso": "famous", "Faz-tudo": "handyman", "Militar": "militant",
};


const customTrainerTemplates: any[] = [
  { "Nome": "Taciano", "tipo": "Elétrico", "powerbase": 150, "hability": "Mentor" },
  { "Nome": "Diego", "tipo": "Tóxico", "powerbase": 150, "hability": "Implacável" },
  { "Nome": "Ton", "tipo": "Mineral", "powerbase": 130, "hability": "Prodígio" },
  { "Nome": "Flávio", "tipo": "Água", "powerbase": 130, "hability": "Recrutador" },
  { "Nome": "Júnior", "tipo": "Terra", "powerbase": 80, "hability": null },
  { "Nome": "Ricardo", "tipo": "Fogo", "powerbase": 85, "hability": null },
  { "Nome": "Pewal", "tipo": "Terra", "powerbase": 100, "hability": "Recrutador" },
  { "Nome": "Sayuri", "tipo": "Voador", "powerbase": 85, "hability": null },
  { "Nome": "Lívia", "tipo": "Voador", "powerbase": 110, "hability": "Prodígio" },
  { "Nome": "Dabs", "tipo": "Água", "powerbase": 85, "hability": "Mentor" },
  { "Nome": "Alice", "tipo": "Fogo", "powerbase": 110, "hability": "Prodígio" },
  { "Nome": "Estevão", "tipo": "Elétrico", "powerbase": 85, "hability": "Guerreiro" },
  { "Nome": "Leo", "tipo": "Elétrico", "powerbase": 90, "hability": null },
  { "Nome": "Lara", "tipo": "Fogo", "powerbase": 110, "hability": "Humilde" },
  { "Nome": "Laiza", "tipo": "Tóxico", "powerbase": 80, "hability": null },
  { "Nome": "Nathali", "tipo": "Tóxico", "powerbase": 60, "hability": null },
  { "Nome": "Robert", "tipo": "Herbal", "powerbase": 110, "hability": "Mentor" },
  { "Nome": "Betão", "tipo": "Água", "powerbase": 110, "hability": "Mentor" },
  { "Nome": "Laura", "tipo": "Herbal", "powerbase": 90, "hability": null },
  { "Nome": "Hima", "tipo": "Voador", "powerbase": 90, "hability": "Implacável" },
  { "Nome": "Clever", "tipo": "Tóxico", "powerbase": 130, "hability": "Estrategista" },
  { "Nome": "Fábio", "tipo": "Herbal", "powerbase": 150, "hability": "Generalista" },
  { "Nome": "Professor", "tipo": "Voador", "powerbase": 75, "hability": "Mentor" },
  { "Nome": "Calops", "tipo": "Fogo", "powerbase": 130, "hability": "Magnata" },
  { "Nome": "André", "tipo": "Noturno", "powerbase": 75, "hability": null },
  { "Nome": "Felipe", "tipo": "Água", "powerbase": 100, "hability": "Implacável" },
  { "Nome": "Guto", "tipo": "Elétrico", "powerbase": 110, "hability": "Mentor" },
  { "Nome": "Falcon", "tipo": "Noturno", "powerbase": 75, "hability": "Generalista" },
  { "Nome": "Bruna", "tipo": "Herbal", "powerbase": 60, "hability": "Magnata" },
  { "Nome": "Beto", "tipo": "Noturno", "powerbase": 110, "hability": "Generalista" },
  { "Nome": "Igor", "tipo": "Água", "powerbase": 75, "hability": null },
  { "Nome": "Helô", "tipo": "Tóxico", "powerbase": 140, "hability": "Magnata" },
  { "Nome": "Ricco", "tipo": "Tóxico", "powerbase": 65, "hability": null },
  { "Nome": "Helena", "tipo": "Noturno", "powerbase": 130, "hability": "Humilde" },
  { "Nome": "Jade", "tipo": "Herbal", "powerbase": 65, "hability": "Mentor" },
  { "Nome": "Aline", "tipo": "Terra", "powerbase": 80, "hability": "Recrutador" },
  { "Nome": "Bernardo", "tipo": "Fogo", "powerbase": 80, "hability": null },
  { "Nome": "Zeka", "tipo": "Água", "powerbase": 150, "hability": "Prodígio" },
  { "Nome": "Nay", "tipo": "Elétrico", "powerbase": 130, "hability": "Recrutador" },
  { "Nome": "Alberto", "tipo": "Herbal", "powerbase": 60, "hability": "Guerreiro" },
  { "Nome": "Baby", "tipo": "Água", "powerbase": 100, "hability": "Famoso" },
  { "Nome": "Lucas", "tipo": "Mineral", "powerbase": 150, "hability": null },
  { "Nome": "Edu", "tipo": "Noturno", "powerbase": 150, "hability": "Mentor" },
  { "Nome": "Dante", "tipo": "Terra", "powerbase": 100, "hability": "Magnata" },
  { "Nome": "Marjorie", "tipo": "Voador", "powerbase": 150, "hability": "Estrategista" },
  { "Nome": "Mari", "tipo": "Mineral", "powerbase": 60, "hability": null },
  { "Nome": "Jess", "tipo": "Elétrico", "powerbase": 100, "hability": "Humilde" },
  { "Nome": "Uill", "tipo": "Mineral", "powerbase": 130, "hability": "Guerreiro" },
  { "Nome": "Lari", "tipo": "Voador", "powerbase": 80, "hability": null },
  { "Nome": "Bia", "tipo": "Terra", "powerbase": 120, "hability": null },
  { "Nome": "Maya", "tipo": "Elétrico", "powerbase": 130, "hability": "Prodígio" },
  { "Nome": "Guilherme", "tipo": "Mineral", "powerbase": 60, "hability": null },
  { "Nome": "Gui", "tipo": "Terra", "powerbase": 80, "hability": null },
  { "Nome": "Vitor", "tipo": "Terra", "powerbase": 110, "hability": "Generalista" },
  { "Nome": "Vitor V", "tipo": "Mineral", "powerbase": 60, "hability": "Implacável" },
  { "Nome": "Marrie", "tipo": "Voador", "powerbase": 120, "hability": "Faz-tudo" },
  { "Nome": "Lipe", "tipo": "Noturno", "powerbase": 105, "hability": null },
  { "Nome": "Anna", "tipo": "Mineral", "powerbase": 100, "hability": "Famoso" },
  { "Nome": "Cosmic", "tipo": "Mineral", "powerbase": 130, "hability": "Humilde" },
  { "Nome": "Blast", "tipo": "Terra", "powerbase": 150, "hability": "Militar" },
  { "Nome": "Frostan", "tipo": "Água", "powerbase": 130, "hability": "Recrutador" },
  { "Nome": "Hub", "tipo": "Fogo", "powerbase": 130, "hability": "Faz-tudo" },
  { "Nome": "Fernando", "tipo": "Voador", "powerbase": 105, "hability": "Recrutador" },
  { "Nome": "Mano", "tipo": "Voador", "powerbase": 60, "hability": "Mentor" },
  { "Nome": "Ariel", "tipo": "Fogo", "powerbase": 80, "hability": null },
  { "Nome": "Jojô", "tipo": "Noturno", "powerbase": 60, "hability": "Mentor" },
  { "Nome": "José", "tipo": "Tóxico", "powerbase": 80, "hability": null },
  { "Nome": "Van", "tipo": "Elétrico", "powerbase": 60, "hability": "Mentor" },
  { "Nome": "Mariana", "tipo": "Noturno", "powerbase": 80, "hability": null },
  { "Nome": "Nakay", "tipo": "Fogo", "powerbase": 80, "hability": "Humilde" },
  { "Nome": "Becca", "tipo": "Tóxico", "powerbase": 100, "hability": "Estrategista" },
  { "Nome": "Iggie", "tipo": "Herbal", "powerbase": 110, "hability": "Generalista" },
  { "Nome": "Hederson", "tipo": "Água", "powerbase": 80, "hability": null },
  { "Nome": "Gláucia", "tipo": "Voador", "powerbase": 60, "hability": "Implacável" },
  { "Nome": "Gabi", "tipo": "Noturno", "powerbase": 60, "hability": null },
  { "Nome": "Deb", "tipo": "Fogo", "powerbase": 150, "hability": "Famoso" },
  { "Nome": "Vini", "tipo": "Tóxico", "powerbase": 100, "hability": null },
  { "Nome": "Tefy", "tipo": "Noturno", "powerbase": 110, "hability": "Implacável" },
  { "Nome": "May", "tipo": "Elétrico", "powerbase": 80, "hability": "Mentor" },
  { "Nome": "Tito", "tipo": "Herbal", "powerbase": 140, "hability": null },
  { "Nome": "Paim", "tipo": "Herbal", "powerbase": 100, "hability": "Mentor" },
  { "Nome": "Wendel", "tipo": "Mineral", "powerbase": 100, "hability": "Generalista" },
  { "Nome": "Guy", "tipo": "Terra", "powerbase": 100, "hability": "Generalista" },
  { "Nome": "Mateus", "tipo": "Mineral", "powerbase": 120, "hability": "Recrutador" }
];

export const TRAINER_DATA: TrainerData[] = customTrainerTemplates.map(t => ({
    name: t.Nome,
    basePower: t.powerbase,
    type: typeMap[t.tipo],
    traitId: t.hability ? traitMap[t.hability] : undefined,
    // salary is calculated dynamically based on level and power
}));


export const TRAINER_TRAITS_DATA: TrainerTrait[] = [
    { id: 'mentor', name: 'Mentor', description: 'Aumenta o ganho de XP para todos os Zenkais no mesmo ginásio.' },
    { id: 'strategist', name: 'Estrategista', description: 'Ganha um bônus de poder de 5% ao enfrentar um oponente mais forte.' },
    { id: 'recruiter', name: 'Recrutador', description: 'Aumenta a chance de encontrar mais Zenkais em uma única expedição.' },
    { id: 'militant', name: 'Militar', description: 'Fornece um bônus de poder passivo de 5% para toda a equipe.' },
    { id: 'famous', name: 'Famoso', description: 'Aumenta o ganho de popularidade semanal.' },
    { id: 'humble', name: 'Humilde', description: 'Requer 20% menos de salário.' },
    { id: 'handyman', name: 'Faz-tudo', description: 'O ginásio que este treinador lidera não tem custo de manutenção semanal.' },
    { id: 'prodigy', name: 'Prodígio', description: 'Este treinador ganha 25% mais XP de todas as fontes (batalhas e treino manual).' },
    { id: 'type_specialist', name: 'Especialista de Tipo', description: 'Duplica o bônus de poder de sinergia que este treinador recebe por Zenkais do seu tipo de sinergia.' },
    { id: 'generalist', name: 'Generalista', description: 'Fornece um bônus de poder para equipes com 4 ou mais tipos únicos de Zenkai (+3% por tipo único).' },
    { id: 'relentless', name: 'Implacável', description: 'Aumenta o poder da equipe em 15% ao enfrentar um oponente mais fraco.' },
    { id: 'warrior', name: 'Guerreiro', description: 'Aumenta o poder da equipe em 10% ao enfrentar um oponente mais forte.' },
    { id: 'tycoon', name: 'Magnata', description: 'Aumenta o dinheiro ganho em vitórias de batalha em 15%.' },
    { id: 'engineer', name: 'Engenheiro', description: 'Reduz o custo de todas as melhorias de Infraestrutura em 5%.' },
];

export const ZENKAI_TYPE_MATCHUPS: { [key in ZenkaiType]?: { [key in ZenkaiType]?: number } } = {
    [ZenkaiType.Herbal]:   { [ZenkaiType.Agua]: 2, [ZenkaiType.Terra]: 2, [ZenkaiType.Fogo]: 0.5, [ZenkaiType.Toxico]: 0.5 },
    [ZenkaiType.Fogo]:     { [ZenkaiType.Herbal]: 2, [ZenkaiType.Mineral]: 2, [ZenkaiType.Agua]: 0.5, [ZenkaiType.Terra]: 0.5 },
    [ZenkaiType.Agua]:     { [ZenkaiType.Fogo]: 2, [ZenkaiType.Terra]: 2, [ZenkaiType.Herbal]: 0.5, [ZenkaiType.Eletrico]: 0.5 },
    [ZenkaiType.Voador]:   { [ZenkaiType.Toxico]: 2, [ZenkaiType.Noturno]: 2, [ZenkaiType.Eletrico]: 0.5, [ZenkaiType.Mineral]: 0.5 },
    [ZenkaiType.Noturno]:  { [ZenkaiType.Eletrico]: 2, [ZenkaiType.Toxico]: 2, [ZenkaiType.Voador]: 0.5, [ZenkaiType.Mineral]: 0.5 },
    [ZenkaiType.Toxico]:   { [ZenkaiType.Herbal]: 2, [ZenkaiType.Mineral]: 2, [ZenkaiType.Voador]: 0.5, [ZenkaiType.Noturno]: 0.5 },
    [ZenkaiType.Terra]:    { [ZenkaiType.Fogo]: 2, [ZenkaiType.Eletrico]: 2, [ZenkaiType.Agua]: 0.5, [ZenkaiType.Herbal]: 0.5 },
    [ZenkaiType.Eletrico]: { [ZenkaiType.Agua]: 2, [ZenkaiType.Voador]: 2, [ZenkaiType.Terra]: 0.5, [ZenkaiType.Noturno]: 0.5 },
    [ZenkaiType.Mineral]:  { [ZenkaiType.Voador]: 2, [ZenkaiType.Noturno]: 2, [ZenkaiType.Fogo]: 0.5, [ZenkaiType.Toxico]: 0.5 },
};