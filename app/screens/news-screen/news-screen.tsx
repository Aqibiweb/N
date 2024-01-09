import { StyleSheet,StatusBar, TouchableOpacity,ActivityIndicator } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from "axios";
import { NEWS_OPTIONS } from './newsOption';
import { getPostCall } from '../../utils/API';


//Component for category
function Category({item,index,onPress,isPress}:any)
{
  return(
    <TouchableOpacity 
     style={{marginLeft:0}} 
    onPress={()=>{onPress(item?.category)}}>
    <View style={{backgroundColor:((index===0&&isPress.index<0)?'rgba(256,256,256,0.15)':(isPress.status&&(index===isPress.index)))?'rgba(256,256,256,0.15)':'black',borderRadius:20}}>
    <Text style={{color:'white',paddingHorizontal:12,paddingVertical:3}}>
        {item?.category}
    </Text>
    </View>
    </TouchableOpacity>
  )
}

//Heading Component
function Heading({title,children,style}:any)
{
  return(
    <Text style={[{...style},{
      color:'white',
      fontSize:15,
      fontFamily:'LibreBaskervilleRegular'
    }]}>
       {children}
    </Text>
  )
}

//Description Component
function Description({data,style}:any)
{
  return(
    <View style={[{...style},{backgroundColor:'rgba(0,0,0,0.0)'}]}>
    {
      data?.map((data:any)=>{
        return(
        <View style={[{flexDirection:'row',marginTop:10,backgroundColor:'rgba(256,256,256,0.0)'}]}>
          <View style={{width:5,height:5,borderRadius:5/2,top:6}}/>
        <Text style={[{
          color:'white',
          fontSize:14,
          fontWeight:'500',
          marginLeft:10,
        }]}>
          {data}
          </Text>
        </View>
        )
      })
    }
      </View>
  )
}

// Date component
function DateComponent({title,children,style}:any)
{
  return(
    <View style={[{...style},{backgroundColor:'rgba(256,256,256,0.15)',borderRadius:20}]}>
    <Text style={{color:'rgba(256,256,256,0.45)',paddingVertical:3,fontSize:10,alignSelf:'center'}}>
    {children}
    </Text>
    </View>
  )
}

// News Detail Component
function NewsDetailsComponent({style,data}:any)
{
  return(
    <ScrollView style={[{...style},{backgroundColor:'rgba(256,256,256,0.15)',borderRadius:20,marginBottom:'10%'}]}>
    <Text style={{color:'rgba(256,256,256,0.45)',paddingVertical:3,fontSize:10,}}>
    {moment().format('MMMM Do') }

    </Text>
    <Heading style={{marginTop:20}}>
      {data?.title}
    </Heading>
    <Text style={{color:'white',fontSize:14,fontWeight:'400',marginTop:10,paddingBottom:'30%'}}>
      {data.news}
    </Text>
    </ScrollView>
  )
}

// News Item
function NewsItem({style,data,onPress}:any)
{
  return(
 <TouchableOpacity onPress={onPress} style={[{...style},{backgroundColor:'black'}]}>
      <Heading >
        {data?.headline}
      </Heading>
      <Description bulletPoints data={data?.bulletPoints} style={{marginTop:10,paddingLeft:2,paddingRight:1}} />
      <DateComponent style={{width:'25%',marginTop:20}}>
        {moment().format('MMMM Do') }
      </DateComponent>
 </TouchableOpacity>
  )
}


export default function NewScreen() {
  const [isPress,setIsPress]=useState({
    status:false,
    index:-1
  })
  const [isDetailsNews,setIsDetailsNews]=useState(false)
  const [news,setNews]=useState(null)
  const [isloading, setLoading] = useState(true);
  const [newsDetail,setNewsDetail]=useState(null)


  //API Call here
useEffect(()=>{
  if(isPress?.index<0)
  {
    getNews('politics')
  }
},[])

//getNews

function getNews(category:string)
{
 
    setLoading(true);
    getPostCall('news','POST',{
      location: "US",
      category: category
    }).then((res:any)=>{
      setLoading(false);
      console.log('Response---',res?.data);
      setNews(res?.data?.news);
      setIsDetailsNews(false)
    }).catch((err:any)=>{
      setLoading(false);
      console.log(err)})
  
}

//News Handler

function newsNavHandler(category:string)
{
  switch(category)
  {
    case 'Politics':
      getNews('politics');
    break;
    case 'Technology':
      getNews('technology');
      break;
    case 'Business':
      getNews('business');
      break;
      case 'Entertainment':
        getNews('entertainment');
    break;
    case 'Sport':
      getNews('sport');
      break;    
    default:
      break;  
  }
}

//News Details Handler

function newsDetailsHandler(category:string)
{
  console.log('Title---',category);
  setLoading(true);
  getPostCall('news/detail','POST',{
    title:category
  }).then((res:any)=>{
      let details= res?.data;
      details={
        ...details,
        title:category
      }
    setNewsDetail(details);
    setIsDetailsNews(true); 
    setLoading(false);
  }).catch((err:any)=>{
    setLoading(false);
    console.log(err)})
}

  return (
    <View style={styles.container}>
      <FlatList
      horizontal
      style={{marginTop:5,width:'100%',minHeight:'4%',maxHeight:'4%',paddingLeft:5}}
      renderItem={({item, index}):any=><Category item={item} index={index} isPress={isPress} setIsPress={setIsPress} onPress={(res:string)=>{
        if(isPress?.index!==index)
        {
          newsNavHandler(res)
          setIsPress((prevRegion:any)=>({
            ...prevRegion,
            status:(isPress?.index!==index&&isPress.status)?true :!isPress.status,
            index:index
          }));
          setIsDetailsNews(false)
        }

      }}/>}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item,index):any => index}
      data={NEWS_OPTIONS}
      />
      {
        isloading ? (
          <View style={{flex:1,backgroundColor:'black',justifyContent:'center'}}> 
          <ActivityIndicator size="small" color="white" />
          </View>
        ):
        (
          <View style={styles.news_container}>
          {
            isDetailsNews ?(
              <NewsDetailsComponent data={newsDetail} style={{width:'100%',paddingHorizontal:20,paddingTop:20,marginTop:20}}/>
            ):
            (
              <FlatList
              style={{flex:1}}
              contentContainerStyle={{
                paddingBottom:'20%'
              }}
              renderItem={({item, index}):any=><NewsItem data={item} index={index} style={{paddingTop:20,paddingLeft:8,
              }} onPress={()=>{
                newsDetailsHandler(item?.headline)
              }} />}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item,index):any => index}
              data={news}
              />
            )
          }
          </View>
        )
      }

      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
  },
  news_container: {
    flex: 1,
    backgroundColor:'black',
    marginHorizontal:10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
