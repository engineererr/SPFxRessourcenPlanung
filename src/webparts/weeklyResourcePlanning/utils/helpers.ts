import * as strings from 'WeeklyResourcePlanningWebPartStrings';

export function getFormattedProgressIndicatorLabel(selectedUnitToDisplayTime: string, istMinuten: number, planMinuten: number): string {
  istMinuten = istMinuten ? istMinuten : 0;
  planMinuten = planMinuten ? planMinuten : 0;

  switch (selectedUnitToDisplayTime) {
    case "days":
      let istMinutenInDays = Math.round(istMinuten / 60 / 8 * 100) / 100;
      let planMinutenInDays = Math.round(planMinuten / 60 / 8 * 100) / 100;
      return strings.ProgressIndicatorLabelInDays.replace("{ISTMINUTEN}", istMinutenInDays.toString()).replace("{PLANMINUTEN}", planMinutenInDays.toString());
    case "hours":
      let istMinutenInHours = Math.round(istMinuten / 60 * 100) / 100;
      let planMinutenInHours = Math.round(planMinuten / 60 * 100) / 100;
      return strings.ProgressIndicatorLabelInHours.replace("{ISTMINUTEN}", istMinutenInHours.toString()).replace("{PLANMINUTEN}", planMinutenInHours.toString());
    default:
      return strings.ProgressIndicatorLabel.replace("{ISTMINUTEN}", istMinuten.toString()).replace("{PLANMINUTEN}", planMinuten.toString());
  }

}
