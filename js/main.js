$.ajax({
    url: "/listRootDir"
}).then(function(data) {
    console.log(data)
    data = JSON.parse(data);
    $.each(data, function(index) {
        console.log(data[index])
        $('#people').prepend('<li className="row">' +
        '<div className="col-md-3">' +
          '<strong> <a href="#" onClick="getFile(\''+data[index].name+'\')">' + data[index].name + '</a></strong>' +
          '<div>' + data[index].createdTime + '</div>' +
          '<div>' + data[index].updatedTime + '</div>' +
        '</div>' +
      '</li><br/>')
    })

});

function getFile(fname){
    $('#frame').attr('src', '/getIndex/'+fname);
    console.log(fname)
}


