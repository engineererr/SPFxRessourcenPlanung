import IListDataProvider from "../providers/ResourcenPlanDatenList/IListDataProvider";


export interface IWeeklyResourcePlanningProps {
  selectedUnitToDisplayTime: string;
  listDataProvider: IListDataProvider;
}
