import SPUser from "@microsoft/sp-page-context/lib/SPUser";

export default interface IListEntry {
  Id: string;
  User: { EMail: string };
  Title: string;
  PlanMinuten: number;
  IstMinuten: number;
  WochenDatum: Date;
  ProjectSpaceRelativeUrl: { Description: string, Url: string };
  JiraAbsoluteUrl: { Description: string, Url: string };
}
