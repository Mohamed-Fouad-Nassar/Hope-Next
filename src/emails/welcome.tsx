import {
  Hr,
  Img,
  Body,
  Head,
  Html,
  Text,
  Button,
  Heading,
  Preview,
  Section,
  Tailwind,
  Container,
} from "@react-email/components";

import { BASE_URL } from "@/lib/constants";

type TWelcomeEmailTemplateProps = {
  username: string;
};

export default function WelcomeEmailTemplate({
  username,
}: TWelcomeEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Hope, your trusted medical companion.</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black font-sans">
          <Container className="bg-white my-10 px-10 py-5 rounded-md">
            <Img
              alt="Hope"
              height="50"
              className="mx-auto"
              src="/static/logo.png"
            />
            <Heading as="h2">Welcome to Hope</Heading>
            <Hr />
            <Text className="leading-7">Hi {username || "_"},</Text>
            <Text className="leading-7">
              Thank you for joining Hope. We are excited to have you on board.
              Your account has been verified successfully.
            </Text>
            <Text className="leading-7">
              Welcome to Hope, your trusted platform for finding doctors,
              hospitals, healing centers, and resources to support your journey.
            </Text>
            <Section className="text-center">
              <Button
                href={BASE_URL}
                className="bg-[#049cb1] text-white py-2.5 px-6 rounded-md inline-block"
              >
                Get Started
              </Button>
            </Section>
            <Text className="leading-7">
              Best,
              <br />
              The Hope team
            </Text>
            <Hr className="border-gray-300 my-5" />
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

WelcomeEmailTemplate.PreviewProps = {
  username: "Mohammed Fouad Nassar",
} as TWelcomeEmailTemplateProps;
