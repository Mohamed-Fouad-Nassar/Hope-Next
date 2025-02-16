import {
  Hr,
  Img,
  Body,
  Head,
  Html,
  Text,
  Link,
  Heading,
  Section,
  Preview,
  Tailwind,
  Container,
} from "@react-email/components";

type TContactEmailTemplateProps = {
  content: string;
  senderEmail: string;
};

export default function ContactEmailTemplate({
  content,
  senderEmail,
}: TContactEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Message from Hope contact form</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black font-sans">
          <Container>
            <Section className="bg-white my-10 px-10 py-5 rounded-md">
              <Img
                alt="Hope"
                height="50"
                className="mx-auto"
                src="/static/logo.png"
              />
              <Heading as="h2" className="leading-tight">
                You received the following message from contact form
              </Heading>
              <Hr />
              <Text>{content}</Text>
              <Hr />
              <Text>
                The sender&apos;s email is:{" "}
                <Link
                  className="underline font-medium text-[#049cb1]"
                  href={`mailto:${senderEmail}`}
                >
                  {senderEmail}
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

ContactEmailTemplate.PreviewProps = {
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  senderEmail: "mohammednassar740@gmail.com",
} as TContactEmailTemplateProps;
