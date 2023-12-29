import got from "got";
import useSWR from "swr";
import { List } from "@raycast/api";

type RedirectsProps = { url: string };

export function Redirects({ url }: RedirectsProps) {
  const { data, isLoading } = useSWR(["redirects", url], ([, url]) => getRedirects(url));

  const content = (() => {
    if (!data) return "## No Redirects";

    const bits = ["## Redirects", ""];

    for (const redirect of data) {
      bits.push(`- \`${redirect.from}\` -> \`${redirect.to}\``);
    }

    return bits.join("\n");
  })();

  return <List.Item title="Redirects" detail={<List.Item.Detail isLoading={isLoading} markdown={content} />} />;
}

async function getRedirects(url: string) {
  let from = url;
  const redirects = [] as { from: string; to: string }[];

  await got(url, {
    followRedirect: true,
    hooks: {
      beforeRedirect: [
        // @ts-expect-error hush now, @types/got
        (_, response) => {
          const to = response.headers.location;
          redirects.push({ from, to });
          from = to;
        },
      ],
    },
  });

  return redirects;
}
