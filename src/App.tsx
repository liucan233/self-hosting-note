import css from "./App.module.css";
import { createRoot } from "react-dom/client";
import { Camera } from "@capacitor/camera";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { LexicalEditor } from "lexical";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";
import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { MarkNode } from "@lexical/mark";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { useEffect, useState } from "react";
import { registerPlugin } from "@capacitor/core";
import {Keyboard} from "@capacitor/keyboard"

const inject = registerPlugin("inject");

console.log(inject);

const editorConfig: InitialConfigType = {
  namespace: "React.js Demo",
  nodes: [
    HeadingNode,
    QuoteNode,
    MarkNode,
    ListItemNode,
    LinkNode,
    ListNode,
    CodeHighlightNode,
    CodeNode,
  ],
  onError(error: Error) {
    throw error;
  },
  editorState: () => $convertFromMarkdownString("# 12", TRANSFORMERS),
  theme: {},
};

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      editor;
    });
  }, [editor]);

  return null;
}

const App = () => {
  const [t, setT] = useState("");
  useEffect(() => {
    (inject as any).getSafeArea().then((res: any) => {
      console.log(res);
    });
  }, []);
  return (
    <div style={{ marginTop: 50 }}>
      {(window as any).tmp}
      <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable inputMode="text" spellCheck="false" className={css.editor} autoComplete="off" />}
          placeholder={<span>请输入</span>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        {/* <AutoFocusPlugin /> */}
      </LexicalComposer>
      <button >点击</button>
    </div>
  );
};

const rootEle = document.createElement("div");

console.log(document.body);

document.body.appendChild(rootEle);

const root = createRoot(rootEle);

root.render(<App />);

SplashScreen.hide();
  StatusBar.setStyle({
    style: Style.Light,
  });
Keyboard.setAccessoryBarVisible({isVisible: false})