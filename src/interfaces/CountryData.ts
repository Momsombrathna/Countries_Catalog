export interface NameTranslations {
  official: string;
  common: string;
}

export interface NativeNameTranslations {
  official: string;
  common: string;
}

export interface Translations {
  [key: string]: NameTranslations;
}

export interface Languages {
  [key: string]: string;
}

export interface IDD {
  root: string;
  suffixes: string[];
}

export interface Currencies {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

export interface Demonyms {
  [key: string]: {
    f: string;
    m: string;
  };
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Car {
  signs: string[];
  side: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface CoatOfArms {
  png: string;
  svg: string;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: NativeNameTranslations;
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Currencies;
  idd: IDD;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Languages;
  translations: Translations;
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  fifa: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
}
