// Function to dangerously set the HTML of an element
function setHTMLFromFile(filePath, elementId) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch file: ${response.statusText}`);
            }
            return response.text();
        })
        .then(content => {
            // DANGEROUS: Directly setting innerHTML without sanitization
            document.getElementById(elementId).innerHTML = content;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

//Writing samples
setHTMLFromFile('samples/html-format-samples/CHARACTERDESIGNDOCUMENT_Coinhead_RoUR.txt', 'CHARACTERDESIGNDOCUMENT_Coinhead_RoUR_Content');
setHTMLFromFile('samples/html-format-samples/CHARACTERDESIGNDOCUMENT_Persephone_RoUR.txt', 'CHARACTERDESIGNDOCUMENT_Persephone_RoUR_Content');
setHTMLFromFile('samples/html-format-samples/LOCATIONBIO_TheShatteredCombine.txt', 'LOCATIONBIO_TheShatteredCombine_Content');
setHTMLFromFile('samples/html-format-samples/SCRIPT_Apartment(SpecPilot).txt', 'SCRIPT_Apartment(SpecPilot)_Content');
setHTMLFromFile('samples/html-format-samples/SCRIPT_DreamsInc.txt', 'SCRIPT_DreamsInc_Content');

//Game Design samples
setHTMLFromFile('samples/html-format-samples/LEVELDESIGNDOCUMENT_ExaudMeetsLobby.txt', 'LEVELDESIGNDOCUMENT_ExaudMeetsLobby_Content');
setHTMLFromFile('samples/html-format-samples/NARRATIVESYSTEMPROPOSAL_SegueSystem.txt', 'NARRATIVESYSTEMPROPOSAL_SegueSystem_Content');
setHTMLFromFile('samples/html-format-samples/QUESTDESIGNDOCUMENT_BloodBoundByLooseEnds_GTAQuest.txt', 'QUESTDESIGNDOCUMENT_BloodBoundByLooseEnds_GTAQuest_Content');
setHTMLFromFile('samples/html-format-samples/TECHNICALDESIGNDOCUMENT_Spinshot.txt', 'TECHNICALDESIGNDOCUMENT_Spinshot_Content');
