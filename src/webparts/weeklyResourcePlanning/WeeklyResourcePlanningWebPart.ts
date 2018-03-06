import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneToggle,
} from '@microsoft/sp-webpart-base';

import * as strings from 'WeeklyResourcePlanningWebPartStrings';
import WeeklyResourcePlanning from './components/WeeklyResourcePlanning';
import { IWeeklyResourcePlanningProps } from './components/IWeeklyResourcePlanningProps';
import { ListDataProvider } from './providers/ResourcenPlanDatenList/ListDataProvider';


export interface IWeeklyResourcePlanningWebPartProps {
  selectedUnitToDisplayTime: string;
}

export default class WeeklyResourcePlanningWebPart extends BaseClientSideWebPart<IWeeklyResourcePlanningWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWeeklyResourcePlanningProps> = React.createElement(
      WeeklyResourcePlanning,
      {
        selectedUnitToDisplayTime: this.properties.selectedUnitToDisplayTime,
        listDataProvider: new ListDataProvider(this.context),
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
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('selectedUnitToDisplayTime', {
                  label: strings.selectedUnitToDisplayTimeFieldLabel,
                  options: [
                    { key: 'minutes', text: strings.showAmountOfTimeInMinutesChoiceLabel },
                    { key: 'hours', text: strings.showAmountOfTimeInHoursChoiceLabel },
                    { key: 'days', text: strings.showAmountOfTimeInDaysChoiceLabel },
                  ]
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
