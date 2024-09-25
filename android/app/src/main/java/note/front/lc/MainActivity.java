package note.front.lc;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.gyf.immersionbar.ImmersionBar;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ImmersionBar.with(this)
                .transparentNavigationBar().init();
    }
}
