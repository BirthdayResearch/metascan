import clsx from "clsx";
import { useRouter } from "next/router";
import { getTopLevelRoute } from "shared/urlHelper";
import Button from "@components/commons/Button";
import DetailPageNotFound from "@components/DetailPageNotFound";

const DETAIL_PAGES = ["/tx", "/block", "/address", "/contract", "/token"];

export default function Page404() {
  const router = useRouter();
  const currentPath = getTopLevelRoute(router.asPath);
  const isDetailsPage = DETAIL_PAGES.includes(currentPath);

  return isDetailsPage ? (
    <DetailPageNotFound path={currentPath} />
  ) : (
    <div
      className={clsx("px-1 pt-16", "lg:w-3/5")}
      data-testid="page-not-found"
    >
      <div className="text-red-800 font-bold">Error 404</div>
      <div
        className={clsx(
          "pt-1 text-white-50 text-[32px] font-bold",
          "md:text-[56px]"
        )}
      >
        Page Not Found
      </div>
      <div
        className={clsx("pt-6 text-white-50 leading-[22.4px]", "md:text-xl")}
      >
        The page you are looking for might have been changed or removed. Make
        sure the URL that you entered is correct.
      </div>
      <Button
        label="Return to homepage"
        testId="return-home"
        href="/"
        customStyle="mt-12"
      />
    </div>
  );
}
