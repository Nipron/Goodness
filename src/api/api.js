import axios from 'axios'

const instance = axios.create({
  baseURL: "http://52.48.233.122:3000/",
  //withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const userAPI = {
  getSMS: phone => instance.post('sms/send', JSON.stringify({
    "phone": `${phone}`
  }))
    .then(function (response) {
      console.log("RESPONSE FROM ")
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    }),

  register: (values, code) => instance.post('auth/register', JSON.stringify({
    "name": `${values.name}`,
    "phone": `${values.phone}`,
    "email": `${values.email}`,
    "job": `${values.job}`,
    "city": `${values.city}`,
    "street": `${values.street}`,
    "house": values.house,
    "password": `${values.password}`,
    "code": `${code}`,
    "apt": values.apt,
    //  "referral": `${values.referral}`,

  })),

  login: values => instance.post('auth/login', JSON.stringify({
    "phone": `${values.phone}`,
    "password": `${values.password}`
  })),

  dashboard: async token => {

    let config = {
      method: 'get',
      url: 'http://52.48.233.122:3000/dashboard',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8'
      }
    }

    try {
      const response = await axios(config)
      return JSON.stringify(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}

///////////////////
/*

let config = {
  method: 'get',
  url: 'http://52.48.233.122:3000/dashboard',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IjEyMyIsImVtYWlsIjoiMTIzIiwicGhvbmUiOiIxMjMxMjMxMjMxMjEiLCJqb2IiOiIxMjMiLCJiYWxhbmNlIjoxLCJyZWZDb3VudCI6MSwicmVmVXNlZCI6MCwiaGVhcnRzU3RhdHVzIjoiY29tbW9uIiwiZmVlZGJhY2tSZXN1bHQiOjAsImNyZWF0ZWRBdCI6IjIwMjEtMDctMTZUMTM6MDc6MjguMTA1WiIsImlhdCI6MTYyNjY3NTQ0MSwiZXhwIjoxNjI2Njc2MDQxfQ.WYqVxjmMgM7MUZz4xuKHQuoRWQ8GmbhEJPS4tCMfsbY'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});*/
