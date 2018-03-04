declare interface IWeeklyResourcePlanningWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  TitleLabel: string;
  ProgressIndicatorLabel: string;
  ProgressIndicatorLabelInHours: string;

  PreviousWeekLabel: string;
  NextWeekLabel: string;
  NoDataForThisWeek: string;
  showAmountOfTimeInHoursFieldLabel: string;

}

declare module 'WeeklyResourcePlanningWebPartStrings' {
  const strings: IWeeklyResourcePlanningWebPartStrings;
  export = strings;
}
