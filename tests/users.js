let bodyCreateUsers = {
  name: "morpheus",
  job: "leader",
};

let headersPost = {
  "Content-Type": "application/json",
  "x-api-key": "reqres-free-v1",
};

let url = "https://reqres.in";
let endPointGet = "/api/users?page=2";
let endPointPost = "/api/users";
let successStatusCode = 200;
let errorStatusCode = 400;
let methodGet = "get";
let methodPost = "post";

export default {
  url: url,
  bodyCreateUsers: bodyCreateUsers,
  headersPost: headersPost,
  endPointGet: endPointGet,
  endPointPost: endPointPost,
  successStatusCode: successStatusCode,
  errorStatusCode: errorStatusCode,
  methodGet: methodGet,
  methodPost: methodPost,
};
