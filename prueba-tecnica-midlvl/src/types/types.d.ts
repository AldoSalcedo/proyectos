/* typescript No soporta la funcion toSorted aun, se extiende el prototipo de array en los tipos declarando un array generico a: tipo user generico devuelve un numero = 1 o -1 que devuelve un array de los tipos*/
/* toSorted tiene un array de comparacion que recibe 2 parametros, e indicamos el tipo del parametro */
/* compareFn es una funcion opcional que determina el orden de los elementos a: primer elemento de comparacion vs b: segundo elemento, regresa un valor negativo que indica a vendra antes que b, positivo: a vendra despues de b y 0 o NaN: a y b son iguales */
declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[]
  }
}

export interface FetchUsersResponse  {
  nextCursor?: number;
  users: User[];
}

export interface Info {
  seed:    string;
  results: number;
  page:    number;
  version: string;
}

export interface User {
  gender:     Gender;
  name:       Name;
  location:   Location;
  email:      string;
  login:      Login;
  dob:        Dob;
  registered: Dob;
  phone:      string;
  cell:       string;
  id:         ID;
  picture:    Picture;
  nat:        string;
}

export interface Dob {
  date: Date;
  age:  number;
}

export enum Gender {
  Female = "female",
  Male = "male",
}

export interface ID {
  name:  string;
  value: null | string;
}

export interface Location {
  street:      Street;
  city:        string;
  state:       string;
  country:     string;
  postcode:    number | string;
  coordinates: Coordinates;
  timezone:    Timezone;
}

export interface Coordinates {
  latitude:  string;
  longitude: string;
}

export interface Street {
  number: number;
  name:   string;
}

export interface Timezone {
  offset:      string;
  description: string;
}

export interface Login {
  uuid:     string;
  username: string;
  password: string;
  salt:     string;
  md5:      string;
  sha1:     string;
  sha256:   string;
}

export interface Name {
  title: Title;
  first: string;
  last:  string;
}

export enum Title {
  MS = "Ms",
  Madame = "Madame",
  Mademoiselle = "Mademoiselle",
  Miss = "Miss",
  Monsieur = "Monsieur",
  Mr = "Mr",
  Mrs = "Mrs",
}

export enum SortBy {
  NONE = 'none',
  NAME = 'name',
  LAST = 'last',
  COUNTRY = 'country',
}

export interface Picture {
  large:     string;
  medium:    string;
  thumbnail: string;
}