export default interface IListEntry {
  Id: string;
  Title: string;
  ProjektCode: string;
  PlanMinuten: number;
  IstMinuten: number;
  WochenDatum: Date;
  ProjectSpaceRelativeUrl: { Description: string, Url: string };
  JiraAbsoluteUrl: { Description: string, Url: string };
}
