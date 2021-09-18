import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  Alert,
  Button,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'

import SmallLayout from '../components/layouts/SmallLayout'

export default function About () {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <SmallLayout text='על האפליקציה' hide={true}>
        <ScrollView style={s.termsBlock}>
          <Text style={{ textAlign: 'right' }}>*אני מאמין*: {'\n'}</Text>
          <Text style={{ textAlign: 'right' }}>
            שבכל בנאדם יש מה לתרום לזולת, אני סבור שטיב האנשים זה לתת ולעזור
            לאחר כדי לגרום לחברה שבה אנו חיים להיות יותר אנושית אחד כלפי השני
            ובכך לעשות את העולם כולו טוב יותר🤞🏻🙏🏻
            {'\n'}
          </Text>
          <Text style={{ textAlign: 'right' }}>
            אפליקציה Goodness נותנת פלטפורמה לשיתוף ״מעשים טובים״ בין האנשים,
            שבה כל אחד בתחומו יכול לתרום לאחר ובתמורה לקבל משהו שהוא רוצה/זקוק
            לו ללא תלות בכסף.
            {'\n'}
          </Text>
          <Text style={{ textAlign: 'right' }}>
            כל אחד מאיתנו בעזרת יישומון Goodness יוכלו בראש ובראשונה לתת מעצמם,
            לפתוח את הלב ובכך לעזור לאחר… וכאשר אתה נותן אתה גם מקבל. Goodness
            תעזור לכל אחד מאיתנו לתת את החלק הקטן שבו יש לו יתרון, שבו הוא
            עובד/מתמקצע/שולט. הראיון הוא לשיתוף ״מעשים טובים״ בין האנשים, תרומה
            של השירותים בהם אדם עובד לאחר וצבירת לבבות שאחר כך יוכל להשתמש ולקבל
            מעשה טוב של אדם אחר….
            {'\n'}
          </Text>
          <Text style={{ textAlign: 'right' }}>
            אפליקציה Goodness הינה דרך חדשה בעידן הגלובלי להישאר קודם כל בנאדם,
            לתת ואחר כך לקבל.
            {'\n'}
          </Text>
          <Text style={{ textAlign: 'right' }}> </Text>
          <Text style={{ textAlign: 'right' }}>
            איך זה עובד: משתמש חדש פותח user בהתאם לתחום בו הוא יכול לעזור. לאחר
            ההרשמה מציע את ההצעה שלו בתאריכים ושעות שבהם הוא יכול לתרום. ההצעה
            שלו עוברת לפרסום וממתינה לאדם שזקוק לכך. אנשים אחרים שרשומים
            באפליקציה זו, יכולים לחפש את התחום שבו הם מעוניינים לקבל מעשה טוב.
            ובעצם כך שהם נותנים-הם מקבלים…. {'\n'}
          </Text>
          <Text style={{ textAlign: 'right' }}>
            רק לאחר ביצוע מעשה טוב, לאותו משתמש מתאסף לב - המסמל ״מעשה טוב שהוא
            עשה לאחר״ מי שיתן יותר כמובן יקבל יותר בחזרה…
          </Text>
        </ScrollView>
      </SmallLayout>
    </TouchableWithoutFeedback>
  )
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  termsBlock: {
    //   alignItems: 'center',
    //  justifyContent: 'flex-start',
    //  backgroundColor: "brown",
    backgroundColor: '#EEEEEE',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 40,
    paddingHorizontal: 12,
    paddingTop: 40,
    paddingBottom: 20
  }
})
