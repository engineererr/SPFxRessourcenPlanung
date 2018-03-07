import * as React from 'react';
import styles from './WeeklyResourcePlanning.module.scss';
import * as strings from 'WeeklyResourcePlanningWebPartStrings';

import { IWeeklyResourcePlanningProps } from './IWeeklyResourcePlanningProps';
import { IWeeklyResourcePlanningState } from './IWeeklyResourcePlanningState';
import IListEntry from '../providers/ResourcenPlanDatenList/IListEntry';

import { ListManager } from '../utils/ListManager';
import * as moment from 'moment';
import { autobind, List, ProgressIndicator, Icon, IconButton, Panel, PanelType } from 'office-ui-fabric-react';

import ResourcePlanningList from './ResourcePlanningList';
import WeekProcessIndicator from './WeekProcessIndicator';

export default class WeeklyResourcePlanning extends React.Component<IWeeklyResourcePlanningProps, IWeeklyResourcePlanningState> {
  private readonly MOMENTFORMAT: string = "MM/DD/YYYY";
  private currentDate: string = moment(moment.now()).startOf('isoWeek').format(this.MOMENTFORMAT);
  constructor(props: IWeeklyResourcePlanningProps, state: IWeeklyResourcePlanningState) {
    super(props);
    this.state = {
      items: [],
      showProjectDetails: false,
      projectDetails: [],
    };
  }

  public render(): React.ReactElement<IWeeklyResourcePlanningProps> {
    return (
      <div className={styles.weeklyResourcePlanning}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.previousWeekArrow}>
              <span><IconButton title={strings.PreviousWeekLabel} onClick={this._onClickPreviousWeek} iconProps={{ iconName: 'ChromeBack' }} /></span>
            </div>
            <div className={styles.nextWeekArrow}>
              <span><IconButton title={strings.NextWeekLabel} onClick={this._onClickNextWeek} iconProps={{ iconName: 'ChromeBackMirrored' }} /></span>
            </div>
          </div>
          <h1 className={styles.customH1}>{this._getSimpleWeekFormat(this.currentDate)}</h1>
          <span>{strings.TitleLabel} {moment(this.currentDate).format("DD.MM.YYYY")}</span>
          <br />
          <h3 className={styles.customH3}>Weekly Total</h3>
          <WeekProcessIndicator items={this.state.items} selectedUnitToDisplayTime={this.props.selectedUnitToDisplayTime} />
          <ResourcePlanningList items={this.state.items} getListData={this._getListdata} getProjectDataForThisWeek={this._getProjectDataForThisWeek} selectedUnitToDisplayTime={this.props.selectedUnitToDisplayTime} />
        </div>
        <Panel isOpen={this.state.showProjectDetails}
          onDismiss={() => this._setShowPanel(false)}
          type={PanelType.smallFixedNear}
          headerText='Project Details'
          isBlocking={false}
          isLightDismiss={true}
        >
          <h3>Project Members</h3>
          <List items={this.state.projectDetails} onRenderCell={this._onProjectDetailsRenderCell} />
        </Panel>
      </div>
    );
  }

  @autobind
  private _onProjectDetailsRenderCell(item: IListEntry, index: number | undefined): JSX.Element {
    return (
      <div>
        <span>{item.User.EMail}</span>
      </div>);
  }

  @autobind
  private _getSimpleWeekFormat(date: string) {
    let numberOfDays = moment(this.currentDate).startOf('isoWeek').diff(moment().startOf('isoWeek'), "days");

    if (numberOfDays == 7) {
      return "Next Week";
    } else if (numberOfDays == -7) {
      return "Last Week";
    } else if (numberOfDays == 0) {
      return "This Week";
    } else if (numberOfDays > 0) {
      return "In " + Math.abs(numberOfDays / 7) + " Weeks";
    } else {
      return Math.abs(numberOfDays / 7) + " Weeks ago";
    }
  }

  @autobind
  private _setShowPanel(show: boolean): void {
    this.setState({ showProjectDetails: show });
  }

  public componentWillReceiveProps(nextProps: IWeeklyResourcePlanningProps) {
    if (this.props.selectedUnitToDisplayTime !== nextProps.selectedUnitToDisplayTime) {
      this._getListdata();
    }
  }

  @autobind
  private _getListdata() {
    this.props.listDataProvider.getAll().then((response) => {
      this._renderList(response);
    });
  }

  @autobind
  private _getProjectDataForThisWeek(project: string, week: Date) {
    this.props.listDataProvider.getAllProjectMembersForThisWeek(project, week).then((response) => {
      this._showProjectDetails(response);
    });
  }

  @autobind
  private _showProjectDetails(items: IListEntry[]) {
    this.setState({ projectDetails: items });
    this._setShowPanel(true);
  }

  @autobind
  private _renderList(items: IListEntry[]): void {
    if (items === undefined) return;

    let newItems: Array<any> = [];
    items.forEach((item: IListEntry) => {
      if (this._isDateCurrentMonday(moment(item.WochenDatum).format(this.MOMENTFORMAT))) {
        newItems.push(item);
      }
    });

    this.setState({ items: newItems });
  }

  private _isDateCurrentMonday(wochenDatum: string): boolean {
    let isDateCurrentMonday = (wochenDatum == moment(this.currentDate).startOf('isoWeek').format(this.MOMENTFORMAT)) ? true : false;
    return isDateCurrentMonday;
  }

  @autobind
  private _getNewTestDate(numberOfAdditionalDays: number) {
    this.currentDate = moment(this.currentDate).add(numberOfAdditionalDays, 'day').format(this.MOMENTFORMAT);
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
