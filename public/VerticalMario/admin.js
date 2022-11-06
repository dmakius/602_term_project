function startPage(){
    $.ajax({
        type: "GET",
        url: '/GetScores',
        success: function(response){
            console.log(response);
             let list = document.getElementById("myList");
              
             response.forEach((item)=>{
                  var div = document.createElement("div");
                  div.id =`${item._id}`;
                  div.innerHTML = `
                  <div class="row">
                  <div class="col">
                    <form action = '/UpdateScores'>
                        <label for="username"><b>NAME:</b></label>
                        <input type='text' name="username" id="username_${item._id}" value=${item.name}>
                        <br><br>
                        <label for="score"><b>SCORE:</b></label>
                        <input type='text' name="score" id="score_${item._id}" value=${item.score}>
                  
                       
                  </div>
                  <div class="col">
                      <button onclick="updateID('${item._id}')" type="button" class='edit btn btn-info'>EDIT</button>
                      <button onclick="deleteID('${item._id}')" type="button" class='delete btn btn-danger'>DELETE</button>
                  </div>
                  </form>
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
        url: '/UpdateScore',
        data: {
            id: id,
            score: score,
            username: username  
        },
        async:false,
        success: function(response){
            console.log("RESONSE FROM SERVER");
            // console.log(response);
            // const element = response.id;
            // var el = document.getElementById(response.id);
            // el.remove();
        },
        error: function(xhr) {
        //handle error
         }
    });
}

function deleteID(id){
    $.ajax({
        type: "POST",
        url: '/DeleteScore',
        data: {id: id},
        async:false,
        success: function(response){
            console.log("RESONSE FROM SERVER");
            console.log(response);
            const element = response.id;
            var el = document.getElementById(response.id);
            el.remove();
        },
        error: function(xhr) {
        //handle error
         }
    });
}
