import { Action, ActionPanel, Detail, Form, Grid, List } from "@raycast/api";
import { UrlInput } from "./UrlInput";
import { Fragment, useState } from "react";
import { UrlIp } from "./UrlIp";
import { SSLCheck } from "./SSLCheck";
import { Headers } from "./Headers";

/**
 * TODO:
 * - Copy to clipboard on all the things
 * - Better loading states/conditional rendering
 * - Probably error handling...
 * - Components:
 *  - Headers
 *  - Cookies
 *  - DNS
 *  - SSL✅
 *  - Ports
 *  - Redirects
 *  - DNSSEC
 *  - Robots.txt
 *  - TXT Records
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
      </List>
    );
  }

  return <UrlInput onSubmit={setUrl} />;
}
