import IListEntry from './IListEntry';
import IListDataProvider from './IListDataProvider';
import { ListManager } from '../../utils/ListManager';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export class ListDataProvider implements IListDataProvider {
  private listManager: ListManager;
  private context: WebPartContext;

  private readonly BASEURL = "https://garaioag874.sharepoint.com/sites/SPFxShowcase";
  private readonly LISTNAME = "RessourcenPlanDaten";
  constructor(context: any) {
    this.context = context;
    this.listManager = new ListManager(context, this.BASEURL, this.LISTNAME);
  }
  public getAll(): Promise<Array<IListEntry>> {
    return this.listManager.getListDataForUser(this.context.pageContext.user.loginName)
      .then(response => response.value);
  }

  public getAllProjectMembersForThisWeek(projectCode: string, weekDate: Date): Promise<Array<IListEntry>> {
    return this.listManager.getListDataForProjectAndThisWeek(projectCode, weekDate)
      //select every entry once
      .then(response => response.value.filter((v, i, a) => a.indexOf(v) === i));
  }
}
