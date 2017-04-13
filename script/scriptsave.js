

ko.bindingHandlers.autoComplete = {
    // Only using init event because the Jquery.UI.AutoComplete widget will take care of the update callbacks
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        // { selected: mySelectedOptionObservable, options: myArrayOfLabelValuePairs }
        console.log(valueAccessor());
        var settings = valueAccessor();

        var selectedOption = settings.selected;
        var options = settings.options;

        var updateElementValueWithLabel = function (event, ui) {
            // Stop the default behavior
            event.preventDefault();

            // Update the value of the html element with the label
            // of the activated option in the list (ui.item)
            $(element).val(ui.item.label);

            // Update our SelectedOption observable
            if(typeof ui.item !== "undefined") {
                // ui.item - label|value|...
                selectedOption(ui.item);
            }
        };

        $(element).autocomplete({
            source: options,
            select: function (event, ui) {
                updateElementValueWithLabel(event, ui);
            },
            focus: function (event, ui) {
                updateElementValueWithLabel(event, ui);
            },
            change: function (event, ui) {
                updateElementValueWithLabel(event, ui);
            }
        });
    }
};


// Array with original data
var remoteData = [{
    name: 'Ernie',
    id: 1
}, {
    name: 'Bert',
    id: 2
}, {
    name: 'Germaine',
    id: 3
}, {
    name: 'Sally',
    id: 4
}, {
    name: 'Daisy',
    id: 5
}, {
    name: 'Peaches',
    id: 6
}];

function ViewModel() {
    var self = this;

    self.users = remoteData;

    self.selectedOption = ko.observable('');
    self.options = self.users.map(function (element) {
        // JQuery.UI.AutoComplete expects label & value properties, but we can add our own
        return {
            label: element.name,
            value: element.id,
            // This way we still have acess to the original object
            object: element
        };
    });
}


    ko.applyBindings(new ViewModel());

