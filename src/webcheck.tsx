import { List } from "@raycast/api";
import { UrlInput } from "./UrlInput";
import { useState } from "react";
import { UrlIp } from "./UrlIp";
import { SSLCheck } from "./SSLCheck";
import { Headers } from "./Headers";
import { DnsInfo } from "./DnsInfo";
import { OpenPorts } from "./OpenPorts";
import { DnsSec } from "./DnsSec";
import { TxtRecords } from "./TxtRecords";

/**
 * TODO:
 * - Copy to clipboard on all the things
 * - Better loading states/conditional rendering
 * - Probably error handling...
 * - Components:
 *  - Headers ✅
 *  - Cookies
 *  - DNS ✅
 *  - SSL ✅
 *  - Ports ✅
 *  - Redirects
 *  - DNSSEC ✅
 *  - Robots.txt/Crawl Rules
 *  - TXT Records ✅
 *  - WhoIs
 *  - HSTS
 *  - ...
 */

export default function WebCheck() {
  const [url, setUrl] = useState("");

  if (url) {
    return (
      <List isShowingDetail>
        <UrlIp url={url} />
        <Headers url={url} />
        <SSLCheck url={url} />
        <DnsInfo url={url} />
        <TxtRecords url={url} />
        <DnsSec url={url} />
        {/*<WhoIs url={url} />*/}
        <OpenPorts url={url} />
      </List>
    );
  }

  return <UrlInput onSubmit={setUrl} />;
}
