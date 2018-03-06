import IListEntry from './IListEntry';
export default interface IListDataProvider {
  getAll(): Promise<Array<IListEntry>>;
  getAllProjectMembersForThisWeek(string, Date): Promise<Array<IListEntry>>;


}
