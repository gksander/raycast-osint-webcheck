import { Action, ActionPanel, Form } from "@raycast/api";

type UrlInputValues = { url: string };

type UrlInputProps = {
  onSubmit: (url: string) => void;
};

export function UrlInput({ onSubmit }: UrlInputProps) {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            onSubmit={({ url }: UrlInputValues) => {
              if (!url.startsWith("http")) {
                url = "https://" + url;
              }
              onSubmit(url);
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextField id="url" title="URL" placeholder="https://google.com" />
    </Form>
  );
}
