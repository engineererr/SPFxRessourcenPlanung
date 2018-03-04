import * as React from 'react';
import styles from './WeeklyResourcePlanning.module.scss';
import { IWeeklyResourcePlanningProps } from './IWeeklyResourcePlanningProps';
import { IWeeklyResourcePlanningState } from './IWeeklyResourcePlanningState';

import { escape } from '@microsoft/sp-lodash-subset';
import { ListManager } from '../utils/ListManager';
import * as moment from 'moment';
import { autobind, List, ProgressIndicator, Icon, IconButton } from 'office-ui-fabric-react';
import { ISPList } from './ISPLists';
import ResourcePlanningList from './ResourcePlanningList';
import * as strings from 'WeeklyResourcePlanningWebPartStrings';

export default class WeeklyResourcePlanning extends React.Component<IWeeklyResourcePlanningProps, IWeeklyResourcePlanningState> {
  readonly MOMENTFORMAT: string = "MM/DD/YYYY";

  testDate: string = moment("01/30/2018").format(this.MOMENTFORMAT);
  constructor(props: IWeeklyResourcePlanningProps, state: IWeeklyResourcePlanningState) {
    super(props);
    this.state = {
      items: [],
    };
    this._getListdata();
  }

  public render(): React.ReactElement<IWeeklyResourcePlanningProps> {
    return (
      <div className={styles.weeklyResourcePlanning}>
        <div className={styles.container}>
          <div className={styles.previousWeekArrow}>
            <span><IconButton title={strings.PreviousWeekLabel} onClick={this._onClickPreviousWeek} iconProps={{ iconName: 'ChromeBack' }} /></span>
          </div>
          <div className={styles.nextWeekArrow}>
            <span><IconButton title={strings.NextWeekLabel} onClick={this._onClickNextWeek} iconProps={{ iconName: 'ChromeBackMirrored' }} /></span>
          </div>
          <h1>{strings.TitleLabel} {moment(this.testDate).format("DD.MM.YYYY")}</h1>
          <ResourcePlanningList items={this.state.items} getListData={this._getListdata} showAmountOfTimeInHours={this.props.showAmountOfTimeInHours}/>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps: IWeeklyResourcePlanningProps) {
    if (this.props.showAmountOfTimeInHours !== nextProps.showAmountOfTimeInHours) {
      this._getListdata();
    }
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
      if (item.Title == "kbo0382" && this._isDateCurrentMonday(moment(item.WochenDatum).format(this.MOMENTFORMAT))) {
        newItems.push(item);
      }
    });

    this.setState({ items: newItems });
  }

  @autobind
  private _isDateCurrentMonday(wochenDatum: string): boolean {
    return wochenDatum == moment(this.testDate).startOf('isoWeek').format(this.MOMENTFORMAT);
  }

  @autobind
  private _getNewTestDate(numberOfAdditionalDays: number) {
    this.testDate = moment(this.testDate).add(numberOfAdditionalDays, 'day').format(this.MOMENTFORMAT);
  }

  @autobind
  private _onClickPreviousWeek() {
    this._getNewTestDate(-7);
    this._getListdata();
  }

  @autobind
  private _onClickNextWeek() {
    this._getNewTestDate(7);
    this._getListdata();
  }


}
