import { createRoot } from "react-dom/client";
import { Camera } from "@capacitor/camera";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar } from "@capacitor/status-bar";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
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
import { useEffect } from "react";

const editorConfig = {
  namespace: "React.js Demo",
  nodes: [HeadingNode, QuoteNode, MarkNode, ListItemNode, LinkNode, ListNode,CodeHighlightNode, CodeNode],
  onError(error: Error) {
    throw error;
  },
  editorState: () => $convertFromMarkdownString("# 12", TRANSFORMERS),
};

function MyCustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();
  
    
  
  useEffect(() => {
      editor.update(()=>{
        editor
      })
    }, [editor]);
  
    return null;
  }

const App = () => {
  return (
    <div style={{ marginTop: 50 }}>
      <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<span>请输入</span>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <AutoFocusPlugin />
      </LexicalComposer>
    </div>
  );
};

const rootEle = document.createElement("div");

console.log(document.body);

document.body.appendChild(rootEle);

const root = createRoot(rootEle);

root.render(<App />);

SplashScreen.hide();
