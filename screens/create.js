import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, Pressable, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DropDownPicker2 from 'react-native-dropdown-picker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

import ButtonBlue from '../src/ButtonBlue';
import { userAPI } from '../src/api/api';
import RegAvatar from '../components/avatars/RegAvatar';

import CloseIcon from '../Images/CloseIcon'
import SSearch from '../Images/sSearch.svg'
import { g } from '../styles/global'
import { mapStyle } from '../styles/mapStyles'
import AsteriskInput from '../components/inputs/AsteriskInput';

import { Formik } from 'formik'
import RegInput from '../components/inputs/RegInput';
import RegInputSmall from '../components/inputs/RegInputSmall';
import AvatarBig from '../components/avatars/AvatarBig';

import SearchLayout from '../components/layouts/SearchLayout';

import { useNavigation } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux'
import PersonalInfo from '../components/personalInfo/PersonalInfo';

import TestCard from '../components/cards/TestCard'
import DropDownBlue from '../components/dropdowns/DropDownBlue';
import ButtonYellowSearch from '../components/buttons/ButtonYellowSearch';
import SearchSwitch from '../components/switches/SearchSwitch';
import DropDownSearch from '../components/dropdowns/DropDownSearch';
import DropDownSearch2 from '../components/dropdowns/DropDownSearch2';
import LocationMap from '../components/maps/LocationMap';
import DaysPanel from '../components/panels/DaysPanel';
import PeriodsPanel from '../components/panels/PeriodsPanel';

