import { BASE_URL } from "@/lib/constants";
import {
  Hr,
  Img,
  Html,
  Body,
  Text,
  Head,
  Button,
  Heading,
  Preview,
  Section,
  Tailwind,
  Container,
} from "@react-email/components";

type TResetPasswordEmailTemplateProps = {
  email: string;
  username: string;
  resetPasswordToken: string;
};

export default function ResetPasswordEmailTemplate({
  email,
  username,
  resetPasswordToken,
}: TResetPasswordEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>reset password {email}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black font-sans">
          <Container className="bg-white my-10 px-10 py-5 rounded-md">
            <Img
              alt="Hope"
              height="50"
              className="mx-auto"
              src="/static/logo.png"
            />
            <Heading as="h2">Reset Password Email</Heading>
            <Hr />
            <Text className="leading-7">Hi {username || "_"},</Text>
            <Text className="leading-7">
              Someone recently requested a password change for your Hope
              account. If this was you, you can set a new password here:
            </Text>
            <Section className="text-center">
              <Button
                href={`${BASE_URL}/change-password?token=${resetPasswordToken}`}
                className="bg-[#049cb1] text-white py-2.5 px-6 rounded-md inline-block"
              >
                Reset Password
              </Button>
            </Section>
            <Text className="leading-7">
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text className="leading-7">This link will expire in 24h</Text>
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

ResetPasswordEmailTemplate.PreviewProps = {
  username: "Mohammed Fouad Nassar",
  email: "mohammednassar740@gmail",
  resetPasswordToken: "jkdsfpu1sadsf2wqejdfsf",
} as TResetPasswordEmailTemplateProps;
