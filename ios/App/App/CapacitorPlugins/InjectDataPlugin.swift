//
//  InjectDataPlugin.swift
//  App
//
//  Created by liucan.2333 on 2024/9/29.
//

import Capacitor
import Foundation
import SwiftUI

@objc(InjectDataPlugin)
public class InjectDataPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "InjectDataPlugin"
    public let jsName = "inject"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getSafeArea", returnType: CAPPluginReturnPromise)
    ]
  
  public override func load() {
    let nc  = NotificationCenter.default
    nc.addObserver(self, selector: #selector(self.scroll(_:)), name: UIResponder.keyboardWillShowNotification, object: nil)
    nc.addObserver(self, selector: #selector(self.hidden(_:)), name: UIResponder.keyboardDidHideNotification, object: nil)
    
    nc.removeObserver(self.webView, name: UIResponder.keyboardWillShowNotification, object: nil)
    nc.removeObserver(self.webView, name: UIResponder.keyboardDidShowNotification, object: nil)
  }
  
  @objc func scroll(_ n:NSNotification){
    if let t = (n.userInfo?[UIResponder.keyboardFrameEndUserInfoKey]) as? NSValue{
      let h = t.cgRectValue.height;
      let a = self.webView?.scrollView
      
      a?.contentInset=UIEdgeInsets.zero
      a?.scrollIndicatorInsets = UIEdgeInsets.zero
      a?.delegate?.scrollViewDidChangeAdjustedContentInset?(a!);
      print("adjustedContentInset", a?.adjustedContentInset)
      print("contentInset", a?.contentInset)
    }
  }
  
  @objc func hidden(_ n:NSNotification){
    let a = self.webView?.scrollView
    print("hidden", a?.adjustedContentInset)
  }

    @objc @MainActor func getSafeArea(_ call: CAPPluginCall) {
      DispatchQueue.main.async {
        if let safeAreaInsets = self.webView?.safeAreaInsets {
          call.resolve(["top": safeAreaInsets.top, "bottom": safeAreaInsets.bottom, "left": safeAreaInsets.left, "right": safeAreaInsets.right])
        } else {
          call.reject("webView?.safeAreaInsets is nil")
        }
      }
    }
}
