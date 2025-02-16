import { BASE_URL } from "@/lib/constants";
import {
  Hr,
  Img,
  Body,
  Html,
  Head,
  Text,
  Preview,
  Heading,
  Tailwind,
  Container,
  Button,
} from "@react-email/components";

type TVerifyAccountEmailTemplateProps = {
  username: string;
  confirmationCode: string;
};

export default function VerifyAccountEmailTemplate({
  username,
  confirmationCode,
}: TVerifyAccountEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify Your Account</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black font-sans">
          <Container className="bg-white my-10 px-10 py-5 rounded-md">
            <Img
              alt="Hope"
              height="50"
              className="mx-auto"
              src="/static/logo.png"
            />
            <Heading as="h2" className="leading-tight">
              Verify Your Account
            </Heading>
            <Hr />
            <Text className="leading-7">Hi {username || "_"},</Text>
            <Text className="leading-7">
              Hit the link below to verify your account, then you can log in to
              your account
            </Text>
            <Button
              href={`${BASE_URL}/verify-account?code=${confirmationCode}`}
            >
              Verify My Account
            </Button>
            {/* <Text className="px-3 py-6 rounded bg-gray-100 text-2xl text-center">
              {confirmationCode || "--------"}
            </Text> */}
            {/* <Text className="text-xs text-center">
              ( This code is valid for 10 minutes max )
            </Text> */}
            <Text className="text-ms">
              If you didn&apos;t request this email, there&apos;s nothing to
              worry about, you can safely ignore it.
            </Text>
            <Hr />
            <Text className="text-xs text-gray-500">
              Copyright &copy; {new Date().getFullYear()} Hope. All rights
              reserved
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

VerifyAccountEmailTemplate.PreviewProps = {
  username: "Mohammed Fouad Nassar",
  confirmationCode: "DJZ1233TLX",
} as TVerifyAccountEmailTemplateProps;
