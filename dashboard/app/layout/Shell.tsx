import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Link,
  Text,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import NextLink from "next/link"
import Image from "next/image"
import foxImg from "public/fox.png"

function AuthArea() {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return (
      <NextLink href="/auth/login">
        <Link>Sign In</Link>
      </NextLink>
    )
  }

  return (
    <Menu>
      <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
        <Avatar
          size={"sm"}
          name={currentUser.name}
          src={currentUser?.profilePictureUrl ?? undefined}
        />
      </MenuButton>
      <MenuList>
        <NextLink href="/todo/settings">
          <MenuItem>Settings</MenuItem>
        </NextLink>
        <MenuDivider />
        <NextLink href="/todo/signout">
          <MenuItem>Sign Out</MenuItem>
        </NextLink>
      </MenuList>
    </Menu>
  )
}

export function Shell(
  props: React.PropsWithChildren<{
    breadcrumbs?: { label: string; href: string }[]
  }>
) {
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={8}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8}>
            <NextLink href="/">
              <Image src={foxImg} width={24} height={32} alt="Datafox Logo" />
            </NextLink>
          </HStack>
          <HStack spacing={4}>
            {props.breadcrumbs?.map((breadcrumb, index) => (
              <>
                {index !== 0 && <Text>{"/"}</Text>}

                <NextLink href={breadcrumb.href} key={breadcrumb.label}>
                  <Link
                    textDecoration={
                      index + 1 === props.breadcrumbs?.length ? "underline" : undefined
                    }
                  >
                    {breadcrumb.label}
                  </Link>
                </NextLink>
              </>
            ))}
          </HStack>
          <AuthArea />
        </Flex>
      </Box>

      <Box p={4} maxWidth="800px" margin="0 auto">
        {props.children}
      </Box>
    </>
  )
}
