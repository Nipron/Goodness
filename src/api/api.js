import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
let FormData = require('form-data');
//let fs = require('fs');
//const RNFS = require('react-native-fs');
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
    console.log("Hello")
    // return instance.get('serviceCategory/?l=he')
    return instance.get('serviceCategory')
  }
}

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

  saveToken: async token => {

    try {
      await AsyncStorage.setItem('token', token)
      console.log("TOKEN OK")
      // console.log(token)
    } catch (e) {
      console.log(e)
    }
  },

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
      var data = new FormData();
      //  data.append('name', 'Image Upload');
      console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
      console.log(image)

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

      console.log(values)

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
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (e) {
      // read error
    }
  }
}




