import IListEntry from './IListEntry';
import IListDataProvider from './IListDataProvider';
import { ListManager } from '../../utils/ListManager';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export class ListDataProvider implements IListDataProvider {
  private listManager: ListManager;
  private context: WebPartContext;
  constructor(context: any) {
    this.context = context;
    this.listManager = new ListManager(context);
  }
  public getAll(): Promise<Array<IListEntry>> {
    return this.listManager.getListDataForUser(this.context.pageContext.user.loginName)
      .then(response => response.value);
  }

  public getAllProjectMembersForThisWeek(projectCode: string, weekDate: Date): Promise<Array<IListEntry>> {
    return this.listManager.getListDataForProjectAndThisWeek(projectCode, weekDate)
      .then(response => response.value.filter((v, i, a) => a.indexOf(v) === i));
  }
}
