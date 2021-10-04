import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
let FormData = require('form-data')
import { Linking } from 'react-native'

const instance = axios.create({
  baseURL: 'http://52.48.233.122:3001/',
  //withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// http://52.48.233.122:3001/users/get-profile/14

export const feedbackAPI = {
  getFeedbackInfo: async id => {
    try {
      let token = await AsyncStorage.getItem('token')
      let config = {
        method: 'get',
        url: `http://52.48.233.122:3001/feedback/19`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        }
      }

      try {        
        const response = await axios(config)       
        return response.data
      } catch (error) {
        console.log(error)
      }
    } catch (e) {
      console.log(e)
    }
  },
}

export const commonAPI = {
  getCategories: () => {
    return instance.get('service-categories/?lang=he')
    //  return instance.get('serviceCategory')
  },

  getServiceCategory: id => {
    return instance.get(`service/${id}`)
  },

  getCategoriesFlat: () => {
    return instance.get('service-categories/flat/?lang=he')
    //  return instance.get('serviceCategory/flat')
  },

  getUserInfo: id => instance.get(`users/get-profile/${id}`)
}

export const messageAPI = {

  getMessages: async () => {
    try {
      let token = await AsyncStorage.getItem('token')
      let config = {
        method: 'get',
        url: `http://52.48.233.122:3001/messages`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        }
      }

      try {        
        const response = await axios(config)       
        return response.data
      } catch (error) {
        console.log(error)
      }
    } catch (e) {
      console.log(e)
    }
  },

  readMessage: async id => {
    try {
      let token = await AsyncStorage.getItem('token')
      let config = {
        method: 'post',
        url: `http://52.48.233.122:3001/messages/${id}/mark-read`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        }
      }

      try {       
        const response = await axios(config)
        return JSON.stringify(response.data)
      } catch (error) {
        console.log(error)
      }
    } catch (e) {
      // read error
    }
  },

  deleteMessage: async id => {
    try {
      let token = await AsyncStorage.getItem('token')
      let config = {
        method: 'delete',
        url: `http://52.48.233.122:3001/messages/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        }
      }

      try {
        const response = await axios(config)
        return JSON.stringify(response.data)
      } catch (error) {
        console.log(error)
      }
    } catch (e) {
      // read error
    }
  }
}

export const userAPI = {
  getSMS: (phone, email) =>
    instance
      .post(
        'sms/send',
        JSON.stringify({
          phone: `${phone}`,
          email: `${email}`
        })
      )
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      }),

  register: (values, code) =>
    instance.post(
      'auth/register',
      JSON.stringify({
        name: `${values.name}`,
        email: `${values.email}`,
        phone: `${values.phone}`,
        job: `${values.job}`,
        referral: `${values.referral}`,
        password: `${values.password}`,
        address: {
          city: `${values.city}`,
          street: `${values.street}`,
          house: values.house,
          apt: values.apt,
          lat: 10,
          lon: 10
        },
        code: `${code}`
      })
    ),

  editProfile: async values => {
    console.log('HUI HUI')
    console.log(values)

    let data = {
      name: `${values.name}`,
      email: `${values.email}`,
      job: `${values.job}`,
      address: {
        city: `${values.city}`,
        street: `${values.street}`,
        house: values.house,
        apt: values.apt,
        lat: 0,
        lon: 0
      }
    }

    try {
      let token = await AsyncStorage.getItem('token')
      let config = {
        method: 'put',
        url: 'http://52.48.233.122:3001/users',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data
      }

      try {
        console.log('EDIT OK')
        const response = await axios(config)
        return JSON.stringify(response.data)
      } catch (error) {
        console.log(error)
      }
    } catch (e) {
      // read error
    }
  },

  login: values =>
    instance.post(
      'auth/login',
      JSON.stringify({
        phone: `${values.phone}`,
        password: `${values.password}`
      })
    ),

  forgotPass: async values =>
    instance.post(
      'auth/forgot',
      JSON.stringify({
        phone: `${values.phone}`,
        email: `2328221@ukr.net`
      })
    ),

  changePass: values =>
    instance.post(
      'auth/change',
      JSON.stringify({
        phone: `${values.phone}`,
        code: `${values.code}`,
        newPassword: `${values.password}`
      })
    ),

  saveToken: async token => {
    try {
      await AsyncStorage.setItem('token', token)
      console.log('TOKEN OK')
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
        url: 'http://52.48.233.122:3001/users/get-profile',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        }
      }

      try {
        console.log('DASHBOARD OK')
        const response = await axios(config)
        const data = JSON.stringify(response.data)
        console.log("ПОЛЯ ЮЗЕРА - АПИХА")
       // console.log(data.id)
        console.log(Object.keys(data).length)
        return data
      } catch (error) {
        console.log(error)
      }
    } catch (e) {
      // read error
    }
  },

  profile: async id => {
    try {
      let token = await AsyncStorage.getItem('token')
      let config = {
        method: 'get',
        url: `http://52.48.233.122:3001/users/get-profile/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        }
      }

      try {
        console.log('DASHBOARD OK')
        const response = await axios(config)
        return JSON.stringify(response.data)
      } catch (error) {
        console.log(error)
      }
    } catch (e) {
      // read error
    }
  },

  sendPic: async image => {
    try {
      let token = await AsyncStorage.getItem('token')
      let data = new FormData()

      const file = {
        uri: image.uri,
        name: 'avatar.jpg',
        type: 'image/jpg'
      }

      data.append('file', file)

      //  data.append('file', fs.createReadStream(image));

      let config = {
        method: 'post',
        url: 'http://52.48.233.122:3001/users/upload-avatar',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
          // ...data.getHeaders()
          //'Content-Type': 'application/json; charset=utf-8'
        },
        data
      }

      try {
        const response = await axios(config)
        return JSON.stringify(response.data)
      } catch (error) {
        //   console.log("ZHOPA ZHOPA")
        console.log(error)
      }
    } catch (e) {
      // read error
    }
  },

  update: async values => {
    try {
      let token = await AsyncStorage.getItem('token')

      let data = JSON.stringify({
        //  "city": `${values.city}`,
        //  "street": `${values.street}`,
        //  "house": values.house,
        //  "apt": values.apt,
        name: `${values.name}`
        //  "phone": `${values.phone}`,
        //  "email": `${values.email}`,
        //  "job": `${values.job}`,
        //   "password": `${values.password}`,
        //  "code": `${code}`,
      })

      let config = {
        method: 'patch',
        url: `http://52.48.233.122:3001/users/${values.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: data
      }

      axios(config)
        .then(function (response) {
          console.log('Update Ok')
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (e) {
      // read error
    }
  }
}

export const serviceAPI = {
  cancelService: async id => {
    try {
      let token = await AsyncStorage.getItem('token')
      let config = {
        method: 'post',
        url: `http://52.48.233.122:3001/contract/mark/${id}/cancel`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        }
      }

      axios(config)
        .then(function (response) {
          //      console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (e) {
      console.log(e)
    }
  },

  rateService: async (id, rating) => {
    try {
      let token = await AsyncStorage.getItem('token')
      let data = JSON.stringify({
        rating: rating,
        text: 'Good job!'
      })

      let config = {
        method: 'post',
        url: `http://52.48.233.122:3001/feedback/for-contract/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data
      }

      axios(config)
        .then(function (response) {
          //(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (e) {
      console.log(e)
    }
  },

  doneService: async id => {
    try {
      let token = await AsyncStorage.getItem('token')
      let data = ''
      let config = {
        method: 'post',
        url: `http://52.48.233.122:3001/contract/mark/${id}/done`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data
      }

      axios(config)
        .then(function (response) {
          //    console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error)
        })
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
        url: `http://52.48.233.122:3001/contract/mark/${id}/approved`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data
      }

      axios(config)
        .then(function (response) {
          //   console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (e) {
      console.log(e)
    }
  },

  orderService: async (id, date) => {
    try {
      let token = await AsyncStorage.getItem('token')
      let data = JSON.stringify({
        serviceId: id,
        date: `${date.dateString}T12:00:00.000Z`
        // "dayTime": new Date()
      })

      let config = {
        method: 'post',
        url: 'http://52.48.233.122:3001/contract',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data
      }

      axios(config)
        .then(function (response) {})
        .catch(function (error) {
          console.log(error)
        })
    } catch (e) {
      console.log(e)
    }
  },

  createService: async values => {

    console.log(values)
    try {
      let token = await AsyncStorage.getItem('token')

      const mas = [...values.weekDays]
      let temp = []

      if (mas[0]) {
        temp.push('sun')
      }
      if (mas[1]) {
        temp.push('mon')
      }
      if (mas[2]) {
        temp.push('tue')
      }
      if (mas[3]) {
        temp.push('wed')
      }
      if (mas[4]) {
        temp.push('thu')
      }
      if (mas[5]) {
        temp.push('fri')
      }
      if (mas[6]) {
        temp.push('sat')
      }

      let data = JSON.stringify({
        categoryId: values.categoryId,
        radius: values.actionRadius * 1000,
        amount: values.amount,
        cost: values.cost,
        when: [...temp],
        coordinate: values.coordinate
      })

      let config = {
        method: 'post',
        url: 'http://52.48.233.122:3001/service/by-user',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data
      }

      try {
        console.log('SERVICE WITH USER OK')
        const response = await axios(config)
        return JSON.stringify(response.data)
      } catch (error) {
        console.log(error)
      }
    } catch (e) {
      console.log(e)
    }
  },

  searchService: async values => {
    try {
      let token = await AsyncStorage.getItem('token')

      let data = JSON.stringify({
        categoryId: values.categoryId,
        // "range": values.range,
        coordinate: values.coordinate,
        date: `${values.date}T00:00:00.000Z`
      })

      //    console.log(data)

      let config = {
        method: 'post',
        url: 'http://52.48.233.122:3001/service/search',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data
      }

      try {
        console.log('SEARCH OK')
        const response = await axios(config)       
        return JSON.stringify(response.data)
      } catch (error) {
        console.log(error)
      }
    } catch (e) {
      console.log(e)
    }
  },

  deleteService: async id => {
    try {
      let token = await AsyncStorage.getItem('token')
     
      let config = {
        method: 'delete',
        url: `http://52.48.233.122:3001/service/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        }
      }

      try {
        console.log('DELETE OK')
        const response = await axios(config)        
        return JSON.stringify(response.data)
      } catch (error) {
        console.log(error)
      }
    } catch (e) {
      console.log(e)
    }
  },

  searchServicePublic: async values => {
    try {
      let token = await AsyncStorage.getItem('token')

      let data = JSON.stringify({
        categoryId: values.categoryId,
        // "range": values.range,
        coordinate: values.coordinate,
        date: `${values.date}T00:00:00.000Z`
      })

      //    console.log(data)

      let config = {
        method: 'post',
        url: 'http://52.48.233.122:3001/service/search-public',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8'
        },
        data
      }

      try {
        console.log('SEARCH OK')
        const response = await axios(config)
        console.log(response)
        return JSON.stringify(response.data)
      } catch (error) {
        console.log(error)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
