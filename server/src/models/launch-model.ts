export interface Launch {
  flightNumber?: number;
  launchDate?: Date;
  mission?: string;
  rocket?: string;
  target?: string;
  customers?: string[];
  success?: boolean;
  upcoming?: boolean;
}
