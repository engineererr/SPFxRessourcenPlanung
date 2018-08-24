import * as React from "react";
import * as ReactDom from "react-dom";
import { Version, Environment, EnvironmentType } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneToggle,
} from "@microsoft/sp-webpart-base";

import * as strings from "WeeklyResourcePlanningWebPartStrings";
import WeeklyResourcePlanning from "./components/WeeklyResourcePlanning";
import { IWeeklyResourcePlanningProps } from "./components/IWeeklyResourcePlanningProps";
import { ListDataProvider } from "./providers/ResourcenPlanDatenList/ListDataProvider";
import { ListDataFakeProvider } from "./providers/ResourcenPlanDatenList/ListDataFakeProvider";
import IListDataProvider from "./providers/ResourcenPlanDatenList/IListDataProvider";


export interface IWeeklyResourcePlanningWebPartProps {
  selectedUnitToDisplayTime: string;
}

export default class WeeklyResourcePlanningWebPart extends BaseClientSideWebPart<IWeeklyResourcePlanningWebPartProps> {
  _dataProvider: IListDataProvider;
  protected onInit(): Promise<void> {
    if (Environment.type === EnvironmentType.ClassicSharePoint) {
      // do some stuff on classic page
    } else if (Environment.type === EnvironmentType.SharePoint) {
      // do some stuff on modern page
      this._dataProvider = new ListDataProvider(this.context);
    } else if (Environment.type === EnvironmentType.Local) {
      // do some stuff on SharePoint workbench page
      this._dataProvider = new ListDataFakeProvider();
    }

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IWeeklyResourcePlanningProps> = React.createElement(
      WeeklyResourcePlanning,
      {
        selectedUnitToDisplayTime: this.properties.selectedUnitToDisplayTime,
        listDataProvider: this._dataProvider,
        currentUser: this.context.pageContext.user,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown("selectedUnitToDisplayTime", {
                  label: strings.selectedUnitToDisplayTimeFieldLabel,
                  options: [
                    { key: "minutes", text: strings.showAmountOfTimeInMinutesChoiceLabel },
                    { key: "hours", text: strings.showAmountOfTimeInHoursChoiceLabel },
                    { key: "days", text: strings.showAmountOfTimeInDaysChoiceLabel },
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
