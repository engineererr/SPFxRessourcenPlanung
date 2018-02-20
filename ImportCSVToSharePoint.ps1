Connect-PnPOnline -Url "https://cloudfighters.sharepoint.com/sites/pizzameeting"
cd d:
Remove-PnPList "RessourcenPlanDaten"
New-PnPList -Title "RessourcenPlanDaten" -Template GenericList
$l = Get-PnPList -Identity "RessourcenPlanDaten"

Add-PnPField -List $l -DisplayName "ProjektCode" -InternalName "ProjektCode" -Type Text -AddToDefaultView
Add-PnPField -List $l -DisplayName "PlanMinuten" -InternalName "PlanMinuten" -Type Number -AddToDefaultView
Add-PnPField -List $l -DisplayName "IstMinuten" -InternalName "IstMinuten" -Type Number -AddToDefaultView
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
		</Field>' -List $l -AddToDefaultView
$import = Import-Csv -Delimiter "," -Path "RessourcenPlanDaten.csv"

$import | % {

    #Loginname, ProjektCode, PlanMinuten, IstMinuten, WochenDatum
    $values = @{
        "Title"       = $_.LoginName;
        "ProjektCode" = $_.ProjektCode;
        "PlanMinuten" = $_.PlanMinuten;
        "IstMinuten"  = $_.IstMinuten;
        "WochenDatum" = $_.WochenDatum.Substring(0, $_.WochenDatum.IndexOf(" "));
    }
    Add-PnPListItem -List $l -Values $values -ContentType Item
}

#file https://cloudfighters.sharepoint.com/sites/PizzaMeeting/WeeklyResourcePlanningData/RessourcenPlanDaten.csv
