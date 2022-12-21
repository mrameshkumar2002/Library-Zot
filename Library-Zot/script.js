
function hello() {

  var xmlhttp = new XMLHttpRequest();
  var url = "https://openlibrary.org/search/authors.json?q=" + $('#inputn').val();

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      console.log(data);
      $('#example').DataTable().clear().destroy();
      $('#example').DataTable({
        "data": data.docs,
        "columns": [
          { "data": "key" },
          { "data": "name" },
          { data: function (row) {
            if ( row.birth_date == undefined ) {
                return "-";
            }else{return row.birth_date}
            }},
            { data: function (row) {
              if ( row.top_work == undefined ) {
                  return "-";
              }else{return row.top_work}
              }},
            {
              data: function (row) {
                return (
                  "<p onClick=getPopUpData('" +
                  row.key +
                  "') data-bs-toggle='modal' data-bs-target='#my-modal'>" +
                  row._version_ +
                  "</p>"
                );
              },
            },
        ]
      });

    }
  }
}

function getPopUpData(key) {
  fetch("https://openlibrary.org/authors/"+key+".json")
    .then((a) => a.json())
    .then((response) => {
      console.log(response);
      if(response.id== undefined){
        document.getElementById("data4").innerHTML = "-";
      }else{
        document.getElementById("data4").innerHTML = response.id;
      }
      document.getElementById("data1").innerHTML = response.name ;
      document.getElementById("data2").innerHTML = response.revision;
      document.getElementById("data3").innerHTML = response.last_modified.value ;
      if(response.title == undefined){
        document.getElementById("data5").innerHTML = "-";    
      }else{
        document.getElementById("data5").innerHTML = response.title;
      }
      
      
    });
}








// function hello() {

//   var xmlhttp = new XMLHttpRequest();
//   var url = "https://openlibrary.org/search/authors.json?q=" + document.getElementById('inputn').value + "&mode=ebooks";
//   var aurthortitle = "https://openlibrary.org/authors/OL23919A.json";


//   xmlhttp.open("GET", url, true);
//   xmlhttp.send();
//   xmlhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       var data = JSON.parse(this.responseText);
//       $('#example').DataTable().clear().destroy();
//       $('#example').DataTable({
//         "data": data.docs,
//         "columns": [
//           { "data": "key" },
//           { "data": "name" },
//           { "data": "type", 
//           render:function (data,type,row) {
//             return'<a href="#">'+data+'</a>';
//           }},
//           { "data": "work_count" }
//         ]
//       });

//     }
//   }
// }

function show(){
	$(document).ready(function(){
		$("#myModal").modal('show');
	});
  }