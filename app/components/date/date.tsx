import { ReactNode } from "react";
import { Text,StyleProp,ViewStyle,View } from "react-native";
import { typography } from "../../theme";

interface Date {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;

  }

// Date component
export const DateComponent: React.FC<Date> =({  children, style })=> {
    return (
      <View
        style={[
           style ,
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
  