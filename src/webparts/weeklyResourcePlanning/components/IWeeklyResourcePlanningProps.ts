import IListDataProvider from "../providers/ResourcenPlanDatenList/IListDataProvider";
import SPUser from "@microsoft/sp-page-context/lib/SPUser";


export interface IWeeklyResourcePlanningProps {
  selectedUnitToDisplayTime: string;
  listDataProvider: IListDataProvider;
  currentUser: SPUser;
}
