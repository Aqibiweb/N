import { useEffect, useState,ReactNode } from "react";
import { View, Text, FlatList, ScrollView,StyleProp,ViewStyle } from "react-native";
import { typography } from "../../theme";
import moment from "moment";
import { Heading } from "../heading/heading";

export interface DetailData{
    title:string;
    news:string;
}
interface NewsDetails {
    data:DetailData
    style?: React.CSSProperties;
  }
  

// News Detail Component
export const NewsDetailsComponent : React.FC<NewsDetails>=({ style, data }: any)=> {
    return (
      <ScrollView
        style={[
          { ...style },
          {
            backgroundColor: "rgba(256,256,256,0.15)",
            borderRadius: 20,
            marginBottom: "10%",
          },
        ]}
      >
        <Text
          style={{
            color: "rgba(256,256,256,0.45)",
            paddingVertical: 3,
            fontSize: 10,
            fontFamily: typography.interRegular,
          }}
        >
          {moment().format("MMMM Do")}
        </Text>
        <Heading style={{ marginTop: 20 }}>{data?.title}</Heading>
        <Text
          style={{
            color: "white",
            fontSize: 14,
            fontFamily: typography.primary,
            marginTop: 10,
            paddingBottom: "30%",
          }}
        >
          {data.news}
        </Text>
      </ScrollView>
    );
  }