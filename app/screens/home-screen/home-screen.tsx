import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  FlatList,
} from "react-native";
import { NEWS_OPTIONS } from "../news-screen/newsOption";
import { CategoryLisItemProps } from "../news-screen/news-screen";
import { color, typography } from "../../theme";
import { Category } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { CategoryListItem } from "../../components";

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, "Details">;
  route: RouteProp<any, "Details">;
}

const HomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
  useEffect(() => {
    navigation?.setOptions({
      headerLeft: () => <View />,
    });
  }, []);

  const [isPress, setIsPress] = useState({
    status: false,
    index: -1,
  });
  const [isNewPress, setIsNewPress] = useState({
    status: false,
    index: -1,
  });
  const [newCategoryText, setNewCategoryText] = useState("");
  const [newCategory, setNewCategory] = useState<CategoryListItem[]>([]);

  useEffect(() => {
    console.log("Value----", newCategory);
  }, [newCategory]);

  //News Handler

  function newsNavHandler(category: string) {
    switch (category) {
      case "Politics":
        break;
      case "Technology":
        break;
      case "Business":
        break;
      case "Entertainment":
        break;
      case "Sport":
        break;
      default:
        break;
    }
  }

  // Date component
  const Button: React.FC<Category> = ({
    item,
    index,
    onPress,
    isPress,
    styleText,
    style,
    textContainerStyle,
  }) => {
    return (
      <TouchableOpacity
        style={[{ marginLeft: 0 }, style]}
        onPress={() => {
          onPress(item?.category);
        }}
      >
        <View
          style={[
            {
              backgroundColor: (
                index === 0 && isPress.index < 0
                  ? "rgba(256,256,256,0.15)"
                  : isPress.status && index === isPress.index
              )
                ? "rgba(256,256,256,0.15)"
                : "black",
              borderRadius: 20,
              alignSelf: "center",
            },
            textContainerStyle,
          ]}
        >
          <Text
            style={[
              {
                color: "white",
                paddingHorizontal: 12,
                paddingVertical: 3,
                fontFamily: typography.interRegular,
              },
              styleText,
            ]}
          >
            {item?.category}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ position: "absolute", top: 30 }}>
        <Text
          style={{
            fontFamily: typography.secondary,
            fontSize: 24,
            color: color.text,
            alignSelf: "center",
            marginBottom: 20,
          }}
        >
          N
        </Text>
        <Text
          style={{
            fontFamily: typography.primary,
            color: color.text,
            alignSelf: "center",
            paddingHorizontal: "15%",
            textAlign: "center",
          }}
        >
          Welcome, choose you favorite topics or add a few of your own.
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "black",
        }}
      >
        {
          <View style={styles.category_row_containter_1}>
            {NEWS_OPTIONS?.map((data, index) => {
              if (index < 4) {
                return (
                  <Category
                    item={data}
                    index={index}
                    isPress={isPress}
                    onPress={(res: string) => {
                      if (isPress?.index !== index) {
                        setIsNewPress((prevRegion:any)=>({
                          ...prevRegion,
                          status:false,
                          index:-2
                        }))
                        newsNavHandler(res);
                        setIsPress((prevRegion: any) => ({
                          ...prevRegion,
                          status:
                            isPress?.index !== index && isPress.status
                              ? true
                              : !isPress.status,
                          index: index,
                        }));
                      }
                    }}
                  />
                );
              }
            })}
          </View>
        }
        {
          <View style={styles.category_row_containter_2}>
            {NEWS_OPTIONS?.map((data, index) => {
              if (index >= 4 && index < 8) {
                return (
                  <Category
                    item={data}
                    index={index}
                    isPress={isPress}
                    onPress={(res: string) => {
                      if (isPress?.index !== index) {
                        setIsNewPress((prevRegion:any)=>({
                          ...prevRegion,
                          status:false,
                          index:-2
                        }))
                        newsNavHandler(res);
                        setIsPress((prevRegion: any) => ({
                          ...prevRegion,
                          status:
                            isPress?.index !== index && isPress.status
                              ? true
                              : !isPress.status,
                          index: index,
                        }));
                      }
                    }}
                  />
                );
              }
            })}
          </View>
        }
        {
          <View style={styles.category_row_containter_3}>
            {NEWS_OPTIONS?.map((data, index) => {
              if (index >= 8) {
                return (
                  <Category
                    item={data}
                    index={index}
                    isPress={isPress}
                    onPress={(res: string) => {
                      if (isPress?.index !== index) {
                        setIsNewPress((prevRegion:any)=>({
                          ...prevRegion,
                          status:false,
                          index:-2
                        }))
                        newsNavHandler(res);
                        setIsPress((prevRegion: any) => ({
                          ...prevRegion,
                          status:
                            isPress?.index !== index && isPress.status
                              ? true
                              : !isPress.status,
                          index: index,
                        }));
                      }
                    }}
                  />
                );
              }
            })}
          </View>
        }
      </View>
      <View
        style={{
          backgroundColor: "rgba(256,256,256,0.15)",
          borderRadius: 20,
          marginHorizontal: "20%",
          marginTop: 70,
        }}
      >
        <View style={{ flexDirection: "row", width: "100%" }}>
          <TextInput
            value={newCategoryText}
            onChangeText={setNewCategoryText}
            style={{
              flex: 1,
              fontFamily: typography.interRegular,
              textAlignVertical: "center",
              paddingLeft: 10,
              color: color.text,
            }}
            placeholder=" Or add your own..."
            placeholderTextColor={"rgba(256,256,256,0.45)"}
          />
          <View
            style={{
              flex: 0.2,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (newCategoryText.length > 0) {
                  console.log("category---", newCategoryText);
                  setIsPress((prevRegion: any) => ({
                    ...prevRegion,
                    status:false,
                    index:-2
                  }))
                  setIsNewPress((prevRegion: any) => ({
                    ...prevRegion,
                    status:true,
                    index:newCategory.length
                  }))
                  let category: CategoryListItem = {
                    category: newCategoryText,
                  };
                  setNewCategory((previous) => [...previous, category]);
                }
              }}
              style={{
                height: 30,
                width: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: typography.interRegular,

                    color: "rgba(256,256,256,0.45)",
                  }}
                >
                  +
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          paddingTop: "8%",
          alignItems: "center",
        
        }}
      >
        {
        <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={newCategory}
        numColumns={2}
        renderItem={({item,index}:CategoryLisItemProps) => {
          return (
            <Category
            item={item}
            index={index}
            isPress={isNewPress}
            style={{marginHorizontal:5,marginVertical:5}}
            onPress={(res: string) => {
              if (isNewPress?.index !== index) {
                newsNavHandler(res);
                setIsPress((prevRegion: any) => ({
                  ...prevRegion,
                  status:false,
                  index:-2
                }))
                setIsNewPress((prevRegion: any) => ({
                  ...prevRegion,
                  status:
                    isNewPress?.index !== index && isNewPress.status
                      ? true
                      : !isNewPress.status,
                  index: index,
                }));
              }
            }}
          />
          );
        }}
        />
      }
      </View>
      <Button
        item={{ category: "Start Reading" }}
        index={0}
        onPress={() => {}}
        isPress={{ status: true, index: -1 }}
        styleText={{
          paddingHorizontal: 40,
          padding: "1%",
          color: "black",
        }}
        style={{
          position: "absolute",
          alignSelf: "center",
          bottom: "10%",
        }}
        textContainerStyle={{
          backgroundColor: "rgba(256,256,256,0.4)",
          paddingVertical: 5,
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  category_row_containter_1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  category_row_containter_2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    marginVertical: 10,
  },
  category_row_containter_3: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 65,
    marginVertical: 10,
  },
});

export default HomeScreen;
