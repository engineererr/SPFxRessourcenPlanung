declare interface IWeeklyResourcePlanningWebPartStrings {
  //Property Pane
  BasicGroupName: string;
  selectedUnitToDisplayTimeFieldLabel: string;
  showAmountOfTimeInMinutesChoiceLabel: string;
  showAmountOfTimeInHoursChoiceLabel: string;
  showAmountOfTimeInDaysChoiceLabel: string;

  //General
  TitleLabel: string;
  ProgressIndicatorLabel: string;
  ProgressIndicatorLabelInHours: string;
  ProgressIndicatorLabelInDays: string;
  PreviousWeekLabel: string;
  NextWeekLabel: string;
  NoDataForThisWeek: string;


}

declare module 'WeeklyResourcePlanningWebPartStrings' {
  const strings: IWeeklyResourcePlanningWebPartStrings;
  export = strings;
}
