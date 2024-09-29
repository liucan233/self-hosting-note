//
//  InjectDataPlugin.swift
//  App
//
//  Created by liucan.2333 on 2024/9/29.
//

import Capacitor

@objc(InjectDataPlugin)
public class InjectDataPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "InjectDataPlugin"
    public let jsName = "inject"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getSafeArea", returnType: CAPPluginReturnPromise)
    ]

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
