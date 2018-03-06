/// <reference types="mocha" />

import * as React from 'react';
import { expect, assert } from 'chai';

import { mount, ReactWrapper } from 'enzyme'

import WeeklyResourcePlanning from '../components/WeeklyResourcePlanning';
import { IWeeklyResourcePlanningProps } from '../components/IWeeklyResourcePlanningProps';
import { ListDataFakeProvider } from '../providers/ResourcenPlanDatenList/ListDataFakeProvider';

describe('Testing Resource Planning Component', () => {
  let list: ReactWrapper;

  let props: IWeeklyResourcePlanningProps = <IWeeklyResourcePlanningProps>{};
  props.selectedUnitToDisplayTime = "hours";
  props.listDataProvider = new ListDataFakeProvider();
  before(() => {
    list = mount(React.createElement(
      WeeklyResourcePlanning, props
    ));
  }
  );

  it('should show progress indicator in red', () => {
    debugger;
    let cssSelector: string = ".overbookedProcessIndicator";
    const element = list.find(cssSelector);

    assert(element.length > 0);
  })
});


