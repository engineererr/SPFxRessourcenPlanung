import * as React from 'react';
import styles from './WeeklyResourcePlanning.module.scss';
import * as moment from 'moment';

import { IWeeklyResourcePlanningProps } from './IWeeklyResourcePlanningProps';
import { IWeeklyResourcePlanningState } from './IWeeklyResourcePlanningState';
import { ListManager } from '../utils/ListManager';
import { ISPList } from './ISPLists';

import { autobind, List, ProgressIndicator, Icon, IconButton } from 'office-ui-fabric-react';

import * as strings from 'WeeklyResourcePlanningWebPartStrings';

export interface IResourcePlanningListProps {
  items: Array<ISPList>;
  getListData: any;
  showAmountOfTimeInHours: boolean;

}

export default class ResourcePlaningList extends React.Component<IResourcePlanningListProps> {

  readonly MOMENTFORMAT: string = "MM/DD/YYYY";

  testDate: string = moment("01/30/2018").format(this.MOMENTFORMAT);
  constructor(props: any, state: IWeeklyResourcePlanningState) {
    super(props);
    this.state = {
      items: [],
    };
    this.props.getListData();
  }

  public render(): React.ReactElement<IWeeklyResourcePlanningProps> {
    return (
      <div>
        {this.props.items.length > 0 ? (
          <List items={this.props.items} onRenderCell={this._onRenderCell} />
        ) : (
            <h3>{strings.NoDataForThisWeek}</h3>
          )}
      </div>)
  }

  componentWillReceiveProps(nextProps: IResourcePlanningListProps) {
    if (this.props.showAmountOfTimeInHours !== nextProps.showAmountOfTimeInHours) {
      this.props.getListData();
    }
  }

  @autobind
  private _onRenderCell(item: ISPList, index: number | undefined): JSX.Element {
    return (
      <div>
        <h3 className={styles.customH3}>{item.ProjektCode}</h3>
        <ProgressIndicator className={(1 / item.PlanMinuten * item.IstMinuten > 1)?styles.overbookedProcessIndicator:""} percentComplete={1 / item.PlanMinuten * item.IstMinuten}  description={this._getFormattedProgressIndicatorLabel(item.IstMinuten, item.PlanMinuten)} />
      </div>
    );
  }

  @autobind
  private _getFormattedProgressIndicatorLabel(istMinuten: number, planMinuten: number): string {
    if (this.props.showAmountOfTimeInHours) {
      let istMinutenInHours = istMinuten / 60;
      let planMinutenInHours = planMinuten / 60;
      return strings.ProgressIndicatorLabelInHours.replace("{ISTMINUTEN}", istMinutenInHours.toString()).replace("{PLANMINUTEN}", planMinutenInHours.toString())
    } else {
      return strings.ProgressIndicatorLabel.replace("{ISTMINUTEN}", istMinuten.toString()).replace("{PLANMINUTEN}", planMinuten.toString())
    }
  }
}
