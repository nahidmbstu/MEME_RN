"use strict";

var React = require("react-native");

var { StyleSheet } = React;
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  header: {
    height: 55,
    backgroundColor: "#d3e4e2",
    elevation: 3
  },
  h1: {
    fontSize: 25,
    textAlign: "center",
    padding: 15,
    color: "#222"
  },
  h2: {
    fontSize: 22,
    textAlign: "center",
    padding: 5
  },
  inputContainer: {
    flexDirection: "row",
    height: Math.round(height / 12),
    backgroundColor: "#fff",
    elevation: 3,
    padding: 5
  },
  inputStyle: {
    flex: 1,
    flexDirection: "row"
  },
  cardContainer: {
    flexDirection: "column",
    height: "auto",
    width: "auto",
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    elevation: 2,
    borderRadius: 1
  },
  imageContainer: {
    flexDirection: "column",
    height: "auto",
    width: "auto",
    alignItems: "center",
    position: "relative",
    margin: 5
  },
  captionContainer: {
    width: 180
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 5
  },
  PrimaryButton: {
    flexDirection: "column",
    height: 50,
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#20c997",
    elevation: 2
  },
  authorStyle: {
    position: "absolute",
    left: 10,
    bottom: 10
  }
});
