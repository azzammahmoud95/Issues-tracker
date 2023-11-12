import { Flex } from "@radix-ui/themes"
import IssuesActions from "./issues-actions"
function page() {
  return (
    <Flex  direction="column" gap="3">
<IssuesActions />
    </Flex>
  )
}

export default page