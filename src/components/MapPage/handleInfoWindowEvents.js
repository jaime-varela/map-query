import {infoWinClassNames} from './constants'

export default (pid) => {
    var coll = document.getElementById("infoWindowCollapsible"+pid);
    if(coll == null) return;
    coll.addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
}