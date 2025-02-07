function fetchData(callback) {
    setTimeout(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                callback(null, response.data.map(user => user.name));
            })
            .catch(error => {
                callback(error.message, null);
            });
    }, 2000);
}

function errorHandler(error , data){
    if(error){
        console.log("Cannot fetch data \n Error : " , error);
    }else{
        console.log("Fetched Data Successfully :\n Usernames Array" , data);
    }
}

fetchData(errorHandler);