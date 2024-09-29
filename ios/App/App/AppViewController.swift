//
//  AppViewController.swift
//  App
//
//  Created by liucan.2333 on 2024/9/29.
//

import Capacitor

class AppViewController: CAPBridgeViewController {
  override open func capacitorDidLoad() {
      bridge?.registerPluginInstance(InjectDataPlugin())
  }
}
