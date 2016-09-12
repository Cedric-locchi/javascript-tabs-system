var Tabs = (function () {

    var Tab = {};

    /**
     * loadHtmlTemplate:
     *
     * @description permet de charger dynamiquement des templates html
     *
     * @param element string element sur le quelle on injecte le template
     * @param url string url du template a charger
     */
    Tab.loadHtmlTemplate = function (element, url) {

        var req = new XMLHttpRequest();
        req.open("GET", url, false);
        req.send(null);

        element.innerHTML = req.responseText;
    };

    /**
     * getActiveTabs:
     *
     * @description permet de modifier la class active des liens
     *
     * @param element string selecteur css
     * @param active string class active css
     */
    Tab.getActiveTabs = function (element, active) {
        element.classList.add(active);
    };


    /**
     * getActiveContent:
     *
     * @description permet de mettre en place l'activation des tabs
     *
     * @param element string selecteur parent
     * @param attribute string href pour recupéré l'id du template
     * @param active string class active à rajouter
     */
    Tab.getActiveContent = function (element, attribute, active) {
        var select = element.querySelector(attribute);
        select.classList.add(active);
        Tab.loadHtmlTemplate(select, 'templates/' + attribute.substr(1) + '.html');
    };

    /**
     * removeClass:
     *
     * @description permet de supprimer la classe active d'un element
     *
     * @param element conteneur principal
     * @param css selecteur css a selectioner
     * @param active class active a supprimer
     */
    Tab.removeClass = function (element, css, active) {
        element.querySelector(css).classList.remove(active);
    };

    /**
     * getClassContain:
     *
     * @description verifie sur les tabs on la class active
     *
     * @param tabs string tab aillant la class active
     * @param activeLink string class css active
     *
     * @returns {boolean}
     */
    Tab.getClassContain = function (tabs, activeLink) {
        return tabs.classList.contains(activeLink)
    };

    /**
     * renderTabs:
     *
     * @description lancement du systeme de tabs
     *
     * @param element string element container des tabs et du contenu
     * @param cssLink string class css des liens
     * @param activeLink string class css active des liens
     * @param cssTabs string class css du contenu
     * @param activeTabs string class css active du contenu
     * @param attribute string id a recupéré pour charger le contenue
     * @param tabs string element actif au moment du click
     */
    Tab.renderTabs = function (element, cssLink, activeLink, cssTabs, activeTabs, attribute, tabs) {
        if (!Tab.getClassContain(tabs, activeLink)) {
            Tab.removeClass(element, cssLink, activeLink);
            Tab.removeClass(element, cssTabs, activeTabs);
            Tab.getActiveContent(element, attribute, activeTabs);
            Tab.getActiveTabs(tabs, activeLink);
        }
    };

    /**
     * eventClickHandler:
     *
     * @description permet de gerer l'event click
     *
     * @param element string element a cliquer
     */
    Tab.eventClickHandler = function (element) {
        element.addEventListener('click', function () {
            var div = this.parentNode.parentNode;
            Tabs.renderTabs(div, '.link-item.link-active', 'link-active', '.tabs-item.tabs-active', 'tabs-active', this.getAttribute('href'), this);
        });
    };

    /**
     * getActiveOnLoad:
     *
     * @description permet de charger le template de base au demarage
     *
     * @param element selecteur a atacher a l'event click
     */
    Tab.getActiveOnLoad = function (element) {
        var active = document.querySelector('.link-active');
        var content = document.querySelector('.tabs-content .tabs-item.tabs-active');
        Tab.loadHtmlTemplate(content, 'templates/' + active.getAttribute('href').substr(1) + '.html');
        Tab.eventClickHandler(element);
    };


    return Tab;

})();