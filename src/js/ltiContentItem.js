// Copyright (c) 2018 Atlas Systems, Inc.
// Ares LTI Content Item functionality

$(document).ready(function () {
    //Check if page is loaded with the AresLTI container from the Ares WebService
    if (window.name == 'AresLtiContentSelection_Web') {

		//Attempt to add the 'Select' button to Ares items with delayed retries
        var maxAttempts = 30;   //3 seconds overall
        var p = Promise.reject();

        for (var i = 0; i < maxAttempts; i++) {
            p = p.catch(attempt).then(test).catch(rejectDelay);
        }
    }
});

function ChangeToSingleColumnLayout() {
    //Remove the left sidebar menu
    $("utility").hide();

    //Change to single column layout
    $("body").attr('id', 'type-a');
}


function addContentItemSelectionButtons() {

    var result = false;

    //Get all of the rows of the item table
    var itemTableRows = $('#ItemTable').find('tr');

    if (itemTableRows.length == 0) {
        //Table exists, but no rows to select
        result = true;
    }
    else {
        $(itemTableRows).each(function (index) {
            //Look for the first visible cell of the row
            var firstCell = $(this).find('td:visible:first');
            //Add a select button
            var itemId = $(firstCell).closest('[data-itemid]').attr('data-itemid');
            if (itemId > 0) {
                var cell = $(firstCell).prepend(createSelectButton(itemId));
                result = true;
            }
        })
    }
    
    return result;
}

function createSelectButton(itemId) {
    //Create a select button for a given item id
    var selectButton = $('<input/>').attr({
        type: 'button',
        class: 'ltiItemSelection',
        id: 'ltiSelectItem-' + itemId,
        value: 'Select'
    }).click(function (e) {
        e.preventDefault();
        selectLtiItem(itemId);
    });

    return selectButton
}

function selectLtiItem(itemId) {
    window.parent.postMessage(itemId, '*');
}

//This approach to js retry with delay taken from StackOverflow https://stackoverflow.com/a/38225011
function rejectDelay(reason) {
    return new Promise(function(resolve, reject) {
        setTimeout(reject.bind(null, reason), 100); 
    });
}

function attempt() {
    var success = false;

    success = addContentItemSelectionButtons();

    if (success) {
        ChangeToSingleColumnLayout();
    }

    return success;
}

function test(val) {
    if (!val) {
        throw val;
    }
    
    return true;
}