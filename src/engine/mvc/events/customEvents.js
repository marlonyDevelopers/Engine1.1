
//por ahora no se usa, ver de borrarlo

function OnConnectionOkCustomEvent() {
    var evt = new CustomEvent("CONNECTION_OK");
    window.dispatchEvent(evt);
}


