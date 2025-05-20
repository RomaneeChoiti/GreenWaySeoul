import UIKit
import React
import GoogleMaps
import React_RCTAppDelegate
import ReactAppDependencyProvider
import Foundation

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    GMSServices.provideAPIKey("AIzaSyByAX7GF6XLPQINeV-uPsDeeyzkMI0A-3c") 
    self.moduleName = "GreenWaySeoulRN"
    self.dependencyProvider = RCTAppDependencyProvider()

    // SplashScreen 표시 (브리징 헤더에서 RNSplashScreen 사용)
    self.initialProps = [:]
    super.application(application, didFinishLaunchingWithOptions: launchOptions)
    RNSplashScreen.show()
    return true
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