export default function Create() {

    // console.log("ZZZZZZ ZZZZZ ZZZZZ ZZZZZ ZZZZZ ZZZZZ ZZZZZ")
    const cats = useSelector(state => state.categories[0].children/*[2].title/*[1].children[0].title/*[0]*/)

    //Categories lists
    const [cats1, setCats1] = useState(cats.map(cat => ({ label: cat.title, value: cat.title })))
    const [cats2, setCats2] = useState([])
    const [cats3, setCats3] = useState([])
    const [cats4, setCats4] = useState([
        { label: "Country", value: "country" },
        { label: "City", value: "city" },
        { label: "5km", value: 5 },
        { label: "1km", value: 1 },
    ])

    //Categories values
    const [cat1, setCat1] = useState('')
    const [cat2, setCat2] = useState('')
    const [cat3, setCat3] = useState('')
    const [cat4, setCat4] = useState('')

    const [coordinate, setCoordinate] = useState({
        "latitude": 32,
        "longitude": 34.8,
    })

    useEffect(() => {
        console.log("Hello from UseState")
        console.log(coordinate)
    }, [coordinate])

    //DropDow open
    const [createMode, setCreateMode] = useState(false)
    const [cat1open, setCat1open] = useState(false)
    const [cat2open, setCat2open] = useState(false)
    const [cat3open, setCat3open] = useState(false)
    const [cat4open, setCat4open] = useState(false)
    const [readyToSearch, setReadyToSearch] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)
    const [showMap, setShowMap] = useState(false)

    const [days, setDays] = useState([true, true, true, true, true, false, false])

    const [period, setPeriod] = useState("allday")
    const [showPeriods, setShowPeriods] = useState(true)

    const navigation = useNavigation()
    const data = useSelector(state => state.all)

    const catValueChange1 = cat => {

        console.log("FFFFFF")
        setCat1(cat);
        setCat2('')
        setCat3('')
        setCats3([])
        let i = cats.map(el => el.title).indexOf(cat)
        let cats2 = cats[i].children.map(cat => ({ label: cat.title, value: cat.title }))
        setCats2(cats2)
        //  console.log(cat)*/
    }

    const catValueChange2 = cat => {

        setCat2(cat);
        setCat3('')

        u = cats.map(el => el.title).indexOf(cat1)
        w = cats[u].children.map(el => el.title).indexOf(cat)

        if (cat2 && cats[u].children[w].children.length > 0) {
            let cats3 = cats[u].children[w].children.map(cat => ({ label: cat.title, value: cat.title }))
            console.log(cats3)
            setCats3(cats3)

        } else {
            setCats3([])
        }
    }

    const catValueChange3 = cat => {
        setCat3(cat)
    }

    const catValueChange4 = cat => {
        setCat4(cat)
    }

    const handleSearch = values => {
        console.log(values)
    }

    /* useEffect(() => {
         let cat2OK = false
         let cat3OK = false
 
         let i = cats.map(el => el.title).indexOf(cat1)
         if (cats[i].children.length === 0) {
             cat2OK = true
             cat3OK = true
         } else {
             if ((cat2 === 0) || cat2) {
                 cat2OK = true
                 let j = cats[u].children.map(el => el.title).indexOf(cat)
             }
         }
 
         if ((cats[i].children.length === 0) || (cat2 === 0) || cat2) {
              
         }
 
         // if (cat1 && cat4)
     }, [cats, cat1, cat2, cat3, cat4])*/

    const coordinatesPress = async e => {
        let coords = await e.nativeEvent
        setCoordinates({ ...coords.coordinate })
        console.log("Coor OK")
        console.log(coordinates)
    }


    const map = useRef(null);

    const onZoomInPress = () => {
        map.current.getCamera().then((cam) => {
            cam.zoom += 1;
            map.current.animateCamera(cam);
        });
    };

    const onZoomOutPress = () => {
        map.current.getCamera().then((cam) => {
            cam.zoom -= 1;
            map.current.animateCamera(cam);
        });
    };

    //<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
    //</TouchableWithoutFeedback>
    return (
        <View style={s.mainContainer}>
            <LocationMap showMap={showMap} setShowMap={setShowMap} coordinate={coordinate} setCoordinate={setCoordinate} />
            <SearchLayout>
                <View style={s.outer}>
                    <View style={s.textBlock}>
                        <Text style={[g.text22_700_white, s.headerText]}>{createMode ? "פרסום השירות" : "חיפוש שירות"}</Text>
                    </View>
                    <View style={s.switchBlock}>
                        <SearchSwitch createMode={createMode} setCreateMode={setCreateMode} />
                    </View>
                    {/* <SSearch />*/}
                    <View style={s.pickersBlock}>
                        <View style={s.picker1}>
                            <DropDownPicker
                                onChangeValue={catValueChange1}
                                style={s.picker}
                                // containerStyle={s.container}
                                textStyle={[g.text20_400_blue, s.text]}
                                open={cat1open}
                                value={cat1}
                                items={cats1}
                                setOpen={setCat1open}
                                setValue={setCat1}
                                setItems={setCats1}
                            />
                        </View>

                        
                            <View style={s.picker2}>
                                <DropDownPicker
                                    onChangeValue={catValueChange1}
                                    style={s.picker}
                                    // containerStyle={s.container}
                                    textStyle={[g.text20_400_blue, s.text]}
                                    open={cat2open}
                                    value={cat2}
                                    items={cats2}
                                    setOpen={setCat2open}
                                    setValue={setCat2}
                                    setItems={setCats2}
                                />
                            </View>

                        <View style={s.picker4}>
                            <DropDownPicker
                                onChangeValue={catValueChange4}
                                style={s.picker}
                                // containerStyle={s.container}
                                textStyle={[g.text20_400_blue, s.text]}
                                open={cat4open}
                                value={cat4}
                                items={cats4}
                                setOpen={setCat4open}
                                setValue={setCat4}
                                setItems={setCats4}
                            />
                        </View>
                    </View>
                    <DaysPanel days={days} setDays={setDays} />
                    {showPeriods && <PeriodsPanel period={period} setPeriod={setPeriod} />}

                    <View style={s.showMapBlock}>
                        <TouchableOpacity style={s.showMapButton} onPress={() => setShowMap(true)}>
                            <Text style={g.text24_700_white}>Set Coordinates</Text>
                        </TouchableOpacity>
                    </View>

                    {readyToSearch &&
                        <View style={s.searchButtonBlock}>
                            <Text style={g.text20_400_white}>Search</Text>
                        </View>
                    }
                    {showCalendar &&
                        <View style={s.calendar}>

                            <Calendar
                                // Initially visible month. Default = Date()
                                current={'2021-07-29'}
                                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                                minDate={'2021-07-10'}
                                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                                maxDate={'2021-09-30'}
                                // Handler which gets executed on day press. Default = undefined
                                onDayPress={(day) => { console.log('selected day', day) }}
                                // Handler which gets executed on day long press. Default = undefined
                                onDayLongPress={(day) => { console.log('selected day', day) }}
                                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                                monthFormat={'yyyy MM'}
                                // Handler which gets executed when visible month changes in calendar. Default = undefined
                                onMonthChange={(month) => { console.log('month changed', month) }}
                                // Hide month navigation arrows. Default = false
                                //    hideArrows={true}
                                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                                //    renderArrow={(direction) => (<Arrow />)}
                                // Do not show days of other months in month page. Default = false
                                //    hideExtraDays={true}
                                // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                                // day from another month that is visible in calendar page. Default = false
                                //   disableMonthChange={true}
                                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                                firstDay={1}
                                // Hide day names. Default = false
                                //   hideDayNames={true}
                                // Show week numbers to the left. Default = false
                                //    showWeekNumbers={true}
                                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                                onPressArrowLeft={subtractMonth => subtractMonth()}
                                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                                onPressArrowRight={addMonth => addMonth()}
                            // Disable left arrow. Default = false
                            //   disableArrowLeft={true}
                            // Disable right arrow. Default = false
                            //   disableArrowRight={true}
                            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                            //    disableAllTouchEventsForDisabledDays={true}
                            // Replace default month and year title with custom one. the function receive a date as parameter
                            //   renderHeader={(date) => {/*Return JSX*/ }}
                            // Enable the option to swipe between months. Default = false
                            //  enableSwipeMonths={true}
                            />

                        </View>}

                    <ScrollView style={s.resultBlock} contentContainerStyle={s.resultContainer}>
                        <View style={s.plug}>

                        </View>
                    </ScrollView>
                </View>
            </SearchLayout>
        </View>
    )
}

