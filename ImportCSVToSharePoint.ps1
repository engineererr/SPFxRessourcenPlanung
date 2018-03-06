#Install-Module AzureAD not necessary. we will get information from local AD
#$admin = Connect-PnPOnline -Url "https://cloudfighters-admin.sharepoint.com"
#Get-PnPUserProfileProperty -Account <String[]>
#                           [-Connection <SPOnlineConnection>]

#install ad module from here: https://www.microsoft.com/en-us/download/details.aspx?id=45520
#Get-ADUser blalblal
Connect-PnPOnline -Url "https://cloudfighters.sharepoint.com/sites/pizzameeting"
cd D:\AVexcluded\WeeklyResourcePlanning
Remove-PnPList "RessourcenPlanDaten" -Force
New-PnPList -Title "RessourcenPlanDaten" -Template GenericList

$RessourcenPlanDatenList = Get-PnPList -Identity "RessourcenPlanDaten"
$projectInformationListItems = Get-PnPListItem -List "ProjectInformation" -Fields "Title", "ProjectSpaceRelativeUrl", "JiraAbsoluteUrl"

Add-PnPField -List $RessourcenPlanDatenList -DisplayName "ProjektCode" -InternalName "ProjektCode" -Type Text -AddToDefaultView
Add-PnPField -List $RessourcenPlanDatenList -DisplayName "PlanMinuten" -InternalName "PlanMinuten" -Type Number -AddToDefaultView
Add-PnPField -List $RessourcenPlanDatenList -DisplayName "IstMinuten" -InternalName "IstMinuten" -Type Number -AddToDefaultView
Add-PnPField -List $RessourcenPlanDatenList -DisplayName "ProjectSpaceRelativeUrl" -InternalName "ProjectSpaceRelativeUrl" -Type URL -AddToDefaultView
Add-PnPField -List $RessourcenPlanDatenList -DisplayName "JiraAbsoluteUrl" -InternalName "JiraAbsoluteUrl" -Type URL -AddToDefaultView

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
$import = Import-Csv -Delimiter "," -Path "RessourcenPlanDaten.csv"

$import | % {
    $projektCode = $_.ProjektCode
    $projectInformationListItem = $projectInformationListItems | ? {$_.FieldValues.Title -eq $projektCode}
    $values = @{
        "Title"                   = $_.LoginName;
        "ProjektCode"             = $_.ProjektCode;
        "PlanMinuten"             = $_.PlanMinuten;
        "IstMinuten"              = $_.IstMinuten;
        "WochenDatum"             = $_.WochenDatum.Substring(0, $_.WochenDatum.IndexOf(" ")) + " 12:00";
        "ProjectSpaceRelativeUrl" = $projectInformationListItem.FieldValues.ProjectSpaceRelativeUrl.Url + ", " + $projectInformationListItem.FieldValues.ProjectSpaceRelativeUrl.Description;
        "JiraAbsoluteUrl"         = $projectInformationListItem.FieldValues.JiraAbsoluteUrl.Url + ", " + $projectInformationListItem.FieldValues.JiraAbsoluteUrl.Description;

    }
    Add-PnPListItem -List $RessourcenPlanDatenList -Values $values -ContentType Item

}
