/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
"use strict";

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
  Linking
} from "react-native";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import ViewShot from "react-native-view-shot";
var RNFS = require("react-native-fs");

var s = require("./styles.js");

const options = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

const Header = ({ title }) => {
  return (
    <View style={[s.header]}>
      <Text style={s.h1}>{title}</Text>
    </View>
  );
};

const Input = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={s.inputContainer}>
      <TextInput
        placeholder={placeholder}
        style={s.inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const Card = props => {
  return <View style={s.cardContainer}>{props.children}</View>;
};

const IMG_CARD = ({ uri, caption, onPress }) => {
  return (
    <TouchableOpacity style={s.imageContainer} onPress={onPress}>
      <Image
        source={{ uri }}
        style={{ width: 230, height: 200, borderRadius: 6 }}
      />
      {/* <View style={s.captionContainer}> */}
      <Text style={[s.h2, { position: "absolute", top: 10, color: "red" }]}>
        {caption}
      </Text>
      {/* </View> */}
    </TouchableOpacity>
  );
};

const Button = ({ text, width, onPress }) => {
  return (
    <View style={s.buttonContainer}>
      <TouchableOpacity style={[s.PrimaryButton, { width }]} onPress={onPress}>
        <Text style={s.h4}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Author = ({}) => {
  return (
    <View style={s.authorStyle}>
      <Text onPress={() => Linking.openURL("https://github.com/nahidmbstu")}>
        Author
      </Text>
    </View>
  );
};

export default class App extends Component {
  state = {
    caption: "",
    imageSource: "",
    newImage: ""
  };

  handleImageSelect = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          imageSource: response.uri
        });
      }
    });
  };

  handleCaptureImage = () => {
    this.refs.viewShot.capture().then(uri => {
      this.setState({ newImage: `data:image/gif;base64,${uri}` });
      var path = RNFS.PicturesDirectoryPath + `memes${Date.now()}.jpg`;

      // write the file
      RNFS.writeFile(path, uri, "base64")
        .then(success => {
          console.log("FILE WRITTEN!", success);
          Alert.alert("MEMES DOWNLOADED !! CHECK ALBUMS");
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  };

  render() {
    let { caption, imageSource, newImage } = this.state;
    return (
      <View style={s.container}>
        <Header title={"MEMES GEN"} />
        <View style={s.container}>
          <Input
            placeholder={"Write Meme Text "}
            value={caption}
            onChangeText={t =>
              this.setState({
                caption: t
              })
            }
          />
          <Card>
            <ViewShot
              ref="viewShot"
              options={{ format: "jpg", quality: 0.5, result: "base64" }}
            >
              <IMG_CARD
                uri={
                  imageSource
                    ? imageSource
                    : "https://via.placeholder.com/300/d4d4d4/808080?text=SELECT IMAGE"
                }
                caption={caption}
                onPress={this.handleImageSelect}
              />
            </ViewShot>
            <Button
              text={"DOWNLOAD"}
              width={150}
              onPress={this.handleCaptureImage}
            />
          </Card>
          {newImage ? <IMG_CARD uri={newImage} /> : null}
          <Author />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});
