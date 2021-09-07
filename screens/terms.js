import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert, Button, ImageBackground, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import SmallLayout from '../components/layouts/SmallLayout';

const image = { uri: "https://reactjs.org/logo-og.png" };

export default function Terms({ navigation }) {

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <SmallLayout text="תנאי שימוש" hide={true}>
        <View style={s.termsBlock}>
          <Text style={{textAlign: 'right'}}>
          מה מכוסה במונחים אלה
אנו יודעים שזה מפתה לדלג על תנאים והגבלות אלה, אך חשוב לקבוע למה אתה יכול לצפות מאיתנו בזמן שאתה משתמש בשירותי Google, ומה אנו מצפים ממך.
תנאים והגבלות אלה משקפים את אופן הפעולה של העסק של גוגל, את החוקים החלים על החברה שלנו, ודברים מסוימים שתמיד האמנו שהם נכונים. כתוצאה מכך, תנאים והגבלות אלה מסייעים בהגדרת מערכת היחסים של Google איתך בזמן שאתה מתקשר עם השירותים שלנו. לדוגמה, מונחים אלה כוללים את כותרות הנושא הבאות:

מה אתה יכול לצפות מאיתנו, המתאר כיצד אנו מספקים ומפתחים את השירותים שלנו
מה אנו מצפים ממך, הקובע כללים מסוימים לשימוש בשירותים שלנו
תוכן בשירותי גוגל, המתאר את זכויות הקניין הרוחני לתוכן שתמצא בשירותים שלנו - בין אם תוכן זה שייך לך, לגוגל או לאחרים
במקרה של בעיות או חילוקי דעות, המתאר זכויות משפטיות אחרות שיש לך, ולמה לצפות במקרה שמישהו מפר תנאים אלה
הבנת תנאים אלה חשובה מכיוון שבשימוש בשירותים שלנו אתה מסכים לתנאים אלה.

מלבד תנאים אלה, אנו מפרסמים גם מדיניות פרטיות. למרות שזה לא חלק מהתנאים האלה, אנו ממליצים לך לקרוא אותו כדי להבין טוב יותר כיצד תוכל לעדכן, לנהל, לייצא ולמחוק את המידע שלך.
          </Text>
        </View>
      </SmallLayout>
    </TouchableWithoutFeedback>
  );
}

const s = StyleSheet.create({

  termsBlock: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    //  backgroundColor: "brown",
    backgroundColor: "#EEEEEE",
    width: "100%",
    overflow: 'hidden',
    borderRadius: 40,
    paddingHorizontal: 12,
    paddingTop: 40,
    paddingBottom: 20,
  },

});