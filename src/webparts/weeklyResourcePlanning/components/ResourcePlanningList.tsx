import * as React from 'react';
import styles from './WeeklyResourcePlanning.module.scss';
import * as moment from 'moment';

import { IWeeklyResourcePlanningProps } from './IWeeklyResourcePlanningProps';
import { IWeeklyResourcePlanningState } from './IWeeklyResourcePlanningState';
import { ListManager } from '../utils/ListManager';

import { autobind, List, ProgressIndicator, Icon, IconButton, Link } from 'office-ui-fabric-react';

import * as strings from 'WeeklyResourcePlanningWebPartStrings';
import IListEntry from '../providers/ResourcenPlanDatenList/IListEntry';

export interface IResourcePlanningListProps {
  items: Array<IListEntry>;
  getListData: any;

  getProjectDataForThisWeek: any;
  selectedUnitToDisplayTime: string;

}

export default class ResourcePlaningList extends React.Component<IResourcePlanningListProps> {

  readonly MOMENTFORMAT: string = "MM/DD/YYYY";

  testDate: string = moment("01/29/2018").format(this.MOMENTFORMAT);
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
    if (this.props.selectedUnitToDisplayTime !== nextProps.selectedUnitToDisplayTime) {
      this.props.getListData();
    }
  }

  @autobind
  private _onRenderCell(item: IListEntry, index: number | undefined): JSX.Element {
    return (
      <div>
        <h3 className={styles.customH3}>{item.ProjektCode}</h3>
        <span>
          {item.ProjectSpaceRelativeUrl !== null && item.ProjectSpaceRelativeUrl !== undefined ?
            (<Link className={styles.titleLinks} target="_blank" href={item.ProjectSpaceRelativeUrl.Url}>{item.ProjectSpaceRelativeUrl.Description}</Link>
            ) : ("")
          }
          {item.JiraAbsoluteUrl !== null && item.JiraAbsoluteUrl !== undefined ?
            (<Link className={styles.titleLinks} target="_blank" href={item.JiraAbsoluteUrl.Url}>{item.JiraAbsoluteUrl.Description}</Link>
            ) : ("")
          }
          <Link onClick={() => this.props.getProjectDataForThisWeek(item.ProjektCode, item.WochenDatum)}>more...</Link>
        </span>
        <ProgressIndicator className={(1 / item.PlanMinuten * item.IstMinuten > 1) ? styles.overbookedProcessIndicator : ""} percentComplete={1 / item.PlanMinuten * item.IstMinuten} description={this._getFormattedProgressIndicatorLabel(item.IstMinuten, item.PlanMinuten)} />
      </div>
    );
  }


  @autobind
  private _getFormattedProgressIndicatorLabel(istMinuten: number, planMinuten: number): string {
    switch (this.props.selectedUnitToDisplayTime) {
      case "days":
        let istMinutenInDays = Math.round(istMinuten / 60 / 8 * 100) / 100;
        let planMinutenInDays = Math.round(planMinuten / 60 / 8 * 100) / 100;
        return strings.ProgressIndicatorLabelInDays.replace("{ISTMINUTEN}", istMinutenInDays.toString()).replace("{PLANMINUTEN}", planMinutenInDays.toString())
      case "hours":
        let istMinutenInHours = Math.round(istMinuten / 60 * 100) / 100;
        let planMinutenInHours = Math.round(planMinuten / 60 * 100) / 100;
        return strings.ProgressIndicatorLabelInHours.replace("{ISTMINUTEN}", istMinutenInHours.toString()).replace("{PLANMINUTEN}", planMinutenInHours.toString())
      default:
        return strings.ProgressIndicatorLabel.replace("{ISTMINUTEN}", istMinuten.toString()).replace("{PLANMINUTEN}", planMinuten.toString())
    }

  }
}
