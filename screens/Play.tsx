import React, { useContext, useEffect } from "react";
import { ColorContext } from "../context/ColorContext";
import { DealerContext } from "../context/DealerContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchCard } from "../redux/thunks/fetchCard";
import fetchDeck from "../redux/thunks/fetchDeck";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import { PlayerType } from "../classes/PlayerType";

export default function PlayScreen() {
  const { isDarkMode, toggleTheme } = useContext(ColorContext);
  const { dealerName } = useContext(DealerContext);

  const colors = ["blue", "red", "gold", "green", "purple"];
  const letters = ["H", "S", "P", "D", "R"];

  const { deckId, playerHand, dealerHand } = useSelector(state => state.wjReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadGame = async () => {
     await dispatch(fetchDeck());
    };
    loadGame();
  }, [dispatch]);

  const playerDraw = async () => {
    try {
      await dispatch(fetchCard(PlayerType.Player, deckId));
      console.warn("what:", playerHand.lenght);
    } catch (error) {
      console.error("Error:", error);
    }
  }    


  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? "#303030" : "white",
    },
    top: {
      justifyContent: "flex-start",
    },
    dealer: {
      flexDirection: "column",
      alignItems: "center",
    },
    dealer_image: {
      width: "100%",
      resizeMode: "contain",
    },
    dealer_name: {
      fontSize: 20,
      color: isDarkMode ? "white" : "#303030",
    },
    text_top: {
      fontSize: 20,
    },
    middle: {
      alignItems: "center",
    },
    text_middle: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDarkMode ? "white" : "#303030",
    },
    scroll: {
      alignSelf: "center",
    },
    button: {
      height: 50,
      width: 50,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
    down: {
      alignItems: "center",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text>Game id: {deckId}</Text>

      <View style={styles.dealer}>
        <Image
          style={styles.dealer_image}
          source={require("../assets/dealer.png")}
        />
        <Text style={styles.dealer_name}> {dealerName}</Text>
      </View>
      <View style={styles.middle}>
        <Text style={styles.text_middle}>YOUR CHOICE</Text>
      </View>
      <ScrollView horizontal={true} style={styles.scroll}>
        {colors.map((color, index) => (
          <View key={index} style={[styles.button, { backgroundColor: color }]}>
            <TouchableOpacity>
              <Text style={styles.buttonText}>{letters[index]}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Button title="DrawCard" onPress={() => playerDraw()}></Button>
      <View style={styles.down}>
        <Image source={require("../assets/hands.png")} />
      </View>
    </SafeAreaView>
  );
}

