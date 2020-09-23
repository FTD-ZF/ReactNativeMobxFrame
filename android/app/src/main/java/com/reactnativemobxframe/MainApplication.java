package com.reactnativemobxframe;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;

import com.facebook.react.ReactApplication;
import com.github.yamill.orientation.OrientationPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactlibrary.bugly.RNBuglyModule;
import com.reactlibrary.bugly.RNBuglyPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.zmxv.RNSound.RNSoundPackage;

import java.util.Arrays;
import java.util.List;

import io.realm.react.RealmReactPackage;
import io.sentry.RNSentryPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new OrientationPackage(),
                    new ReactVideoPackage(),
                    new LinearGradientPackage(),
                    new ReactSliderPackage(),
                    new RNCViewPagerPackage(),
                    new RNGestureHandlerPackage(),
                    new RealmReactPackage(),
                    new RNSoundPackage(),
                    new ReactNativeAudioPackage(),
                    new ImagePickerPackage(),
                    new VectorIconsPackage(),
                    new RNSentryPackage(),
                    new RNBuglyPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        RNBuglyModule.init(getApplicationContext(),"5e06b454c9",false);
//        RNBuglyModule.initWithoutAutoCheckUpgrade(getApplicationContext(),"5e06b454c9",false);
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }
}
