import { ReactNode } from "react";
import { Text,StyleProp,ViewStyle,View } from "react-native";
import { color, typography } from "../../theme";

interface BulletDescriptionProps {
    bulletPoints: string[];
     style?: StyleProp<ViewStyle>;
    }

//Description Component
export const Description:React.FC<BulletDescriptionProps> =({ bulletPoints, style })=> {
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
  