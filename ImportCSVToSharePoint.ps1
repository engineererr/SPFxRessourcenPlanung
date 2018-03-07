#install ad module from here: https://www.microsoft.com/en-us/download/details.aspx?id=45520
Connect-PnPOnline -Url "https://garaioag874.sharepoint.com/sites/SPFxShowcase"
cd D:\AVexcluded\WeeklyResourcePlanning
Remove-PnPList "RessourcenPlanDaten" -Force
New-PnPList -Title "RessourcenPlanDaten" -Template GenericList
New-PnPList -Title "ProjectInformation" -Template GenericList

$RessourcenPlanDatenList = Get-PnPList -Identity "RessourcenPlanDaten"
$projectInformationList = Get-PnPList -Identity "ProjectInformation"

Add-PnPField -List $projectInformationList -DisplayName "ProjectSpaceRelativeUrl" -InternalName "ProjectSpaceRelativeUrl" -Type URL -AddToDefaultView
Add-PnPField -List $projectInformationList -DisplayName "JiraAbsoluteUrl" -InternalName "JiraAbsoluteUrl" -Type URL -AddToDefaultView

$projectInformationListItems = Get-PnPListItem -List "ProjectInformation" -Fields "Title", "ProjectSpaceRelativeUrl", "JiraAbsoluteUrl"

#ProjektCode field not needed. Rename title field to ProjektCode
#Add-PnPField -List $RessourcenPlanDatenList -DisplayName "ProjektCode" -InternalName "ProjektCode" -Type Text -AddToDefaultView
Add-PnPField -List $RessourcenPlanDatenList -DisplayName "PlanMinuten" -InternalName "PlanMinuten" -Type Number -AddToDefaultView
Add-PnPField -List $RessourcenPlanDatenList -DisplayName "IstMinuten" -InternalName "IstMinuten" -Type Number -AddToDefaultView
Add-PnPField -List $RessourcenPlanDatenList -DisplayName "ProjectSpaceRelativeUrl" -InternalName "ProjectSpaceRelativeUrl" -Type URL -AddToDefaultView
Add-PnPField -List $RessourcenPlanDatenList -DisplayName "JiraAbsoluteUrl" -InternalName "JiraAbsoluteUrl" -Type URL -AddToDefaultView
Add-PnPField -List $RessourcenPlanDatenList -DisplayName "User" -InternalName "User" -Type User -AddToDefaultView

Add-PnPFieldFromXml '<Field Type="DateTime"
				DisplayName="WochenDatum"
				Required="FALSE"
				EnforceUniqueValues="FALSE"
				Indexed="FALSE" Format="DateOnly"
				Group="Custom Columns"
				FriendlyDisplayFormat="Disabled"
				ID="{10ce4fed-921a-4d51-a870-534605bf89be}"
				SourceID="{6cf53ae4-314b-435e-9685-19b7f7b8df07}"
				StaticName="WochenDatum"
				Name="WochenDatum">
    </Field>' -List $RessourcenPlanDatenList
#add DateTime field to default view (not possible per PS yet)

Invoke-WebRequest -Uri "https://reporting.garaio.com/ReportServer/Pages/ReportViewer.aspx?/VertecReports/RessourcenPlanDaten&rs:Format=CSV" -OutFile ./RessourcenPlanDaten.csv -UseDefaultCredentials
$import = Import-Csv -Delimiter "," -Path "RessourcenPlanDaten.csv"

$import | % {
    $projektCode = $_.ProjektCode
    $projectInformationListItem = $projectInformationListItems | ? {$_.FieldValues.Title -eq $projektCode}

    if ($projectInformationListItem -ne $null) {
        if ($projectInformationListItem.FieldValues.ProjectSpaceRelativeUrl.Url -ne $null) {
            $projectSpaceRelativeUrl = $projectInformationListItem.FieldValues.ProjectSpaceRelativeUrl.Url + ", " + $projectInformationListItem.FieldValues.ProjectSpaceRelativeUrl.Description
        }
        else {
            $projectSpaceRelativeUrl = ""
        }

        if ($projectInformationListItem.FieldValues.JiraAbsoluteUrl.Url -ne $null) {
            $jiraAbsoluteUrl = $projectInformationListItem.FieldValues.JiraAbsoluteUrl.Url + ", " + $projectInformationListItem.FieldValues.JiraAbsoluteUrl.Description;
        }
        else {
            $jiraAbsoluteUrl = ""
        }
    }
    $user = (Get-ADUser $_.LoginName | select UserPrincipalName).UserPrincipalName
    $values = @{
        "Title"                   = $_.ProjektCode;
        "PlanMinuten"             = $_.PlanMinuten;
        "IstMinuten"              = $_.IstMinuten;
        "WochenDatum"             = $_.WochenDatum.Substring(0, $_.WochenDatum.IndexOf(" ")) + " 12:00";
        "ProjectSpaceRelativeUrl" = $projectSpaceRelativeUrl;
        "JiraAbsoluteUrl"         = $jiraAbsoluteUrl;
        "User"                    = $user;
    }
    Add-PnPListItem -List $RessourcenPlanDatenList -Values $values -ContentType Element
}
