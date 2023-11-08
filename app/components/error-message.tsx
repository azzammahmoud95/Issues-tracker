import { PropsWithChildren } from "react";
import { Text } from "@radix-ui/themes";
export default function ErrorMessage({ children }: PropsWithChildren) {
  // PropsWithChildren built in interface for children components
  if (!children) return null;
  
  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
}
