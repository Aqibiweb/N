import {
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useCallback, useEffect, useState, useContext } from "react";
import { getPostCall } from "../../utils/API";
import { View, Text, FlatList } from "react-native";
import { typography } from "../../theme";
import { Category } from "../../components";
import { NewsDetailsComponent } from "../../components";
import { NewsItem } from "../../components";
import { DetailData } from "../../components";
import { CategoryListItem } from "../../components";
import { BulletDescription } from "../../components";
import { isLoading } from "expo-font";

// Algorithm
// Change usestate name from NEWS_OPTIONS to NEWS and manage all remaining task in this state.
// This state is the main store in which data[] array responsible for show new list and its details.
// On every news topic load its relivent topic detail by loading.
// Maka promise.all call and use getNews method to get data

export interface CategoryLisItemProps {
  item: CategoryListItem;
  index:number
}
export interface  NewsListItem  {
  item: BulletDescription;
  index:number;
}
var focusIndex=0;

export default function NewsScreen(props:any) {
  const [newsOptions, setNewsOptions] = useState<CategoryListItem[]>(props?.route?.params);
  const [isDetailsNews, setIsDetailsNews] = useState(false);
  const [isloading, setLoading] = useState(true);
  const [newsDetail, setNewsDetail] = useState<DetailData>({
    title:'',
    news:''
  });
console.log('call--------')


  useEffect(() => {
    // getNews(props?.route?.params[0]?.category,0,0);
    getNewsAll()
  }, []);

  // Promise method to fetch all news data at same time
  async function getNewsAll()
  {
    const responses = await Promise.all(newsOptions.map((res,index)=>{fetchData(res,index)}))
    console.log(responses)

  }

  const fetchData = async (params:any,index:number) => {
    console.log("ALL API HIT ----",params?.category,index)
    setLoading(true);
    getPostCall("news", "POST", {
      location: "US",
      category: params?.category,
    })
      .then((res: any) => {
        // setNews(res?.data?.news);
        console.log("Response---", index);
        setNewsOptions((prevArray:any) =>
        {

          let finalValue =  prevArray.map((obj:any,i:number) => {
            if(i===index)
            {
              console.log('true-----');
              return {
                ...obj,
                data: res?.data?.news,
              }
            }
              return obj
          })

          console.log('Final array  ----',finalValue);
          return finalValue
        }
        );

        setIsDetailsNews(false);
        setLoading(false);
        setIsDetailsNews(false);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err);
      });
  }

  
  function getNews(category: string,previousIndex:number,currentIndex:number) {
    setLoading(true);
    getPostCall("news", "POST", {
      location: "US",
      category: category,
    })
      .then((res: any) => {
        setLoading(false);
        // console.log("Response---", res?.data);
        // setNews(res?.data?.news);
        const updatedArray = [...newsOptions];
        updatedArray[previousIndex] = { ...newsOptions[previousIndex], isFocus:false};
        updatedArray[currentIndex] = {...newsOptions[currentIndex],isFocus:true,data:res?.data?.news};
        console.log("Value before injection---",updatedArray);

        setNewsOptions(updatedArray)
        setIsDetailsNews(false);
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err);
      });
  }

  //News Handler

  function newsNavHandler(category: string,previousIndex:number,currentIndex:number) {
    console.log("Title---", newsOptions[currentIndex]?.data?.length);
    if(newsOptions[currentIndex]?.data?.length<=0)
    {
    getNews(category,previousIndex,currentIndex);
  }

  }

  //News Details Handler

  function newsDetailsHandler(category: string) {

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
            style={{marginLeft:index!==0&&9}}
            onPress={(res: string) => {
                const updatedArray = [...newsOptions];
                updatedArray[focusIndex] = { ...newsOptions[focusIndex], isFocus:false};
                updatedArray[index] = { ...newsOptions[index], isFocus:true };
                updatedArray[index].data.length===0?setLoading(true):setLoading(false)
                setNewsOptions(updatedArray)
                setIsDetailsNews(false);
                focusIndex=index
            }}
          />
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index): any => index}
        data={newsOptions}
      />
      {isloading ? (
        <View
          style={styles.loading_container}
        >
          <ActivityIndicator size="small" color="white" />
          <Text style={styles.loading_spiner_txt}>Customizing now...</Text>
        </View>
      ) : (
        <View style={styles.news_container}>
          {isDetailsNews ? (
            <NewsDetailsComponent
              data={newsDetail}
              style={styles?.new_details_container}
              onClose={setIsDetailsNews}
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
              data={newsOptions[focusIndex]?.data}
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
    justifyContent: "center"
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
},
loading_spiner_txt:{
  color: "white", 
  marginTop:20,
  fontFamily: typography.interRegular,
  alignSelf:'center'
}
});
