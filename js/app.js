$(document).ready(function(){

    $(document).on("mouseenter", ".employee-left-container .employee-aside-info", function(e){
        var bubble = document.createElement("span");
        $(bubble).addClass("bubble");
        var xT = e.offsetX;
        var yT = e.offsetY;
        bubble.style.left = xT + "px";
        bubble.style.right = yT + "px";
        var size = Math.random() * 50;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";
        $(".employee-left-container .employee-aside-info").append(bubble);

        setTimeout(function(){
            bubble.remove();
        }, 4000);
    });


    var a = "website.old.html";
    var nameSplit = a.split(".");
    
    var name = a.split(".")[0];
    var name1 = a.split(".")[1];
    var res = name1.charAt(0);

    console.log(nameSplit)
    console.log(name);
    console.log(name1);
    console.log(res+ '.'+name);

    nameSplit.pop();    
    var name = nameSplit.join(".");
});
