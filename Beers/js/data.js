(function () {
    "use strict";

    var list = new WinJS.Binding.List();
    var groupedItems = list.createGrouped(
        function groupKeySelector(item) { return item.group; },
        function groupDataSelector(item) { return getGroupByItem(item.group); }
    );

    var groups = new WinJS.Binding.List();
    generateGroups().forEach(function (group) {
        groups.push(group);
    });


    //// TODO: Replace the data with your real data.
    //// You can add data from asynchronous sources whenever it becomes available.
    //generateSampleData().forEach(function (item) {
    //    list.push(item);
    //});

    //WinJS.xhr({ url: "../data/beers.txt" })
    WinJS.xhr({ url: "data/beers.txt" })
    .then(function (xhr) {
        var items = JSON.parse(xhr.responseText);

        // Add the items to the WinJS.Binding.List
        items.forEach(function (item) {
            list.push(item);
        });
    });

    WinJS.Namespace.define("Data", {
        items: groupedItems,
        groups: groupedItems.groups,
        getItemReference: getItemReference,
        getItemsFromGroup: getItemsFromGroup,
        resolveGroupReference: resolveGroupReference,
        resolveItemReference: resolveItemReference,
        getGroupTitle: getGroupTitle
    });

    // Get a reference for an item, using the group key and item title as a
    // unique reference to the item that can be easily serialized.
    function getItemReference(item) {
        return [item.group.key, item.title];
    }

    // This function returns a WinJS.Binding.List containing only the items
    // that belong to the provided group.
    function getItemsFromGroup(group) {
        return list.createFiltered(function (item)
        {
            return item.group === group.key;
        });
    }

    function getGroupTitle(groupKey)
    {
        for (var i = 0; i < groups.length; i++) {
            if (groups.getAt(i).key === groupKey) {
                return groups.getAt(i).title;
            }
        }
    }
    // Get the unique group corresponding to the provided group key.
    function resolveGroupReference(key) {
        for (var i = 0; i < groupedItems.groups.length; i++) {
            if (groupedItems.groups.getAt(i).key === key) {
                return groupedItems.groups.getAt(i);
            }
        }
    }

    // Get a unique item from the provided string array, which should contain a
    // group key and an item title.
    function resolveItemReference(reference) {
        for (var i = 0; i < groupedItems.length; i++) {
            var item = groupedItems.getAt(i);
            if (item.group.key === reference[0] && item.title === reference[1]) {
                return item;
            }
        }
    }

    function getGroupByItem(groupkey)
    {
        for (var i = 0; i < groups.length; i++)
            {
            if (groups.getAt(i).key === groupkey) {
                return groups.getAt(i);
                }
            }
    }

    // Returns an array of sample data that can be added to the application's
    // data list. 
    function generateGroups() {
       
        // Each of these sample groups must have a unique key to be displayed
        // separately.
        var beerGroups = [
          {
              key: 1, title: "Catalanas", shortTitle: "Catalanas",
              backgroundImage: "images/catalana/catalan_group_detail.png",
              headerImage: "images/catalana/Catalanas_group_header.png",
              description: "Dentro del territorio español la cerveza catalana disfruta de un lugar privilegiado por su variedad, fuerza y proyección internacional. De un tiempo a esta parte la cerveza catalana se ha convertido en un referente a nivel nacional e internacional. Disfrutar de sus variedades es una práctica obligada para todo amante del amargo lúpulo, mientras que para aquellos no iniciados, es todo un descubrimiento. Con todo, la irrupción de productores de cerveza artesana en los últimos años ha proporcionado una mayor variedad y calidad."
          },

          {
              key: 2, title: "Escocesas", shortTitle: "Escocesas",
              backgroundImage: "images/escocesa/escocia_group_detail.png",
              headerImage: "images/escocesa/Escocesas_group_header.png",
              description: "La Scottish ale es el nombre por el que se define la cerveza elaborada en Escocia. Históricamente, en Escocia era imposible de cultivar lúpulo que estuviese mínimamente bien; la necesidad de importar lúpulo y el clima frío de Escocia produjo una cerveza en que la malta era predominante, con la fermentación de la levadura más limpia que la cerveza Inglesa. Originalmente, el estilo de las cervezas escocesas estaba hecho con malta ligeramente marrón, mirto de los pantanos en lugar de lúpulo para la amargura. Después los elaboradores usaron más malta tostada y cebada sin maltear para el color. La cerveza escocesa moderna tiene menos amargura, y un sabor más dulce o tal vez afrutado debido al mayor uso de la malta. Algunas pueden tener un gusto ligeramente ahumado."
          },
          {
              key: 3, title: "Americanas", shortTitle: "Americanas",
              backgroundImage: "images/americana/eeuu_group_detail.png",
              headerImage: "images/americana/Americanas_group_header.png",
              description: "Hace unos cuantos años que las cervezas estadounidenses comenzaron a mejor la calidad por la cual anteriormente eran cuestionadas. Si bien, las publicidades las presentaban efervescentes y coloridas, eran más bien suaves y sobrias. Las industrias cerveceras, sobre todo las de San Francisco, como la Anchor Brewery productora de las marcas Steam Beer y Liberty Ale han demostrado que la cerveza Estadounidense puede alcanzar grandes logros. Si bien hay quienes prefieren cervezas flojas, lo más típico es que los consumidores adhieran a cervezas más consistentes. Así por ejemplo las marcas Estadounidenses como la Boont Amber y la Red Tail Ale."
          },
          {
              key: 4, title: "Belgas", shortTitle: "Belgas",
              backgroundImage: "images/belga/belgica_group_detail.png",
              headerImage: "images/belga/Belgas_group_header.png",
              description: "No hay duda de que Bélgica es el destino cervecero por excelencia. ¿Qué otro país ofrece más de 450 variedades de cerveza de tan distintos gustos y sabores? Las nuevas tecnologías, junto con un gusto por lo tradicional, confieren a la cerveza belga un carácter único, que nunca defrauda al visitante. El principal reclamo de la industria cervecera belga es doble: las clásicas cervezas pils, elaboradas en cervecerías cada vez más sofisticadas y que tienen una gran demanda; y una serie de cervezas más especiales, como las trapistas, Gueuze, Kriek, cervezas blancas… Las cervezas en Bélgica son como los vinos en Francia. Utilizar la copa adecuada no es sólo una tradición, sino una obligación. De hecho, en los bares belgas con más de 300 tipos de cerveza es normal que haya también 300 tipos de copas distintas, una para cada variedad.  "
          },
          {
              key: 5, title: "Inglesas", shortTitle: "Inglesas",
              backgroundImage: "images/Inglesa/inglesa_group_detail.png",
              headerImage: "images/Inglesa/french_group_header.png",
              description: "Tradicionalmente ligado a las Islas Británicas es el estilo ALE. Son cervezas de fermentación alta en caliente (de 15 a 25 grados), que proporciona al producto aromas afrutados y gran variedad de tonos y sabores. Es un término inglés que define a la cerveza de fermentación alta. (Mild, Bitter, Brown, Indian Pale, Light, Old, Scotch, ... ) En las versiones originales de las cervezas, las Ales fermentan a temperaturas más altas que las Lagers, y utilizan un fermento que trabaja en la zona superior de la wort o mosto. Fermentando en temperaturas más altas, la levadura de la cerveza Ale crea los compuestos orgánicos que imparten un gusto distinto a la cerveza. En general, las cervezas inglesas pueden diferenciarse de las Lagers por este gusto y por una mayor complejidad del carácter. Posee un extracto primitivo por encima de 12,5%, alta fermentación y contenido de alcohol que varía de medio a alto. "
          },
          {
              key: 6, title: "Alemanas", shortTitle: "Alemanas",
              backgroundImage: "images/alemana/alemania_group_detail.png",
              headerImage: "images/alemana/Alemanas_group_header.png",
              description: "Alemania tiene la fama de ser un país consumidor de cerveza, siendo por tradición uno de los países más cerveceros de Europa. Es así con sus 131,7 litros por persona y año (2005) ocupa el tercer puesto en Europa, después de la República Checa e Irlanda."
          }
        ];
        return beerGroups;
    }
})();
