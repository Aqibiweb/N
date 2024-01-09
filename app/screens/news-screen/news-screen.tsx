import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState,ReactNode } from "react";
import moment from "moment";
import { NEWS_OPTIONS } from "./newsOption";
import { getPostCall } from "../../utils/API";
import { View, Text, FlatList, ScrollView,StyleProp,ViewStyle } from "react-native";
import { color, typography } from "../../theme";
import { Category } from "../../components";
import { NewsDetailsComponent } from "../../components";
import { NewsItem } from "../../components";
import { DetailData } from "../../components";
import { CategoryListItem } from "../../components";
import { BulletDescription } from "../../components";

interface CategoryLisItemProps {
  item: CategoryListItem;
  index:number
}
interface  NewsListItem  {
  item: BulletDescription;
  index:number;
}

export default function NewsScreen() {
  const [isPress, setIsPress] = useState({
    status: false,
    index: -1,
  });
  const [isDetailsNews, setIsDetailsNews] = useState(false);
  const [news, setNews] = useState(null);
  const [isloading, setLoading] = useState(true);
  const [newsDetail, setNewsDetail] = useState<DetailData>({
    title:'',
    news:''
  });

  useEffect(() => {
    if (isPress?.index < 0) {
      getNews("politics");
    }
  }, []);


  function getNews(category: string) {
    setLoading(true);
    getPostCall("news", "POST", {
      location: "US",
      category: category,
    })
      .then((res: any) => {
        setLoading(false);
        // console.log("Response---", res?.data);
        setNews(res?.data?.news);
        setIsDetailsNews(false);
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err);
      });
  }

  //News Handler

  function newsNavHandler(category: string) {
    switch (category) {
      case "Politics":
        getNews("politics");
        break;
      case "Technology":
        getNews("technology");
        break;
      case "Business":
        getNews("business");
        break;
      case "Entertainment":
        getNews("entertainment");
        break;
      case "Sport":
        getNews("sport");
        break;
      default:
        break;
    }
  }

  //News Details Handler

  function newsDetailsHandler(category: string) {
    console.log("Title---", category);
    setLoading(true);
    getPostCall("news/detail", "POST", {
      title: category,
    })
      .then((res: any) => {
        let details = res?.data;
        details = {
          ...details,
          title: category,
        };
        setNewsDetail(details);
        setIsDetailsNews(true);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err);
      });
  }
  


  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        style={styles.news_category_container}
        renderItem={({ item, index }:CategoryLisItemProps) => (
          <Category
            item={item}
            index={index}
            isPress={isPress}
            onPress={(res: string) => {
              if (isPress?.index !== index) {
                newsNavHandler(res);
                setIsPress((prevRegion: any) => ({
                  ...prevRegion,
                  status:
                    isPress?.index !== index && isPress.status
                      ? true
                      : !isPress.status,
                  index: index,
                }));
                setIsDetailsNews(false);
              }
            }}
          />
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index): any => index}
        data={NEWS_OPTIONS}
      />
      {isloading ? (
        <View
          style={styles.loading_container}
        >
          <ActivityIndicator size="small" color="white" />
        </View>
      ) : (
        <View style={styles.news_container}>
          {isDetailsNews ? (
            <NewsDetailsComponent
              data={newsDetail}
              style={styles?.new_details_container}
            />
          ) : (
            <FlatList
              contentContainerStyle={styles.news_list_container}
              renderItem={({ item, index }:NewsListItem) => (
                <NewsItem
                  data={item}
                  index={index}
                  style={styles.news_list_item}
                  onPress={() => {
                    newsDetailsHandler(item?.headline);
                  }}
                />
              )}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index): any => index}
              data={news}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  news_container: {
    flex: 1,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
  news_category_container: {
    marginTop: 5,
    width: "100%",
    minHeight: "4%",
    maxHeight: "4%",
    paddingLeft: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  loading_container:{
    flex: 1,
    justifyContent: "center",
  },
  new_details_container:{
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 20,
  },
news_list_container:{
  paddingBottom: "20%", 
},
news_list_item:{
  paddingTop: 20, paddingLeft: 8 
}
});
