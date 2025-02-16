import {
  Hr,
  Img,
  Body,
  Html,
  Head,
  Text,
  Preview,
  Tailwind,
  Container,
} from "@react-email/components";

type TChangePasswordEmailTemplateProps = {
  username: string;
};

export default function ChangePasswordEmailTemplate({
  username,
}: TChangePasswordEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Password Change Successfully</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black font-sans">
          <Container className="bg-white my-10 px-10 py-5 rounded-md">
            <Img
              alt="Hope"
              height="50"
              className="mx-auto"
              src="/static/logo.png"
            />
            <Text className="leading-7">Hi {username || "_"},</Text>
            <Text className="leading-7">
              Your account password has been changed successfully
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

ChangePasswordEmailTemplate.PreviewProps = {
  username: "Mohammed Fouad Nassar",
} as TChangePasswordEmailTemplateProps;
