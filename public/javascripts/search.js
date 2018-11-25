function enterSearch(event){
    if(event.keyCode === 13){
        event.preventDefault(); // Ensure it is only this code that rusn

        search()
    }
}

function search(){
    var searchTerm = $("#search-input").val()
    if(searchTerm.length < 3){
        alert("Search term should be atleast 3 characters long");
    }else{
        $.get("http://localhost:3000/search?term=" + searchTerm, function(data, status, xhr){
            var result = data.data
            var template = "";
            for(var i=0; i<result.length; i++){
                template += `<tr><td>${result[i]._score}</td><td>${result[i].value}</td></tr>`
            }
            if(template){
                $("#table-body").html(template);
            }
        })
    }
}