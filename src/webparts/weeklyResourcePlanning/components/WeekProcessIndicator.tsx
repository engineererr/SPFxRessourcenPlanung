import * as React from 'react';
import styles from './WeeklyResourcePlanning.module.scss';
import { ProgressIndicator } from 'office-ui-fabric-react';
import IListEntry from '../providers/ResourcenPlanDatenList/IListEntry';

import { getFormattedProgressIndicatorLabel } from '../utils/helpers';

export interface IWeekProcessIndicatorProps {
  items: Array<IListEntry>;
  selectedUnitToDisplayTime: string;
}

export interface IWeekProcessIndicatorState {
  totalIstMinuten: number;
  totalPlanMinuten: number;
}

export default class WeekProcessIndicator extends React.Component<IWeekProcessIndicatorProps, IWeekProcessIndicatorState> {
  constructor(props: IWeekProcessIndicatorProps, state: IWeekProcessIndicatorState) {
    super(props);
    this.state = {
      totalIstMinuten: 0,
      totalPlanMinuten: 0,
    };
  }
  public render(): React.ReactElement<IWeekProcessIndicatorProps> {
    return (
      <ProgressIndicator className={this.state.totalIstMinuten > this.state.totalPlanMinuten ? styles.overbookedProcessIndicator : ""} percentComplete={this.state.totalIstMinuten / this.state.totalPlanMinuten} description={getFormattedProgressIndicatorLabel(this.props.selectedUnitToDisplayTime, this.state.totalIstMinuten, this.state.totalPlanMinuten)} />
    );
  }

  public componentWillReceiveProps(nextProps: IWeekProcessIndicatorProps) {
    let newTotalIstMinuten = nextProps.items.reduce((a: any, b) => a + b.IstMinuten, 0);
    let newTotalPlanMinuten = nextProps.items.reduce((a: any, b) => a + b.PlanMinuten, 0);
    if (this.state.totalIstMinuten !== newTotalIstMinuten || this.state.totalPlanMinuten !== newTotalPlanMinuten) {
      this.setState({
        totalIstMinuten: nextProps.items.reduce((a: any, b) => a + b.IstMinuten, 0),
        totalPlanMinuten: nextProps.items.reduce((a: any, b) => a + b.PlanMinuten, 0),
      });
    }
  }
}
