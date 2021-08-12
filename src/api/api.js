import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
let FormData = require('form-data');
import { Linking } from "react-native";


const instance = axios.create({
  baseURL: "http://52.48.233.122:3000/",
  //withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const commonAPI = {
  getCategories: () => {    
      return instance.get('serviceCategory/?l=he')
  //  return instance.get('serviceCategory')
  },

  getCategoriesFlat: () => {
    return instance.get('serviceCategory/flat/?l=he')
  },

  getUserInfo: id => instance.get(`users/${id}`)
}

export const userAPI = {
  getSMS: phone => instance.post('sms/send', JSON.stringify({
    "phone": `${phone}`
  }))
    .then(function (response) {
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

  saveToken: async token => {

    try {
      await AsyncStorage.setItem('token', token)
      console.log("TOKEN OK")
    } catch (e) {
      console.log(e)
    }
  },

  firebaseAuth: {},

  dashboard: async () => {
    try {
      let token = await AsyncStorage.getItem('token')
      let config = {
        method: 'get',
        url: 'http://52.48.233.122:3000/dashboard',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        }
      }

      try {
        console.log("DASHBOARD OK")
        const response = await axios(config)
        return JSON.stringify(response.data);
      } catch (error) {
        console.log(error);
      }
    } catch (e) {
      // read error
    }
  },

  sendPic: async (image) => {

    try {
      let token = await AsyncStorage.getItem('token')
      let data = new FormData();

      const file = {
        'uri': image.uri,
        'name': "avatar.jpg",
        'type': "image/jpg",

      }

      data.append('file', file
      );

      //  data.append('file', fs.createReadStream(image));

      let config = {
        method: 'post',
        url: 'http://52.48.233.122:3000/users/upload',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
          // ...data.getHeaders()
          //'Content-Type': 'application/json; charset=utf-8'
        },
        data
      }

      try {
        const response = await axios(config)
        return JSON.stringify(response.data);
      } catch (error) {
        console.log("ZHOPA ZHOPA")
        console.log(error);
      }
    } catch (e) {
      // read error
    }

  },

  update: async (values) => {
    try {
      let token = await AsyncStorage.getItem('token')

      let data = JSON.stringify({

        //  "city": `${values.city}`,
        //  "street": `${values.street}`,
        //  "house": values.house,
        //  "apt": values.apt,
        "name": `${values.name}`,
        //  "phone": `${values.phone}`,
        //  "email": `${values.email}`,
        //  "job": `${values.job}`,
        //   "password": `${values.password}`,
        //  "code": `${code}`,

      });

      let config = {
        method: 'patch',
        url: `http://52.48.233.122:3000/users/${values.id}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: data
      }

      axios(config)
        .then(function (response) {
          console.log("Update Ok")
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      // read error
    }
  }
}

export const serviceAPI = {

  doneService: async id => {
    try {
      let token = await AsyncStorage.getItem('token')
      let data = ''
      let config = {
        method: 'post',
        url: `http://52.48.233.122:3000/jobs/jobDone/${id}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e)
    }
  },


  approveService: async id => {
    try {
      let token = await AsyncStorage.getItem('token')
      let data = ''
      let config = {
        method: 'post',
        url: `http://52.48.233.122:3000/jobs/jobApprove/${id}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e)
    }
  },

  orderService: async id => {

    try {

      let token = await AsyncStorage.getItem('token')
      let data = JSON.stringify({
        "serviceId": id,
        "dayTime": "zzzz zzz zzzz zz"
      });

      let config = {
        method: 'post',
        url: 'http://52.48.233.122:3000/jobs/withUser',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data
      };

      axios(config)
        .then(function (response) {

        })
        .catch(function (error) {
          console.log(error);
        });

    } catch (e) {
      console.log(e)
    }
  },

  createService: async values => {
    try {
      let token = await AsyncStorage.getItem('token')

      const mas = [...values.weekDays]
      let temp = []

      for (let i = 0; i < mas.length; i++) {
        if (mas[i]) { temp.push(i) }
      }

      let data = JSON.stringify({
        "categoryId": values.categoryId,
        "cost": values.cost,
        "actionRadius": values.actionRadius,
        "amount": values.amount,
        "coordinate": values.coordinate,
        "dayTime": values.dayTime,
        "weekDays": [...temp]
      });

      let config = {
        method: 'post',
        url: 'http://52.48.233.122:3000/service/withUser',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data
      }

      try {
        console.log("SERVICE WITH USER OK")
        const response = await axios(config)
        return JSON.stringify(response.data);
      } catch (error) {
        console.log(error);
      }
    } catch (e) {
      console.log(e)
    }
  },

  searchService: async values => {
    try {
      let token = await AsyncStorage.getItem('token')

      let data = JSON.stringify({
        "categoryId": values.categoryId,
        "range": values.range,
        "coordinate": values.coordinate,
        "date": values.date,
      });

      console.log(data)

      let config = {
        method: 'post',
        url: 'http://52.48.233.122:3000/service/search',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data
      }

      try {
        console.log("SEARCH OK")
        const response = await axios(config)
        return JSON.stringify(response.data);
      } catch (error) {
        console.log(error);
      }
    } catch (e) {
      console.log(e)
    }

  }
}





