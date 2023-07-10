import { PropsWithChildren, useEffect, useState } from "react";
import Container from "@components/commons/Container";
import Maintenance from "pages/Maintenance";
import HealthApi from "@api/HealthApi";
import { NetworkConnection } from "@contexts/Environment";
import { useNetwork } from "@contexts/NetworkContext";
import { useRouter } from "next/router";

export default function MainContainer({ children }: PropsWithChildren) {
  const { connection } = useNetwork();
  const [isHealthy, setIsHealthy] = useState(true);
  const router = useRouter();
  const is404 = router.pathname === "/404";

  useEffect(() => {
    HealthApi.getHealth(connection as NetworkConnection)
      .then((data) => {
        setIsHealthy(data.healthy);
      })
      .catch(() => {
        setIsHealthy(false);
      });
  });

  return (
    <Container className="px-4 md:px-10 lg:px-[120px] flex-grow">
      {isHealthy || is404 ? <main>{children}</main> : <Maintenance />}
    </Container>
  );
}
