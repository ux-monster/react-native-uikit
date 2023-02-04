# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# react-native-device-info
# If you want to use Install Referrer tracking, you will need to add this config to your Proguard config
-keepclassmembers class com.android.installreferrer.api.** {
  *;
}

# react-native-device-info
# If you are experiencing issues with hasGms() on your release apks, please add the following rule to your Proguard config
-keep class com.google.android.gms.common.** {*;}
