import * as React from "react"
import { StyleProp,TouchableOpacity,View,Text } from "react-native"
import { typography } from "../../theme";

export interface CategoryListItem {
    category: string;
  }
  

export interface Category {
    item: CategoryListItem;
    index:number;
    onPress:(category: string) => void;
    isPress:{
      status:boolean,
      index:number
    };
  }

export const Category :React.FC<Category> = ({ item, index, onPress, isPress }) =>{
    return (
      <TouchableOpacity
        style={{ marginLeft: 0 }}
        onPress={() => {
          onPress(item?.category);
        }}
      >
        <View
          style={{
            backgroundColor: (
              index === 0 && isPress.index < 0
                ? "rgba(256,256,256,0.15)"
                : isPress.status && index === isPress.index
            )
              ? "rgba(256,256,256,0.15)"
              : "black",
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              paddingHorizontal: 12,
              paddingVertical: 3,
              fontFamily: typography.interRegular,
            }}
          >
            {item?.category}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }