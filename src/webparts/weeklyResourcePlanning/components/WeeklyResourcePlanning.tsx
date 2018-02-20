import * as React from 'react';
import styles from './WeeklyResourcePlanning.module.scss';
import { IWeeklyResourcePlanningProps } from './IWeeklyResourcePlanningProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ListManager } from '../utils/ListManager';

import { autobind, List } from 'office-ui-fabric-react';
import { IWeeklyResourcePlanningState } from './IWeeklyResourcePlanningState';
import { ISPList } from './ISPLists';

export default class WeeklyResourcePlanning extends React.Component<IWeeklyResourcePlanningProps, IWeeklyResourcePlanningState> {
  testDate = "01/30/2018";
  constructor(props: IWeeklyResourcePlanningProps, state: IWeeklyResourcePlanningState) {
    super(props);
    this.state = {
      items: [],
    };
    this._getListdata();

  }

  public render(): React.ReactElement<IWeeklyResourcePlanningProps> {
    return (
      <div className={styles.weeklyResourcePlanning} >
        <div className={styles.container}>
          <h1>Week from {this.testDate}</h1>
          <List items={this.state.items} onRenderCell={this._onRenderCell} />
        </div>
      </div>
    );
  }

  @autobind
  private _getListdata() {
    let listManager: ListManager = new ListManager(this.props.context);
    listManager.getListDataForUser("kbo0382").then((response) => {
      this._renderList(response.value);
    });

  }

  @autobind
  private _renderList(items: ISPList[]): void {
    let newItems: Array<any> = [];
    items.forEach((item: ISPList) => {
      if (item.Title == "kbo0382" && this._isDateCurrentMonday(item.WochenDatum)) {
        newItems.push(item);
      }
    });

    this.setState({ items: newItems });
  }

  private _isDateCurrentMonday(wochenDatum: Date) {
    return new Date(wochenDatum.toString()).toLocaleDateString() == this._getDateOfMonday(new Date(this.testDate)).toLocaleDateString()
  }
  private _getDateOfMonday(date: Date) {
    let currentDate = date;
    let day: number = currentDate.getDay();
    let diff = currentDate.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(currentDate.setDate(diff));
  }

  @autobind
  private _onRenderCell(item: ISPList, index: number | undefined): JSX.Element {
    return (
      <div>
        <h3>{item.ProjektCode}</h3>
        <span>IstMinuten: {item.IstMinuten}</span>
        <br />
        <span>SollMinuten: {item.PlanMinuten}</span>
      </div>
    );
  }
}
