var Confirmer = function(){

    this.question = function(q) {
        var r = confirm(q)
        if (r==true)
        {
            return true;
        }
        else
        {
            return false;
        }
    };
}

var conf = new Confirmer();
