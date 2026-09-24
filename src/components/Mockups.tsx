import type {ReactNode} from 'react';

const windowChrome = (
  <div
    style={{
      height: 58,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '0 24px',
      background: '#eff3f7',
      borderBottom: '1px solid #dce4ec',
      color: '#526277',
      fontSize: 18,
      fontWeight: 600,
    }}
  >
    <div style={{display: 'flex', gap: 7}}>
      {['#ff6b67', '#ffbd4f', '#4ed28c'].map((color) => (
        <div key={color} style={{width: 12, height: 12, borderRadius: '50%', background: color}} />
      ))}
    </div>
    <div
      style={{
        marginLeft: 20,
        flex: 1,
        maxWidth: 480,
        background: '#fff',
        border: '1px solid #dae3eb',
        borderRadius: 10,
        padding: '8px 16px',
        textAlign: 'center',
      }}
    >
      studio.example / workspace
    </div>
  </div>
);

export const BrowserMockup = ({
  children,
  url,
  width = 1200,
  height = 710,
}: {
  children: ReactNode;
  url?: string;
  width?: number;
  height?: number;
}) => (
  <div
    style={{
      width,
      height,
      overflow: 'hidden',
      borderRadius: 20,
      background: '#fff',
      boxShadow: '0 32px 90px #03132b66, 0 0 0 1px #ffffff44',
    }}
  >
    <div
      style={{
        height: 58,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '0 24px',
        background: '#eff3f7',
        borderBottom: '1px solid #dce4ec',
        color: '#526277',
        fontSize: 18,
        fontWeight: 600,
      }}
    >
      <div style={{display: 'flex', gap: 7}}>
        {['#ff6b67', '#ffbd4f', '#4ed28c'].map((color) => (
          <div key={color} style={{width: 12, height: 12, borderRadius: '50%', background: color}} />
        ))}
      </div>
      <div
        style={{
          marginLeft: 20,
          flex: 1,
          maxWidth: 480,
          background: '#fff',
          border: '1px solid #dae3eb',
          borderRadius: 10,
          padding: '8px 16px',
          textAlign: 'center',
        }}
      >
        {url ?? 'studio.example / workspace'}
      </div>
    </div>
    <div style={{height: height - 58, overflow: 'hidden'}}>{children}</div>
  </div>
);

export const LaptopMockup = ({
  children,
  url,
}: {
  children: ReactNode;
  url?: string;
}) => (
  <div style={{width: 1270, height: 800, position: 'relative'}}>
    <div
      style={{
        width: 1204,
        height: 748,
        padding: 18,
        margin: '0 auto',
        borderRadius: '30px 30px 12px 12px',
        background: 'linear-gradient(135deg, #68788f, #152238 50%, #42536a)',
        boxShadow: '0 34px 80px #05122a77',
      }}
    >
      <BrowserMockup width={1204} height={748} url={url}>
        {children}
      </BrowserMockup>
    </div>
    <div
      style={{
        width: 1270,
        height: 32,
        borderRadius: '0 0 65px 65px',
        background: 'linear-gradient(#b5c2d1, #65758b 60%, #38465a)',
        boxShadow: '0 22px 38px #07152b55',
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: 27,
        left: 510,
        width: 250,
        height: 12,
        borderRadius: '0 0 14px 14px',
        background: '#738297',
      }}
    />
  </div>
);

export const PhoneMockup = ({children}: {children: ReactNode}) => (
  <div
    style={{
      width: 440,
      height: 760,
      padding: 15,
      borderRadius: 68,
      background: '#17243a',
      boxShadow: '0 36px 90px #07152b88, inset 0 0 0 3px #60718a',
    }}
  >
    <div style={{height: '100%', overflow: 'hidden', borderRadius: 52, background: '#fff'}}>
      {children}
    </div>
  </div>
);

export const TabletMockup = ({children}: {children: ReactNode}) => (
  <div
    style={{
      width: 1080,
      height: 700,
      padding: 22,
      borderRadius: 44,
      background: '#17243a',
      boxShadow: '0 36px 90px #07152b88, inset 0 0 0 3px #60718a',
    }}
  >
    <div style={{height: '100%', overflow: 'hidden', borderRadius: 24, background: '#fff'}}>
      {children}
    </div>
  </div>
);

export const DemoDashboard = () => (
  <div style={{height: '100%', display: 'flex', fontFamily: 'Arial, sans-serif', color: '#1c2d44'}}>
    <div style={{width: 230, background: '#122840', color: '#e8f4fb', padding: 30}}>
      <div style={{fontSize: 26, fontWeight: 800, marginBottom: 58}}>◈ STUDIO</div>
      {['Overview', 'Projects', 'Assets', 'Renders'].map((item, i) => (
        <div
          key={item}
          style={{
            marginBottom: 15,
            borderRadius: 10,
            padding: '12px 15px',
            fontSize: 18,
            background: i === 0 ? '#31d0cc33' : 'transparent',
            color: i === 0 ? '#5be5df' : '#b5c9db',
          }}
        >
          {item}
        </div>
      ))}
    </div>
    <div style={{flex: 1, background: '#f6f9fc', padding: 40}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <div style={{fontSize: 34, fontWeight: 800}}>Workspace overview</div>
          <div style={{fontSize: 18, color: '#70839b', marginTop: 5}}>Your story, scene by scene</div>
        </div>
        <div style={{padding: '14px 22px', borderRadius: 12, background: '#16bcb8', color: '#fff', fontSize: 18, fontWeight: 700}}>
          + New video
        </div>
      </div>
      <div style={{display: 'flex', gap: 22, marginTop: 40}}>
        {[
          ['12', 'Shots planned'],
          ['08', 'Assets ready'],
          ['04', 'Scenes rendered'],
        ].map(([value, label]) => (
          <div key={label} style={{flex: 1, padding: 24, background: '#fff', borderRadius: 16, boxShadow: '0 5px 24px #152d4510'}}>
            <div style={{fontSize: 42, fontWeight: 800, color: '#143650'}}>{value}</div>
            <div style={{fontSize: 17, color: '#78899c'}}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{background: '#fff', borderRadius: 16, marginTop: 24, padding: 30, boxShadow: '0 5px 24px #152d4510'}}>
        <div style={{fontWeight: 700, fontSize: 24, marginBottom: 22}}>Production timeline</div>
        {[
          ['01', 'Opening sequence', '#20c7bd', '100%'],
          ['02', 'Product walkthrough', '#627af1', '76%'],
          ['03', 'Feature story', '#f5ba55', '49%'],
        ].map(([number, label, color, progress]) => (
          <div key={number} style={{display: 'flex', alignItems: 'center', gap: 22, marginBottom: 26}}>
            <div style={{color: '#9badbd', fontSize: 16, fontWeight: 700}}>{number}</div>
            <div style={{width: 220, fontSize: 18, fontWeight: 600}}>{label}</div>
            <div style={{flex: 1, height: 13, background: '#eaf0f5', borderRadius: 9}}>
              <div style={{width: progress, height: '100%', background: color, borderRadius: 9}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);