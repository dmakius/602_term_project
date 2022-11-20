function startPage(){
    $.ajax({
        type: "GET",
        url: '/Score',
        success: function(response){
            console.log(response);
             let list = document.getElementById("myList");
              
             response.forEach((item)=>{
                  var div = document.createElement("div");
                  div.id =`${item._id}`;
                  div.innerHTML = `
                    <div class="row">
                        <div class="col">
                                <label for="username"><b>NAME:</b></label>
                                <input type='text' name="username" id="username_${item._id}" value=${item.name}>
                                <br><br>
                                <label for="score"><b>SCORE:</b></label>
                                <input type='text' name="score" id="score_${item._id}" value=${item.score}>   
                        </div>
                        <div class="col"></div>
                        <div class="col">
                            <button onclick="updateID('${item._id}')" type="button" class='edit btn btn-info'>EDIT</button>
                            <button onclick="deleteID('${item._id}')" type="button" class='delete btn btn-danger'>DELETE</button>
                        </div>
                    </div>
                    <hr>`;
                  document.getElementById("myList").appendChild(div);
              });
        
        }
    });
    
}
startPage();
function updateID(id){
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

function deleteID(id){
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

            var el = document.getElementById(response.scoreId);
            el.remove();
        },
        error: function(xhr) {
            console.log(xhr);
         }
    });
}