const s = StyleSheet.create({

    mainContainer: {
        flex: 1
    },

    showMapBlock: {
        width: "100%",
        height: 60,
        backgroundColor: 'red',
        justifyContent: "center",
        alignItems: "center",
    },

    showMapButton: {
        width: "100%",
        height: 50,
        borderRadius: 25,
        backgroundColor: 'navy',
        justifyContent: "center",
        alignItems: "center",
    },

    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10
    },

    zoomInContainer: {
        justifyContent: "center",
        alignItems: "center",
    },

    zoomOutContainer: {
        justifyContent: "center",
        alignItems: "center",
    },

    zoomIn: {
        width: 30,
        height: 30,
        backgroundColor: 'olive',
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },

    zoomOut: {
        width: 30,
        height: 30,
        backgroundColor: 'red',
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        marginTop: 40,
        position: 'relative'
    },


    pinContainer: {
        justifyContent: "center",
        alignItems: "center"
    },

    point: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "purple"
    },

    mapcont: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center"
    },

    mapview: {
        width: "100%",
        height: "100%",
        backgroundColor: "olive",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'relative'
    },

    outer: {
        width: "90%",
        flex: 1,
        //   backgroundColor: "peachpuff",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    textBlock: {
        width: "100%",
        height: "3%",
        //   backgroundColor: "maroon",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    headerText: {
        marginTop: -8
    },

    switchBlock: {
        width: "100%",
        height: "10%",
        //  backgroundColor: "lime",
        alignItems: 'center',
        justifyContent: 'center',
    },

    pickersBlock: {
        width: "100%",
        // height: "10%",
        backgroundColor: "olive",
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
    },

    picker: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: 60,
        borderRadius: 15
    },

    pickerText: {
        textAlign: "right"
    },

    picker1: {
        width: "90%",
        height: 60,
        backgroundColor: "navy",
        zIndex: 10,
        margin: 5
    },

    picker2: {
        width: "90%",
        height: 60,
        backgroundColor: "lime",
        zIndex: 9,
        margin: 5
    },

    picker3: {
        width: "90%",
        height: 60,
        backgroundColor: "peachpuff",
        zIndex: 8,
        margin: 5
    },

    picker4: {
        width: "90%",
        height: 60,
        backgroundColor: "maroon",
        zIndex: 7,
        margin: 5
    },

    calendar: {
        width: "90%",
        height: 400,
        backgroundColor: "plum"
    },

    searchButtonBlock: {
        width: "90%",
        height: "10%",
        backgroundColor: "yellow",
        alignItems: 'center',
        justifyContent: 'center',
    },

    resultBlock: {
        width: "90%",
        height: "30%",
        backgroundColor: "dodgerblue",
    },

    resultContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    plug: {
        width: "90%",
        height: 600,
        backgroundColor: "goldenrod"
    }
})