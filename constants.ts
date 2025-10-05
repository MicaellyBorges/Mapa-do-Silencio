
export const DAYS_OF_WEEK = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export const SILENCE_LEVELS: { [key: number]: { label: string; color: string; icon: string } } = {
  1: { label: 'Muito barulhento', color: 'text-red-500', icon: 'fa-solid fa-volume-high' },
  2: { label: 'Barulhento', color: 'text-orange-500', icon: 'fa-solid fa-volume-low' },
  3: { label: 'Moderado', color: 'text-yellow-500', icon: 'fa-solid fa-volume-off' },
  4: { label: 'Silencioso', color: 'text-green-500', icon: 'fa-solid fa-leaf' },
  5: { label: 'Silêncio total', color: 'text-blue-500', icon: 'fa-solid fa-moon' },
};

export const TAGS_OPTIONS = [
  'Wi-Fi bom',
  'Tomadas disponíveis',
  'Bom para reuniões',
  'Música ambiente',
  'Isolado',
  'Familiar',
];
