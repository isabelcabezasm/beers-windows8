(function () {
    "use strict";
    var _currentItem = null;
    WinJS.UI.Pages.define("/pages/itemDetail/itemDetail.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var item = options && options.item ? Data.resolveItemReference(options.item) : Data.items.getAt(0);
            _currentItem = item;
            element.querySelector(".titlearea .pagetitle").textContent = Data.getGroupTitle(item.group);
            element.querySelector("article .item-title").textContent = item.title;
            element.querySelector("article .item-subtitle").textContent = item.subtitle;
            element.querySelector("article .item-alcohol").textContent = item.ABV;
            element.querySelector("article .item-image").src = item.backgroundImage;
            element.querySelector("article .item-image").alt = item.subtitle;
            //element.querySelector("article .item-content").innerHTML = item.content;
            //element.querySelector(".content").focus();


            // Display features list
            var features = element.querySelector("article .item-features");
            for (var i = 0; i < item.features.length; i++) {
                var feature = document.createElement("h2");
                feature.textContent = item.features[i];
                feature.className = "feature";
                features.appendChild(feature);
            }

            // Display cooking description
            element.querySelector("article .item-description").textContent = item.description;

        }
    });



    var dataTransferManager = Windows.ApplicationModel.DataTransfer.
           DataTransferManager.getForCurrentView();
    dataTransferManager.addEventListener("datarequested", dataRequested);


    function dataRequested(e) {

        var request = e.request;

        try {
            request.data.properties.title = _currentItem.title;
            request.data.properties.description = _currentItem.subtitle;

            // Compartir contenido: características y descripción de la cerveza.
            var beer = "CARACTERÍSTICAS: \r\n";
            _currentItem.features.forEach(function (feature) {
                beer += feature + "\r\n";
            });
            beer += ("\r\nDESCRIPCIÓN: \r\n" + _currentItem.description);
            //añadir texto en el dataPackage
            request.data.setText(beer);

            //Coger la uri de la imagen de la cerveza
            var image = document.querySelector(".item-image");
            var uri = image.getAttribute("src");
            if (uri.indexOf("http://") == 0)
                uri = new Windows.Foundation.Uri(image.src); // Remote image
            else
                uri = new Windows.Foundation.Uri("ms-appx:///" + image.getAttribute("src")); // Local images

            //compartir la imagen de la cerveza como thumbnail
            var reference = Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(uri);
            request.data.properties.thumbnail = reference;
        }
        catch (ex) {
            request.data.properties.title = "Error " + ex.message;
        }

    }



})();
