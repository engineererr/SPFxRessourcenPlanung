import IListDataProvider from "./IListDataProvider";
import IListEntry from "./IListEntry";

export class ListDataFakeProvider implements IListDataProvider {

  public getAll(): Promise<Array<IListEntry>> {

    return new Promise<Array<IListEntry>>((resolve, reject) => {

      let list = [
        { Title: "col-bla", Id: "sdf", IstMinuten: 100, PlanMinuten: 30, WochenDatum: new Date("03/03/2018") },

      ] as Array<IListEntry>;

      resolve(list);

    });
  }

  public getAllProjectMembersForThisWeek(projectCode, week) {
    return new Promise<Array<IListEntry>>((resolve, reject) => { });
  }
}
