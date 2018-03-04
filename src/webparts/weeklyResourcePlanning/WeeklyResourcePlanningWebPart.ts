import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from '@microsoft/sp-webpart-base';

import * as strings from 'WeeklyResourcePlanningWebPartStrings';
import WeeklyResourcePlanning from './components/WeeklyResourcePlanning';
import { IWeeklyResourcePlanningProps } from './components/IWeeklyResourcePlanningProps';

export interface IWeeklyResourcePlanningWebPartProps {
  showAmountOfTimeInHours: boolean;
}

export default class WeeklyResourcePlanningWebPart extends BaseClientSideWebPart<IWeeklyResourcePlanningWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWeeklyResourcePlanningProps> = React.createElement(
      WeeklyResourcePlanning,
      {
        context: this.context,
        showAmountOfTimeInHours: this.properties.showAmountOfTimeInHours,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('showAmountOfTimeInHours', {
                  label: strings.showAmountOfTimeInHoursFieldLabel
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
