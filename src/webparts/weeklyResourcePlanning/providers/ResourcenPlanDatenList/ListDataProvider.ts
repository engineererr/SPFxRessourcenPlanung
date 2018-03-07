import IListEntry from './IListEntry';
import IListDataProvider from './IListDataProvider';
import { ListManager } from '../../utils/ListManager';

export class ListDataProvider implements IListDataProvider {
  private listManager: ListManager;
  constructor(context: any) {
    this.listManager = new ListManager(context);
  }
  public getAll(): Promise<Array<IListEntry>> {
    return this.listManager.getListDataForUser("cis0344").then(response => response.value);
  }

  public getAllProjectMembersForThisWeek(projectCode: string, weekDate: Date) {
    return this.listManager.getListDataForProjectAndThisWeek(projectCode, weekDate).then(response => response.value.filter((v, i, a) => a.indexOf(v) === i));
  }
}
