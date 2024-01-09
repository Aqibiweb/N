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


//Component for category interface

  //Interfaces

  interface Category {
    item: CategoryListItem;
    index:number;
    onPress:(category: string) => void;
    isPress:{
      status:boolean,
      index:number
    };
  }
  
interface CategoryListItem {
  category: string;
}

interface BulletDescription {
  bulletPoints: string[];
   style?: StyleProp<ViewStyle>;
   headline:string
  }

  interface BulletDescriptionProps {
    bulletPoints: string[];
     style?: StyleProp<ViewStyle>;
    }

interface NewsListItemProps {
  data:BulletDescription,
  style?: StyleProp<ViewStyle>;
  onPress:() => void;
  index:number
}

interface CategoryLisItemProps {
  item: CategoryListItem;
  index:number
}

interface DetailData{
    title:string;
    news:string;
}

interface NewsDetails {
  data:DetailData
  style?: React.CSSProperties;
}

interface  NewsListItem  {
  item: BulletDescription;
  index:number;
}

interface Heading {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

//Component for category
const Category :React.FC<Category> = ({ item, index, onPress, isPress }) =>{
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

//Heading Component
function Heading({ children, style }: Heading) {
  return (
    <Text
      style={[
        style ,
        {
          color: "white",
          fontSize: 15,
          fontFamily: typography.secondary,
        },
      ]}
    >
      {children}
    </Text>
  );
}

//Description Component
function Description({ bulletPoints, style }: BulletDescriptionProps) {
  return (
    <View style={style}>
      {bulletPoints?.map((data: any) => {
        return (
          <View
            style={[
              {
                flexDirection: "row",
                marginTop: 10,
                backgroundColor: "rgba(256,256,256,0.0)",
              },
            ]}
          >
            <View
              style={{
                width: 5,
                height: 5,
                borderRadius: 5 / 2,
                top: 6,
                backgroundColor: color.text,
              }}
            />
            <Text
              style={[
                {
                  color: "white",
                  fontSize: 14,
                  fontFamily: typography.primary,
                  marginLeft: 10,
                },
              ]}
            >
              {data}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

// Date component
function DateComponent({ title, children, style }: any) {
  return (
    <View
      style={[
        { ...style },
        { backgroundColor: "rgba(256,256,256,0.15)", borderRadius: 20 },
      ]}
    >
      <Text
        style={{
          color: "rgba(256,256,256,0.45)",
          paddingVertical: 3,
          fontSize: 10,
          alignSelf: "center",
          fontFamily: typography.interRegular,
        }}
      >
        {children}
      </Text>
    </View>
  );
}

// News Detail Component
const NewsDetailsComponent : React.FC<NewsDetails>=({ style, data }: any)=> {
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

// News Item
const NewsItem  :React.FC<NewsListItemProps> = ({ style, data, onPress }) =>{
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style , { backgroundColor: "black" }]}
    >
      <Heading>{data?.headline}</Heading>
      <Description
        bulletPoints={data?.bulletPoints}
        style={{ marginTop: 10, paddingLeft: 2, paddingRight: "1%" }}
      />
      <DateComponent style={{ width: "25%", marginTop: 20 }}>
        {moment().format("MMMM Do")}
      </DateComponent>
    </TouchableOpacity>
  );
}

export default function NewScreen() {
  const [isPress, setIsPress] = useState({
    status: false,
    index: -1,
  });
  const [isDetailsNews, setIsDetailsNews] = useState(false);
  const [news, setNews] = useState(null);
  const [isloading, setLoading] = useState(false);
  const [newsDetail, setNewsDetail] = useState<DetailData>({
    title:'',
    news:''
  });

  //API Call here
  useEffect(() => {
    if (isPress?.index < 0) {
      getNews("politics");
    }
  }, []);

  //getNews

  function getNews(category: string) {
    // setLoading(true);
    getPostCall("news", "POST", {
      location: "US",
      category: category,
    })
      .then((res: any) => {
        // setLoading(false);
        console.log("Response---", res?.data);
        setNews(res?.data?.news);
        setIsDetailsNews(false);
      })
      .catch((err: any) => {
        // setLoading(false);
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
