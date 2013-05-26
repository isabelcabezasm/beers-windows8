// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var appdata = Windows.Storage.ApplicationData;

    WinJS.UI.Pages.define("/pages/settingsContract/preferences.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            var toggle = document.querySelector("#comerciales").winControl;

            var comerciales = appdata.current.roamingSettings.values["comerciales"];
            comerciales = !comerciales ? false : comerciales; // false if value doesn’t exist
            toggle.checked = comerciales;

            toggle.addEventListener("change", function (e) {
                appdata.current.roamingSettings.values["comerciales"] = e.target.winControl.checked;
            });

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
