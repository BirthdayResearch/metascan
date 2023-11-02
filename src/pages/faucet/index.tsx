import Container from "@components/commons/Container";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import Button from "@components/commons/Button";
import TextInput from "../../layouts/components/TextInput";
import SectionTitle from "../../layouts/components/SectionTitle";

export default function Faucet() {
  return (
    <Container className="px-1 md:px-0 mt-12">
      <SectionTitle title="Testnet Faucet" />
      <GradientCardContainer>
        <div data-testid="blocks-list" className="p-5 md:p-10">
          <div className="flex flex-col md:flex-row py-6 md:py-4 justify-between md:items-center relative">
            <h1 className="font-bold text-2xl text-white-50">Wallet Address</h1>
          </div>
          <TextInput containerClass="mt-1 mb-6" />
          <div className="py-6 flex flex-row justify-end">
            <Button
              testId="send_tokens_btn"
              label="Send Tokens"
              customStyle="font-medium text-sm md:text-base !py-2 !px-4 md:!py-3 md:!px-8"
            />
          </div>
        </div>
      </GradientCardContainer>
    </Container>
  );
}
