import { ReactNode } from "react";
import { Text,StyleProp,ViewStyle } from "react-native";
import { typography } from "../../theme";

interface Heading {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
  }

  //Heading Component
export const  Heading:  React.FC<Heading> =({ children, style }) =>{
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
  