import * as React from "react"
import { StyleProp,TouchableOpacity,View,Text,ViewStyle,TextStyle} from "react-native"
import { typography } from "../../theme";

export interface CategoryListItem {
    category: string;
    isFocus:boolean
  }
  

export interface Category {
    item: CategoryListItem;
    index:number;
    onPress:(category: string) => void;
    isPress:{
      status:boolean,
      index:number
    };
    styleText?: StyleProp<ViewStyle>|TextStyle;
    style?: StyleProp<ViewStyle>;
    textContainerStyle?: StyleProp<ViewStyle>;

  }

export const Category :React.FC<Category> = ({ item, index, onPress, style,isPress,styleText,textContainerStyle }) =>{
    return (
      <TouchableOpacity
        style={[style]}
        onPress={() => {
          onPress(item?.category);
        }}
      >
        <View
          style={
            [
              {
                backgroundColor:item?.isFocus?
                "rgba(256,256,256,0.15)": "black",
                borderRadius: 20,
              },
              textContainerStyle
            ]
        }
        >
          <Text
            style={
              [
                {
                  color: "white",
                  paddingHorizontal: 12,
                  paddingVertical: 3,
                  fontFamily: typography.interRegular,
                },
                styleText
              ]
     }
          >
            {item?.category}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }