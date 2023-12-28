import * as dns from "node:dns/promises";
import useSWR from "swr";
import { Action, ActionPanel, List } from "@raycast/api";

type TxtRecordsProps = { url: string };

export function TxtRecords({ url }: TxtRecordsProps) {
  const { data, isLoading } = useSWR(["txt-records", url], ([_, url]) => getTxtRecords(url));

  return (
    <List.Item
      title="TXT Records"
      actions={
        data && (
          <ActionPanel>
            {data.map((rec) => (
              <Action.CopyToClipboard title={`Copy ${rec[0]} to clipboard`} content={rec[0]} />
            ))}
          </ActionPanel>
        )
      }
      detail={
        <List.Item.Detail
          isLoading={isLoading}
          metadata={
            data && (
              <List.Item.Detail.Metadata>
                {data.map((rec) => (
                  <List.Item.Detail.Metadata.Label key={rec[0]} title="TXT" text={rec.join(" ")} />
                ))}
              </List.Item.Detail.Metadata>
            )
          }
        />
      }
    />
  );
}

async function getTxtRecords(url: string) {
  const hostname = new URL(url).hostname;
  const records = dns.resolveTxt(hostname);

  return records;
}
