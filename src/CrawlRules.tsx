import got from "got";
import useSWR from "swr";
import { List } from "@raycast/api";

type CrawlRulesProps = { url: string };

export function CrawlRules({ url }: CrawlRulesProps) {
  const { data, isLoading } = useSWR(["crawl-rules", url], ([, url]) => getRobotsTxt(url));

  return (
    <List.Item
      title="robots.txt / Crawl Rules"
      detail={
        <List.Item.Detail
          isLoading={isLoading}
          markdown={data && (data.body ? `\`\`\`\n${data.body}\`\`\`` : "### `/robots.txt` not found")}
          metadata={
            data &&
            data.body && (
              <List.Item.Detail.Metadata>
                {data.sitemap && <List.Item.Detail.Metadata.Label title="Sitemap" text={data.sitemap} />}
                {data.allowed.length > 0 && (
                  <List.Item.Detail.Metadata.TagList title="Allowed">
                    {data.allowed.map((item) => (
                      <List.Item.Detail.Metadata.TagList.Item key={item} text={item} />
                    ))}
                  </List.Item.Detail.Metadata.TagList>
                )}
                {data.disallowed.length > 0 && (
                  <List.Item.Detail.Metadata.TagList title="Disallowed">
                    {data.disallowed.map((item) => (
                      <List.Item.Detail.Metadata.TagList.Item key={item} text={item} />
                    ))}
                  </List.Item.Detail.Metadata.TagList>
                )}
              </List.Item.Detail.Metadata>
            )
          }
        />
      }
    />
  );
}

async function getRobotsTxt(url: string) {
  const u = new URL(url);
  u.pathname = "/robots.txt";

  const body = await got(u.toString())
    .then((res) => res.body || "")
    .catch(() => "");

  const lines = body.split("\n");

  const allowed: string[] = [],
    disallowed: string[] = [];
  let sitemap = "";

  for (const line of lines) {
    if (/^sitemap/i.test(line)) {
      sitemap = line.replace(/^sitemap:\s*/i, "");
    } else if (/^disallow/i.test(line)) {
      disallowed.push(line.replace(/^disallow:\s*/i, ""));
    } else {
      allowed.push(line);
    }
  }

  return { allowed: allowed.filter(Boolean), disallowed, sitemap, body };
}
