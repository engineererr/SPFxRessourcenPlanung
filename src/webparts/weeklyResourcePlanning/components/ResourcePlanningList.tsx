import * as React from 'react';
import styles from './WeeklyResourcePlanning.module.scss';
import * as moment from 'moment';

import { IWeeklyResourcePlanningProps } from './IWeeklyResourcePlanningProps';
import { IWeeklyResourcePlanningState } from './IWeeklyResourcePlanningState';
import { ListManager } from '../utils/ListManager';

import { autobind, List, ProgressIndicator, Icon, IconButton, Link } from 'office-ui-fabric-react';

import * as strings from 'WeeklyResourcePlanningWebPartStrings';
import IListEntry from '../providers/ResourcenPlanDatenList/IListEntry';

import { getFormattedProgressIndicatorLabel } from '../utils/helpers';

export interface IResourcePlanningListProps {
  items: Array<IListEntry>;
  getListData: any;
  getProjectDataForThisWeek: any;
  selectedUnitToDisplayTime: string;
}

export default class ResourcePlaningList extends React.Component<IResourcePlanningListProps> {

  constructor(props: IResourcePlanningListProps, state: IWeeklyResourcePlanningState) {
    super(props);
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
      </div>);
  }

  public componentWillReceiveProps(nextProps: IResourcePlanningListProps) {
    if (this.props.selectedUnitToDisplayTime !== nextProps.selectedUnitToDisplayTime) {
      this.props.getListData();
    }
  }

  @autobind
  private _onRenderCell(item: IListEntry, index: number | undefined): JSX.Element {
    return (
      <div>
        <h3 className={styles.customH3}>{item.Title}</h3>
        <span>
          {item.ProjectSpaceRelativeUrl !== null && item.ProjectSpaceRelativeUrl !== undefined ?
            (<Link className={styles.titleLinks} target="_blank" href={item.ProjectSpaceRelativeUrl.Url}>{item.ProjectSpaceRelativeUrl.Description}</Link>
            ) : ("")
          }
          {item.JiraAbsoluteUrl !== null && item.JiraAbsoluteUrl !== undefined ?
            (<Link className={styles.titleLinks} target="_blank" href={item.JiraAbsoluteUrl.Url}>{item.JiraAbsoluteUrl.Description}</Link>
            ) : ("")
          }
          <Link onClick={() => this.props.getProjectDataForThisWeek(item.Title, item.WochenDatum)}>more...</Link>
        </span>
        <ProgressIndicator className={(1 / item.PlanMinuten * item.IstMinuten > 1) ? styles.overbookedProcessIndicator : ""} percentComplete={1 / item.PlanMinuten * item.IstMinuten} description={getFormattedProgressIndicatorLabel(this.props.selectedUnitToDisplayTime, item.IstMinuten, item.PlanMinuten)} />
      </div>
    );
  }
}
