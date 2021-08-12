import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, Pressable, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DropDownPicker2 from 'react-native-dropdown-picker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import moment from 'moment'

import ButtonBlue from '../src/ButtonBlue';
import { serviceAPI, userAPI } from '../src/api/api';
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
import SearchResultCard from '../components/cards/SearchResultCard';
import DropDownCalendar from '../components/dropdowns/DropDownCalendar';
import AmountPanel from '../components/panels/AmountPanel';

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
    const [catForSearch, setCatForSearch] = useState(null)




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
    const [chosenId, setChosenId] = useState(null)
    const [readyToConfirm, setReadyToConfirm] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)
    const [showMap, setShowMap] = useState(false)

    const [distance, setDistance] = useState(1)

    const [coordinate, setCoordinate] = useState(null
        /*  {
          "latitude": 32,
          "longitude": 34.8,
      }*/
    )

    const [date, setDate] = useState(null)

    const [days, setDays] = useState([true, true, true, true, true, false, false])

    const [period, setPeriod] = useState("כל היום")
    const [amount, setAmount] = useState(5)
    const [showPeriods, setShowPeriods] = useState(true)

    const [result, setResult] = useState([])

    const navigation = useNavigation()
    const data = useSelector(state => state.all)

    const catValueChange1 = cat => {

        setCat1(cat);
        setCat2('')
        setCats2([])
        setCat3('')
        setCats3([])
        setReadyToSearch(false)

        let i = cats.map(el => el.title).indexOf(cat)
        if (cats[i].children.length) {
            let cats2 = cats[i].children.map(cat => ({ label: cat.title, value: cat.title }))
            setCats2(cats2)
        } else {
            let id = cats[i].id
            setCatForSearch(id)
            console.log(`Cat for serach : ${id}`)
        }
    }

    const catValueChange2 = cat => {

        setCat2(cat);
        setCats3([])
        setCat3('')
        setReadyToSearch(false)

        if (!!cat1 && !!cat2) {
            let u = cats.map(el => el.title).indexOf(cat1) || 0
            let w = cats[u].children.map(el => el.title).indexOf(cat) || 0

            if (!!cat2 && cats[u].children[w].children.length) {
                let cats3 = cats[u].children[w].children.map(cat => ({ label: cat.title, value: cat.title }))
                setCats3(cats3)
            } else {
                let id = cats[u].children[w].id
                setCatForSearch(id)
                console.log(`Cat for serach : ${id}`)
            }
        }
    }

    const catValueChange3 = cat => {

        setCat3(cat)
        if (!!cat1 && !!cat2 && !!cat3) {
            let x = cats.map(el => el.title).indexOf(cat1)
            let y = cats[x].children.map(el => el.title).indexOf(cat2)
            let z = cats[x].children[y].children.map(el => el.title).indexOf(cat)

            let id = cats[x].children[y].children[z].id
            setCatForSearch(id)
            console.log(`Cat for serach : ${id}`)
        }
    }

    const catValueChange4 = cat => {
        setCat4(cat)
    }

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

    useEffect(() => {
        setReadyToSearch(!!catForSearch && !!coordinate && days.reduce((acc, day) => acc || day, false))
    }, [catForSearch, coordinate, days])

    const handleCreate = () => {
        console.log("CREATE")
        serviceAPI.createService({
            "categoryId": catForSearch,
            "cost": 1,
            "actionRadius": distance,
            "amount": 5,
            "coordinate": coordinate,
            "dayTime": period,
            "weekDays": [...days]
        }).
            then(res => {
                console.log("ggg")
                console.log(JSON.parse(res))
            })
    }

    const handleSearch = () => {
        console.log("SEARCH")
        try {
            serviceAPI.searchService({
                "categoryId": catForSearch,
                "coordinate": coordinate,
                "range": distance,
                "date": date.dateString
            }).
                then(res => {
                    console.log("ggg")
                    console.log(JSON.parse(res))
                    setResult(JSON.parse(res))
                })

        } catch (e) {
            console.log(e)
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

    //<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
    //</TouchableWithoutFeedback>
    return (
        <View style={s.mainContainer}>
            <LocationMap
                showMap={showMap}
                setShowMap={setShowMap}
                coordinate={coordinate}
                setCoordinate={setCoordinate}
                distance={distance}
                setDistance={setDistance} />
            <SearchLayout readyToConfirm={readyToConfirm} chosenId={chosenId}>
                <View style={s.outer}>
                    <View style={s.textBlock}>
                        <Text style={[g.text22_700_white, s.headerText]}>{createMode ? "פרסום השירות" : "חיפוש שירות"}</Text>
                    </View>
                    <View style={s.switchBlock}>
                        <SearchSwitch createMode={createMode} setCreateMode={setCreateMode} />
                    </View>
                    <ScrollView style={s.scrollBlock} contentContainerStyle={s.resultContainer}>
                        <View style={s.pickersBlock}>
                            <View style={s.picker1}>
                                <DropDownPicker
                                    onChangeValue={catValueChange1}
                                    style={s.picker}
                                    placeholder="אנא בחר קטגוריה"
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

                            {!!cats2.length &&
                                <View style={s.picker2}>
                                    <DropDownPicker
                                        onChangeValue={catValueChange2}
                                        style={s.picker}
                                        placeholder="אנא בחר קטגוריה"
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
                            }

                            {!!cats3.length &&
                                <View style={s.picker3}>
                                    <DropDownPicker
                                        onChangeValue={catValueChange3}
                                        style={s.picker}
                                        placeholder="אנא בחר קטגוריה"
                                        // containerStyle={s.container}
                                        textStyle={[g.text20_400_blue, s.text]}
                                        open={cat3open}
                                        value={cat3}
                                        items={cats3}
                                        setOpen={setCat3open}
                                        setValue={setCat3}
                                        setItems={setCats3}
                                    />
                                </View>
                            }


                        </View>

                        <View style={s.showMapBlock}>

                            {createMode && <AmountPanel amount={amount} setAmount={setAmount} />}
                            {!createMode && <PeriodsPanel period={period} setPeriod={setPeriod} />}

                            <TouchableOpacity style={s.showMapButton} onPress={() => setShowMap(true)}>
                                <Text style={g.text24_700_blue}>המיקום שלי</Text>
                            </TouchableOpacity>

                        </View>

                        {createMode && <DaysPanel days={days} setDays={setDays} />}
                        {!createMode && <DropDownCalendar date={date} setDate={setDate} />}

                        {createMode && readyToSearch &&
                            <TouchableOpacity style={s.createButtonBlock} onPress={handleCreate}>
                                <Text style={g.text24_700_white}>לִיצוֹר</Text>
                            </TouchableOpacity >
                        }
                        {!createMode && readyToSearch && date &&
                            <TouchableOpacity style={s.searchButtonBlock} onPress={handleSearch}>
                                <Text style={g.text24_700_white}>לחפש</Text>
                            </TouchableOpacity >
                        }


                        <View style={s.resultBlock}>
                            <View style={s.plug}>
                                {!!result.length && result.map(offer => <SearchResultCard
                                    data={offer}
                                    chosenId={chosenId}
                                    setChosenId={setChosenId} />)}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SearchLayout>
        </View>
    )
}

const s = StyleSheet.create({

    scrollBlock: {
        //   backgroundColor: "olive",
        width: "100%"
    },

    createButtonBlock: {
        width: "90%",
        height: "10%",
        backgroundColor: "#3993D6",
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        height: 50,
        borderRadius: 25
    },

    searchButtonBlock: {
        width: "100%",
        height: "10%",
        backgroundColor: "#3993D6",
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        height: 60,
        borderRadius: 15
    },


    mainContainer: {
        flex: 1,
    },

    showMapBlock: {
        width: "100%",
        height: 50,
        //     backgroundColor: 'red',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    showMapButton: {
        width: "49%",
        height: 50,
        borderRadius: 25,
        marginVertical: 5,
        backgroundColor: 'white',
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
        //    backgroundColor: 'olive',
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },

    zoomOut: {
        width: 30,
        height: 30,
        //    backgroundColor: 'red',
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
        //   backgroundColor: "purple"
    },

    mapcont: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        //    backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center"
    },

    mapview: {
        width: "100%",
        height: "100%",
        //   backgroundColor: "olive",
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
        margin: 3
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
        //   backgroundColor: "olive",
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
    },

    picker: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: 50,
        borderRadius: 25
    },

    pickerText: {
        textAlign: "right"
    },

    picker1: {
        width: "100%",
        height: 50,
        //   backgroundColor: "navy",
        zIndex: 10,
        marginTop: 5,
        marginBottom: 5
    },

    picker2: {
        width: "100%",
        height: 50,
        //   backgroundColor: "lime",
        zIndex: 9,
        marginBottom: 5
    },

    picker3: {
        width: "100%",
        height: 50,
        //   backgroundColor: "peachpuff",
        zIndex: 8,
        marginBottom: 5
    },

    picker4: {
        width: "100%",
        height: 50,
        //    backgroundColor: "maroon",
        zIndex: 7,
        marginBottom: 5
    },

    calendar: {
        width: "100%",
        height: 400,
        //  backgroundColor: "plum"
    },



    resultBlock: {
        width: "100%",
        height: "30%",
        //      backgroundColor: "pink",
    },

    resultContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    plug: {
        width: "100%",
        height: 600,
        //      backgroundColor: "goldenrod"
    }
})