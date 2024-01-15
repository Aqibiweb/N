import { ReactNode } from "react";
import { Text,StyleProp,ViewStyle,TouchableOpacity,View } from "react-native";
import { color, typography } from "../../theme";
import { Heading } from "../heading/heading";
import moment from "moment";
import { Description } from "../description/description";
import { DateComponent } from "../date/date";

export interface BulletDescription {
    bulletPoints: string[];
     style?: StyleProp<ViewStyle>;
     headline:string
    }

export interface NewsListItemProps {
    data:BulletDescription,
    style?: StyleProp<ViewStyle>;
    onPress:() => void;
    index:number
  }

// News Item
export const NewsItem  :React.FC<NewsListItemProps> = ({ style, data, onPress }) =>{
    return (
      <TouchableOpacity
        style={[style , { backgroundColor: "black" }]}
        disabled={true}
      >
        <TouchableOpacity         onPress={onPress}
>
        <Heading>{data?.headline}</Heading>
        </TouchableOpacity>
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
  
  