import got from "got";
import useSWR from "swr";
import { List } from "@raycast/api";

type HstsProps = { url: string };

export function Hsts({ url }: HstsProps) {
  const { data, isLoading } = useSWR(["hsts", url], ([, url]) => getHsts(url));

  const detailContent = !data
    ? ""
    : data.compatible
      ? `## HSTS Enabled ✅\n ${data.message}`
      : `## HSTS Not Enabled ❌\n ${data.message}`;

  return <List.Item title="HSTS Check" detail={<List.Item.Detail isLoading={isLoading} markdown={detailContent} />} />;
}

async function getHsts(url: string): Promise<{ compatible: boolean; message: string }> {
  const headers = await got(url).then((res) => res.headers);
  const hstsHeader = headers["strict-transport-security"];

  if (!hstsHeader)
    return {
      compatible: false,
      message: "Sit does not serve any HSTS headers.",
    };

  const maxAge = hstsHeader.match(/max-age=(\d+)/)?.[1];
  const includesSubdomain = /includessubdomains/i.test(hstsHeader);
  const includesPreload = /preload/i.test(hstsHeader);

  if (!maxAge || parseInt(maxAge) < 10886400)
    return {
      compatible: false,
      message: "HSTS max-age is less than 10886400.",
    };
  if (!includesSubdomain)
    return {
      compatible: false,
      message: "HSTS header does not include all subdomains.",
    };
  if (!includesPreload)
    return {
      compatible: false,
      message: "HSTS header does not contain the preload directive.",
    };

  return { compatible: true, message: "Site serves HSTS headers." };
}
