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
import { useEffect, useRef, useState } from "react";
import { registerPlugin } from "@capacitor/core";
import {Keyboard, KeyboardResize} from "@capacitor/keyboard"

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
  editorState: () => $convertFromMarkdownString("# 12\n\n1212\n\n# 12", TRANSFORMERS),
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

let y=0

const App = () => {
  const wrapRef = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    Keyboard.addListener('keyboardWillShow', e=>{
      if(y>300){
        wrapRef.current?.scrollTo({
          top: 2000,
          behavior: 'smooth'
        })
      }
    })
  },[])
  return (
    <div onClickCapture={e=>{
      y=e.screenY
      console.log(e.screenY)
    }} ref={wrapRef} style={{ height: '100vh', overflow: 'hidden auto', overscrollBehavior: 'contain' }}>
      <div style={{backgroundColor: 'red',height: 50,width:100, position: 'fixed', left: 0, bottom: 0}}/>
      <div style={{height: 50}}>23333</div>
      <input placeholder="请输入" />
      <div style={{height: '50vh'}}>23333</div>
      <input placeholder="请输入" />
      <div style={{height: '50vh'}}>23333</div>
      <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable inputMode="text" spellCheck="false" className={css.editor} autoComplete="off" />}
          placeholder={<span>请输入</span>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        {/* <AutoFocusPlugin /> */}
      </LexicalComposer>
      <div style={{height: 500}}>23333</div>
      <button >点击</button>
    </div>
  );
};

const rootEle = document.createElement("div");

document.body.style.margin = '0'

document.body.appendChild(rootEle);

const root = createRoot(rootEle);

root.render(<App />);

SplashScreen.hide();
  StatusBar.setStyle({
    style: Style.Light,
  });
Keyboard.setAccessoryBarVisible({isVisible: false})
// Keyboard.setScroll({isDisabled: true})
Keyboard.setResizeMode({ mode: KeyboardResize.None})

// Keyboard.addListener('keyboardWillHide', ()=>{
//   rootEle.style.transform = `translateY(0)`
// })