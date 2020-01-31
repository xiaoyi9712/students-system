function ajax(json){

    if(window.XMLHttpRequest){
        var ajax = new XMLHttpRequest();
    }
    else{
        var ajax = new ActiveXObject( "Microsoft.XMLHTTP" );
    }

    if(json.type=='get'){
        ajax.open('get',json.url+'?'+JsonToString(json.data),true);
        ajax.send();
    }
    else if(json.type=='post'){
        ajax.open('post',json.url,true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(JsonToString(json.data));
    }
    
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status>=200 && ajax.status<300 || ajax.status == 304){
                json.success(ajax.responseText);

            }
            else{
                json.error && json.error();
            }
        };
    };


    function JsonToString(json){
        var arr = [];
        for(var i in json){
            arr.push(i+'='+json[i]);
        };
        return arr.join('&');
    }
}