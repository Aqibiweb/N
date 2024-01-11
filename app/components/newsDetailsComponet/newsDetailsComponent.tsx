import { useEffect, useState, ReactNode } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleProp,
  ViewStyle,
} from "react-native";
import { typography } from "../../theme";
import moment from "moment";
import { Heading } from "../heading/heading";
import { Description } from "../description/description";

export interface DetailData {
  title: string;
  news: string;
}
interface NewsDetails {
  data: DetailData;
  style?: React.CSSProperties;
}

// News Detail Component
export const NewsDetailsComponent: React.FC<NewsDetails> = ({
  style,
  data,
}: any) => {
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
      {/* Overview text */}
      <Text
        style={{
          color: "white",
          fontSize: 14,
          fontFamily: typography.interBold,
          marginTop: 27,
        }}
      >
        Overview
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 14,
          fontFamily: typography.primary,
          marginTop: 10,
        }}
      >
        {data?.news?.overview}
      </Text>
      {/* Overview in bullet points */}
      <Text
        style={{
          color: "white",
          fontSize: 14,
          fontFamily: typography.primary,
          marginTop: 27,
        }}
      >
        Quick Overview in Bullet Points
      </Text>
      <Description
        bulletPoints={data?.news?.quickoverview}
        style={{ marginTop: 10, paddingLeft: 10, paddingRight: "1%" }}
      />
      <Description
        bulletPoints={data?.news?.deepdive}
        style={{ marginTop: 10, paddingLeft: 10, paddingRight: "1%" }}
      />
      <Text
        style={{
          color: "white",
          fontSize: 14,
          fontFamily: typography.primary,
          marginTop: data?.news?.relevant_backstory ? 27 : 0,
        }}
      >
        {data?.news?.relevant_backstory}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 14,
          fontFamily: typography.primary,
          marginTop: data?.news?.current_developments ? 27 : 0,
        }}
      >
        {data?.news?.current_developments}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 14,
          fontFamily: typography.primary,
          marginTop: data?.news?.speculation ? 27 : 0,
        }}
      >
        {data?.news?.speculation}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 14,
          fontFamily: typography.primary,
          marginTop: data?.news?.sources ? 27 : 0,
          paddingBottom: "20%",
        }}
      >
        {data?.news?.sources}
      </Text>
    </ScrollView>
  );
};
