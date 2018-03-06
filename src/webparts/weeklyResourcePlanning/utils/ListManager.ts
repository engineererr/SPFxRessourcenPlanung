import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions
} from '@microsoft/sp-http';


import { ISPResponse } from "../providers/ResourcenPlanDatenList/ISPResponse";
import IListEntry from "../providers/ResourcenPlanDatenList/IListEntry";

export class ListManager {
  context: any;

  constructor(context) {
    this.context = context;
  }

  public getListData(): Promise<ISPResponse> {
    return this.context.spHttpClient.fetch('https://cloudfighters.sharepoint.com/sites/PizzaMeeting' + `/_api/web/lists/GetByTitle('RessourcenPlanDaten')/items`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  public getListDataForUser(user: string): Promise<ISPResponse> {
    return this.context.spHttpClient.fetch('https://cloudfighters.sharepoint.com/sites/PizzaMeeting' + `/_api/web/lists/GetByTitle('RessourcenPlanDaten')/items?$filter=Title eq '${user}'`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  public getListDataForProjectAndThisWeek(projectCode: string, week: Date): Promise<ISPResponse> {
    return this.context.spHttpClient.fetch(`https://cloudfighters.sharepoint.com/sites/PizzaMeeting/_api/web/lists/GetByTitle('RessourcenPlanDaten')/items?$filter=(WochenDatum eq '${week.toString()}' and ProjektCode eq '${projectCode}')`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  private _saveListData(newItem) {
    if (Environment.type === EnvironmentType.Local) {
      return;
    }

    const spOpts: ISPHttpClientOptions = {
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=verbose',
        'odata-version': ''
      },
      body: `{
        '__metadata': {
          'type': 'SP.Data.PizzaMeetingSuggestionsListItem'
        },
        Title:  '${newItem.title}',
        Description: '${newItem.description}'
      }`
    };
    this.context.spHttpClient.post(
      this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('PizzaMeetingSuggestions')/items`,
      SPHttpClient.configurations.v1, spOpts).then((response: SPHttpClientResponse) => {
        // Access properties of the response object.
        console.log(`Status code: ${response.status}`);
        console.log(`Status text: ${response.statusText}`);

        //response.json() returns a promise so you get access to the json in the resolve callback.
        response.json().then((responseJSON: JSON) => {
          console.log(responseJSON);
        });
      });
  }
}
