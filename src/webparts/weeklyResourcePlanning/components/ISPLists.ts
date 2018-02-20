export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;

  ProjektCode: string;
  PlanMinuten: number;
  IstMinuten: number;
  WochenDatum: Date;
}
