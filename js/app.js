var links = document.querySelectorAll('.link-item');

for (var i = 0; i < links.length; i++) {
    Tabs.getActiveOnLoad(links[i]);
}


