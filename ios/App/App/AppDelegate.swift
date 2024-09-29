import UIKit
import Capacitor

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  var t: UILabel?

    var window: UIWindow?
  var gv: UIView?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
      if true {
        return
      }
      if #available(iOS 15, *){
        let presentedViewController = UIViewController()
        if let mv = presentedViewController.view {
          mv.backgroundColor = UIColor.red
          let t = UILabel()
          t.text = "233333"
          t.isUserInteractionEnabled = true
          t.backgroundColor = UIColor.blue
          
          let g = UIPanGestureRecognizer(target: self, action: #selector(self.onPanInT(_:)))
          
          t.addGestureRecognizer(g)
          //          t.sizeToFit();
          window?.rootViewController?.view.addSubview(t)
          t.translatesAutoresizingMaskIntoConstraints = false;
          t.transform = CGAffineTransform(translationX: 100, y: 200)
          self.t = t;
        }
        if let p = presentedViewController.sheetPresentationController{
          p.detents = [.medium(), .medium()]
        }
        gv = presentedViewController.view
        window?.rootViewController?.present(presentedViewController, animated: true)
      }
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }   
  
  @objc public func onPanInT(_ g: UIGestureRecognizer) -> Void {
    let p = g.location(in: window?.rootViewController?.view)
    
    t?.transform = CGAffineTransform(translationX: p.x, y: p.y)
    print("view position", t?.safeAreaInsets.top, window?.safeAreaInsets.top)
  }

}
