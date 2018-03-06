import IListEntry from "../providers/ResourcenPlanDatenList/IListEntry";

export interface IWeeklyResourcePlanningState {
  items: Array<IListEntry>;
  showProjectDetails: boolean;
  projectDetails: Array<IListEntry>;
}
