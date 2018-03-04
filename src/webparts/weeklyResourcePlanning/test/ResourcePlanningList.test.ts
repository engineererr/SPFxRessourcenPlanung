/// <reference types="mocha" />

import * as React from 'react';
import { expect } from 'chai';

import { mount, ReactWrapper } from 'enzyme'

import ResourcePlanningList, {IResourcePlanningListProps} from '../components/ResourcePlanningList';
import { ISPList } from '../components/ISPLists';

describe('Testing Resouce Planning List', () => {
  let list: ReactWrapper;
  let props: IResourcePlanningListProps;

  let item: ISPList = {Title: "Affe", Id: "sdf", IstMinuten: 10, PlanMinuten: 30, ProjektCode: "col-bla", WochenDatum: new Date("03/03/2018")};
  props.items = [item];
  props.showAmountOfTimeInHours = true;

  before(() => {
    list = mount(React.createElement(
      ResourcePlanningList, props
    ));
  }
  );
});

it('should show booked times in hours', () => {
  
})
