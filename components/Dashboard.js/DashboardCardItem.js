import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const DashBoardCard = (props) => {
  const firstText = props.firstText;
  const secondText = props.secondText;
  const icon = props.icon;
  const backgroundColor = props.backgroundColor;

  const TypeOfIcon = MaterialCommunityIcons;

  return (
    <View key={firstText}>
      <View style={[styles.card, styles.shadowProp]}>
        <View style={styles.top}>
          <View style={styles.top}>
            <Text style={styles.sub}>{firstText}</Text>
          </View>
          <View>
            <Text style={styles.title}>{secondText}</Text>
          </View>
        </View>

        <View>
          <View style={[styles.iconBox, { backgroundColor: backgroundColor }]}>
            <TypeOfIcon style={styles.icon} name={icon} size={24} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashBoardCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 25,
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  sub: {
    opacity: 0.5,
    fontSize: 14,
  },
  main: {
    marginHorizontal: "2%",
    height: 600,
  },
  title: {
    fontWeight: "300",
    fontSize: 35,
  },
  icon: {
    fontSize: 30,
    color: "white",
  },
  iconBox: {
    width: 60,
    height: 60,
    // backgroundColor:'red',
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    marginBottom: 10,
  },
});
