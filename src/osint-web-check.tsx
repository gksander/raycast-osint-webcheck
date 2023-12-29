import { List, useNavigation } from "@raycast/api";
import { UrlInput } from "./UrlInput";
import { UrlIp } from "./UrlIp";
import { SSLCheck } from "./SSLCheck";
import { Headers } from "./Headers";
import { DnsInfo } from "./DnsInfo";
import { OpenPorts } from "./OpenPorts";
import { DnsSec } from "./DnsSec";
import { TxtRecords } from "./TxtRecords";
import { CrawlRules } from "./CrawlRules";
import { Hsts } from "./Hsts";
import { Redirects } from "./Redirects";

export default function OsintWebCheck() {
  const navigation = useNavigation();

  return (
    <UrlInput
      onSubmit={(url) => {
        navigation.push(<CheckDetails url={url} />);
      }}
    />
  );
}

function CheckDetails({ url }: { url: string }) {
  return (
    <List isShowingDetail>
      <UrlIp url={url} />
      <Headers url={url} />
      <SSLCheck url={url} />
      <DnsInfo url={url} />
      <TxtRecords url={url} />
      <DnsSec url={url} />
      <OpenPorts url={url} />
      <CrawlRules url={url} />
      <Hsts url={url} />
      <Redirects url={url} />
    </List>
  );
}
