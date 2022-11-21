export default class Admin{
    static updateID(id){
        console.log("Updating ID:" + id);
        var username = $('#username_'+ id).val();
        var score = $('#score_'+ id).val();
        $.ajax({
            type: "POST",
            url: '/Score/Update',
            data: {
                id: id,
                score: score,
                username: username  
            },
            async:false,
            success: function(response){
                console.log(response);
                console.log("RESONSE FROM SERVER");
                var div = document.createElement("div");
                div.id= response.scoreId;
                div.innerHTML = `
                    <div class="alert ${response.flash_type}">
                    ${response.message}.
                    </div>`
               $("#myList").prepend(div);
                console.log(div);
                
                $('#' + response.scoreId).fadeOut(2000);
    
            },
            error: function(xhr) {
              console.log(xhr);
             }
        });
    }

    static deleteID(id){
        $.ajax({
            type: "POST",
            url: '/Score/Delete',
            data: {id: id},
            async:false,
            success: function(response){
                console.log("RESONSE FROM SERVER");
                console.log(response);
    
                var div = document.createElement("div");
                div.id= 'd'+ response.scoreId;
                div.innerHTML = `
                    <div class="alert ${response.flash_type}">
                    ${response.message}.
                    </div>`
    
               $("#myList").prepend(div);
    
                $('#d' + response.scoreId).fadeOut(2000);
    
                var el = document.getElementById("div_"+response.scoreId);
                el.remove();
            },
                error: function(xhr) {
                console.log(xhr);
             }
        });
    }
    
}
