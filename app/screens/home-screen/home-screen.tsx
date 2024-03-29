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
import { Category, NewsItem } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { CategoryListItem } from "../../components";

interface ScreenProps {
  navigation: NativeStackNavigationProp<any, "Details">;
  route: RouteProp<any, "Details">;
}

const HomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
const [newsOptions, setNewsOptions] = useState<any>(NEWS_OPTIONS);


  useEffect(() => {
    navigation?.setOptions({
      headerLeft: () => <View />,
    });
  }, []);


  const [isNewPress, setIsNewPress] = useState({
    status: false,
    index: -1,
    category:'technology'

  });

  const [newCategoryText, setNewCategoryText] = useState("");
  const [newCategory, setNewCategory] = useState<CategoryListItem[]>([]);

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
          paddingHorizontal:0
        }}
      >
        {
 
          <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={newsOptions}
          numColumns={4}
          // style={{flex:0.5}}
          contentContainerStyle={{flex:0}}
          renderItem={({item,index}:CategoryLisItemProps) => {
            return (
              <Category
              item={item}
              index={index}
              textContainerStyle={{marginHorizontal:2}}
              style={{
                marginVertical:10,
                marginRight:index===7?15:index===10?60:0,
                marginLeft:index===4?20:index===8?50:0,
              }}
              onPress={(res: string) => {
                const updatedArray = [...newsOptions];
                updatedArray[index] = { ...newsOptions[index],
                   isFocus:updatedArray[index]?.isFocus?false:true
                   };
                setNewsOptions(updatedArray)
    
              }}
            />
            );
          }}
          />
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
            selectionColor={color?.text}

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
   
                  setIsNewPress((prevRegion: any) => ({
                    ...prevRegion,
                    status:true,
                    index:newCategory.length,
                    category:newCategoryText
                  }))
                  let category: CategoryListItem = {
                    category: newCategoryText,
                    isFocus:true,
                    data:[]
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
            style={{marginHorizontal:5,marginVertical:5}}
            onPress={(res: string) => {
              const updatedArray = [...newCategory];
              console.log('value---',newCategory[index]?.isFocus?false:true)
              updatedArray[index] = { ...newCategory[index], isFocus:newCategory[index]?.isFocus?false:true,data:[]};
              setNewCategory(updatedArray);
              if (isNewPress?.index !== index) {
                console.log('res---',res)

                setIsNewPress((prevRegion: any) => ({
                  ...prevRegion,
                  status:
                    isNewPress?.index !== index && isNewPress.status
                      ? true
                      : !isNewPress.status,
                  index: index,
                  category:res
                }));
              }
            }}
          />
          );
        }}
        />
      }
      </View>
      <Category
        item={{ category: "Start Reading",isFocus:true,data:[] }}
        index={0}
        onPress={() => {

          let  favoriteCategoryList= newsOptions.filter((item:CategoryListItem,index:number)=>{if(item.isFocus===true){
            let value =item
            value.isFocus=false
            return value
          }});
          favoriteCategoryList[0] = { ...favoriteCategoryList[0], isFocus:newCategory.length===0?true:false};

          let  newsCategoryList = newCategory.filter((item:CategoryListItem,index:number)=>{if(item.isFocus===true){
            let value =item
            value.isFocus=(index===0)?true:false

            return value
          }});
          let newsCategory = [...newsCategoryList,...favoriteCategoryList]
          console.log('Value---',favoriteCategoryList)

          navigation.navigate('news',
            newsCategory
          )
        }}
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
