import React, { useEffect, useState, useRef } from 'react'
import {
  LogBox,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import DropDownPicker2 from 'react-native-dropdown-picker'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import moment from 'moment'

import MarkerBlue from '../Images/MarkerBlue.svg'

import ButtonBlue from '../src/ButtonBlue'
import { serviceAPI, userAPI } from '../src/api/api'

import CloseIcon from '../Images/CloseIcon'
import SSearch from '../Images/sSearch.svg'
import { g } from '../styles/global'
import { mapStyle } from '../styles/mapStyles'
import AsteriskInput from '../components/inputs/AsteriskInput'

import { updateAll } from '../redux/store'

import { Formik } from 'formik'
import RegInput from '../components/inputs/RegInput'
import RegInputSmall from '../components/inputs/RegInputSmall'
import AvatarBig from '../components/avatars/AvatarBig'

import SearchLayout from '../components/layouts/SearchLayout'

import { useNavigation, useScrollToTop } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux'
import PersonalInfo from '../components/personalInfo/PersonalInfo'

import DropDownBlue from '../components/dropdowns/DropDownBlue'
import ButtonYellowSearch from '../components/buttons/ButtonYellowSearch'
import SearchSwitch from '../components/switches/SearchSwitch'
import DropDownSearch from '../components/dropdowns/DropDownSearch'
import DropDownSearch2 from '../components/dropdowns/DropDownSearch2'
import LocationMap from '../components/maps/LocationMap'
import DaysPanel from '../components/panels/DaysPanel'
import PeriodsPanel from '../components/panels/PeriodsPanel'
import SearchResultCard from '../components/cards/SearchResultCard'
import DropDownCalendar from '../components/dropdowns/DropDownCalendar'
import AmountPanel from '../components/panels/AmountPanel'
import CalendarModal from '../components/modals/CalendarModal'
import CalendarButton from '../components/buttons/CalendarButton'

import Spinner from 'react-native-loading-spinner-overlay'

export default function Create() {

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
  }, [])

  const cats = useSelector(state => state.categories.categories)

  const scale = 1.4

  //Categories lists
  const [cats1, setCats1] = useState(
    cats.map(cat => ({ label: cat.title, value: cat.title }))
  )
  const [cats2, setCats2] = useState([])
  const [cats3, setCats3] = useState([])
  const [cats4, setCats4] = useState([
    { label: 'Country', value: 'country' },
    { label: 'City', value: 'city' },
    { label: '5km', value: 5 },
    { label: '1km', value: 1 }
  ])

  //Categories values
  const [cat1, setCat1] = useState('')
  const [cat2, setCat2] = useState('')
  const [cat3, setCat3] = useState('')
  const [cat4, setCat4] = useState('')
  const [catForSearch, setCatForSearch] = useState(null)

  const [allowScroll, setAllowScroll] = useState(false)

  useEffect(() => {
    //  console.log("Hello from UseState")
    //   console.log(coordinate)
  }, [coordinate])

  //DropDow open
  const [createMode, setCreateMode] = useState(false)
  const [cat1open, setCat1open] = useState(false)
  const [cat2open, setCat2open] = useState(false)
  const [cat3open, setCat3open] = useState(false)
  const [cat4open, setCat4open] = useState(false)
  const [readyToSearch, setReadyToSearch] = useState(false)
  const [chosenId, setChosenId] = useState(null)
  const [readyToConfirm, setReadyToConfirm] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showMap, setShowMap] = useState(false)

  const [distance, setDistance] = useState(25000)
  const [distanceText, setDistanceText] = useState('')

  useEffect(() => {
    switch (distance) {
      case 1:
        setDistanceText('מרחק 1 ק"מ')
        return
      case 5:
        setDistanceText('מרחק 5 ק"מ')
        return
      case 10:
        setDistanceText('מרחק 10 ק"מ')
        return
      case 25:
        setDistanceText('אזור העיר')
        return
      case 25000:
        setDistanceText('Online')
        return
    }
    return () => { }
  }, [distance])

  const [coordinate, setCoordinate] = useState({
    latitude: 32.018,
    longitude: 34.83
  })

  const dispatch = useDispatch()

  const refScroll = React.useRef(null)

  const [calendarModalOpen, setCalendarModalOpen] = useState(false)

  const [date, setDate] = useState(null)

  const [days, setDays] = useState([true, true, true, true, true, false, false])

  const [period, setPeriod] = useState('כל היום')
  const [amount, setAmount] = useState(5)
  const [showPeriods, setShowPeriods] = useState(true)
  const [online, setOnline] = useState(true)

  const [result, setResult] = useState([])

  const navigation = useNavigation()
  const data = useSelector(state => state.all)

  const [logged, setLogged] = useState(false)

  useEffect(() => {
    setLogged(!!data.id)
  }, [])

  const catValueChange1 = cat => {
    setScrollTop(true)

    setCat1(cat)
    setCat2('')
    setCats2([])
    setCat3('')
    setCats3([])
    setReadyToSearch(false)

    let i = cats.map(el => el.title).indexOf(cat)
    if (cats[i].children.length) {
      let cats2 = cats[i].children.map(cat => ({
        label: cat.title,
        value: cat.title
      }))
      setCats2(cats2)
    } else {
      let id = cats[i].id
      setCatForSearch(id)
      //  console.log(`Cat for serach : ${id}`)
    }
  }

  const catValueChange2 = cat => {
    setScrollTop(true)

    setCat2(cat)
    setCats3([])
    setCat3('')
    setReadyToSearch(false)

    if (!!cat1 && !!cat2) {
      let u = cats.map(el => el.title).indexOf(cat1) || 0
      let w = cats[u].children.map(el => el.title).indexOf(cat) || 0

      if (!!cat2 && cats[u].children[w].children.length) {
        let cats3 = cats[u].children[w].children.map(cat => ({
          label: cat.title,
          value: cat.title
        }))
        setCats3(cats3)
      } else {
        let id = cats[u].children[w].id
        setCatForSearch(id)
        //   console.log(`Cat for serach : ${id}`)
      }
    }
  }

  const catValueChange3 = cat => {
    setScrollTop(true)

    setCat3(cat)
    if (!!cat1 && !!cat2 && !!cat3) {
      let x = cats.map(el => el.title).indexOf(cat1)
      let y = cats[x].children.map(el => el.title).indexOf(cat2)
      let z = cats[x].children[y].children.map(el => el.title).indexOf(cat)

      let id = cats[x].children[y].children[z].id
      setCatForSearch(id)
      //    console.log(`Cat for serach : ${id}`)
    }
  }

  const catValueChange4 = cat => {
    setCat4(cat)
  }

  const coordinatesPress = async e => {
    let coords = await e.nativeEvent
    setCoordinates({ ...coords.coordinate })
    //  console.log("Coor OK")
    //   console.log(coordinates)
  }

  const map = useRef(null)

  const onZoomInPress = () => {
    map.current.getCamera().then(cam => {
      cam.zoom += 1
      map.current.animateCamera(cam)
    })
  }

  const [scrollTop, setScrollTop] = useState(true)

  //    useScrollToTop(refScroll);

  const onZoomOutPress = () => {
    map.current.getCamera().then(cam => {
      cam.zoom -= 1
      map.current.animateCamera(cam)
    })
  }

  useEffect(() => {
    setResult([])
    setReadyToSearch(
      !!catForSearch &&
      !!coordinate &&
      days.reduce((acc, day) => acc || day, false)
    )
  }, [catForSearch, coordinate, days, date])

  /*  useEffect(() => {
          setAllowScroll(readyToSearch)
      }, [readyToSearch])*/

  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {

    setLoading(true)
    await serviceAPI.createService({
      categoryId: catForSearch,
      cost: 1,
      actionRadius: distance,
      amount: amount,
      coordinate: coordinate,
      dayTime: period,
      weekDays: [...days]
    })

    const data = await userAPI.dashboard()
    dispatch(updateAll(data))
    Alert.alert('.מזל טוב!', 'יצרת בהצלחה שירות חדש', [
      {
        text: 'אישור', onPress: () => {
          setLoading(false)
          navigation.navigate('Services')
        }
      }
    ])
  }

  const handleSearch = async () => {

    console.log('SEARCH')
    let data
    if (logged) {
      try {
        data = await serviceAPI.searchService({
          categoryId: catForSearch,
          coordinate: coordinate,
          date: date.dateString
        })
        const unsortedResult = JSON.parse(data)
        const result = unsortedResult.sort((a, b) => b.id - a.id)
        setResult(result)       
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        serviceAPI
          .searchServicePublic({
            categoryId: catForSearch,
            coordinate: coordinate,
            date: date.dateString
          })
          .then(res => {
            setResult(JSON.parse(res))
          })

      } catch (e) {
        console.log(e)
      }
    }
    // console.log("gggg")
    // console.log(data)
    if (data.length === 2) {
      Alert.alert('לא נמצא דבר', 'לא נמצא שירות המבוקש, נא לשנות פרמטרים של החיפוש', [
        {
          text: 'אישור', onPress: () => {
          }
        }
      ])
    }


  }

  /*const [isButton, setIsButton] = useState(true)
    const [buttonName, setButtonName] = useState('Search')
    const [buttonAction, setButtonAction] = useState(handleSearch)*/

  useEffect(() => {
    setResult([])
    /* if (createMode) {
             setIsButton(readyToSearch);
             setButtonAction(handleCreate);
             setButtonName("Create")
         } else {
             setIsButton(true);
             setButtonAction(handleSearch);
             setButtonName("Search")
         }*/
  }, [createMode])

  const closeAll = () => {
    setCats2([])
    setCats3([])
    setCat1open(false)
    setCat2open(false)
    setCat3open(false)
  }

  //<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
  //</TouchableWithoutFeedback>
  return (
    <View style={s.mainContainer}>


      <Spinner
        visible={loading}
        textContent={'טוען...'}
        textStyle={g.text22_700_white}
      />
      <LocationMap
        showMap={showMap}
        setShowMap={setShowMap}
        coordinate={coordinate}
        setCoordinate={setCoordinate}
        distance={distance}
        setDistance={setDistance}
        createMode={createMode}
        result={result}
      />

      <CalendarModal
        modalOpen={calendarModalOpen}
        setModalOpen={setCalendarModalOpen}
        date={date}
        setDate={setDate}
      />

      <SearchLayout
        readyToConfirm={readyToConfirm}
        chosenId={chosenId}
        date={date}
        logged={logged}
        text={createMode ? 'הצעת שירות' : 'חיפוש שירות'}
      >
        <View style={s.description}>
          <Text style={[g.text17_400_white, { color: "#7A839B", textAlign: "center" }]}>{createMode ? `בבקשה תציעו שירות שאתם מעוניינים לתת. תבחרו מקום ומרחק מקסימלי ממקומכם בו תוכלו לספק את השירות. כמו כן ניתן לבחור ימי שבוע להספקת השירות.` : `נא בחרו שירות שאתם מעוניינים לקבל. כמו כן תבחרו מקום לקבלת השירות.`}</Text>
        </View>
        <View style={s.outer}>
          <SearchSwitch
            createMode={createMode}
            setCreateMode={setCreateMode}
            logged={logged}
            closeAll={closeAll}
          />

          <ScrollView
            scrollsToTop={scrollTop}
            scrollEnabled={!!result.length}
            style={s.scrollBlock}
            contentContainerStyle={s.resultContainer}
          >
            <View style={s.pickersBlock}>
              <View style={s.picker1}>
                <DropDownPicker
                  /* containerStyle={{
                    backgroundColor: 'red',alignItems: "flex-end", justifyContent: "flex-end"
                  }}
                  containerStyle={{
                    textStyle: 'green',alignItems: "flex-end", justifyContent: "flex-end",
                    textAlign: "right"
                  }}*/
                  onChangeValue={catValueChange1}
                  style={s.picker}
                  placeholder='אנא בחר קטגוריה'
                  // containerStyle={s.container}
                  textStyle={[g.text16_400_blue, s.text]}
                  open={cat1open}
                  value={cat1}
                  items={cats1}
                  setOpen={setCat1open}
                  setValue={setCat1}
                  setItems={setCats1}
                  onOpen={() => {
                    setCat2open(false)
                    setCat3open(false)
                  }}
                />
              </View>

              {!!cats2.length && (
                <View style={s.picker2}>
                  <DropDownPicker
                    onChangeValue={catValueChange2}
                    style={s.picker}
                    placeholder='אנא בחר תת קטגוריה'
                    // containerStyle={s.container}
                    textStyle={[g.text16_400_blue, s.text]}
                    open={cat2open}
                    value={cat2}
                    items={cats2}
                    setOpen={setCat2open}
                    setValue={setCat2}
                    setItems={setCats2}
                    onOpen={() => {
                      setCat1open(false)
                      setCat3open(false)
                    }}
                  />
                </View>
              )}

              {!!cats3.length && (
                <View style={s.picker3}>
                  <DropDownPicker
                    onChangeValue={catValueChange3}
                    style={s.picker}
                    placeholder='אנא בחר תת קטגוריה'
                    // containerStyle={s.container}
                    textStyle={[g.text16_400_blue, s.text]}
                    open={cat3open}
                    value={cat3}
                    items={cats3}
                    setOpen={setCat3open}
                    setValue={setCat3}
                    setItems={setCats3}
                    onOpen={() => {
                      setCat1open(false)
                      setCat2open(false)
                    }}
                  />
                </View>
              )}
            </View>
            {!createMode && (
              <View style={s.newCal}>
                <CalendarButton
                  date={date}
                  onPress={() => setCalendarModalOpen(true)}
                />
                <View style={s.palka} />
                <TouchableOpacity
                  style={s.newMap}
                  onPress={() => setShowMap(true)}
                >
                  <Text
                    style={[
                      g.text16_400_blue,
                      { marginLeft: 8, marginRight: 8 }
                    ]}
                  >
                    מקום קבלת השירות
                  </Text>
                  <MarkerBlue
                    style={{
                      transform: [{ scaleX: scale }, { scaleY: scale }]
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}

            {createMode && (
              <View style={s.showMapBlock}>
                <AmountPanel amount={amount} setAmount={setAmount} />
                <TouchableOpacity
                  style={s.online}
                  onPress={() => {
                    setShowMap(true)
                    setDistance(1)
                  }}
                >
                  <Text style={g.text16_400_blue}>{distanceText}</Text>
                </TouchableOpacity>
              </View>
            )}

            {createMode && (
              <View style={s.periodsBlock}>
                <View style={s.daysDesc}>
                  <Text style={g.text18_400_white}>יחידות השירות</Text>
                </View>
                <View style={s.toMap}>
                  <Text style={g.text18_400_white}>תחום מתן שירות </Text>
                </View>
              </View>
            )}

            {createMode && (
              <View style={s.daysPanel}>
                <DaysPanel days={days} setDays={setDays} textFont={30} />
              </View>
            )}
            {/*!createMode && <DropDownCalendar date={date} setDate={setDate} />*/}

            {createMode && readyToSearch && (
              <TouchableOpacity
                style={s.createButtonBlock}
                onPress={handleCreate}
              >
                <Text style={g.text24_700_white}>לִיצוֹר</Text>
              </TouchableOpacity>
            )}
            {!createMode && readyToSearch && date && (
              <TouchableOpacity
                style={s.searchButtonBlock}
                onPress={handleSearch}
              >
                <Text style={g.text24_700_white}>לחפש</Text>
              </TouchableOpacity>
            )}

            <View style={s.resultBlock}>
              <View style={s.plug}>
                {!!result.length && (
                  result.map(offer => (
                    <SearchResultCard
                      key={offer.id}
                      data={offer}
                      date={date}
                      chosenId={chosenId}
                      setChosenId={setChosenId}
                    />
                  ))
                )}
              </View>
            </View>
          </ScrollView>
        </View>

      </SearchLayout>
    </View>
  )
}

const s = StyleSheet.create({



  description: {
    position: "absolute",
    bottom: 70,
    zIndex: 0,
    width: "70%",
    alignItems: "center"
  },

  palka: {
    width: 2,
    height: '40%',
    backgroundColor: '#BCE0FD'
  },

  newSearch: {
    width: 36,
    height: 36,
    borderRadius: 1000,
    backgroundColor: 'white',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: "pink"
  },

  newMap: {
    width: '49%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 14
    //  backgroundColor: "pink"
  },

  newCal: {
    width: '100%',
    height: 52,
    borderRadius: 1000,
    marginBottom: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 1
  },

  periodsBlock: {
    marginBottom: 12,
    width: '100%',
    height: 20,
    borderRadius: 1000,
    //  backgroundColor: '#CCCCCC',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
    // padding: "1%",
  },

  online: {
    width: '49%',
    height: '100%',
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1
  },

  toMap: {
    width: '48%',
    height: '100%',
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  daysDesc: {
    width: '48%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  daysPanel: {
    width: '100%',
    height: 52,
    marginBottom: 12
  },

  text: {
    textAlign: 'right'
  },

  scrollBlock: {
    //       backgroundColor: "pink",
    width: '100%'
  },

  createButtonBlock: {
    width: '70%',
    height: '10%',
    backgroundColor: '#3993D6',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 1000,
    borderColor: "white",
    borderWidth: 1,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.3,
    // shadowColor: "blue",
    shadowRadius: 4
  },

  searchButtonBlock: {
    width: '70%',
    height: '10%',
    backgroundColor: '#3993D6',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 1000,
    marginBottom: 12,
    borderColor: "white",
    borderWidth: 1,

  },

  mainContainer: {
    flex: 1
  },

  showMapBlock: {
    width: '100%',
    height: 52,
    borderRadius: 1000,
    marginBottom: 0,
    backgroundColor: '#02337477',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  showMapButton: {
    width: '49%',
    height: 52,
    borderRadius: 25,
    marginVertical: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },

  zoomInContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  zoomOutContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  zoomIn: {
    width: 30,
    height: 30,
    //    backgroundColor: 'olive',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },

  zoomOut: {
    width: 30,
    height: 30,
    //    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginTop: 40,
    position: 'relative'
  },

  pinContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  point: {
    width: 10,
    height: 10,
    borderRadius: 5
    //   backgroundColor: "purple"
  },

  mapcont: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    //    backgroundColor: "pink",
    justifyContent: 'center',
    alignItems: 'center'
  },

  mapview: {
    width: '100%',
    height: '100%',
    //   backgroundColor: "olive",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative'
  },

  outer: {
    width: '90%',
    flex: 1,
    //    backgroundColor: "peachpuff",
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  textBlock: {
    width: '100%',
    height: '3%',
    //  backgroundColor: "maroon",
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 14
  },

  headerText: {
    marginTop: -8
  },

  switchBlock: {
    width: '100%',
    height: '10%',
    //  backgroundColor: "lime",
    alignItems: 'center',
    justifyContent: 'center'
  },

  pickersBlock: {
    width: '100%',
    // height: "10%",
   //    backgroundColor: "yellow",
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
  },

  picker: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 52,
    borderRadius: 30
  },

  pickerText: {
    textAlign: 'right'
  },

  picker1: {
    width: '100%',
    height: 52,
    // backgroundColor: "navy",
    zIndex: 10,
    marginBottom: 12
  },

  picker2: {
    width: '100%',
    height: 52,
    //   backgroundColor: "lime",
    zIndex: 9,
    marginBottom: 12
  },

  picker3: {
    width: '100%',
    height: 52,
   //    backgroundColor: "peachpuff",
    zIndex: 8,
    marginBottom: 12
  },

  picker4: {
    width: '100%',
    height: 52,
    //    backgroundColor: "maroon",
    zIndex: 7,
    marginBottom: 5
  },

  calendar: {
    width: '100%',
    height: 400
    //  backgroundColor: "plum"
  },

  resultBlock: {
    width: '100%',
    // height: '30%',
    //      backgroundColor: "pink",
  },

  resultContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  plug: {
    width: '100%',
    //     backgroundColor: "goldenrod"
  }
})
