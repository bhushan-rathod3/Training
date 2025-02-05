document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getSimultaneousData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);

function getTodos() {
  axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5")
  .then((data) => showOutput(data))
  .catch((err) => console.error(err));
}


function addTodo() {
  axios.post("https://jsonplaceholder.typicode.com/todos",{
    title: "New Todo",
    completed : false
  }).then(res => showOutput(res))
  .catch(err => console.error(err));
}

function updateTodo() {
  axios.patch("https://jsonplaceholder.typicode.com/todos/1" , {
    id : 1 ,
    title : "New Todo" , 
    completed : false ,
    isPatch : true
  }).then(res => showOutput(res))
  .catch(err => console.log(err));
}

function removeTodo() {
  axios.delete("https://jsonplaceholder.typicode.com/todos/1")
  .then(res => showOutput(res))
  .catch(err => console.log(err));
}

function getSimultaneousData() {
  axios.all([
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
    axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5")
  ])
  .then(axios.spread((todos , posts) => showOutput(posts)))
  .catch(err => console.error(err));
}

function customHeaders() {
  const config = {
    headers : 
    {'content-type' : 'app/json',
    Authorization: "token" }
  }

  axios.post("https://jsonplaceholder.typicode.com/todos",{
    title: "New Todo",
    completed : false
  } , config ).then(res => showOutput(res))
  .catch(err => console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method : 'post' ,
    url : "https://jsonplaceholder.typicode.com/todos" ,
    data : {
      title : "Hello World"
    },
    transformResponse : axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  };

  axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios.get("https://jsonplaceholder.typicode.com/todoss")
  .then((data) => showOutput(data))
  .catch((err) => {
    if(err.response){
      console.log(err.response.data);
      console.log(err.response.headers);
      console.log(err.response.status);
    }

    if(err.response.status === 404){
      console.log("Page not Found");
    }
    else if (err.request){
      console.log(err.request);
    }
    else{
      console.log(err.message);
    }
  });
}

function cancelToken() {
  const source = axios.CancelToken.source();

  axios.get("https://jsonplaceholder.typicode.com/todoss" , {
    cancelToken : source.token
  })
  .then(res => showOutput(res))
  .catch(thrown => {
      if(axios.isCancel(thrown)){
        console.log("request cancelled ", thrown.message);
      }    
  });

  if(true){
    source.cancel("Request Cancelled");
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config => {
    console.log(`
      ${config.method.toUpperCase()} request is sent to ${config.url} on ${new Date().getTime()}`);

    return config;
  } , error => {return Promise.reject(error)});

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL : "https://jsonplaceholder.typicode.com"
})

axiosInstance('/comments?_limit=5').then(res => showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}


